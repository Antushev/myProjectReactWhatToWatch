import PropTypes from "prop-types";

const filmShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  posterImage: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired
};

const commentShape = {
  id: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  date: PropTypes.date
};

export {filmShape, commentShape};
