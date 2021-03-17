import React from 'react'
import { Link } from 'gatsby'

const btnClassName =
  'inline-block px-4 py-2 text-xs font-semibold uppercase border-4 border-white sm:text-base bg-clip-padding duration-300 transition-all hover:bg-white hover:text-black hover:border-transparent'

export const CustomLink = ({ to, children }) => (
  <Link className={btnClassName} to={to}>
    {children}
  </Link>
)

export const CustomButton = props => (
  <button className={btnClassName} type={props.type} {...props}>
    {props.children}
  </button>
)
