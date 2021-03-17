# React-Router

[la doc de react router dom](https://reactrouter.com/web/guides/quick-start)

- Pour démarrer avec React Router dans une application Web, vous aurez besoin d'une application Web React. Si vous devez en créer une, nous vous recommandons d'essayer Create React App . C'est un outil populaire qui fonctionne très bien avec React Router, Ou utiliser ce React-Model-Seepdy, il vas permetre la gestion des url

Tout d'abord, installez create-react-appet créez un nouveau projet avec.

```shell
    npx create-react-app demo-app   
```




Installation
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

Cet exemple montre comment fonctionne le routage imbriqué. La route /topicscharge le Topicscomposant, ce qui rend les autres <Route>conditionnellement sur la :idvaleur des chemins .

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

- Avant intégration du composant
  
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

- Rendu avec l'integration de react-router-dom et des balises

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

- même rendu sans renomage du composant React-Router-Dom

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

## 2 Link / NavLink

- Link permet d'insérer une nouvelle entrée dans l'objet history du navigateur ce composant change en même temps l'URL visible du navigateur. C'est un outil/composant de react-router-dom donc il utilise ce que met à disposition BrowserRouter.
- NavLink permet d'avoir des liens de menu avec un aspect actif.
- C'est une version améliorée de Link.
- Par défaurt NavLink met la classe active lorsque le début du path correspond avec ce qu'il y a dans la props "to", si on clique sur le lien "`/angular`" on aura le lien "`/`" qui sera actif aussi. Pour corriger ce problème on a la props "exact".

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