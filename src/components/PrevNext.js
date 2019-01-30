import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'


const PrevNext = ({ next, prev }) => (
  <div className="nextprev">
    {prev && (
      <span className="prevlink">
        <span>Previous</span>
        <Link to={prev.slug}>{prev.title}</Link>
      </span>
    )}

    {next && (
      <span className="nextlink">
        <span>Next</span>
        <Link to={next.slug}>{next.title}</Link>
      </span>
    )}
  </div>
)

export default PrevNext

PrevNext.propTypes = {
  next: PropTypes.object,
  prev: PropTypes.object,
}

PrevNext.defaultProps = {
  next: null,
  prev: null,
}
