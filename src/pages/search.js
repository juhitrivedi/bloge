import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import Search from '../components/Search/index';
import Layout from '../components/layout';
import AlgoliaSearch from '../images/search-by-algolia.png'
require("core-js/fn/array/find");

const SearchPage = props => {
  const {
    data: {
      site: {
        siteMetadata: { algolia }
      }
    }
  } = props;

  return (
    <Layout>
      <div className="algoliaSearch">
        <img src={AlgoliaSearch} alt="Algolia Logo" />
      </div>
      <Search algolia={algolia} />       
    </Layout>
  );
};

SearchPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default SearchPage;


export const query = graphql`
  query SearchQuery {
    site {
      siteMetadata {
        algolia {
          appId
          searchOnlyApiKey
          indexName
        }
      }
    }
  }
`;
