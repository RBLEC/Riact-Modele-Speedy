# Axios & API

[La doc Axios](https://github.com/axios/axios)

Axios permet de faire des requetes API et de les intégrées dans notre app

## Instalation

```shell
npm install axios

yarn add axios
```

## Intégration d'Axios

Axios va remplacer notre simulateur de chargement

- Avant modification du JXS du Parant

```js
// == Import npm
import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// == Import
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import Spinner from 'src/components/Spinner';
import { getPostsByCategory } from 'src/selector';

import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';

import './styles.scss';
// == Composant
const Blog = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const fetchCategoriesData = () => {
    setLoading(true);
    // Le setTimeout ici est là pour simuler un temps de récupération
    // des données à l'api
    // Si je veux récupérer des données je remplace le setTimeout
    // par une appel axios ou fetch
    setTimeout(() => {
      setCategories([...categoriesData]);
      setLoading(false);
    }, 2000);
  };

  const fetchPostsData = () => {
    setLoading(true);
    // Le setTimeout ici est là pour simuler un temps de récupération
    // des données à l'api
    // Si je veux récupérer des données je remplace le setTimeout
    // par une appel axios ou fetch
    setTimeout(() => {
      setPosts([...postsData]);
      setLoading(false);
    }, 2000);
  };
  return (
    <div className="blog">
      <Header
        categories={categories}
        onBtnFetchClick={fetchCategoriesData}
      />
      {!loading && (
        <Switch>
          <Redirect from="/jquery" to="/autre" />
          {categories.map((category) => (
            <Route key={category.route} path={category.route} exact>
              <Posts
                posts={getPostsByCategory(posts, category)}
                onBtnFetchClick={fetchPostsData}
              />
            </Route>
          ))}
          {/* La route qui match dans tout les cas si un route a pas matché avant */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      )}
      {loading && (
        <Spinner />
      )}
      <Footer />
    </div>
  )
};

// == Export
export default Blog;
```

- Rendu JSX avec import et utilisation d'axios

```js
// /* eslint-disable arrow-body-style */
// // == Import npm
// import React, { useState } from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';
// // == Import
// import Header from 'src/components/Header';
// import Posts from 'src/components/Posts';
// import Footer from 'src/components/Footer';
// import NotFound from 'src/components/NotFound';
// import Spinner from 'src/components/Spinner';
// import { getPostsByCategory } from 'src/selector';
// 
    / Supression de la data local => remplacement par impor compo AXIOS /
// Sup =>  import categoriesData from 'src/data/categories' /
   import axios from 'axios';
// 
// import postsData from 'src/data/posts';
// 
// import './styles.scss';
// // == Composant
// const Blog = () => {
//   const [loading, setLoading] = useState(false);
//   const [posts, setPosts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const fetchCategoriesData = () => {
//     setLoading(true);
//     // Le setTimeout ici est là pour simuler un temps de récupération
//     // des données à l'api
//     // Si je veux récupérer des données je remplace le setTimeout
//     // par une appel axios ou fetch
       axios.get('https://oclock-open-apis.vercel.app/api/blog/categories')
         .then((response) => response.data)
    / Le premier then retourne une donnée Comme cette donnée est retournée, le then qui suit va récupérer cette donnée en paramètre /
    / C'est toujours le cas sauf si cette donnée est une promesse. Dans ce cas là, ce n'est pas la promesse qu'on récupère dans le then qui suit, mais la résolution de cette promesse /
         .then((categoriesData) => {
    / On met à jour la donnée dans le state /
           setCategories([...categoriesData]);
         })
         .catch((error) => {
    / Si y'a eu une erreur durant la requete On met pas à jour la donnée et on console.log l'erreur /
           console.log(error);
         })
         .finally(() => {
    / Dans tous les cas, then ou catch On arrête le loading /
           setLoading(false);
         });
     };
// 
//   const fetchPostsData = () => {
//     setLoading(true);
//     // Le setTimeout ici est là pour simuler un temps de récupération
//     // des données à l'api
//     // Si je veux récupérer des données je remplace le setTimeout
//     // par une appel axios ou fetch
//     setTimeout(() => {
//       setPosts([...postsData]);
//       setLoading(false);
//     }, 2000);
//   };
//   return (
//     <div className="blog">
//       <Header
//         categories={categories}
//         onBtnFetchClick={fetchCategoriesData}
//       />
//       {!loading && (
//         <Switch>
//           <Redirect from="/jquery" to="/autre" />
//           {categories.map((category) => (
//             <Route key={category.route} path={category.route} exact>
//               <Posts
//                 posts={getPostsByCategory(posts, category)}
//                 onBtnFetchClick={fetchPostsData}
//               />
//             </Route>
//           ))}
//           {/* La route qui match dans tout les cas si un route a pas matché avant */}
//           <Route>
//             <NotFound />
//           </Route>
//         </Switch>
//       )}
//       {loading && (
//         <Spinner />
//       )}
//       <Footer />
//     </div>
//   );
// };
// 
// // == Export
// export default Blog;
```

---

### Intégration d'Axios avec gestion des érreures

- Avant modification de JSX Parent

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

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const routes = categoriesData.map((category) => {
    const postsList = getPostsByCategory(category.label, posts);

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

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      console.log('ici je veux changer mon state');
      setPosts(postsData);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="blog">
      <Header categories={categoriesData} />
      <button type="button" onClick={loadData}>Load data</button>
      {loading && <div>Chargement des données</div>}
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

- Rendu JSX du Parent Modifier

```js
// import React, { useState } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
  / import du compo axios /
   import axios from 'axios';
// 
// import Header from 'src/components/Header';
// import Posts from 'src/components/Posts';
// import Footer from 'src/components/Footer';
// import NotFound from 'src/components/NotFound';
// import { getPostsByCategory } from 'src/selectors';
// import categoriesData from 'src/data/categories';
// import postsData from 'src/data/posts';
// import './style.scss';
// function Blog() {
// 
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
  / Création d'une const state pour les error /
     const [hasError, setHasError] = useState(false);
// 
//   const routes = categoriesData.map((category) => {
//     const postsList = getPostsByCategory(category.label, posts);
// 
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
// 
//   const loadData = () => {
//     setLoading(true);

  / Appel Get de axios et intégration de URL de l'API /
       axios.get('https://oclock-open-apis.vercel.app/api/blog/posts')
         .then((response) => {
  / axios nous renvoie un objet, les data de la réponse se trouvent dans la propriété "data" /
           setPosts(response.data);
         })
         .catch((error) => {
           console.log('error', error);
           setHasError(true);
         })
         .finally(() => {
           setLoading(false);
         });
// 
  / Suppréssion du simulateur de loading data /
       // on simule le chargement de données
       // setTimeout(() => {
       //   console.log('ici je veux changer mon state');
       //   setPosts(postsData);
       //   setLoading(false);
       // }, 2000);
     };
// 
//   return (
//     <div className="blog">
//       <Header categories={categoriesData} />
//       <button type="button" onClick={loadData}>Load data</button>
  / Donne un Message d'érreur /
         {hasError && <div>Une erreur s'est produite</div>}
//       {loading && <div>Chargement des données</div>}
  / Utilisation du state d'erreure /
         {!loading && !hasError && (
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