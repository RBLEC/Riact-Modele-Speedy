# Les Hooks

- Pour les hooks, ils viennent remplacer des fonctionnalités que les classes permettaient. Mise en place d'un state, intéragir dans le cycle de vie du composant...
- Avantage on a pas à transformer notre composant en classe et on va pouvoir avoir des logiques
de state, ou d'intéraction avec le lifecycle du composant, séparées du composant

## useState

### Le hook de génération d'état

- création de state même principe que pour le state de classe, à chaque fois que la donnée du state va changer.

- React procède à un rendu en classe on a une propriété "state" qui est un objet, il vient tout l'état du composant

```js
state = {
  name: '',
  categories: [],
}
```

### Avec useState, on génère une seule propriété à la fois

- useState nous renvoie un tableau avec en index 0 la nouvelle valeur qui a été générée
et en index 1 on aura le setter, équivalent à setState, pour cette entrée du state
on passe en argument de useState, la valeur par défaut de ce nouveau state

    **state   setter**  = déclaration d'une nouvelle valeur de state

```js
const [test, setTest] = useState([]);

 / on peut avoir plusieurs useState par composant /

const [coucou, setCoucou] = useState({});
```

## Ajout d'un state de loading

il faudra importer le composant useState et creation de la const state

- Avant modification du fichier parent

```js
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import { getPostsByCategory } from 'src/selectors';
import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './style.scss';

function Blog() {

  const routes = categoriesData.map((category) => {
    const postsList = getPostsByCategory(category.label, postsData);
    return (
      <Route
        path={category.route}
        key={category.route}
        exact
      >
        <Posts posts={postsList} />
      </Route>
    );
  });
  return (
    <div className="blog">
      <Header categories={categoriesData} />
      <Switch>
        {routes}
        <Redirect from="/jquery" to="/autre" />
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}
export default Blog;
```

- Rendu avec import des modification

```js
    / import du comp useState /
   import React, { useState } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
// 
// import Header from 'src/components/Header';
// import Posts from 'src/components/Posts';
// import Footer from 'src/components/Footer';
// import NotFound from 'src/components/NotFound';
// import { getPostsByCategory } from 'src/selectors';
// import categoriesData from 'src/data/categories';
// import postsData from 'src/data/posts';
// import './style.scss';
// 
// function Blog() {
   
   / State Setter /
   / Nos const d'état /
     const [posts, setPosts] = useState([]);
     const [loading, setLoading] = useState(false);
// 
//   const routes = categoriesData.map((category) => {
       const postsList = getPostsByCategory(category.label, posts);
//     return (
//       <Route
//         path={category.route}
//         key={category.route}
//         exact
//       >
//         <Posts posts={postsList} />
//       </Route>
//     );
//   });
//   return (
//     <div className="blog">
//       <Header categories={categoriesData} />
        / Création d'un bouton pour simuler le loading /
         <button type="button" onClick={() => setLoading(true)}>Load data</button>

        / Text de chargement des données /
         {loading && <div>Chargement des données</div>}

        / utilisation du loading pour les pages /
         {!loading && (
//         <Switch>
//           {routes}
//           <Redirect from="/jquery" to="/autre" />
//           <Route>
//             <NotFound />
//           </Route>
//         </Switch>
         )}
//       <Footer />
//     </div>
//   );
// }
// export default Blog;
```

---

## Avec Spinner Lors du chargement des data

### Le Parent

- Dans le fichier parent avant modificaton

```js
// == Import npm
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// == Import
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import { getPostsByCategory } from 'src/selector';

import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './styles.scss';

// == Composant
const Blog = () => (
  <div className="blog">
    <Header categories={categoriesData} />
    <Switch>
      <Redirect from="/jquery" to="/autre" />
      {categoriesData.map((category) => (
        <Route key={category.route} path={category.route} exact>
          <Posts posts={getPostsByCategory(postsData, category)} />
        </Route>
      ))}

      {/* La route qui match dans tout les cas si un route a pas matché avant */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
    <Footer />
  </div>
);

// == Export
export default Blog;
```

