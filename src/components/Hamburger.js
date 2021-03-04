import React from 'react'

export const Hamburger = () => (
  <button
    type="button"
    className="w-8 h-8 text-white btn-toggle-nav transition-colors lg:hidden"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
)
