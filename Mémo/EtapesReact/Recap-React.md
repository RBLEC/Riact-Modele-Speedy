
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

# Statefull Components

## State

Le state ou état de l'application ou source de vérité (single source of truth en anglais). Il va nous permettre de stocker des données internes à l'application **qui vont varier dans le temps**.
## setState

`setState()` planifie des modifications à l’état local du composant, et indique à React que ce composant et ses enfants ont besoin d’être rafraîchis une fois l’état mis à jour.

`setState()` ne met pas toujours immédiatement le composant à jour. Il peut regrouper les mises à jour voire les différer.  

**:warning: En conséquence, lire la valeur de this.state juste après avoir appelé setState() est une mauvaise idée.**

`setState()` s'apelle en passant un objet comme premier argument. Il représente le changement qui doit se produire
Son deuxième argument est une fonction de callback qui sera exécutée une fois le changement effectué

```js
setState(stateChange[, callback])
```

Par exemple :

```js
// ...
// Etat initial
this.state = {
  name: 'Un produit',
  price: 12,
  quantity: 1
}
// ...
// Changement d'état ( suite à un clic sur un bouton par exemple )
this.setState({
  quantity: 4
});

```

Va provoquer un changement d'état et donc provoque aussi un re-render qui lui même exécuter une nouvelle fois la fonction render.

Suite à cette modification au moment du render le state vaudra donc : 

```js
this.state = {
  name: 'Un produit',
  price: 12,
  quantity: 4
}
```

### Mise en place

Pour mettre en place le `state`, il faut convertir la fonction en classe et étendre de `React.Component`

```js
class Converter extends React.Component {...
```

#### Version legacy

Le state est instancié dans le `constructor` avec l'ancienne méthode. C'est un objet qui est une propriété de la classe.

```js
constructor(props) {
  super(props);
  
  this.state = {
    open: false
  }
}
```

#### Version moderne

Grâce au plugin `@babel/plugin-proposal-class-properties` on peut déclarer les propriétés de classe directement à la racine de celles-ci, sans passer par le `constructor`.

```js
// à la racine de la classe
state = {
  open: false,
}
```

#### Phase de rendu : render

En passant par une classe il faut changer la façon de rendre le JSX. La méthode `render` est là pour ça. Il faut donc penser à placer le JSX retourné dans la méthode `render` de la classe.

```js
class Converter extends React.Component {
  ...
  render() {
    return (
      <div>JSX à retourner</div>
    );
  }
}
```
### Utilisation du state

Le state est un objet, on peut récupérer ses données via l'écriture pointée comme n'importe quel objet JS. Il faut juste penser à rajouter `this` devant car c'est une propriété de la classe.

```js
this.state.open
```

### Changement de state : setState

Pour modifier le state, on passe par la fonction `setState`. Cela permet à React de savoir qu'un changement de donnée a eu lieu et une fois que le state est à jour, **React procède à un nouveau rendu** : il réexécute la fonction `render`

Pour utiliser `setState` on passe en argument un objet avec la ou les propriétés qu'on souhaite changer.

```js
this.setState({
  open: !open,
});
```

> **Attention** : il ne faut jamais modifier le state directement `this.state.open = false` React ne fait pas de rendu dans ce cas de figure

## Composant contrôlé

