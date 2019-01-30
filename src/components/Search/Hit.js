import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const Hit = props => {
  const { hit } = props;
  const getSlug = hit.permalink.split('/');
  return (
    <React.Fragment>
      <Link to={getSlug[3]}>{ hit.post_title} </Link> 
    </React.Fragment>  
  );
};

Hit.propTypes = {
  hit: PropTypes.object.isRequired
};

export default Hit;
