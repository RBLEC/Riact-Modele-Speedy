# useEffect

## Lifecyle 

Le `useEffect` permet d'exécuter une fonction, après chaque rendu d'un composant

Des effets peuvent être déclenchés :

- lors de la création d'un composant - mount - ( rendu initial )
- lors de la mise à jour du composant - update - ( évolutions - par exemple, le state )

### Syntaxe

- `useEffect(() => {})`, au chargement initial **et** lors d'évolutions
- `useEffect(() => {}, [])`, au chargement initial **uniquement**
- `useEffect(() => {}, [info])`, au chargement initial et si la variable info change **uniquement**

### Exemples

Ce `useEffect` s'éxecute à chaque rendu ( mount et update)

```js
useEffect(() => {
    console.log('Oh, un nouveau rendu vient de se produire');
});
```

Ce `useEffect` s'éxecute _uniquement_ au rendu initial

```js
useEffect(() => {
    console.log('Au chargement initial, composant construit / rendu');
}, []);
```

Ce `useEffect` s'éxecute au rendu initial **et** quand count va changer

```js
const [count, setCount] = useState(0);
useEffect(() => {
    console.log('Au chargement initial et/ou au changement de count', count);
}, [count]);
setCount(count + 1);
```

## Le nettoyage

Le 3ieme effet kisscool du `useEffect` c'est la possibilité de nettoyer ce qu'on fait dedans. Par exemple l'équivalent du componentWillUnmount.

Sauf que cette fois-ci, on a quelque chose au final de plus puissant, car on va pouvoir nettoyer au démontage, mais aussi à chaque changement de variable si on a envie.

### Syntaxe

- `useEffect(() => { return () => {} })`, nous permet de faire un effet de bord à chaque render, et d'annuler cet effet de bord à chaque fois juste avant **et** au démontage du composant
- `useEffect(() => { return () => {} }, [])`, nous permet de faire un effet de bord render au initial, et d'annuler cet effet de bord au démontage du composant ( willUnmount )
- `useEffect(() => { return () => {} }, [info])`, nous permet de faire un effet de bord au render initial et à chaque changement de la variable info et ainsi d'annuler cet effet de bord au démontage du composant ( willUnmount ), ou juste aprés que la variable ai changée ( mais juste avant l'effet de bord suivant )

### Exemples

Je décide d'ajouter un eventListener dans mon `useEffect` au montage du composant puis de supprimer cet eventListener au démontage du composant

```js
useEffect(() => {
  const onScroll = () => { console.log ('Je scroll')};
  window.addEventListener('scroll', onScroll);
  // Fonction de nettoyage
  return () => {
    // Fait l'inverse du useEffect
    window.removeEventListener('scroll', onScroll);
  }
}, []);
```

Je décide de faire un console.log dans mon `useEffect` a chaque render, et de faire un console.log juste avant chaque effet de bord

```js
useEffect(() => {
  console.log("Lancement de l'effet de bord");
  // Fonction de nettoyage
  return () => {
    // Fait l'inverse du useEffect
    console.log("Nettoyage du dernier effet de bord");
  }
});
```

Je décide d'ajouter un eventListener dans mon `useEffect` au montage du composant puis de supprimer cet eventListener au démontage du composant, ou quand la variable info va changer

```js
const [info, setInfo] = useState('Ma super info');
useEffect(() => {
  const onScroll = (vInfo) => { console.log ('Je scroll avec des infos', vInfo)};
  window.addEventListener('scroll', onScroll.bind(info));
  // Fonction de nettoyage
  return () => {
    // Fait l'inverse du useEffect
    window.removeEventListener('scroll', onScroll);
  }
}, [info]);
setInfo('Ma nouvelle info');
```