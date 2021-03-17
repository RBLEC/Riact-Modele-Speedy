# Intégration props du Parent => Enfant => Sous-Enfant

Création d'une boucle depuis un fichier data

## 1 Compo Parent avec Data

- Avant intégration

```js
import Currencies from 'src/components/Currencies';
import Amount from 'src/components/Amount';

import './style.scss';

function Converter() {
  return (
    <div className="converter">
      <Header baseAmount={1} />
      <Currencies />
      <Amount
        value={1.09}
        currency="United State Dollar"
```

- Rendu après importation de la data et du props

```js
// import Currencies from 'src/components/Currencies';
// import Amount from 'src/components/Amount';
// 
    / importaion de la data /
   import currenciesData from 'src/data/currencies';
// import './style.scss';
// 
// function Converter() {
//   return (
//     <div className="converter">
//       <Header baseAmount={1} />
    / intégration a l'enfant /
         <Currencies currencies={currenciesData} />
//       <Amount
//         value={1.09}
//         currency="United State Dollar"
```

## 2 Compos enfant avec une liste

- Avant intégration du props

```js
import React from 'react';
import Currency from './Currency';

import './style.scss';

function Currencies() {
  return (
    <div className="currencies">
      <p className="currencies__title">Currencies</p>
      <ul className="currencies__list">

      {/* pour simuler la boucles */}
        <Currency />
        <Currency />
        <Currency />
        <Currency />
        <Currency />
        <Currency />
        <Currency />
        <Currency />
        <Currency />
        <Currency />
        <Currency />
        <Currency />
        <Currency />

      </ul>
    </div>
  );
}

export default Currencies;
```

- Rendu Après importation et etc plus mise en place d'une boucle

```js
// import React from 'react';
    / importation /
   import PropTypes from 'prop-types';
// import Currency from './Currency';
// 
// import './style.scss';
// 
    / intégration /
   function Currencies({ currencies }) {

     / on va faire un tableau d'élément JSX pour les devises /
     const currenciesList = currencies.map((currency) => {
       return <Currency key={currency.name} name={currency.name} />;
     });
// 
//   return (
//     <div className="currencies">
//       <p className="currencies__title">Currencies</p>
//       <ul className="currencies__list">
    / intégration de notre const avec que des names. /
    / ici notre boucles /
         {currenciesList}
//       </ul>
//     </div>
//   );
// }
// 
    / Validation du props /
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
// 
// export default Currencies;
```