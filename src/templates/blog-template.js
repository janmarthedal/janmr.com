import React from "react"
import { graphql } from "gatsby"

import BlogPage from "../components/blog-page"

export default function Template({
  data, // this prop will be injected by the GraphQL query below
  pageContext
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const { prev, next } = pageContext
  return (
    <BlogPage>
      <h2>
        { frontmatter.title }<br/>
        <small><time datetime={ frontmatter.isoDate }>{ frontmatter.date }</time></small>
      </h2>
      <div className="post-tags">
        { frontmatter.tags.map(tag => <a className="label" href={ `/blog/tags/${tag}` }>{ tag }</a>) }
      </div>
      <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
      <div className="page-navigation">
        <div className="prev-post">
          { prev && <a href={ prev.frontmatter.path } title={ "Previous post: " + prev.frontmatter.title }>&laquo; { prev.frontmatter.title }</a> }
        </div>
        <div className="next-post">
          { next && <a href={ next.frontmatter.path } title={ "Next post: " + next.frontmatter.title }>{ next.frontmatter.title } &raquo;</a> }
        </div>
      </div>
      <div id="disqus_thread"></div>
    </BlogPage>
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
        tags
      }
    }
  }
`