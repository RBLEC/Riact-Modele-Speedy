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