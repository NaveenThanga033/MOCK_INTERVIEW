import React, { useState } from 'react';
import Header from '../components/Header';
import { Check, Star, Zap, Crown, Users, MessageSquare } from 'lucide-react';

const Upgrade = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      icon: <Users className="h-8 w-8 text-gray-600" />,
      price: 0,
      period: "month",
      description: "Perfect for getting started",
      features: [
        "5 mock interviews per month",
        "Basic feedback reports",
        "Standard question templates",
        "Email support",
        "Basic analytics"
      ],
      limitations: [
        "Limited to 5 questions per interview",
        "No voice recording",
        "Basic feedback only"
      ],
      popular: false,
      buttonText: "Current Plan",
      buttonClass: "bg-gray-100 text-gray-600 cursor-not-allowed"
    },
    {
      name: "Pro",
      icon: <Zap className="h-8 w-8 text-indigo-600" />,
      price: isAnnual ? 19 : 29,
      period: "month",
      description: "For serious interview preparation",
      features: [
        "Unlimited mock interviews",
        "Advanced AI feedback & scoring",
        "Industry-specific question banks",
        "Voice recording & analysis",
        "Detailed performance analytics",
        "Priority email support",
        "Custom difficulty levels",
        "Interview history tracking"
      ],
      limitations: [],
      popular: true,
      buttonText: "Upgrade to Pro",
      buttonClass: "bg-indigo-600 hover:bg-indigo-700 text-white"
    },
    {
      name: "Enterprise",
      icon: <Crown className="h-8 w-8 text-purple-600" />,
      price: isAnnual ? 49 : 69,
      period: "month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team management dashboard",
        "Bulk user management",
        "Custom branding options",
        "Advanced reporting & insights",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom integrations",
        "SSO authentication",
        "Data export capabilities"
      ],
      limitations: [],
      popular: false,
      buttonText: "Contact Sales",
      buttonClass: "bg-purple-600 hover:bg-purple-700 text-white"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Google",
      text: "AI Interview Pro helped me land my dream job at Google. The feedback was incredibly detailed and helped me improve my technical communication skills.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "Amazon",
      text: "The industry-specific questions were spot on. I felt much more confident during my actual interviews after practicing here.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist",
      company: "Microsoft",
      text: "The voice recording feature really helped me work on my presentation skills. Highly recommend the Pro plan!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
    
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Upgrade to unlock advanced features and accelerate your interview preparation
          </p>
          
          {/* Annual/Monthly Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual 
              <span className="text-green-600 font-semibold ml-1">(Save 30%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-indigo-600 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">{plan.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                  {isAnnual && plan.price > 0 && (
                    <div className="text-sm text-green-600 font-semibold">
                      Save ${(plan.price * 12 * 0.3).toFixed(0)} per year
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations.map((limitation, limitIndex) => (
                  <div key={limitIndex} className="flex items-start space-x-3 opacity-60">
                    <div className="h-5 w-5 flex-shrink-0 mt-0.5">
                      <div className="h-3 w-3 bg-gray-400 rounded-full mx-auto mt-1"></div>
                    </div>
                    <span className="text-gray-500 text-sm">{limitation}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${plan.buttonClass}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-600 text-sm">Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial for Pro plan?</h3>
              <p className="text-gray-600 text-sm">We offer a 7-day free trial for the Pro plan. No credit card required to start your trial.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does the voice recording feature work?</h3>
              <p className="text-gray-600 text-sm">Our AI analyzes your voice responses for clarity, pace, and content quality, providing detailed feedback to improve your delivery.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-600 text-sm">Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;