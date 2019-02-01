import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import PrevNext from '../components/PrevNext'
import Share from '../components/Share';
// import SEO from "../components/seo"

const BlogPostTemplate = ({  content, categories, tags, title, next, prev, socialConfig, yoastSeo, helmet }) => {
  return (
    <section className="section">
      {helmet || ''}      
      {/* <SEO title={`${title}`} meta={yoastSeo} /> */}
      {/* <Helmet>
        <title>{`${title}`}</title>
        <meta name="description" content={yoastSeo} />
      </Helmet> */}
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

  // const yoastSeo = post.yoast.metadesc;
  const metaTags = {
    metaDesc: post.yoast.metadesc || data.site.siteMetadata.description,
    twitterCreator: post.yoast.twitterCreator || data.site.siteMetadata.author,
    twitterTitle: post.yoast.twitter_title || post.title,
    twitterDesc: post.yoast.twitter_description || post.yoast.metadesc,
  }

  // console.log('metaTags::', metaTags);
  return (
    <Layout>
      <BlogPostTemplate
        content={post.content}
        // helmet={<Helmet><title>{`${post.title}`}</title><meta name="description" content={yoastSeo} /></Helmet>}
        // seo={<SEO title={`${post.title}`} meta={yoastSeo} /> }
        categories={post.categories}
        tags={post.tags}
        title={post.title}
        date={post.date}
        slug={post.slug}
        next={pageContext.next}
        prev={pageContext.prev}
        socialConfig={socialConfig}
        // yoastSeo={yoastSeo}
        helmet={
          <Helmet
            // htmlAttributes={{
            //   lang: metaTags.lang,
            // }}
            title={post.title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: `description`,
                content: metaTags.metaDesc,
              },
              {
                property: `og:title`,
                content: post.title,
              },
              {
                property: `og:description`,
                content: metaTags.metaDesc,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                // content: data.site.siteMetadata.author,
                content: metaTags.twitterCreator,
              },
              {
                name: `twitter:title`,
                content: metaTags.twitterTitle,
              },
              {
                name: `twitter:description`,
                content: metaTags.twitterDesc,
              },
            ]
            // .concat(
            //   keywords.length > 0
            //     ? {
            //         name: `keywords`,
            //         content: keywords.join(`, `),
            //       }
            //     : []
            // )
            // .concat(meta)
            }
          /> 
        }
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
  // yoastSeo: PropTypes.string,
  metaTags: PropTypes.shape({
    metaDesc: PropTypes.string,
    twitterCreator: PropTypes.string,
    twitterTitle: PropTypes.string,
    twitterDesc: PropTypes.string,
  }),
}

BlogPost.defaultProps = {
  pageContext: PropTypes.shape({
    next: null,
    prev: null,
  }),
  socialConfig: null,
  // yoastSeo: null
  // metaTags: PropTypes.shape({
  //   lang: `en`,
  //   meta: [],
  // }),
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
        author
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
      yoast {
        focuskw
        title
        metadesc
        linkdex
        metakeywords
        meta_robots_noindex
        meta_robots_nofollow
        meta_robots_adv
        canonical
        redirect
        opengraph_title
        opengraph_description
        opengraph_image
        twitter_title
        twitter_description
        twitter_image    
      }
    }
  }
`
