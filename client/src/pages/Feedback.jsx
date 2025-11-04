// pages/Feedback.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { feedbackAPI } from '../utils/api'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '../components/ui/button'

function Feedback() {
    const { interviewId } = useParams()
    const [feedbackList, setFeedbackList] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        GetFeedback()
    }, [])

    const GetFeedback = async () => {
        try {
            const response = await feedbackAPI.get(interviewId)
            if (response.data.success) {
                setFeedbackList(response.data.feedback)
            }
        } catch (error) {
            console.error('Error fetching feedback:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="text-center py-8">Loading feedback...</div>
    }

    return (
        <div className='p-10'>
            {feedbackList?.length == 0 ? 
                <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Record found</h2> :
                <>
                    <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
                    <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
                    <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2>

                    <h2 className='text-sm text-gray-400'>
                        Find below interview question with correct answer, Your answer and feedback for improvement 
                    </h2>
                    
                    {feedbackList && feedbackList.map((item, index) => (
                        <Collapsible key={index} className='mt-7'>
                            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between my-2 gap-7 w-full'>
                                {item.question} 
                                <ChevronsUpDown className='h-5 w-4'/>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-red-600 p-2 border rounded-lg'>
                                        <strong>Rating: </strong>{item.rating}
                                    </h2>
                                    <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'>
                                        <strong>Your Answer: </strong>{item.userAns}
                                    </h2>
                                    <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'>
                                        <strong>Correct Answer: </strong>{item.correctAns}
                                    </h2>
                                    <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'>
                                        <strong>Feedback: </strong>{item.feedback}
                                    </h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </>
            }
            <Button onClick={() => navigate('/dashboard')}>Go Home</Button>
        </div>
    )
}

export default Feedback