import React from 'react'
import { BadgeAlert, Volume2 } from 'lucide-react'

function QuestionsSection({mockInterviewquestion, activeQuestionIndex}) {

    const textToSpeech = (text) => {
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text)
            window.speechSynthesis.speak(speech)
        } else {
            console.log('Text to speech not supported')
        }
    }

    return mockInterviewquestion && (
        <div className='p-10 border rounded-lg my-5'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {mockInterviewquestion && mockInterviewquestion.map((question, index) => (
                    <h2 key={index} className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer 
                        ${activeQuestionIndex === index ? 'bg-red-300 text-red-600' : ''}`}>
                        Question {index + 1}
                    </h2>               
                ))}
            </div>
            <h2 className='my-5 text-md md:text-lg'>{mockInterviewquestion[activeQuestionIndex]?.Question}</h2>
            <Volume2 
                className="cursor-pointer hover:text-primary"
                onClick={() => textToSpeech(mockInterviewquestion[activeQuestionIndex]?.Question)}
            />
            <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
                <h2 className='flex gap-2 items-center text-blue-600'><BadgeAlert /><strong>Note:</strong></h2>
                <h2 className='text-sm text-primary my-2'>
                    Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to compare it.
                </h2>
            </div>
        </div>
    )
}

export default QuestionsSection
