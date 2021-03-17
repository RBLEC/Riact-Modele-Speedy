import React from 'react';
import PropTypes from 'prop-types';

function Currency({ name }) {
  return (
    <li className="currency">{name}</li>
  );
}

Currency.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Currency;
