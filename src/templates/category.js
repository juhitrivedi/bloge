import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allWordpressPost.edges
    const postLinks = posts.map(post => (
      <li key={post.node.slug}>
        <Link to={post.node.slug}>{post.node.title}</Link>
      </li>
    ))
    const tag = this.props.pageContext.name
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allWordpressPost.totalCount
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } in the “${tag}” category`

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag} | ${title}`} />
          <div className="container content">
            <div className="columns">
              <div
                className="column is-10 is-offset-1"
                style={{ marginBottom: '6rem' }}
              >
                <h3 className="title is-size-4 is-bold-light">{tagHeader}</h3>
                <ul className="categorylist">{postLinks}</ul>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const pageQuery = graphql`
  query CategoryPage($slug: String) {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost(filter: { categories: { elemMatch: { slug: { eq: $slug } } } }) {
      totalCount
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
`