- Rendu avec Intégration d'un state et d'un compo enfant `Spinner`

```js
// // == Import npm
    / import du compo useState /
   import React, { useState } from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';
// // == Import
// import Header from 'src/components/Header';
// import Posts from 'src/components/Posts';
// import Footer from 'src/components/Footer';
// import NotFound from 'src/components/NotFound';
    / import de l'enfant /
   import Spinner from 'src/components/Spinner';
// import { getPostsByCategory } from 'src/selector';
// 
// import categoriesData from 'src/data/categories';
// import postsData from 'src/data/posts';
// import './styles.scss';
// 
// // == Composant
// const Blog = () => {
     const [loading, setLoading] = useState(false);
   
     const fetchPostsData = () => {
       setLoading(true);
       / Le setTimout ici est là pour simuler un temps de récupération des données à l'api /
       / Si je veux récupérer des données je remplace le setTimeout par une appel axios ou fetch /
       setTimeout(() => {
         setLoading(false);
       }, 2000);
     };
   
//   return (
//     <div className="blog">
//       <Header categories={categoriesData} />
        / Appel du loading /
         {!loading && (
//         <Switch>
//           <Redirect from="/jquery" to="/autre" />
//           {categoriesData.map((category) => (
//             <Route key={category.route} path={category.route} exact>
//               <Posts
//                 posts={getPostsByCategory(postsData, category)}
                / utilisation de la sumulation de loading /
                   onBtnFetchClick={fetchPostsData}
//               />
//             </Route>
//           ))}
// 
//           {/* La route qui match dans tout les cas si un route a pas matché avant */}
//           <Route>
//             <NotFound />
//           </Route>
//         </Switch>
//       )}
        / utilisation du compo enfant Spinner lord du chargement/
         {loading && (
           <Spinner />
         )}
//       <Footer />
//     </div>
//   )
// };
// 
// // == Export
// export default Blog;
```

### L'enfant Post

#### Modification JSX du compo Posts si pas d'articles

- Avant Modification JSX

```js
// == Import npm
import React from 'react';
import PropTypes from 'prop-types';
// == Import
import Post from './Post';
import './styles.scss';

// == Composant
const Posts = ({ posts }) => (
  <main className="posts">
    <h1 className="posts__title">Dev of thrones</h1>
    <div className="posts__list">
      {
        posts.length
          ? posts.map((post) => (
            <Post
              key={post.id.toString()}
              {...post}
            />
          ))
          : <h2>Aucun article à afficher</h2>
      }
    </div>
  </main>
);
Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

Posts.defaultProps = {
  posts: [],
};

// == Export
export default Posts;
```

- Nouveau Rendu

```js
// // == Import npm
// import React from 'react';
// import PropTypes from 'prop-types';
// // == Import
// import Post from './Post';
// import './styles.scss';
// 
// // == Composant
    / utilisation de la fonction onBtnFetchClick /
   const Posts = ({ posts, onBtnFetchClick }) => (
//   <main className="posts">
//     <h1 className="posts__title">Dev of thrones</h1>
//     <div className="posts__list">
//       {
    / Si y'a des articles on les affiches /
           posts.length 
//           ? posts.map((post) => (
//             <Post
//               key={post.id.toString()}
//               {...post}
//             />
//           ))
        / Si pas d'article on affiche un bouton pour les récupérer /
             : ( /
               <div className="noData">
                 <h2 className="noData__title">
                   Aucun article à afficher
                 </h2>
                 <button
                   type="button"
                   className="noData__button"
                   onClick={onBtnFetchClick}
                 >
                   Récuperer les articles
                 </button>
               </div>
             )
//       }
//     </div>
//   </main>
// );
// Posts.propTypes = {
//   posts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//     }),
//   ),
//   onBtnFetchClick: PropTypes.func,
// };
// 
// Posts.defaultProps = {
//   posts: [],
    / on valide la fonction /
     onBtnFetchClick: () => {},
// };
// 
// // == Export
// export default Posts;
```

#### Modification SCSS du compo Posts si pas d'articles

- Avant modification

