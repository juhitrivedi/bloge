import React from "react";
import PropTypes from "prop-types";
import { InstantSearch, SearchBox, Hits, Stats, Pagination } from "react-instantsearch-dom";

import Hit from "./Hit";

const Search = props => {
  const { algolia } = props;
  return (
    <React.Fragment>
      <div className="search">
        {algolia &&
          algolia.appId && (
            <InstantSearch
              appId={algolia.appId}
              apiKey={algolia.searchOnlyApiKey}
              indexName={algolia.indexName}
            >
              <SearchBox translations={{ placeholder: "Search" }} />
              <Stats />
              <Hits hitComponent={Hit} />
              <Pagination />
            </InstantSearch>
          )}
      </div>


    </React.Fragment>
  );
};

Search.propTypes = {
  algolia: PropTypes.object.isRequired,
};

export default Search;
