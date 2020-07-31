import React from 'react';
import PropTypes from 'prop-types';

const ShowMore = (props) => {
  const {handleShowMoreClick} = props;

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={handleShowMoreClick}
      >
        Show more
      </button>
    </div>
  );
};

ShowMore.propTypes = {
  handleShowMoreClick: PropTypes.func.isRequired
};

export default ShowMore;
