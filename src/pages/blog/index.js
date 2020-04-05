import React from "react"
import { graphql, Link } from "gatsby"

import BlogPage from "../../components/blog-page"
// import SEO from "../../components/seo"

const BlogHome = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <h5 key={ edge.node.id }>
      <Link to={ edge.node.frontmatter.path }>{ edge.node.frontmatter.title }</Link> <small>{ edge.node.frontmatter.date }</small>
    </h5>)

  return (
    <BlogPage>
      <div className="post-list">
        { Posts }
      </div>
    </BlogPage>
  )
}

export default BlogHome

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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