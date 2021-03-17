# 4 Les Props

[Rappel](https://fr.reactjs.org/docs/components-and-props.html)

## Les props sont en lecture seule

Que vous déclariez un composant sous forme de fonction ou de classe, il ne doit jamais modifier ses propres props. Considérons cette fonction sum :

```js
function sum(a, b) {
  return a + b;
}
```

Ces fonctions sont dites « pures » parce qu’elles ne tentent pas de modifier leurs entrées et retournent toujours le même résultat pour les mêmes entrées.

En revanche, cette fonction est impure car elle modifie sa propre entrée :

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React est plutôt flexible mais applique une règle stricte :

Tout composant React doit agir comme une fonction pure vis-à-vis de ses props.

- Bien entendu, les interfaces utilisateurs des applications sont dynamiques et évoluent dans le temps. Dans la prochaine section, nous présenterons un nouveau concept « d’état local ». L’état local permet aux composants React de modifier leur sortie au fil du temps en fonction des actions de l’utilisateur, des réponses réseau et de n’importe quoi d’autre, mais sans enfreindre cette règle.

---

## 1 Intégration des PROPS Statiques

Pour pouvoir utiliser les Props, il faut les placers dans le fichier root mais aussi dans le compo cible les importer, les intégrés et les valider.

### 1-1 Intégration props dans le fichier Root

Dans le fichier `src/components/MonDossierApp/index.js`

- Avant intégration du props.

```js
function Converter() {
  return (
    <div className="converter">
      <Header />
      <Currencies />
      <Amount />
    </div>
```

- Intégration du props en donné statique

```js
// function Converter() {
//   return (
//     <div className="converter">
         <Header baseAmount={1} />
//       <Currencies />
//       <Amount />
//     </div>
```

### 1-2 Intégration props Compo enfant

Maintenant il faut importer les props les intégres dans la fonction et les valider

- Avant l'importation

```js
import React from 'react';

import './style.scss';

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Converter</h1>
      <p className="header__base-amount">1 Euro</p>
    </header>
  );
}

export default Header;
```

- Rendu après l'importation  l'intégration et la validation
- Pour le props` baseAmount`

```js
// import React from 'react';
    / importation /
   import PropTypes from 'prop-types';
// 
// import './style.scss';
    / intégration dans le composant /
   function Header({ baseAmount }) {
//   return (
//     <header className="header">
//       <h1 className="header__title">Converter</h1>
    / utilisation dans le composant enfant /
         <p className="header__base-amount">{baseAmount} Euro</p>
//     </header>
//   );
// }
    / Validation des props /
   Header.propTypes = {
     baseAmount: PropTypes.number.isRequired,
   };
   
// export default Header;
```

## Avec un autre exemple

### 1 intégration des props dans le fichier parent

- Avant 2eme intégration des props

```js
    <div className="converter">
      <Header baseAmount={1} />
      <Currencies />
      <Amount />
    </div>
  );
}
```

- Après intégration de nouvelle props

```js
//     <div className="converter">
//       <Header baseAmount={1} />
//       <Currencies />
//       <Amount
    / Mes Nouvelle props /
           value={1.09}
           currency="United State Dollar"
//       />
//     </div>
//   );
// }
```

### 2 Intégration dans le fichier enfant

- avant intégrations des props

```js
import React from 'react';
import './style.scss';

function Amount() {
  return (
    <footer className="amount">
      <p className="amount__value">1.09</p>
      <p className="amount__currency">United States Dollar</p>
    </footer>
  );
}

export default Amount;
```

- Après intégration des nouvelle Props
- Importaion, intégration, utilisation puis validation

```js
// import React from 'react';
    / importation /
   import PropTypes from 'prop-types';
// 
// import './style.scss';
//
    / intégration /
   function Amount({ value, currency }) {
//   return (
//     <footer className="amount">
    / utilisation /
         <p className="amount__value">{value}</p>
         <p className="amount__currency">{currency}</p>
//     </footer>
//   );
// }
// 
    / validation des props /
   Amount.propTypes = {
     value: PropTypes.number.isRequired,
     currency: PropTypes.string.isRequired,
   };
// 
// export default Amount;
```

## Intégration props du Parent => Enfant => Sous-Enfant

ici avec de la data

### 1 Compo Parent avec Data

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

### 2 Compos enfant avec une liste

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

---

## Validation des props

[La doc sur la validation des types avec PropTypes](https://fr.reactjs.org/docs/typechecking-with-proptypes.html#gatsby-focus-wrapper)

pour valider des props il y a plusieur façon

- Validation de props d'un Array Général le TOP

```js
    maprops: PropTypes.arrayOf(PropTypes.object).isRequired,
```

- Validation de props le minimum

```js
    maprops: PropTypes.array.isRequired,
```

- sinon on détailles

```js
     maprops: PropTypes.arrayOf(PropTypes.shape({
       name: PropTypes.string,
       rate: PropTypes.number,
     })).isRequired,
   };
```

# PropTypes

- Voici un exemple qui détaille les différents validateurs fournis :

```js
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // Vous pouvez déclarer qu'une prop est d'un certain type JS. Par défaut,
  // elles sont toutes optionnelles.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Tout ce qui peut apparaître dans le rendu : des nombres, des chaînes de
  //  caractères, des éléments ou des tableaux (ou fragments) contenant ces types.
  optionalNode: PropTypes.node,

  // Un élément React.
  optionalElement: PropTypes.element,

  // Un type d’élément React (ex. MyComponent).
  optionalElementType: PropTypes.elementType,

  // Vous pouvez aussi déclarer qu'une prop est une instance d'une classe.
  // On utilise pour ça l'opérateur JS instanceof.
  optionalMessage: PropTypes.instanceOf(Message),

  // Vous pouvez vous assurer que votre prop est limitée à certaines
  // valeurs spécifiques en la traitant comme une enumération.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // Cette prop peut être de n'importe lequel de ces trois types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // Un tableau avec des valeurs d'un certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // Un objet avec des valeurs d'un certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // Un objet avec une forme spécifique
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),

  // Vous pouvez ajouter `isRequired` à la fin de n'importe lequel des validateurs
  // ci-dessus pour vous assurer qu'un message d'avertissement s'affiche lorsque
  // la prop n'est pas fournie.
  requiredFunc: PropTypes.func.isRequired,

  // Cette prop est requise et peut être de n'importe quel type
  requiredAny: PropTypes.any.isRequired,

  // Vous pouvez aussi spécifier un validateur personnalisé. Il devra renvoyer
  // un objet Error si la validation échoue. N'utilisez pas de `console.warn`
  // ou `throw`, car ça ne fonctionnera pas dans `oneOfType`.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // Vous pouvez aussi fournir un validateur personnalisé à `arrayOf` et `objectOf`.
  // Il faudra renvoyer un objet Error si la validation échoue. Le validateur
  // sera appelé pour chaque clé du tableau ou de l'objet. Les deux premiers
  // arguments du validateur sont le tableau ou l'objet lui-même, et la clé
  // de la valeur actuelle.
  customArrayProp: PropTypes.arrayOf(
    function(propValue, key, componentName, location, propFullName) {
      if (!/matchme/.test(propValue[key])) {
        return new Error(
          'Invalid prop `' + propFullName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
        );
      }
    }
  )
};
```

---
