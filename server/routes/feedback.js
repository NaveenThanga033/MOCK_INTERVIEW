const express = require('express');
const router = express.Router();
const moment = require('moment');
const UserAnswer = require('../models/UserAnswer');
const { chatSession } = require('../utils/gemini');
router.post('/', async (req, res) => {
  try {
    const { mockId, question, correctAns, userAns, userEmail } = req.body;

    const feedbackPrompt = `
    Question: ${question}
    User Answer: ${userAns}
    Correct Answer: ${correctAns}
    Please return feedback ONLY in this strict JSON format:
    {
      "rating": number (1-5),
      "feedback": "string (3-5 lines of improvement tips)"
    }
    `;

    const result = await chatSession.sendMessage(feedbackPrompt);
    const responseText = await result.response.text();

    let mockJsonResp = responseText.replace(/```json|```/g, "").trim();

    let JsonFeedbackResp;
    try {
      JsonFeedbackResp = JSON.parse(mockJsonResp);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, "Response was:", responseText);
      return res.status(500).json({ success: false, message: "Invalid AI response", raw: responseText });
    }

    const newAnswer = new UserAnswer({
      mockId,
      question,
      correctAns,
      userAns,
      rating: JsonFeedbackResp?.rating,
      feedback: JsonFeedbackResp?.feedback,
      userEmail,
      createdAt: moment().format("DD-MM-YYYY")
    });

    await newAnswer.save();

    res.json({ 
      success: true, 
      message: 'Answer saved successfully',
      feedback: JsonFeedbackResp
    });

  } catch (error) {
    console.error('Error saving answer:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save answer',
      error: error.message 
    });
  }
});


// Get feedback for interview

router.get('/:mockId', async (req, res) => {
  try {
    const { mockId } = req.params;
    
    const feedback = await UserAnswer.find({ mockId })
      .sort({ createdAt: 1 });

    res.json({ success: true, feedback });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch feedback' 
    });
  }
});

module.exports = router;