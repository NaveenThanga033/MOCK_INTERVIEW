import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

function InterviewItemCard({interview}) {
    const navigate = useNavigate()

    const onStart = () => {
        navigate(`/dashboard/interview/${interview?.mockId}`)
    }

    const onFeedback = () => {
        navigate(`/dashboard/interview/${interview?.mockId}/feedback`)
    }

    return (
        <div className='border shadow-sm rounded-lg p-3'>
            <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
            <h2 className='text-sm text-gray-700'>{interview.jobExperience} Years of experience</h2>
            <h2 className='text-xs text-gray-600'>Created At: {interview.createdAt}</h2>
            <div className='flex justify-between mt-2 gap-5'>
                <Button size="sm" variant="outline" onClick={onFeedback}>Feedback</Button>
                <Button size="sm" onClick={onStart}>Start</Button>
            </div>
        </div>
    )
}

export default InterviewItemCard