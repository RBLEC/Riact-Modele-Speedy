import React from 'react';
import PropTypes from 'prop-types';
import Currency from './Currency';

import './style.scss';

function Currencies({ currencies }) {
  // on va faire un tableau d'élément JSX pour les devises
  const currenciesList = currencies.map((currency) => {
    return < Currency key={currency.name} name={currency.name} />;
  });

  return (
    <div className="currencies">
      <p className="currencies__title">Currencies</p>
      <ul className="currencies__list">
        {currenciesList}
      </ul>
    </div>
  );
}

Currencies.propTypes = {
  // strict minimum de la validation de tableau
  // currencies: PropTypes.array.isRequired,
  // un peu mieux
  // currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  // le top
  currencies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    rate: PropTypes.number,
  })).isRequired,
};

export default Currencies;
