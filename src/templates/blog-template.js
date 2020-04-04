import React from "react"
import { graphql } from "gatsby"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <main>
      <h1><a href="/blog/">janmr blog</a></h1>
      <div className="content">
        <div className="main">
          <h2>
            { frontmatter.title }<br/>
            <small><time datetime={ frontmatter.isoDate }>{ frontmatter.date }</time></small>
          </h2>
          <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </main>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        isoDate: date(formatString: "YYYY-MM-DD")
        path
        title
      }
    }
  }
`