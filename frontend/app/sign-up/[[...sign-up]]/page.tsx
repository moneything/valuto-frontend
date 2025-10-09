"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-valuto-green-50 via-white to-valuto-green-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Valuto Branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-serif bg-gradient-to-r from-valuto-green-600 to-valuto-green-400 bg-clip-text text-transparent mb-2">
            Valuto
          </h1>
          <p className="text-gray-600 text-lg">
            Start your financial education journey today!
          </p>
        </div>

        {/* Clerk Sign Up Component */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-valuto-green-100">
          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none",
                headerTitle: "text-gray-900 font-bold text-2xl font-serif",
                headerSubtitle: "text-gray-600",
                socialButtonsBlockButton: "bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-semibold",
                socialButtonsBlockButtonText: "font-semibold",
                formButtonPrimary: "bg-valuto-green-600 hover:bg-valuto-green-700 text-white font-semibold",
                formFieldInput: "border-gray-300 focus:border-valuto-green-500 focus:ring-valuto-green-500",
                footerActionLink: "text-valuto-green-600 hover:text-valuto-green-700 font-semibold",
                identityPreviewEditButton: "text-valuto-green-600 hover:text-valuto-green-700",
                formFieldLabel: "text-gray-700 font-medium",
                dividerLine: "bg-gray-200",
                dividerText: "text-gray-500",
              },
            }}
            redirectUrl="/onboarding"
            signInUrl="/sign-in"
          />
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


