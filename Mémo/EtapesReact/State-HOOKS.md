# Les States

! Attention maintenant il est conventionnel d'utiliser les HOOKS

- Ancienne Méthodes

```js
import currenciesData from 'src/data/currencies';
import './style.scss';

class Converter extends React.Component {
  constructor(props) {
    super(props);
    // le state va nous permettre de stocker des données interne au composant
    // à chaque fois qu'on modifie une de ses valeurs
    // React va refaire un rendu : réexécution de la fonction render
    this.state = {
      open: true,
    };
  }

  // const open = true;
  // render: la méthode qui renverra le JSX
  render() {
    // on destructure le state pour récupérer les valeurs qui nous intéresse
    const { open } = this.state;

    return (
      <div className="converter">
        <Header baseAmount={1} />
        {/* avec le ET logique si la valeur à gauche est vraie on traite ce qui est à droite
          sinon on ne le traite pas
        */}
        {open && (
          <Currencies currencies={currenciesData} />
        )}
        <Amount
          value={1.09}
          currency="United State Dollar"
        />
      </div>
    );
  }
}

export default Converter;
```

---

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
