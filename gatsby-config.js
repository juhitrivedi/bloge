require('dotenv').config()
// const transformer = require("./src/utils/algolia");
const queries = require('./src/utils/algolia')

// const query = `{
//   allWordpressWpSearch {
//     edges {
//       node {
//         id
//         title
//         url
//         type
//         subtype
//       }
//     }
//   }
// }`;
// const queries = [
//   {
//     query,
//     transformer: ({ data }) => data.allWordpressWpSearch.edges.map(({ node }) => node)
//     // transformer: ({ data }) => {
//     //   return data.allWordpressPost.edges.reduce(transformer, []);
//     // }
//   }
// ];


module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,    
		twitterHandle: '@abc',
		url: 'http://localhost:8000',
		siteUrl: 'http://localhost:8000',
    socials: {
			facebook: 'https://www.facebook.com/abc',
			twitter: 'https://twitter.com/abc',
			github: 'https://github.com/abc',
			linkedin: 'https://www.linkedin.com/in/abc',
		},
    algolia: {
      appId: process.env.ALGOLIA_APP_ID ? process.env.ALGOLIA_APP_ID : "7DU06AB3YA",
      searchOnlyApiKey: process.env.ALGOLIA_SEARCH_ONLY_API_KEY
        ? process.env.ALGOLIA_SEARCH_ONLY_API_KEY
        : "2821c48fe485dc3579525942cc14b7e6",
      indexName: process.env.ALGOLIA_INDEX_NAME ? process.env.ALGOLIA_INDEX_NAME : "wp_searchable_posts"
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base url to your WP site.
        baseUrl: 'gatsbywp.dev1.in',
        // WP.com sites set to true, WP.org set to false
        hostingWPCOM: false,
        // The protocol. This can be http or https.
        protocol: 'http',
        // Use 'Advanced Custom Fields' Wordpress plugin
        useACF: true,
        auth: {},
        // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: false,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID ? process.env.ALGOLIA_APP_ID : "7DU06AB3YA",
        apiKey: process.env.ALGOLIA_ADMIN_API_KEY ? process.env.ALGOLIA_ADMIN_API_KEY : "c3d5f3e56a36fc1594d41459c817925b",
        indexName: process.env.ALGOLIA_INDEX_NAME ? process.env.ALGOLIA_INDEX_NAME : "wp_searchable_posts",
        queries,
        chunkSize: 10000 // default: 1000
      }
    },
  ],
}