[Lien de la doc officielle](https://fr.reactjs.org/docs/forms.html#controlled-components)

## Comment gérer un click sur un sous-composant et changer le state du root component

Dans un premier temps on test le onClick sur l'élément directement avec `alert` par exemple.  
Prenons pour exemple le clic sur une currency.  
On va dans le composant concerné `<Currency>` et on créé une propriété `onClick` sur l'élément **natif** `<li>`

**:warning: La propriété onClick ne fonctionne de facon native QUE sur des composants natifs comme `div`, `a`, `li`, `button`, etc ...**

Si on créé une propriété **qu'elle qu'elle soit** sur un composant custom, **il va falloir** l'interpréter par vous même

Si on clic sur une currency, en fait on clic sur le `li`, et on peut constater que le `li` fait bien son travail, car l'alert s'affiche.

Le soucis, c'est qu'on veut pouvoir interragir avec le root component. Il faut donc remonter jusqu'à lui.  
On va donc passer par tous les intermédiaires.

Le parent direct de `<Currency>` c'est `<Currencies>`, il faut donc que `<Currencies>` donne à `<Currency>` un propriété au Clic, un `onClick`. 

Ce `onClick` sera donc une propriété custom d'un composant custom. Il va donc falloir trouver un moyen de la déclencher. Ce sera le travail du `<li>` natif de `<Currency>`

Maintenant la logique au clic est passée de `<Currencies>` à `<Currency>`. Il faut réitérer l'opération autant de fois qu'il y a d'intermédiaire entre le root component et le composant qui déclenche le clic

Ici, il faut le faire encore une dernière fois. C'est `<Converter>` qui doit avoir la fonction à déclencher au click, il doit donc la donner à `<Currencies>` qui lui la donne à `<Currency>` qui lui la donne au `<li>` qui lui la déclenche au clic.

J'ai pu remonter le click jusqu'a la définition dans `<Converter>`, je peux donc avoir accès au `this.setState`, il ne me manque plus qu'a changer l'état du composant `<Converter>`

## Transmettre des paramètres au click jusqu'au root component

L'idée ici c'est de donner les paramètres qui correspondent au click, au moment où on les as, sous la forme la plus proche voulue.

Ici on veut pouvoir au clic transmettre la currency sur laquelle on a cliqué. Pour ça il nous la currency.  

Mais où a-t-on accès à cette currency dans tout sa forme ? Dans le composant `<Currencies>` au moment ou on créé les `<Currency>`

A ce moment là on passe la propriété `onClick` à `<Currency>` on va dont l'intercepter et rajouter un intermédiaire ( une fonction anonyme ).

```js
<Currency
  key={currency.name}
  {...currency}
  onClick={() => {
    onCurrencyClick(currency);
  }}
/>
```

La fonction anonyme dans le `onClick`, va permettre de récuper la main, et d'appliquer des paramètres à la fonction représentée par la props `onCurrencyClick`. C'est en fait les prémisse du `hosting`.


# [Le LifeCycle](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)


## Montage du composant

### Le constructeur

Avant même le montage du composant, on passe dans le `constructor`, c'est une fonction qui va permettre d'instancier le composant lui même.

**Si vous n’initialisez pas d’état local ( un state ), vous n’avez pas besoin d’implémenter votre propre constructeur pour votre composant React.**

Cependant ESLint vous insulte copieusement, si vous ne le faite pas. Donc on le fait quand même ( dans un composant classe forcément )

Pour résumer un `constructor` est la pour initialiser un composant avec son état initial. Il se sert pas à faire de requetes ou quoi que ce soit d'autre. Et c'est la **première** fonction a être éxécutée dans un composant.

### Le render au montage

C'est la fonction qu'on utilise depuis le début, cette fonction nous permet d'afficher un visuel pour le composant.

On ne DOIT PAS changer d'état ( de faire de `setState`) dans cette fonction ( sauf si on le fait dans un callback plus tard ). Sinon on risque de faire __une boucle infini__ de `render`.

Avant la méthode `render` on a la vu avant la mise à jour du state.  Pendant la méthode `render` on est en train de mettre à jour, donc on ne visualise pas encore les modifications.  
La mise à jour du `DOM` est donc effective **qu'après** la méthode render. Ce qui est évident puisque elle **retourne** du `jsx`

### Le componentDidMount

De la même facon que `render`, nous ne l'appelons pas explicitement, c'est react qui s'en occupe pour nous.
Sauf que cette méthode, est là pour dire que le composant __vient__ de se monter et qu'il a fini de faire le __rendu__.

Cette methode va servir à aller faire des initialisation, comme le constructor, mais pas sur le state, plutot sur de la donnée **asynchrone**,  par exemple, on va aller cherche une liste de monnaie en base de donnée. On a besoin de le faire qu'une seule fois, et on a besoin de le faire au chargement du composant. Donc `componentDidMount`
Elle sert aussi à lancer des écouteurs d'évènements. Par exemple un `eventListener` sur un scroll d'une div d'un composant.
Ce qu'on ne pourrait pas faire dans le `constructor` car le dom du composant n'existe pas encore

## La mise à jour du composant

### Le render à la mise à jour

Un composant une fois monté est en attente de changement. Comment provoquer un changement ?

Il y a 3 solutions : 

- `newProps`, Si on change les props d'un composant, ça va provoquer un `render` de ce composant, c'est à dire ajout/suppression/modification d'une ou plusieurs prop(s) existante(s)
- `setState`, un changement d'état par déclenchement de la fonction `setState` va obligatoirement et de facon **asynchrone** provoquer un `render`
- `forceUpdate`, l'utilisation de la fonction `forceUpdate` a pour but de déclancher un nouveau `render`. Cette fonction on ve va jamais l'utiliser, on peut toujours faire sans.

Une fois le `render` effectué, de la même facon qu'au montage. Il va cette fois ci se passer quelque chose de supplémentaire.

### Le componentDidUpdate

Cette fonction va se passer juste après chaque `render`. Elle sert à vérifier si on doit faire des traitements aprés. Elle admet 3 arguments, dont seulement 2 nous intéressent.

- `prevProps`, qui représente les props **avant** le render qui vient de se passer
- `prevState`, qui représente le state **avant** le render qui vient de se passer

Ce qui nous permet donc de pouvoir __comparer__ l'état précédent avec l'état en cours ( props et/ou state ).

## Le démontage

Un composant se démonte quand il va ne plus faire partit du DOM. C'est à dire quand il n'est plus rendu. C'est au dela de le cacher en CSS, il n'est réellement plus là.

### Le componentWillUnmount

Cette fonction va se déclencher **juste avant** le démontage effectif du composant. Parce que elle ne peut pas se déclencher sur un composant qui n'existe plus ( voila pourquoi __juste avant__)

Ici on est plutot dans une optique de **nettoyage de l'interface**. Si précédement on avait par exemple créé un eventListener sur le scroll d'une div, cet event listener est toujours appliqué. Il faut le supprimer cet evenListener. Cette fonction `componentWillUnmount` est là pour ça. On va utiliser un `removeEventListener`
