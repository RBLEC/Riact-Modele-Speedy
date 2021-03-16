# Début de project

on initialise le project apres avoir fait le début de gestion de project

📦 React Modele
===============

Bienvenue dans ce modèle/template de projet React !

- Première utilisation
- Comment démarrer un projet ?
- Build du projet

Première utilisation
--------------------

Récupérez une copie du modèle :

```sh
git clone git@github.com:O-clock-Pan/React-modele.git

cd React-modele

# installe les dépendances du projet
yarn 

# lance le serveur de developpement
yarn start 

# rdv sur http://localhost:8080/
```

Voilà, le modèle tourne, mais en fait ça ne sert pas à grand chose. L'idée est de se _baser sur_ le modèle, mais de le faire tourner dans un autre projet.

---

Comment démarrer un projet avec ce modèle ?
-------------------------------------------

On peut se baser sur React-modele pour démarrer un *nouveau* projet, ou bien pour travailler sur un challenge avec une base de code déjà existante.

Dans les deux cas, il s'agit essentiellement de copier/coller les parties intéressantes du modèle dans le dossier du projet/challenge, sans écraser d'éventuels fichiers spécifiques. 

Pour ce faire :

``` sh
# Exemple : après avoir cloné un challenge dans le dossier mon-challenge/

# direction le dossier du challenge
cd mon-challenge

# copie des fichiers cachés et non-cachés présents à la racine du modèle
# note : des alertes sont affichées à propos de dossiers ignorés, c'est normal
cp -n ../React-modele/{.*,*} .

# copie (récursive) des dossiers src/, config/ et public/
# note : des alertes sont affichées à propos de dossiers ignorés, c'est normal
cp -rn ../React-modele/{src,config,public} .

# installation des dépendances listées dans le package.json
yarn

# lancement du serveur de dev
yarn start
```

---

Build du projet
---------------

Le mode d'utilisation par défaut consiste à lancer un serveur de dev avec `yarn start`, mais alors tout est géré en mémoire : on ne voit jamais le résultat concret du travail de Webpack.

Webpack peut toutefois produire une version concrète du projet dans un dossier `dist/` avec la commande `yarn build`.

`build` permet de construire le projet pour la **production** (version prête pour hébergement).
- Assemblage des fichiers
- Copie de fichiers
- Nettoyage du code
- Minification du code
- ...

```sh
# dans le dossier du projet
cd mon-projet

# build de production : les fichiers sont rassemblés *et optimisés*
yarn build
```

---

Lancer votre project 

    yarn
    yarn start
    