```scss
@use 'src/styles/vars';
.posts {
  width: 800px;
  max-width: 100%;
  margin: auto;
  padding: vars.$gutter;
  &__title {
    font-family: vars.$title-font;
    font-weight: vars.$title-font-weight;
    color: vars.$primary-color;
    font-size: 2em;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 0.5em;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    .post {
      width: 100%;
      padding: vars.$gutter;
      cursor: pointer;
      @media screen and (min-width: 600px) {
        width: 50%;
      }
      &__title {
        font-family: vars.$title-font;
        font-weight: vars.$title-font-weight;
        color: vars.$dark-color;
        text-transform: uppercase;
        font-size: 1.3em;
      }
      &__categories {
        padding: 0.7em 0;
      }
      &__category {
        background-color: vars.$primary-color;
        color: vars.$light-color;
        padding: 0.5em;
        text-transform: uppercase;
        margin-right: 0.5em;
        font-size: 0.8em;
      }
      &__excerpt {
        font-weight: 300;
        margin-top: 0.5em;
        color: vars.$post-text-color;
        text-align: justify;
      }
      &:hover {
        background-color: vars.$post-hover-color;
      }
    }
  }
}
```

- Rendu après modification

```scss
// @use 'src/styles/vars';
// .posts {
//   width: 800px;
//   max-width: 100%;
//   margin: auto;
//   padding: vars.$gutter;
//   &__title {
//     font-family: vars.$title-font;
//     font-weight: vars.$title-font-weight;
//     color: vars.$primary-color;
//     font-size: 2em;
//     text-align: center;
//     text-transform: uppercase;
//     margin-bottom: 0.5em;
//   }
// 

/****************************
** Styles si pas d'article **
****************************/
     .noData {
       text-align: center;
       margin: auto;
   
       &__title {
         text-transform: uppercase;
         font-size: 1em;
         margin: vars.$gutter;
       }
       &__button {
         padding: vars.$gutter;
         font-size: 1.2em;
         background-color: vars.$primary-color;
         border: 0;
         color: vars.$light-color;
       }
     }
   
//   &__list {
//     display: flex;
//     flex-wrap: wrap;
//     .post {
//       width: 100%;
//       padding: vars.$gutter;
//       cursor: pointer;
//       @media screen and (min-width: 600px) {
//         width: 50%;
//       }
//       &__title {
//         font-family: vars.$title-font;
//         font-weight: vars.$title-font-weight;
//         color: vars.$dark-color;
//         text-transform: uppercase;
//         font-size: 1.3em;
//       }
//       &__categories {
//         padding: 0.7em 0;
//       }
//       &__category {
//         background-color: vars.$primary-color;
//         color: vars.$light-color;
//         padding: 0.5em;
//         text-transform: uppercase;
//         margin-right: 0.5em;
//         font-size: 0.8em;
//       }
//       &__excerpt {
//         font-weight: 300;
//         margin-top: 0.5em;
//         color: vars.$post-text-color;
//         text-align: justify;
//       }
//       &:hover {
//         background-color: vars.$post-hover-color;
//       }
//     }
//   }
// }
```

### L'enfant Spinner

Cette enfant vas êtres appeler lord du charcgement des data

#### Création du JSX

```js
// == Import npm
import React from 'react';

// == Import
import './styles.scss';

// == Composant
const Spinner = () => <div className="spinner" />;

// == Export
export default Spinner;
```

#### Création du SCSS

```scss
@import 'src/styles/vars';

.spinner {
  width: 50px;
  height: 50px;
  background-color: $primary-color;
  margin: $gutter auto;
  animation: rotateplane 1.5s infinite ease-in-out;
}

@keyframes rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
```

## Simulation du loading

Fonction qui permet une simutation de chargement de donnée

```js
  const loadData = () => {
    setLoading(true);
    / on simule le chargement de données /
    setTimeout(() => {
      console.log('ici je veux changer mon state');
      setPosts(postsData);
      setLoading(false);
    / simulation de 2 seconde /
    }, 2000);
  };
```

- pour appeller la sumulation de chargement de donnée ic avec un boutton

