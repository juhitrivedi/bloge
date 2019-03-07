import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        allWordpressPage {
          edges {
            node {
              id
              title
              excerpt
              slug
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} menu={data} />
        <div className="container">
          {children}
          <footer>
            © {new Date().getFullYear()}, Built with{' '}
            <b>
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </b>
          </footer>
        </div>
      </>
    )}
  />
)

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// }

export default Layout
