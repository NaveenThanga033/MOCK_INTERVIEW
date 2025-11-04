import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { interviewAPI } from '../utils/api'
import Webcam from "react-webcam"
import { BadgeAlert, WebcamIcon } from 'lucide-react'
import { Button } from '../components/ui/button'

function Interview() {
    const { interviewId } = useParams()
    const [interviewData, setInterviewData] = useState()
    const [webCamEnabled, setWebCamEnabled] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (interviewId) {
            GetInterviewDetails()
        }
    }, [interviewId])

    const GetInterviewDetails = async () => {
        try {
            const response = await interviewAPI.getDetails(interviewId)
            if (response.data.success) {
                setInterviewData(response.data.interview)
            }
        } catch (error) {
            console.error('Error fetching interview details:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="text-center py-8">Loading interview details...</div>
    }

    return (
        <div className='my-10 flex justify-center flex-col items-center'> 
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            
                <div>
                    {webCamEnabled ? 
                        <Webcam 
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{ height: 400, width: 600 }}
                        /> :
                        <>
                            <WebcamIcon className='h-70 w-full my-7 p-20 bg-secondary rounded-lg border'/>
                            <Button className='w-full' onClick={() => setWebCamEnabled(true)}>
                                Enable web cam and microphone
                            </Button>
                        </>
                    }
                </div>

                <div className='flex flex-col my-5 gap-5'>
                    <div className='flex flex-col p-5 rounded-lg border gap-5'>
                        <h2><strong>Job Position/Job Role: </strong>
                            {interviewData ? interviewData.jobPosition : 'Loading...'}
                        </h2>
                        <h2><strong>Job Description/Tech Stack: </strong>
                            {interviewData ? interviewData.jobDesc: 'Loading...'}
                        </h2>
                        <h2><strong>Years of Experience: </strong>
                            {interviewData ? interviewData.jobExperience : 'Loading...'}
                        </h2>
                    </div>
                    <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-50'>
                        <h2 className='flex gap-2 items-center text-yellow-400'><BadgeAlert /><strong>Information</strong></h2>  
                        <h2 className='mt-3 text-yellow-600'>{import.meta.env.VITE_INFORMATION}</h2>
                    </div>
                </div>
            </div>
            <div className='flex justify-end items-end mt-10 w-full'>
                <Link to={`/dashboard/interview/${interviewId}/start`}>
                    <Button className='w-40 h-14 text-xl'>Start Interview</Button>
                </Link>
            </div>
        </div>
    )
}

export default Interview