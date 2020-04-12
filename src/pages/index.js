import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>janmr.com</h1>

    <p>This is the website of Jan Marthedal Rasmussen.</p>

    <p>Some online profiles:
      {' '}<a href="https://www.facebook.com/jan.marthedal" rel="me">Facebook</a>,
      {' '}<a href="https://github.com/janmarthedal" rel="me">GitHub</a>,
      {' '}<a href="https://www.linkedin.com/in/janmr" rel="me">LinkedIn</a>,
      {' '}<a href="https://twitter.com/janmarthedal" rel="me">Twitter</a>.</p>

    <p><Link to="/blog/">A blog</Link> on mathematics and computer programming.</p>

  </Layout>
)

export default IndexPage
