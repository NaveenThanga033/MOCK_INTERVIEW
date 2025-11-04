import { SignUp } from '@clerk/clerk-react'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
      <SignUp 
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  )
}