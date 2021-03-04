import React from 'react'
import { Link } from 'gatsby'

export const CustomLink = ({ to, children }) => (
  <Link
    className="inline-block px-4 py-2 text-xs font-semibold uppercase border-4 border-white sm:text-base bg-clip-padding duration-300 transition-all hover:bg-white hover:text-black hover:border-transparent"
    to={to}
  >
    {children}
  </Link>
)
