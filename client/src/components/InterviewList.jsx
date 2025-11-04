import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { interviewAPI } from '../utils/api'
import InterviewItemCard from './InterviewItemCard'

function InterviewList() {
    const { user } = useUser()
    const [interviewList, setInterviewList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            GetInterviewList()
        }
    }, [user])

    const GetInterviewList = async () => {
        try {
            const response = await interviewAPI.getUserInterviews(user?.primaryEmailAddress?.emailAddress)
            if (response.data.success) {
                setInterviewList(response.data.interviews)
            }
        } catch (error) {
            console.error('Error fetching interviews:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="text-center py-8">Loading interviews...</div>
    }

    return (
        <div>
            <h2 className='font-medium text-xl'>Previous Mock Interview</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-4'>
                {interviewList && interviewList.map((interview, index) => (
                    <InterviewItemCard  
                        interview={interview}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
}

export default InterviewList