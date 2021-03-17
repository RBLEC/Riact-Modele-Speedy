# 3 Le JSX

[la doc détailler](https://fr.reactjs.org/docs/jsx-in-depth.html)

## Qu’est ce que le JSX?

Le JSX permet de créer de manière rapide et efficace vos applications React. Gardez en tête que vous ne serez pas trop dépaysé si vous maitrisez bien les notions de bases du Javascript et du code HTML. Voici un exemple:

```js
const monBlocDeJSX = <div>Ceci est un bloc de JSX!</div>
```

On voit que l’on peut stocker un bloc de code de type HTML directement dans une variable. C’est ce qui va nous permettre de ne quasiment plus avoir à modifier le fichier index.html de notre application web; tous nos éléments, nos boutons, nos inputs, nos listes pourront être uniquement codés en JSX. Cela nous donnera accès à de nombreuses features très utiles, mais cela va aussi apporter quelques contraintes (pour en apprendre plus sur la question, je vous invite à lire mes articles dédiés Découvrir les fonctionnalités du JSX et Les contraintes du JSX).

[Introduction a JSX](https://fr.reactjs.org/docs/introducing-jsx.html)

## Class => Fonction

Transformation de nos `Class` en `Function`

Maintenant nous allons tranformer nos Class en Fontion.
En utilisant :

```js
function MonComposant() {

    return (
        < MonAutreCompo />
    );
} 
```

Avant transformation

```js
// == Composant
const MonDossierApp = () => (
  <div className="mondossierapp">
    <img src={reactLogo} alt="react logo" />
    <h1>Composant : Mon Dossier App</h1>
    < MonCompoSecondaire />
    < Header />
    < Nav />
    < Main />
    < Articles />
    < Aside />
    < Section />
    < Footer />
    < List />
  </div>
);
```

Rendu apès transformation

```js
   function MonDossierApp () {
   
     return (
//     <div className="mondossierapp">
//       <img src={reactLogo} alt="react logo" />
//       <h1>Composant : Mon Dossier App</h1>
//       < MonCompoSecondaire />
//       < Header />
//       < Nav />
//       < Main />
//       < Articles />
//       < Aside />
//       < Section />
//       < Footer />
//       < List />
//     </div>
//   );
   }
``` 

Aprés cette transformation nous allons remplire et/ou surprimer les Composants en statiques et faire aussi le style afin d'avoir le rendue visuelle.

exemple:

```js
// import React from 'react';
// 
// import './style.scss';
// 
// function Header() {
//   return (
//     <header className="header">
         <h1 className="header__title">Converter</h1>
         <p className="header__base-amount">1 Euro</p>
//     </header>
//   );
// }
```

