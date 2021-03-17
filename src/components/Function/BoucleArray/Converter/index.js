import React from 'react';
import Currencies from 'src/components/Function/BoucleArray/Currencies';

import currenciesData from 'src/components/Function/BoucleArray/data/currencies';
import './style.scss';

function Converter() {
  return (
    <div className="converter">
      <Currencies currencies={currenciesData} />
    </div>
  );
}
export default Converter;