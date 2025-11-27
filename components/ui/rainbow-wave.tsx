"use client"

export function RainbowWave({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 80" className={`w-full ${className}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="20%" stopColor="#fb923c" />
          <stop offset="40%" stopColor="#facc15" />
          <stop offset="60%" stopColor="#34d399" />
          <stop offset="80%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <path d="M0,40 Q50,10 100,40 T200,40 T300,40 T400,40 V80 H0 Z" fill="url(#rainbow)" opacity="0.6" />
      <path d="M0,50 Q50,20 100,50 T200,50 T300,50 T400,50 V80 H0 Z" fill="url(#rainbow)" opacity="0.4" />
    </svg>
  )
}
