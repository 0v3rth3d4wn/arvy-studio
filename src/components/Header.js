import React from 'react'
import { Hamburger } from './Hamburger'
import { Logo } from './Logo'
import Nav from './Nav'

const Header = () => (
  <header className="fixed z-30 flex flex-wrap items-center justify-between w-full p-4 lg:p-6 from-black-transparent bg-gradient-to-l">
    <Logo />
    <Nav />
    <Hamburger />
  </header>
)

export default Header
