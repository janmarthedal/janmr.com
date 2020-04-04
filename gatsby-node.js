const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blog-template.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
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
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allMarkdownRemark.edges;
  
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
}
