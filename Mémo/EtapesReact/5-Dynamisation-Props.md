# Dynamisation des Props

- Maintenant on vas dynamiser les props pour cela c'est très simple

- Composant parent statique

```js
// == Import npm
import React from 'react';
// == Import
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import './styles.scss';

// == Composant
const Blog = () => (
  <div className="blog">
    <Header />
    <Posts />
    <Footer />
  </div>
);
// == Export
export default Blog;
```

- Composant parent Dynamique

```js
// // == Import npm
// import React from 'react';
// // == Import
// import Header from 'src/components/Header';
// import Posts from 'src/components/Posts';
// import Footer from 'src/components/Footer';
   
   / importation des fichiers Data /
   import categoriesData from 'src/data/categories';
   import postsData from 'src/data/posts';
// 
// import './styles.scss';
// 
// // == Composant
// const Blog = () => (
//   <div className="blog">

    / intégration dans les props entre {laData} /
      <Header categories={categoriesData} />
      <Posts posts={postsData} />
//     <Footer />
//   </div>
// );
// // == Export
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

```js

```

```js

```

```js

```

```js

```