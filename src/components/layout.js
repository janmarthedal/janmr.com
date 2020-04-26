import React from "react"
import PropTypes from "prop-types"

import "./normalize.css"
import "./extra.less"
import "katex/dist/katex.min.css"

const Layout = ({ children }) => {
  return (
    <main>{children}</main>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
