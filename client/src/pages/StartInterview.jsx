import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { interviewAPI } from '../utils/api'
import QuestionsSection from '../components/QuestionsSection'
import RecordAnswerSection from '../components/RecordAnswerSection'
import { Button } from '../components/ui/button'

function StartInterview() {
    const { interviewId } = useParams()
    const [interviewData, setInterviewData] = useState()
    const [mockInterviewquestion, setMockInterviewQuestion] = useState([]) 
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        GetInterviewDetails()
    }, [])

const GetInterviewDetails = async () => {
    try {
        const response = await interviewAPI.getDetails(interviewId)
        if (response.data.success) {
            const interview = response.data.interview
            console.log("Full API Response:", response.data)

            let parsedQuestions = []
            try {
                const jsonResp = JSON.parse(interview.jsonMockResp)
                console.log("Parsed Questions:", jsonResp)

               
                parsedQuestions = jsonResp.flatMap(section => section.Questions)
                console.log("Flattened Questions:", parsedQuestions)
            } catch (err) {
                console.error("Error parsing jsonMockResp:", err)
            }

            setMockInterviewQuestion(parsedQuestions) // now it's a clean flat array
            setInterviewData(interview)
        }
    } catch (error) {
        console.error('Error fetching interview details:', error)
    } finally {
        setLoading(false)
    }
}


    if (loading) {
        return <div className="text-center py-8">Loading interview...</div>
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <QuestionsSection 
                    mockInterviewquestion={mockInterviewquestion}
                    activeQuestionIndex={activeQuestionIndex}
                />
                <RecordAnswerSection 
                    mockInterviewquestion={mockInterviewquestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                />
            </div>
            <div className='flex justify-end gap-6 mt-6'>
                {activeQuestionIndex > 0 && 
                    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
                        Previous Question
                    </Button>
                }
                {activeQuestionIndex !== mockInterviewquestion?.length - 1 &&
                    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
                        Next Question
                    </Button>
                }
                {activeQuestionIndex === mockInterviewquestion?.length - 1 &&
                    <Link to={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                        <Button>End Interview</Button>
                    </Link>
                }
            </div>
        </div>
    )
}

export default StartInterview;
