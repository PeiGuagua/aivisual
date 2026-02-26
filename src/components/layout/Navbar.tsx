"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold text-white">
          AI<span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Visual</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/viz/perceptron" className="text-sm text-gray-400 transition hover:text-white">
            Explore
          </Link>
          <Link href="/#pricing" className="text-sm text-gray-400 transition hover:text-white">
            Pricing
          </Link>
          <Link href="/dashboard" className="text-sm text-gray-400 transition hover:text-white">
            Dashboard
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/5"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Get Started
          </Link>
        </div>

        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0a0a0a] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/viz/perceptron" className="text-sm text-gray-400" onClick={() => setMobileOpen(false)}>Explore</Link>
            <Link href="/#pricing" className="text-sm text-gray-400" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <Link href="/dashboard" className="text-sm text-gray-400" onClick={() => setMobileOpen(false)}>Dashboard</Link>
            <Link href="/login" className="text-sm text-gray-400" onClick={() => setMobileOpen(false)}>Sign In</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
