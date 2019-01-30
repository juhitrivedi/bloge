const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            slug
            status
            template
          }
        }
      }
    }
  `)
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const pageTemplate = path.resolve(`./src/templates/page.js`)

      _.each(result.data.allWordpressPage.edges, edge => {
        createPage({
          path: `/${edge.node.slug}/`,
          component: pageTemplate,
          context: {
            id: edge.node.id,
          },
        })
      })
    })
    .then(() => {
      return graphql(`
        {
          allWordpressPost {
            edges {
              node {
                id
                slug
                modified
                title
                tags {
                  name
                  slug
                }
                categories {
                  name
                  slug
                }
              }
              next {
                id
                slug  
                title
              }
              previous {
                id
                slug    
                title
              }
            }
          }
        }
      `)
    })
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const postTemplate = path.resolve(`./src/templates/post.js`)

      
    const posts = result.data.allWordpressPost.edges


      // Build a list of categories and tags
      const categories = []
      const tags = []

      // Iterate over the array of posts
      _.each(posts, (edge, index) => {
        // Add this post's categories and tags to the global list
        _.each(edge.node.tags, tag => {
          tags.push(tag)
        })
        _.each(edge.node.categories, category => {
          categories.push(category)
        })

    
      const next = index === 0 ? null : posts[index - 1].node
      const prev = index === posts.length - 1 ? null : posts[index + 1].node
      
        // Create the Gatsby page for this WordPress post
        createPage({
          path: `/${edge.node.slug}/`,
          component: postTemplate,
          context: {
            id: edge.node.id,
            prev,
            next
          },
        })


        
    // Create blog post list pages
    const postsPerPage = 7;
    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: path.resolve('./src/templates/index.js'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        },
      });
    });


      })

      const tagsTemplate = path.resolve(`./src/templates/tag.js`)
      const categoriesTemplate = path.resolve(`./src/templates/category.js`)

      // Create a unique list of categories and tags
      const uniqueCategories = _.uniqBy(categories, 'slug')
      const uniqueTags = _.uniqBy(tags, 'slug')

      // For each category and tag, create a Gatsby page
      _.each(uniqueCategories, cat => {
        createPage({
          path: `/categories/${cat.slug}/`,
          component: categoriesTemplate,
          context: {
            name: cat.name,
            slug: cat.slug,
          },
        })
      })
      _.each(uniqueTags, tag => {
        createPage({
          path: `/tags/${tag.slug}/`,
          component: tagsTemplate,
          context: {
            name: tag.name,
            slug: tag.slug,
          },
        })
      })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
