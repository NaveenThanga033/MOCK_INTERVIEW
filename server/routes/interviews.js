const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const MockInterview = require('../models/MockInterview');
const { chatSession, cleanJsonResponse } = require('../utils/gemini');

// Create new interview
router.post('/', async (req, res) => {
  try {
    const { jobPosition, jobDesc, jobExperience, level, userEmail } = req.body;

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. 
    Based on this information, please provide me 5-7 question per technology from ${jobDesc} interview questions with answers with difficulty of ${level} in JSON format. 
    The JSON should contain "Question" and "Answer" fields.`;

    const result = await chatSession.sendMessage(InputPrompt);
    const rawText = await result.response.text();
    
    const parsedJson = cleanJsonResponse(rawText);
    const stringifiedJson = JSON.stringify(parsedJson);

    const mockId = uuidv4();
    
    const newInterview = new MockInterview({
      mockId,
      jsonMockResp: stringifiedJson,
      jobPosition,
      jobDesc,
      jobExperience,
      createdBy: userEmail,
      createdAt: moment().format('DD-MM-YYYY')
    });

    await newInterview.save();

    res.status(201).json({ 
      success: true, 
      mockId,
      message: 'Interview created successfully' 
    });

  } catch (error) {
    console.error('Error creating interview:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create interview' 
    });
  }
});

// Get user's interviews
router.get('/user/:userEmail', async (req, res) => {
  try {
    const { userEmail } = req.params;
    
    const interviews = await MockInterview.find({ createdBy: userEmail })
      .sort({ createdAt: -1 });

    res.json({ success: true, interviews });
  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch interviews' 
    });
  }
});
// Get interview details
router.get('/details/:mockId', async (req, res) => {
  try {
    const { mockId } = req.params;
    
    const interview = await MockInterview.findOne({ mockId });
    
    if (!interview) {
      return res.status(404).json({ 
        success: false, 
        message: 'Interview not found' 
      });
    }

    // Parse the JSON string before sending to frontend
    let questions = [];
    try {
      questions = JSON.parse(interview.jsonMockResp);
    } catch (e) {
      console.error("Error parsing questions JSON:", e);
    }

    // send parsed questions instead of raw string
    res.json({ success: true, interview: { ...interview._doc, questions } });
  } catch (error) {
    console.error('Error fetching interview details:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch interview details' 
    });
  }
});


module.exports = router;