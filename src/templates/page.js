import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Helmet from 'react-helmet'

export const PageTemplate = ({ title, content, helmet, yoastSeo }) => {
  // console.log(helmet);
  return (
    <section className="section section--gradient">    
    {helmet || ''}     
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
}

const Page = ({ data }) => {
  const { wordpressPage: page,
		site: {
			siteMetadata: { url, twitterHandle, title },
    }, 
  } = data
  const metaTags = {
    metaDesc: page.yoast.metadesc || data.site.siteMetadata.description,
    twitterCreator: page.yoast.twitterCreator || data.site.siteMetadata.author,
    twitterTitle: page.yoast.twitter_title || page.title,
    twitterDesc: page.yoast.twitter_description || page.yoast.metadesc,
  }

  return (
    <Layout>
      <PageTemplate 
        title={page.title} 
        content={page.content} 
        helmet={
          <Helmet
            // htmlAttributes={{
            //   lang: metaTags.lang,
            // }}
            title={page.title}
            meta={[
              {
                name: `description`,
                content: metaTags.metaDesc,
              },
              {
                property: `og:title`,
                content: page.title,
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
          /> }
      />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
  // yoastSeo: PropTypes.string,
  metaTags: PropTypes.shape({
    metaDesc: PropTypes.string,
    twitterCreator: PropTypes.string,
    twitterTitle: PropTypes.string,
    twitterDesc: PropTypes.string,
  }),
}

export default Page

export const pageQuery = graphql`
  query PageById($id: String!) {
    site {
			siteMetadata {
        url
        twitterHandle
        author
			}
		}
    wordpressPage(id: { eq: $id }) {
      title
      content
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
