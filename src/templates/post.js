import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import PrevNext from '../components/PrevNext'
import Share from '../components/Share';

const BlogPostTemplate = ({  content, categories, tags, title, next, prev, socialConfig }) => {
  return (
    <section className="section">
      {/* {helmet || ''} */}
      <div className="container content inner-content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />

            {socialConfig !== null ? (
              <div className="post-meta__share">
                <h4 className="title">Share:</h4>
                <div className="post-meta__share-buttons">
                  <Share socialConfig={socialConfig} tags={tags} />
                </div>
              </div>
            ) : null}

            </div>
            <div className="sidebar">
              {categories && categories.length ? (
                <div className="categorybox side-widget">
                  <h4>Categories</h4>
                  <ul className="taglist">
                    {categories.map(category => (
                      <li key={`${category}cat`}>
                        <Link to={`/categories/${category.slug}/`}>
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {tags && tags.length ? (
                <div className="tagbox side-widget">
                  <h4>Tags</h4>
                  <ul className="taglist">
                    {tags.map(tag => (
                      <li key={`${tag}tag`}>
                        <Link to={`/tags/${tag.slug}/`}>{tag.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
          </div>

   
            
            <PrevNext next={next} prev={prev} />
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
}


const BlogPost = ({ data, pageContext }) => {
  const { 
    wordpressPost: post, 
		site: {
			siteMetadata: { url, twitterHandle },
    },
  } = data

  const socialConfig = {
		config: {
        url: `${url}/${post.slug}`,
        identifier: post.slug,
        title: post.title,
        tags: post.tags,
		},
		twitterHandle,
  };

  console.log('socialConfig:: ', socialConfig)

  return (
    <Layout>
      <BlogPostTemplate
        content={post.content}
        helmet={<Helmet title={`${post.title} | Blog`} />}
        categories={post.categories}
        tags={post.tags}
        title={post.title}
        date={post.date}
        slug={post.slug}
        next={pageContext.next}
        prev={pageContext.prev}
        socialConfig={socialConfig}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
    pageContext: PropTypes.shape({
      next: PropTypes.object,
      prev: PropTypes.object,
    }),
  }),
  socialConfig: PropTypes.shape({
		shortname: PropTypes.string.isRequired,
		config: PropTypes.string.isRequired,
	}),
	tags: PropTypes.arrayOf(PropTypes.string),
}

BlogPost.defaultProps = {
  pageContext: PropTypes.shape({
    next: null,
    prev: null,
  }),
	socialConfig: null,
}


export default BlogPost

export const pageQuery = graphql`
  fragment PostFields on wordpress__POST {
    id
    slug
    content
    date(formatString: "MMMM DD, YYYY")
    title
  }
  query BlogPostByID($id: String) {
    site {
			siteMetadata {
        url
				twitterHandle
			}
		}
    wordpressPost(id: {eq: $id}) {
      id
      title
      content
      slug
      date(formatString: "MMMM DD, YYYY")
      categories {
        name
        slug
      }
      tags {
        name
        slug
      }
    }
  }
`
