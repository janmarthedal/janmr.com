const path = require(`path`)

// begin hack to serve html pages from static folder
// https://github.com/gatsbyjs/gatsby/issues/17761#issuecomment-533816520
const express= require('express');
exports.onCreateDevServer=({app})=>{
    app.use(express.static('public'))
}
// end hack

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blog-template.js`)
  const tagTemplate = path.resolve('src/templates/tags.js')

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              title
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 1000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.postsRemark.edges;

  // Create post detail pages
  posts.forEach(({ node }, index) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        prev: index > 0 ? posts[index - 1].node : null,
        next: index + 1 < posts.length ? posts[index + 1].node : null
      },
    })
  })

  // Extract tag data from query
  const tags = result.data.tagsGroup.group

  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/blog/tags/${tag.fieldValue}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}
