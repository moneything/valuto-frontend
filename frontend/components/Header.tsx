"use client";

import { useState } from "react";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 pt-4 px-4">
      <nav className="mx-auto max-w-7xl backdrop-blur-md bg-black rounded-2xl px-6 border-border border-2">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              {/* <Image src="favicon.svg" alt="Valuto Logo" width={40} height={40} /> */}
              <span
                style={{fontFamily: "Orbitron, sans-serif"}} 
                className="text-gradient-primary flex items-end font-display text-4xl font-black uppercase mt-1"
                >
                  VALUTO
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
            <a href="#about" style={{fontFamily: "Orbitron, sans-serif"}} className="text-white hover:text-valuto-green-600 font-medium transition-colors text-sm lg:text-base">
              About
            </a>
            <a href="#how-it-works" style={{fontFamily: "Orbitron, sans-serif"}} className="text-white hover:text-valuto-green-600 font-medium transition-colors text-sm lg:text-base">
              How It Works
            </a>
            <a href="#impact" style={{fontFamily: "Orbitron, sans-serif"}} className="text-white hover:text-valuto-green-600 font-medium transition-colors text-sm lg:text-base">
              Impact
            </a>
            <a href="#pricing" style={{fontFamily: "Orbitron, sans-serif"}} className="text-white hover:text-valuto-green-600 font-medium transition-colors text-sm lg:text-base">
              Pricing
            </a>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
          <SignedOut>
            <a href="/auth">
              <button className="text-lg bg-valuto-green-600 hover:bg-valuto-green-700 text-white font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                Launch App
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </a>
          </SignedOut>
          
            <SignedIn>
              <a href="/dashboard" style={{fontFamily: "Orbitron, sans-serif"}} className="hidden sm:block text-valuto-green-600 hover:text-valuto-green-700 font-semibold transition-colors text-lg mr-3">
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
              <a href="#about" style={{fontFamily: "Orbitron, sans-serif"}} className="text-white hover:text-valuto-green-600 font-medium transition-colors text-sm lg:text-base">
                About
              </a>
              <a href="#how-it-works" style={{fontFamily: "Orbitron, sans-serif"}} className="text-white hover:text-valuto-green-600 font-medium transition-colors text-sm lg:text-base">
                How It Works
              </a>
              <a href="#impact" style={{fontFamily: "Orbitron, sans-serif"}} className="text-white hover:text-valuto-green-600 font-medium transition-colors text-sm lg:text-base">
                Impact
              </a>
              <a href="#pricing" style={{fontFamily: "Orbitron, sans-serif"}} className="text-white hover:text-valuto-green-600 font-medium transition-colors text-sm lg:text-base">
                Pricing
              </a>

                <SignedOut>
                  <a href="/auth" className="text-lg bg-valuto-green-600 hover:bg-valuto-green-700 text-white font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
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

