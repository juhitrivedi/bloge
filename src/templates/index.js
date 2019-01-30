import React from 'react'
import { Link, graphql } from 'gatsby'

import PropTypes from 'prop-types'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default class IndexPage extends React.Component {
  render() {

    const { data } = this.props
    const { edges: posts } = data.allWordpressPost

    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()


    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        {posts.map(({ node: post }) => (
          <div className="content" key={post.id} >
            <h3 className="entry-title">
              <Link className="has-text-primary" to={post.slug}>
                {post.title}
              </Link>
            </h3>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.replace(/<p class="link-more.*/, ''),
                }}
              />
              <Link className="button continue-read" to={post.slug}>
                Continue Reading <span className="continue_reading_dots"><span className="continue_reading_squares"><span /><span /><span /><span /></span></span>
              </Link>
            </div>
          </div>
        ))}
        <br/>
        <br/>

        <ul className="main-pagination">
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              ← Previous Page
            </Link>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <li
              key={`pagination-number${i + 1}`}
              style={{
                margin: 0,
              }}
            >
              <Link
                to={`/${i === 0 ? '' : i + 1}`}
                style={{ textDecoration: 'none', color: i + 1 === currentPage ? '#ffffff' : '#000', background: i + 1 === currentPage ? '#f87000' : '', padding: "5px 15px", }} >
                {i + 1}
              </Link>
            </li>
          ))}
          {!isLast && (
            <Link to={nextPage} rel="next">
              Next Page →
            </Link>
          )}
        </ul>

      </Layout>
    )
  }
}


IndexPage.propTypes = {
  data: PropTypes.shape({
    allWordpressPost: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

// export default IndexPage

export const pageQuery = graphql`
  query IndedxQuery($limit: Int, $skip: Int) {
    allWordpressPost(
      limit: $limit, 
      skip: $skip, 
      filter: {slug: {ne: "data-schema"}},
      sort: { fields: date, order: ASC }
    ) {
        edges {
          node {
            id
            title
            excerpt
            author {
              name
            }
            date(formatString: "MMMM DD, YYYY")
            slug
          }
        }
      }
    }
`
