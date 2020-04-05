import React from "react"
// import { Link } from "gatsby"

import BlogPage from "../../components/blog-page"
// import SEO from "../../components/seo"

const BlogHome = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <h5><a href={ edge.node.frontmatter.path }>{ edge.node.frontmatter.title }</a> <small>{ edge.node.frontmatter.date }</small></h5>)

  return (
    <BlogPage>
      <div class="post-list">
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