import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { interviewAPI } from '../utils/api'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState('')
    const [jobDesc, setJobDesc] = useState('')
    const [level, setLevel] = useState('')
    const [jobExperience, setJobExperience] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useUser()
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
    
        try {
            const response = await interviewAPI.create({
                jobPosition,
                jobDesc,
                jobExperience,
                level,
                userEmail: user?.primaryEmailAddress?.emailAddress
            })

            if (response.data.success) {
                setOpenDialog(false)
                toast.success('Interview created successfully!')
                navigate(`/dashboard/interview/${response.data.mockId}`)
                
                setJobPosition('')
                setJobDesc('')
                setJobExperience('')
                setLevel('')
            }
        } catch (error) {
            console.error('Error creating interview:', error)
            toast.error('Failed to create interview. Please try again.')
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div>
            <div 
                className='p-10 border rounded-lg bg-secondary hover:shadow-md cursor-pointer transition-all' 
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='font-bold text-lg text-center'>+ Add New</h2>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-xl border bg-gray-950 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Tell us more about the job interview
                        </DialogTitle>
                        <DialogDescription>
                            Add details about the job position, description, and required experience.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={onSubmit}>
                        <div className="mt-5">
                            <div className="my-3">
                                <label>Job Role/Job Position</label>
                                <Input
                                    placeholder="Ex: Data Analyst"
                                    required
                                    value={jobPosition}
                                    onChange={(e) => setJobPosition(e.target.value)}
                                    // FIX: Added placeholder:text-gray-400 to make the placeholder visible
                                    className="bg-gray-800 border-gray-600 placeholder:text-gray-400"
                                />
                            </div>
                            <div className="my-3">
                                <label>Job Description/Tech Stack</label>
                                <Textarea
                                    placeholder="Ex: Python, React, Next.js"
                                    required
                                    value={jobDesc}
                                    onChange={(e) => setJobDesc(e.target.value)}
                                   
                                    className="bg-gray-800 border-gray-600 placeholder:text-gray-400"
                                />
                            </div>
                            <div className="my-3">
                                <label>Years of Experience</label>
                                <Input
                                    placeholder="Ex: 2 years"
                                    type="number"
                                    max="30"
                                    required
                                    value={jobExperience}
                                    onChange={(e) => setJobExperience(e.target.value)}
                                    // FIX: Added placeholder:text-gray-400
                                    className="bg-gray-800 border-gray-600 placeholder:text-gray-400"
                                />
                            </div>
                             <div className="my-3">
                                <label>Level of Difficulty</label>
                                <Textarea
                                    placeholder="low, medium, high"
                                    required
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
                                    // FIX: Added placeholder:text-gray-400
                                    className="bg-gray-800 border-gray-600 placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        <div className="flex gap-5 justify-end">
                            <Button variant="ghost" type="button" onClick={() => setOpenDialog(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> Generating results...
                                    </>
                                ) : 
                                    'Start Interview'
                                }
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview