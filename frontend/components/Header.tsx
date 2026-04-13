"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Features", href: "/#features" },
  { label: "Next-level features", href: "/#next-level-features" },
  { label: "Why we exist", href: "/#why-we-exist" },
  { label: "What people say", href: "/#what-people-say" },
  { label: "Simple pricing", href: "/#simple-pricing" },
  { label: "FAQs", href: "/#faqs" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    const setHash = () => setActiveHash(window.location.hash || "#home");
    setHash();
    window.addEventListener("hashchange", setHash);
    return () => window.removeEventListener("hashchange", setHash);
  }, []);

  return (
    <header className="fixed top-0 z-50 min-w-[-webkit-fill-available] backdrop-blur-md">
      <nav className="px-10 mx-auto backdrop-blur-md bg-hero/90 shadow-lg">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <Image src="/valuto-logo.png" alt="Valuto Logo" width={40} height={40} />
              <span className="text-2xl font-bold font-serif bg-gradient-to-r from-valuto-green-600 to-valuto-green-400 bg-clip-text text-transparent flex items-end h-[-webkit-fill-available]">aluto</span>
            </a>
          </div>

       

          {/* Desktop Navigation */}
          <div className="hidden xl:flex xl:items-center lg:space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors lg:text-base ${
                  activeHash === link.href
                    ? "text-primary"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
          <SignedOut>
            <a href="/auth" className="hidden md:block">
              <button className="bg-white hover:bg-gray-700 hover:text-white hover:border-green-500 hover:border text-valuto-green-500 font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm flex items-center gap-2">
                Start for £1/month
              </button>
            </a>
          </SignedOut>
          
            <SignedIn>
              <a href="/dashboard" className="hidden sm:block">
                <button className="bg-valuto-green-600 hover:bg-valuto-green-700 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm flex items-center gap-2">
                  Go to Valuto
                </button>
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
              className="xl:hidden text-white pl-4"
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
          <div className="xl:hidden py-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActiveHash(link.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-base font-medium ${
                    activeHash === link.href ? "text-primary" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <SignedOut>
                <a href="/auth">
                  <button className="md:hidden bg-white hover:bg-gray-700 hover:text-white hover:border-green-500 hover:border text-valuto-green-500 font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm flex items-center gap-2">
                    Start for £1/month
                  </button>
                </a>
              </SignedOut>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
