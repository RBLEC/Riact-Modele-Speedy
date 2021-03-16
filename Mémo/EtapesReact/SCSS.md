# Style SASS

Pour styler les composants on va passer par un préprocesseur : SASS. Il s'agit, comme pour Babel, d'un traducteur de fichier. Mais cette fois ce sera des fichier .scss qui seront traduit en .css. Il existe plusieurs sortes de préprocesseur : PostCss, stylus, Less... Leur point commun c'est la possibilité de faire du CSS avec des fonctionnalités en plus.

## Règles imbriquées

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

## Parent selector

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