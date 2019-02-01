import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Helmet from 'react-helmet'

export const PageTemplate = ({ title, content, helmet, yoastSeo }) => {
  return (
    <section className="section section--gradient">    
    {helmet || ''}     
    {/* <Helmet>
      <title>{`${title}`}</title>
      <meta name="description" content={yoastSeo} />
    </Helmet> */}
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
  const { wordpressPage: page } = data
  const yoastSeo = page.yoast.metadesc

  console.log('yoastSeo:: ', yoastSeo)
  return (
    <Layout>
      <PageTemplate 
        title={page.title} 
        content={page.content} 
        helmet={<Helmet><title>{`${page.title}`}</title><meta name="description" content={yoastSeo} /></Helmet>} 
      />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
  yoastSeo: PropTypes.string,
}

export default Page

export const pageQuery = graphql`
  query PageById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      yoast {
        focuskw
        title
        metadesc
        linkdex        
      }
    }
  }
`