```js
<button type="button" onClick={loadData}>Load data</button>
```

### Utilisation dans le fichier parent

- Avant Modification du JSX

```js
import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import { getPostsByCategory } from 'src/selectors';
import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './style.scss';
function Blog() {
  // pour les hooks, ils viennent remplacer des fonctionnalités que les classes
  // permettaient. Mise en place d'un state, intéragir dans le cycle de vie du composant...
  // Avantage on a pas à transformer notre composant en classe et on va pouvoir avoir des logiques
  // de state, ou d'intéraction avec le lifecycle du composant, séparées du composant
  // useState
  // le hook de génération d'état - création de state
  // même principe que pour le state de classe, à chaque fois que la donnée du state va changer
  // React procède à un rendu
  // en classe on a une propriété "state" qui est un objet, il vient tout l'état du composant
  // state = {
  //   name: '',
  //   categories: [],
  // }
  // avec useState, on génère une seule propriété à la fois
  // useState nous renvoie un tableau avec en index 0 la nouvelle valeur qui a été générée
  // et en index 1 on aura le setter, équivalent à setState, pour cette entrée du state
  // on passe en argument de useState, la valeur par défaut de ce nouveau state
  //     state   setter    déclaration d'une nouvelle valeur de state
  // const [test, setTest] = useState([]);
  // on peut avoir plusieurs useState par composant
  // const [coucou, setCoucou] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  // on va générer un composant Route pour chaque catégorie
  // ce composant Route viendra prendre une liste de poste triée en fonction
  // de la catégorie
  const routes = categoriesData.map((category) => {
    const postsList = getPostsByCategory(category.label, posts);
    // composant Route qui sera intégré au nouveau tableau
    return (
      <Route
        path={category.route}
        key={category.route}
        exact
      >
        <Posts posts={postsList} />
      </Route>
    );
  });

  return (
    <div className="blog">
      <Header categories={categoriesData} />
      <button type="button" onClick={() => setLoading(true)}>Load data</button>
      {loading && <div>Chargement des données</div>}
      {/*
        avec Switch on affichera qu'un seul composant Route à la fois
        ici le composant Route qui a le composant NotFound correspondera au
        default d'un switch/case
      */}
      {!loading && (
        <Switch>
          {routes}
          <Redirect from="/jquery" to="/autre" />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      )}
      <Footer />
    </div>
  );
}
export default Blog;
```

- Rendu avec modification du JSX

```js
// import React, { useState } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
// import Header from 'src/components/Header';
// import Posts from 'src/components/Posts';
// import Footer from 'src/components/Footer';
// import NotFound from 'src/components/NotFound';
// import { getPostsByCategory } from 'src/selectors';
// import categoriesData from 'src/data/categories';
// import postsData from 'src/data/posts';
// import './style.scss';
// 
// function Blog() {
// 
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   // on va générer un composant Route pour chaque catégorie
//   // ce composant Route viendra prendre une liste de poste triée en fonction
//   // de la catégorie
//   const routes = categoriesData.map((category) => {
//     const postsList = getPostsByCategory(category.label, posts);
//     // composant Route qui sera intégré au nouveau tableau
//   return (
//     <Route
//          path={category.route}
//          key={category.route}
//          exact
//        >
//          <Posts posts={postsList} />
//        </Route>
//      );
//    });

    / simulation du chargement de data /
     const loadData = () => {
       setLoading(true);
       // on simule le chargement de données
       setTimeout(() => {
         console.log('ici je veux changer mon state');
         setPosts(postsData);
         setLoading(false);
       }, 2000);
     };
   
//   return (
//     <div className="blog">
//       <Header categories={categoriesData} />
//       <button type="button" onClick={loadData}>Load data</button>
//       {loading && <div>Chargement des données</div>}
//       {!loading && (
//         <Switch>
//           {routes}
//           <Redirect from="/jquery" to="/autre" />
//           <Route>
//             <NotFound />
//           </Route>
//         </Switch>
//       )}
//       <Footer />
//     </div>
//   );
// }
// export default Blog;
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