
# Point d'entrée

Fichier où l'on va injecter notre composant racine dans le DOM.

```js
render(rootReactElement, target);
```

Fichier important car c'est ici que tout se passe, on a le DOM virtuel qui prend vie.

On va adapter ce point d'entrée pour qu'il ressemble au maximum à ce que sera l'application.

On donne un nom explicite à notre application, notre composant racine. On modifie aussi le dossier qui le contient.

On moidife le nom dans le point d'entrée et le chemin. Le chemin, ici, peu être en absolu grâce au resolver de webpack (src ou app).

## Découpage statique

On vient découper notre application par zone. Très simplement, juste avec les "balises" minimale. On respect la sémantique HTML pour cette structure.

Attention, il faut avoir un parent unique pour le JSX de retour. Soit c'est une balise qui a du sens sémantiquement, soit on peut passer par la balise vide `<></>` ou son équivalent `<React.Fragment></React.Fragment>` qui offre la possibilité d'avoir la props `key`

## Composants de base

On vient découper en composant notre structure statique. Ces composant sont mis dans des fichiers séparés. On les exporte, on n'oublie pas d'importer React dans chacun de ces fichiers (JSX obllige).
On vient les importer et les instancier dans le composant qui en a besoin.

## React DevTools

Extension de navigateur qui permet de voir le DOM virtuel, donc l'arbre de composants React.
On peut modifier les valeurs qui sont passée aux props depuis cette outils.

## Structure JSX des composants

On vient préparer la structure de nos composants. On ajoute les balises en respectant la sémantique HTML. On place aussi le nom des classes.

> attention on est en JS donc pour les classe on passe par la props `className`

## Style SASS

Pour styler les composants on va passer par un préprocesseur : SASS. Il s'agit, comme pour Babel, d'un traducteur de fichier. Mais cette fois ce sera des fichier .scss qui seront traduit en .css. Il existe plusieurs sortes de préprocesseur : PostCss, stylus, Less... Leur point commun c'est la possibilité de faire du CSS avec des fonctionnalités en plus.

### Règles imbriquées

Avec Sass on peut imbriquer des règles CSS

```scss
.alert {
  ul {
    color: red;
  }
  .card {
    border-color: red;
  }
}
```

Traduit en CSS
```css
.alert ul { color: red; }
.alert .card { border-color: red; }
```

### Parent selector

Le parent selector permet de récupérer le sélecteur parent et de l'injecter où l'on souhaite dans une règle

```scss
.alert {
  ul & {
    color: red;
  }
  &.card {
    border-color: red;
  }
}
```

Traduit en CSS
```css
ul .alert { color: red; }
.alert.card { border-color: red; }
```

## Props

Nos composants ont une structure et sont stylés mais ils n'affichent que des données statiques. Il va donc falloir leur passer des données dynamiques cette fois.
Les props sont là pour ça justement et on va pouvoir leur passer n'importe quel type de donnée.

### Passage des données

A l'instanciation du composants, on passe des données en dur dans un 1e temps via les props, ici une chaîne de caractère.

```js
<Header
  title="mon titre"
/>
```

### Validation des Props

Dans le composant cette fois il va falloir récupérer cette props et la valider avec la librairie [PropTypes](https://fr.reactjs.org/docs/typechecking-with-proptypes.html)
Ceci nous permet de mettre une première barrière de validation des données. 
En effet, on est jamais certain d'avoir la bonne donnée dans nos composants (changements d'API, erreur lors du passage des props...). PropTypes nous permet d'avoir des erreurs explicites en console qui nous aideront pour le debugging.

```js
// on destructure directement l'objet de props
function Header({
  title,
}) {
  ...
}

// on valide les props et on dit si elle est requise ou non
// ici title n'est pas requis
Header.propTypes = {
  title: PropTypes.string,
// si on veut marquer le titre comme requis, il faut lui passer ".isRequired"
// dans ce cas pas besoin de defaultProps
// title: PropTypes.string.isRequired,
};

// quand une props n'est pas obligatoire on doit lui donner une valeur par défaut
// en utilisant defaultProps
Header.defaultProps = {
  title: 'Recette à venir',
};
```

## Stateless component

Les stateless components ou composants sans état ne stocke pas de données internes


> On les appelle aussi dumb component


## Tableaux et JSX

React sait interpréter un tableau de chaîne de caractère passer directement dans le JSX. Il concaténera tous les éléments du tableau et les affichera comme une seule et unique string.
Pour palier à ce souci, on va transposer/tranformer nos tableaux en tableaux d'éléments JSX.

### Passage en props

Les props nous servent à passer des données aux composants. Ici, on passe le tableau lors de l'instanciation du composant. Ce tableau est stocké dans la propriété `instructions` de l'objet du fichier `recipe.js`

