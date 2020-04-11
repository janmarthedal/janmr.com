import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <li key={ edge.node.id }>
      <Link to={ edge.node.frontmatter.path }>{ edge.node.frontmatter.title }</Link> <small>{ edge.node.frontmatter.date }</small>
    </li>)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>janmr.com</h1>

      <p>My name is Jan Marthedal Rasmussen and this is my home on the web.</p>

      <p>You can find me on the web in numerous places, some of which are:</p>

      <ul>
          <li><a href="https://www.facebook.com/jan.marthedal" rel="me">Facebook</a></li>
          <li><a href="https://github.com/janmarthedal" rel="me">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/janmr" rel="me">LinkedIn</a></li>
          <li><a href="https://twitter.com/janmarthedal" rel="me">Twitter</a></li>
      </ul>

      <p>Once in a while, I sit down and write a new post for <Link to="/blog/">my blog</Link>. The latest posts are:</p>

      <ul className="post-list">
        { Posts }
      </ul>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 5
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`