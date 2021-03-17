// == Import npm
import React from 'react';
import Converter from './Converter'

// == Import
import './styles.scss';

// == Composant
function BoucleArray() {

  return (
    <div className="boucle-array">
      <h1>Composant : BoucleArray</h1>
      <p>Intégration d'une boucle Currencie avec une data </p>
      < Converter />
    </div>
  );
}

// == Export
export default BoucleArray;