```js
// --- Composant Recipe 
// on importe les données dans un 1e temps
import recipeData from 'src/data/recipe';
...
// puis on les utilise
<Instructions instructions={recipeData.instructions} />
```

```js
// --- Composant Instructions 
// on déstructure l'objet de props
function Instructions({ instructions }) {
...
// ne pas oublier la validation des props
Instructions.propTypes = {
  // validation basique des tableaux
  // instructions: PropTypes.array.isRequired,

  // pour une validation plus précise, on peut dire de quel type sont les éléments du tableau avec arrayOf
  instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
};
```

### Transposition du tableau

On transforme le tableau de chaine de caractère en tableau d'éléments JSX <li></li>

```js
const transformedData = instructions.map(
  (instruction) => <li key={instruction}>{instruction}</li>,
);
```

> Lorque l'on crée des listes d'éléments JSX, il faut bien penser à mettre la prop `key`
> Elle permettra à React de faire la [réconciliation](https://fr.reactjs.org/docs/reconciliation.html)
> **Attention** ne surtout pas utiliser le paramètre `index` de la méthode `map` 

Il ne reste plus qu'à injecter ce nouveau tableau dans le JSX de retour.

```js
return (
  <ul className="instructions">
    {transformedData}
  </ul>
);
```

### Tableau d'objets

Un tableau peut avoir des objets comme élément. C'est la cas de la propriété `ingredients` dans nos data. Si on tente de passer ce tableau directement dans le JSX, on va lever une erreur. En effet, les objets ne sont pas directement interprétable dans du JSX. Il faudra donc inpérativement transposer ces tableaux en liste d'élements JSX.

On aura les mêmes étapes

#### passage des props

```js
// --- Composant Recipe 
// passage dans les props à l'instanciation
 <Ingredients ingredients={recipeData.ingredients} />
```

#### validation des props
```js
// --- Composant Ingredients 
function Ingredients({ ingredients }) {
...

// validation des props
// plusieurs choix possible, le mieux étant la solution la plus précise
Ingredients.propTypes = {
  // validation uniquement du tableau
  // ingredients: PropTypes.array.isRequired,

  // validation du tableau en précisant que les éléments sont des objets
  // ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,

  // validation du tableau en décrivant la forme des objets de ce tableau
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    quantity: PropTypes.number,
    unit: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};
```

#### tranposition du tableau

Dans cet exemple, l'élément courant de la méthode `map` est un objet. On le destructure directement.

```js
const ingredientList = ingredients.map(({ id, quantity, unit, name }) => (
  // ne pas oublier la prop key
  <li key={id}>
    <span>{quantity} {unit}</span> {name}
  </li>
));
...

// utilisation de ce tableau dans le JSX de retour.
return (
  <ul className="ingredients">
    {ingredientList}
  </ul>
);
```

## Spread operator

Si on reprend le composant `Ingredient` on doit lui passer 3 props : `quantity` `unity` et `name`.
Si on prend comme exemple l'objet de donnée suivant

```js
const data = {
  id: 15,
  name: 'chocolat',
  unity: 'g',
  quantity: '100',
  extra: 'le chocolat noir est à privilégier'
};
```

On peut passer les infos de cet objet au composant `Ingredient` comme ceci

```js
<Ingredient
  quantity={data.quantity}
  unit={data.unit}
  name={data.name}
/>
```

On peut choisir de destructurer `data` avant

```js
const {quantity, unit, name} = data;

<Ingredient
  quantity={quantity}
  unit={unit}
  name={name}
/>
```

Une solution plus élégante sera le spread operator `...`. Cet utilitaire permet de déverser des propriétés d'un objet dans un autre objet ou de déverser des éléments d'un tableau dans un autre tableau.

```js
const obj1 = {
  firstname: 'Jean',
  lastname: 'Bon'
}
// je déverse les propriétés d'obj1 dans le nouvel objet obj2
// On aura ainsi une nouvelle référence d'objet avec les mêmes propriétés qu'un autre
// ici obj1 n'est pas égal à obj2
const obj2 = {...obj1}; // { firstname: 'Jean', lastname: 'Bon' }

// pour les tableaux ce seront les éléments qui seront copiés
// et on a aussi 2 références de tableau différentes avec les mêmes éléments
// ici array1 n'est pas égal à array2
const array1 = ['pomme', 'poire', 'banane'];
const array2 = [...array1]; // ['pomme', 'poire', 'banane']
```

Ici spread opaerator va nous permettre de déverser les propriétés de l'objet `data` dans l'objet de props.

```js
<Ingredient
  {...data}
/>
```

Si on regarde ce code une fois transpiler, on voit bien que l'objet data sera déverser dans l'objet des props.

```js
React.createElement(Ingredient, {...data})
```

# En cas de problème

Pour augmenter le nombre de "watcher" pour yarn : `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`