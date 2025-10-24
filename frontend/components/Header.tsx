"use client";

import { useState } from "react";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 pt-4 px-4">
      <nav className="mx-auto max-w-7xl bg-white/90 backdrop-blur-md shadow-lg rounded-full px-6 sm:px-8 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold font-serif bg-gradient-to-r from-valuto-green-600 to-valuto-green-400 bg-clip-text text-transparent">Valuto</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
            <a href="#about" className="text-gray-700 hover:text-valuto-green-600 font-medium transition-colors text-sm lg:text-base">
              About
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-valuto-green-600 font-medium transition-colors text-sm lg:text-base">
              How It Works
            </a>
            <a href="#impact" className="text-gray-700 hover:text-valuto-green-600 font-medium transition-colors text-sm lg:text-base">
              Impact
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-valuto-green-600 font-medium transition-colors text-sm lg:text-base">
              Pricing
            </a>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
          <SignedOut>
            <a href="/auth">
              <button className="bg-valuto-green-600 hover:bg-valuto-green-700 text-white font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg text-sm flex items-center gap-2">
                Launch App
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </a>
          </SignedOut>
          
            <SignedIn>
              <a href="/dashboard" className="hidden sm:block text-valuto-green-600 hover:text-valuto-green-700 font-semibold transition-colors text-sm mr-3">
                Dashboard
              </a>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9"
                  }
                }}
              />
            </SignedIn>
              
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-3">
              <a href="#about" className="text-gray-700 hover:text-valuto-green-600 font-medium text-sm">
                About
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-valuto-green-600 font-medium text-sm">
                How It Works
              </a>
              <a href="#impact" className="text-gray-700 hover:text-valuto-green-600 font-medium text-sm">
                Impact
              </a>
                <a href="#pricing" className="text-gray-700 hover:text-valuto-green-600 font-medium text-sm">
                  Pricing
                </a>
                <SignedOut>
                  <a href="/auth" className="text-valuto-green-600 font-semibold text-sm text-left sm:hidden">
                    Launch App →
                  </a>
                </SignedOut>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

