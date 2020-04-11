import React from "react"
import { graphql, Link } from "gatsby"

import BlogPage from "../components/blog-page"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges } = data.allMarkdownRemark

  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <h5 key={ edge.node.id }>
      <Link to={ edge.node.frontmatter.path }>{ edge.node.frontmatter.title }</Link> <small>{ edge.node.frontmatter.date }</small>
    </h5>)

  return (
    <BlogPage>
      <h2>Posts tagged <em>{ tag }</em></h2>
      <div className="post-list">
        { Posts }
      </div>
     </BlogPage>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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