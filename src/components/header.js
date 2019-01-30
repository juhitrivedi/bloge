import { Link, StaticQuery } from 'gatsby'
import React from 'react'
import Logo from '../images/logo.png'
import MainMenu from './MainMenu'

const Header = () => (
  <StaticQuery
    query={graphql`
      query pagesMenuQuery {
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
        allWordpressWpApiMenusMenusItems {
          edges {
            node {
              id
              name
              items {
                wordpress_id
                title
                url
                object_slug
                type
                wordpress_children {
                  title
                  url
                  object_slug
                  type
                  wordpress_children {
                    title
                    url
                    object_slug
                    type
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <header className="header">
        <div className="container">
          <div className="siteLogo">
            <h1 style={{ margin: 0 }}>
              <Link to="/" style={{ color: `white`, textDecoration: `none` }}>
                {' '}
                <img src={Logo} alt="Site Logo" />{' '}
              </Link>
            </h1>
          </div>
          <div className="menulist">
            <MainMenu menu={data.allWordpressWpApiMenusMenusItems} />
              {/* <li><Link to="/">Home</Link></li>
        <li>
          Pages 
          <ul>
          {data.allWordpressPage.edges.map(({ node }) => (
            <li key={Math.random()}>
              <Link to={node.slug}> {node.title} </Link>
            </li>
          ))}          
          </ul>
        </li>
        <li><Link to="/">Contact</Link></li> */}
          </div>
          <div className="socialShare" />
        </div>
      </header>
    )}
  />
)

export default Header
