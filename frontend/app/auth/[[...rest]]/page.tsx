"use client";

import { useState } from 'react';
import { SignIn, SignUp } from "@clerk/nextjs";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen animate-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Valuto Branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-serif bg-gradient-to-r from-valuto-green-600 to-valuto-green-400 bg-clip-text text-transparent mb-2">
            Valuto
          </h1>
          <p className="text-gray-600 text-lg">
            {isSignUp 
              ? 'Start your financial education journey today!'
              : 'Welcome back! Sign in to continue your financial journey.'
            }
          </p>
        </div>

        {/* Auth Toggle */}
        <div className="flex bg-white/50 backdrop-blur-sm rounded-xl p-1 mb-6 border border-valuto-green-100">
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              !isSignUp 
                ? 'bg-white text-valuto-green-600 shadow-sm' 
                : 'text-gray-600 hover:text-valuto-green-600'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              isSignUp 
                ? 'bg-white text-valuto-green-600 shadow-sm' 
                : 'text-gray-600 hover:text-valuto-green-600'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Auth Form Container */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-valuto-green-100">
          {isSignUp ? (
            <SignUp
              routing="hash"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none",
                  headerTitle: "text-gray-900 font-bold text-2xl font-serif",
                  headerSubtitle: "text-gray-600",
                  socialButtonsBlockButton: "bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-semibold transition-all duration-200 hover:border-valuto-green-300",
                  socialButtonsBlockButtonText: "font-semibold",
                  formButtonPrimary: "bg-valuto-green-600 hover:bg-valuto-green-700 text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg",
                  formFieldInput: "border-gray-300 focus:border-valuto-green-500 focus:ring-valuto-green-500 transition-all duration-200",
                  footerActionLink: "text-valuto-green-600 hover:text-valuto-green-700 font-semibold transition-colors",
                  identityPreviewEditButton: "text-valuto-green-600 hover:text-valuto-green-700",
                  formFieldLabel: "text-gray-700 font-medium",
                  dividerLine: "bg-gray-200",
                  dividerText: "text-gray-500",
                  formFieldInputShowPasswordButton: "text-valuto-green-600 hover:text-valuto-green-700",
                  formFieldSuccessText: "text-valuto-green-600",
                  formFieldErrorText: "text-red-500",
                  formFieldWarningText: "text-yellow-600",
                  alertText: "text-red-500",
                  formHeaderTitle: "text-gray-900 font-bold text-xl font-serif",
                  formHeaderSubtitle: "text-gray-600",
                  footerActionText: "text-gray-600",
                  formResendCodeLink: "text-valuto-green-600 hover:text-valuto-green-700",
                  otpCodeFieldInput: "border-gray-300 focus:border-valuto-green-500 focus:ring-valuto-green-500",
                  formFieldHintText: "text-gray-500 text-sm",
                },
              }}
              redirectUrl="/onboarding"
            />
          ) : (
            <SignIn
              routing="hash"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none",
                  headerTitle: "text-gray-900 font-bold text-2xl font-serif",
                  headerSubtitle: "text-gray-600",
                  socialButtonsBlockButton: "bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-semibold transition-all duration-200 hover:border-valuto-green-300",
                  socialButtonsBlockButtonText: "font-semibold",
                  formButtonPrimary: "bg-valuto-green-600 hover:bg-valuto-green-700 text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg",
                  formFieldInput: "border-gray-300 focus:border-valuto-green-500 focus:ring-valuto-green-500 transition-all duration-200",
                  footerActionLink: "text-valuto-green-600 hover:text-valuto-green-700 font-semibold transition-colors",
                  identityPreviewEditButton: "text-valuto-green-600 hover:text-valuto-green-700",
                  formFieldLabel: "text-gray-700 font-medium",
                  dividerLine: "bg-gray-200",
                  dividerText: "text-gray-500",
                  formFieldInputShowPasswordButton: "text-valuto-green-600 hover:text-valuto-green-700",
                  formFieldSuccessText: "text-valuto-green-600",
                  formFieldErrorText: "text-red-500",
                  formFieldWarningText: "text-yellow-600",
                  alertText: "text-red-500",
                  formHeaderTitle: "text-gray-900 font-bold text-xl font-serif",
                  formHeaderSubtitle: "text-gray-600",
                  footerActionText: "text-gray-600",
                  formResendCodeLink: "text-valuto-green-600 hover:text-valuto-green-700",
                  otpCodeFieldInput: "border-gray-300 focus:border-valuto-green-500 focus:ring-valuto-green-500",
                  formFieldHintText: "text-gray-500 text-sm",
                },
              }}
              redirectUrl="/dashboard"
            />
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a 
            href="/" 
            className="text-gray-600 hover:text-valuto-green-600 font-medium transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}