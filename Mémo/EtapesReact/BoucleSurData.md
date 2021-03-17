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

---

## Pour passer toute les informations d'un tableau a une const

pour passer toute les donnée d'un trabeau 

```js
function Currencies({ currencies }) {

 / on va faire un tableau d'élément JSX pour les devises /
  const currenciesList = currencies.map(({ name }) => (
    <Currency key={name} name={name} />
  ));

  / possibiliter d'utiliser le spread operator /
  const currenciesList = currencies.map((currency) => (
    // React.createElement(Currency, {...currency})
    <Currency key={currency.name} {...currency} />
  ));
```

### autre exemple de boucle

#### 1 Le Parent

- Avant intégration des props
  
```js
  return (
    <div className="blog">
      <Header categories={categoriesData} />
      <Posts />
      <Footer />
    </div>
  );
```

- Intégration du props au parent

```js
//   return (
//     <div className="blog">
//       <Header categories={categoriesData} />
    / passage du props a Post ( postData en json) /
         <Posts posts={postsData} />
//       <Footer />
//     </div>
//   );
```

#### 2 L'Enfants

- avant intégration des props et du la boucle

```js
import React from 'react';
import Post from './Post';
import './style.scss';
// BEM = Bloc Element Modifier
function Posts() {
  return (
    <main className="posts">
      <h1 className="posts__title">Dev of Thrones</h1>
      <ul className="posts__list">

     {/* Simulation de boucle */} 
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </ul>
    </main>
  );
}

export default Posts;
```

- intégration des props de la boucle map

```js
// import React from 'react';
  / importation des props /
   import PropTypes from 'prop-types';
// import Post from './Post';
// import './style.scss';
// // BEM = Bloc Element Modifier
  / integration des props /
   function Posts({ posts }) {
     / construction de la boucle avec toutes les datas/
     const postsList = posts.map((post) => <Post key={post.id} {...post} />);
// 
//   return (
//     <main className="posts">
//       <h1 className="posts__title">Dev of Thrones</h1>
//       <ul className="posts__list">
          / utilisation de ma boucle /
           {postsList}
//       </ul>
//     </main>
//   );
// }
// 
  / Validation des props /
   Posts.propTypes = {
     posts: PropTypes.arrayOf(PropTypes.shape({
       id: PropTypes.number.isRequired,
     })).isRequired,
   };
// 
// export default Posts;
```

### 3 Sous-Enfant

- avant l'import des props

```js
import React from 'react';

function Post() {
  return (
    <li className="post">
      <article>
        <h2 className="post__title">Titre du post</h2>
        <div className="post__category">Category</div>
        <p className="post__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta praesentium, accusamus cupiditate culpa qui similique delectus deserunt voluptatem molestiae, eligendi voluptas eveniet error explicabo odit quibusdam tenetur sequi facilis dignissimos.</p>
      </article>
    </li>
  );
}

export default Post;
```

- Rendu final avec dynamisation 

```js
// import React from 'react';
  / import des props /
   import PropTypes from 'prop-types';
// 
  / intégration selectionner des props /
   function Post({ title, category, excerpt }) {
//   return (
//     <li className="post">
//       <article>
         / utilisation des props selectionner /
           <h2 className="post__title">{title}</h2>
           <div className="post__category">{category}</div>
           <p className="post__content">{excerpt}</p>
//       </article>
//     </li>
//   );
// }
// 
  / Calidation des props /
   Post.propTypes = {
     title: PropTypes.string.isRequired,
     category: PropTypes.string.isRequired,
     excerpt: PropTypes.string.isRequired,
   };
// 
// export default Post;
```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```

```js

```


