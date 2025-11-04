import { Mic } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import useSpeechToText from "react-hook-speech-to-text"
import { toast } from "sonner"
import { feedbackAPI } from "../utils/api"
import { useUser } from "@clerk/clerk-react"
import moment from "moment"
import ReactWebcam from "react-webcam"

function RecordAnswerSection({ mockInterviewquestion, activeQuestionIndex, interviewData }) {
    const [userAnswer, setUserAnswer] = useState("")
    const { user } = useUser()
    const [loading, setLoading] = useState(false)
    const webcamRef = React.useRef(null)

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    })

    useEffect(() => {
        results.forEach((result) => {
            setUserAnswer((prev) => prev + result?.transcript)
        })
    }, [results])

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            UpdateUserAnswer()
        }
    }, [userAnswer])

    const StartStopRecording = async () => {
        if (isRecording) {
            setLoading(true)
            stopSpeechToText()
        } else {
            startSpeechToText()
        }
    }

    const UpdateUserAnswer = async () => {
        console.log(userAnswer)
        setLoading(true)

        try {
            const response = await feedbackAPI.save({
                mockId: interviewData.mockId,
                question: mockInterviewquestion?.[activeQuestionIndex].Question,
                correctAns: mockInterviewquestion?.[activeQuestionIndex]?.Answer,
                userAns: userAnswer,
                userEmail: user?.primaryEmailAddress?.emailAddress,
            })

            if (response.data.success) {
                toast.success("Answer saved successfully")
                setUserAnswer("")
                setResults([])
            } else {
                toast.error("Error while saving answer")
            }
        } catch (error) {
            console.error('Error saving answer:', error)
            toast.error("Error while saving answer")
        } finally {
            setResults([])
            setUserAnswer("")
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center flex-col">
            <div className="flex flex-col mt-20 justify-center items-center bg-white rounded-lg p-5 border-2 relative w-[350px] h-[300px]">
                <img 
                    src={"/cam2.png"} 
                    alt="webcam-placeholder" 
                    width={300} 
                    height={300} 
                    className="absolute z-0" 
                />
                <ReactWebcam
                    ref={webcamRef}
                    mirrored={true}
                    className="absolute w-full h-full object-cover z-10"
                />
            </div>

            <Button 
                disabled={loading} 
                variant="outline" 
                className="my-10" 
                onClick={StartStopRecording}
            >
                {isRecording ? (
                    <h2 className="text-red-500 animate-pulse flex gap-2 items-center">
                        <Mic /> Stop Recording
                    </h2>
                ) : (
                    "Record Answer"
                )}
            </Button>
        </div>
    )
}

export default RecordAnswerSection