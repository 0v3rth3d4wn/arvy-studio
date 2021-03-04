import React from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
)

export default Layout
