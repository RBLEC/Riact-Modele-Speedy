# React-Router

[la doc de react router dom](https://reactrouter.com/web/guides/quick-start)

- Pour démarrer avec React Router dans une application Web, vous aurez besoin d'une application Web React. Si vous devez en créer une, nous vous recommandons d'essayer Create React App . C'est un outil populaire qui fonctionne très bien avec React Router, Ou utiliser ce React-Model-Seepdy, il vas permetre la gestion des url

Tout d'abord, installez create-react-appet créez un nouveau projet avec.

```shell
    npx create-react-app demo-app   
```

## Installation

Vous pouvez installer React Router à partir du registre public npm avec npmou yarn. Puisque nous construisons une application Web, nous utiliserons react-router-domdans ce guide.

```shell
npm install react-router-dom

yarn add react-router-dom
```

Ensuite, copiez / collez l'un des exemples suivants dans src/App.js.

---

## 1er exemple: routage de base

Dans cet exemple, nous avons 3 «pages» gérées par le routeur: une page d'accueil, une page à propos et une page utilisateurs. Lorsque vous cliquez sur les différents <Link>s, le routeur rend la correspondance <Route>.

Remarque: Dans les coulisses, un <Link>rend un <a>avec un réel href, de sorte que les personnes utilisant le clavier pour la navigation ou les lecteurs d'écran pourront toujours utiliser cette application.

```js
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
```

## 2ème exemple: routage imbriqué

Cet exemple montre comment fonctionne le routage imbriqué. La route /topicscharge le Topicscomposant, ce qui rend les autres <Route> conditionnellement sur la :idvaleur des chemins .

```js
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
```

 **Continue!**

Espérons que ces exemples vous donnent une idée de ce que signifie créer une application Web avec React Router. Continuez à lire pour en savoir plus sur les principaux composants de React Router!

---

## 1 Intégration React-Router-Dom

- Maintenant on vas intégrer React Router Dom au plus haut niveau soit dans notre point d'entrer dans `src/index.js`
- Avec React-RouterDom on pourras avoir accès à l'objet history, il va falloir englober notre application avec le composant BrowserRouter as Router de react-router-dom.

- Avant intégration JSX du composant
  
```js
// == Import : npm
import React from 'react';
import { render } from 'react-dom';

// == Import : local
// Composants
import Blog from 'src/components/Blog';

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de l'Blog)
//    => crée une structure d'objets imbriqués (DOM virtuel)
const rootReactElement = <Blog />;
// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');
// 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
render(rootReactElement, target);
```

- Rendu JSX avec l'integration de react-router-dom et des balises

```js
// // == Import : npm
// import React from 'react';
// import { render } from 'react-dom';
   import { BrowserRouter as Router } from 'react-router-dom';
// // == Import : local
// // Composants
// import Blog from 'src/components/Blog';
// 
// // == Render
// // 1. Élément React racine (celui qui contient l'ensemble de l'Blog)
// //    => crée une structure d'objets imbriqués (DOM virtuel)
  / Pour avoir accès à l'objet history, il va falloir englober notre application /
  / avec le composant BrowserRouter as Router de react-router-dom /
   const rootReactElement = (
     <Router>
       <Blog />
     </Router>
   );
// // 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
// const target = document.getElementById('root');
// // 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
// render(rootReactElement, target);
```

- même rendu JSX sans renomage du composant React-Router-Dom

```js
//  == Import : npm
// import React from 'react';
// import { render } from 'react-dom';
   import { BrowserRouter } from 'react-router-dom';
// 
// // == Import : local
// // Composants
// import Blog from 'src/components/Blog';
// // == Render
// // 1. Élément React racine (celui qui contient l'ensemble de l'app)
// //    => crée une structure d'objets imbriqués (DOM virtuel)
// 
   / Pour avoir accès à l'objet history, il va falloir englober notre application /
   / avec le composant BrowserRouter de react-router-dom /
   const rootReactElement = (
     <BrowserRouter>
       <Blog />
     </BrowserRouter>
   );
// 
// // 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
// const target = document.getElementById('root');
// // 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
// render(rootReactElement, target);
```

## 2 Link / NavLink = Menu

- Link permet d'insérer une nouvelle entrée dans l'objet history du navigateur ce composant change en même temps l'URL visible du navigateur. C'est un outil/composant de react-router-dom donc il utilise ce que met à disposition BrowserRouter.
- NavLink permet d'avoir des liens de menu avec un aspect actif.
- C'est une version améliorée de Link.
- Par défaurt NavLink met la classe active lorsque le début du path correspond avec ce qu'il y a dans la props "to", si on clique sur le lien "`/angular`" on aura le lien "`/`" qui sera actif aussi. Pour corriger ce problème on a la props "exact".

Pour la réalisation de notre menu il faudra Import le compsant et le placer dans le fichier `src/components/header`.

- Avant modification JSX de l'enfant Header

```js
import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

function Header({ categories }) {
  const menu = categories.map((category) => (
    <li key={category.route}>
      <a href={category.route} className="header__link">
        {category.label}
      </a>
    </li>
  ));

  return (
    <header className="header">
      <nav>
        <ul>
          {menu}
        </ul>
      </nav>
    </header>
  );
}
Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
export default Header;
```

- Rendu JSX avec import et placement

```js
// import React from 'react';
// import PropTypes from 'prop-types';
  / Importation du Compo /
   import { NavLink } from 'react-router-dom';
// 
// import './style.scss';
// 
// function Header({ categories }) {
//   const menu = categories.map((category) => (
//     <li key={category.route}>
    / Remplacement du a => NavLink /
         <NavLink
           to={category.route}
           className="header__link"
           activeClassName="header__link--selected"
           exact
         >
           {category.label}
         </NavLink>
//     </li>
//   ));
// 
//   return (
//     <header className="header">
//       <nav>
//         <ul>
//           {menu}
//         </ul>
//       </nav>
//     </header>
//   );
// }
// Header.propTypes = {
//   categories: PropTypes.arrayOf(
//     PropTypes.shape({
//       route: PropTypes.string.isRequired,
//       label: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
// };
// export default Header;
```

Activation des liens via le scss de l'enfant Header

- Avant activation


```scss
  .menu {
    &__link {
      display: inline-block;
      margin: 0 1em;
      cursor: pointer;
      color: vars.$dark-color;
      &:hover, &.active {
        color: vars.$primary-color;
      }
    }
```

- Activation des liens avec la balise `a`

```scss
//  .menu {
//    &__link {
//      display: inline-block;
//      margin: 0 1em;
//      cursor: pointer;
//      color: vars.$dark-color;
        a {
          &:hover, &.active {
            color: vars.$primary-color;
          }
//      }
//    }
```

## 3 Mise en place des routes

- Dans notre ficher parent on va générer un composant Route pour chaque catégorie ce composant Route viendra prendre une liste de poste triée en fonction de la catégorie.
- Par défaut on place toutes les données des posts dans postsList.
- On va filtrer les posts par catgégories le point en commun entre les objet de catégories et les objets de post : propriété category.label et propriété post.category
- Puis on détermine si le category.label est égal à post.category
- Création du composant Route qui sera intégré au nouveau tableau.
- Et remplacement de < Posts posts={postsData} /> => {routes}.

- Avant modification du parent.

```js
import React from 'react';
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './style.scss';

function Blog() {
  return (
    <div className="blog">
      <Header categories={categoriesData} />
      <Posts posts={postsData} />
      <Footer />
    </div>
  );
}
export default Blog;
```

- Intégration des routes et de la fonction getPostByCategory dans le fichier parent

```js
// import React from 'react';
  / Import du compo Route /
   import { Route } from 'react-router-dom';
// 
// import Header from 'src/components/Header';
// import Posts from 'src/components/Posts';
// import Footer from 'src/components/Footer';
// import categoriesData from 'src/data/categories';
// import postsData from 'src/data/posts';
// import './style.scss';
// 
// function Blog() {
     / on va générer un composant Route pour chaque catégorie ce composant Route viendra prendre une liste de poste triée en fonction de la catégorie /
     const routes = categoriesData.map((category) => {
       / Par défaut on place toutes les données des posts dans postsList /
       let postsList = postsData;
   
       / on va filtrer les posts par catgégories le point en commun entre les objet de catégories et les objets de post : propriété category.label et propriété post.category /
       if (category.label !== 'Accueil') {
         postsList = postsData.filter((post) => {
           / ici on détermine si le category.label est égal à post.category /
           return post.category === category.label;
         });
       }
       / composant Route qui sera intégré au nouveau tableau /
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
// 
//   return (
//     <div className="blog">
//       <Header categories={categoriesData} />
    / remplacement de (Posts posts={postsData}) => {routes} /
         {routes}
//       <Footer />
//     </div>
//   );
// }
// export default Blog;
```

### Autre Méthode avec Switch & Route

- Avant modification

```js
// == Import npm
import React from 'react';

// == Import
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';

import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './styles.scss';
// == Composant
const Blog = () => (
  <div className="blog">
    <Header categories={categoriesData} />
    <Posts posts={postsData} />
    <Footer />
  </div>
);
// == Export
export default Blog;
```

- Après importation et création d'un selector qui appel la fonction getPostByCatégory et d'un Switch

```js
// // == Import npm
// import React from 'react';
   import { Switch, Route } from 'react-router-dom';
// // == Import
// import Header from 'src/components/Header';
// import Posts from 'src/components/Posts';
// import Footer from 'src/components/Footer';
  import { getPostsByCategory } from 'src/selector';
// 
// import categoriesData from 'src/data/categories';
// import postsData from 'src/data/posts';
// import './styles.scss';
// // == Composant
// const Blog = () => (
//   <div className="blog">
//     <Header categories={categoriesData} />
        <Switch>
          {categoriesData.map((category) => (
            <Route key={category.route} path={category.route} exact>
              <Posts posts={getPostsByCategory(postsData, category)} />
            </Route>
          ))}
        </Switch>
//     <Footer />
//   </div>
// );
// // == Export
// export default Blog;
```

- Création d'un dossier et d'un fichier `src/selector/indesx.js`


```js
/* eslint-disable import/prefer-default-export */
export const getPostsByCategory = (posts, category) => {
  if (category.label === 'Accueil') {
    return posts;
  }
  return posts.filter((post) => post.category === category.label);
};
```

### 4 Création d'un selector

#### Qu’est-ce qu’un sélecteur ?

Un selector est tout simplement une fonction qui prend en paramètre tout ou partie du state de l’application et en renvoie une version formatée et/ou réduite, propice aux besoins de nos vues. Concrètement un selector très simple pourrait être :

```js
const getToDoList = state => state.toDoList; 
```

Ce selector sera écrit dans le fichier du reducer et exporté, puis importé par les composants Container ayant besoin de la donnée formatée. Par exemple :

```js
... 
import { getToDoList } from '../reducers'; 

... 
const mapStateToProps = (state) => {
  return {
    toDoList: getToDoList(state)
  }
};
```

Si on peut croire que l’on ne fait que déplacer notre code, on s’assure surtout que notre modèle n’est manipulé que par Redux, ainsi nos composants Containers ne sont responsables que de gérer la logique d’interface. Cela nous permet d’avoir des composants petits et facilement maintenables, peu importe leur type.

#### Combiner des sélecteurs

Au même titre que n’importe quelle fonction, un sélecteur doit être simple, pur et responsable d’une seule opération. Il devient alors possible d’imaginer des combinaisons de sélecteurs afin d’obtenir le modèle souhaité. Par exemple :

```js
const getToDoList = state => state.toDoList;
const getDone = state => state.reduce(element => element.done);
const getDoneTodos = state => getDone(getToDoList(state)); 
```

L’exemple est ici un peu simple mais illustre assez bien l’idée. De plus, cela se rapproche pas mal de la programmation fonctionelle qu’implémente Redux.

### Pour résumer

- Un selector est donc :

    - une fonction prenant en paramètre au moins le state de l’application
    - une fonction renvoyant un modèle spécifique à un besoin
    - situé dans le même fichier que le reducer correspondant
    - combinable avec d’autres selectors
    - un moyen d’accéder à des sous-parties du state de l’application
    - un moyen de reformater des parties du state à la volée pour les vues
    - un moyen de conserver un state global simple et sans répétition


- Pour aller plus loin
  
Par soucis de simplicité, nous n’avons dans cet exemple qu’un seul fichier dans lequel se trouvent nos reducers. Une application à taille réelle les verra probablement séparés en plusieurs fichiers. Il devient alors nécessaire de séparer les selectors en deux niveaux :

- les selectors au niveau des sub-reducers qui font leur traitement en prennant en entrée la portion du state correspondant au reducer se trouvant dans le même fichier.
- les selectors au niveau du root-reducer qui font appel aux selectors précédents en leur passant la portion du state dont ils ont besoin.

Si cela semble confus cette petite vidéo de egghead.io va probablement clarifier tout ça.

De même, si vous souhaitez aller plus loin avec les selectors, la librairie Reselect semble être le choix du moment. Elle vous permettra notamment de combiner des sélecteurs très simplement ou d’utiliser la memoization pour éviter de recalculer les résultats d’un sélecteur à chaque appel. Et si vous vous sentez un peu perdu, n’hésitez pas à regarder du coté de notre formation React !

[Pour plus d'information](https://makina-corpus.com/blog/metier/2016/pourquoi-vous-devriez-utiliser-les-selecteurs-avec-redux)

---

#### 1 Création d'un selector

Nous allons créer un dossier avec un fichier `src/selector/index.js`

- Séparation de la fonction du composants puis importion de la fonction dans le fichier parent.

- version initial

```js
import React from 'react';
import { Route } from 'react-router-dom';

import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';

import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';

import './style.scss';

function Blog() {
  const routes = categoriesData.map((category) => {
    let postsList = postsData;

    if (category.label !== 'Accueil') {
      postsList = postsData.filter((post) => {
        return post.category === category.label;
      });
    }
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
      {routes}
      <Footer />
    </div>
  );
}
export default Blog;
```

- Version modifier avec la fonction qui est exporter

```js
// import React from 'react';
// import { Route } from 'react-router-dom';
// 
// import Header from 'src/components/Header';
// import Posts from 'src/components/Posts';
// import Footer from 'src/components/Footer';
    / Importation de la fonction dans le selector /
   import { getPostsByCategory } from 'src/selectors';
// 
// import categoriesData from 'src/data/categories';
// import postsData from 'src/data/posts';
// import './style.scss';
// 
// function Blog() {
//   const routes = categoriesData.map((category) => {
    / utilisation da la fonction avec ses props /
       const postsList = getPostsByCategory(category.label, postsData);

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
//       {routes}
//       <Footer />
//     </div>
//   );
// }
// export default Blog;
```

- Fonction exporter dans `src/selector/index.js`

```js
/* eslint-disable import/prefer-default-export */
export const getPostsByCategory = (category, posts) => {
  // Par défaut on place toutes les données des posts dans postsList
  let postsList = posts;

  // on va filtrer les posts par catgégories
  // le point en commun entre les objet de catégories
  // et les objets de post : propriété category.label et propriété post.category
  if (category !== 'Accueil') {
    // ici on détermine si le category est égal à post.category
    postsList = posts.filter((post) => post.category === category);
  }

  return postsList;
};
```

---

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