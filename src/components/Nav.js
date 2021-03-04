import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'

const Nav = ({ data }) => {
  const {
    nav: { nodes: navLinks },
  } = useStaticQuery(graphql`
    query NavQuery {
      nav: allNavJson {
        nodes {
          text
          to
          key
        }
      }
    }
  `)
  return (
    <nav className="hidden lg:flex lg:flex-wrap lg:items-center">
      <ul className="flex flex-wrap items-center justify-end font-bold text-white gap-6">
        {navLinks
          ? navLinks.map(link => (
              <Link
                className="text-lg hover:opacity-50 transition-opacity"
                to={link.to}
                key={link.key}
              >
                {link.text}
              </Link>
            ))
          : null}
      </ul>
    </nav>
  )
}

export default Nav
