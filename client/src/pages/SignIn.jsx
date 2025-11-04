import { SignIn } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Left side - Branding & Info */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <div className="mb-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <img 
                src="/image.avif" 
                alt="AI Interview Pro Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-indigo-700">AI Interview Pro</h1>
          </Link>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Welcome back</h2>
        <p className="text-lg text-gray-600 mb-8">
          Sign in to continue practicing your interview skills with our AI-powered mock interviews tailored to your industry.
        </p>
        
        {/* Features section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {[
            {
              title: "Real-time feedback",
              desc: "Get instant analysis of your interview performance",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              )
            },
            {
              title: "Industry-specific",
              desc: "Practice interviews tailored to your field",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              )
            },
            {
              title: "Skill tracking",
              desc: "Monitor your progress over time",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              )
            },
            {
              title: "On-demand",
              desc: "Practice anytime, anywhere you want",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              )
            }
          ].map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {feature.icon}
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right side - Sign-in form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-8 rounded-tl-3xl rounded-bl-3xl shadow-2xl">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Sign in to your account</h2>
            <p className="text-gray-600 mt-2">
              Enter your credentials to access your dashboard
            </p>
          </div>
          
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                card: "shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: 
                  "border border-gray-300 text-gray-600 hover:bg-gray-50",
                dividerLine: "bg-gray-200",
                dividerText: "text-gray-400 text-sm",
                formFieldLabel: "block text-sm font-medium text-gray-700",
                formFieldInput: "mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                footer: "mt-8 text-center text-gray-600 text-sm",
                footerAction: "text-indigo-600 hover:text-indigo-500 font-medium"
              }
            }}
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/dashboard"
          />
          
          <div className="mt-8 text-center text-gray-600 text-sm">
            <p>Don't have an account? <Link to="/sign-up" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</Link></p>
            <p className="mt-4">
              By continuing, you agree to our <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">Terms of Service</Link> and <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
