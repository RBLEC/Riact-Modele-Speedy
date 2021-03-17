# NPM vs Yarn

- Npm est actuellement le gestionnaire de paquets le plus utilisé dans le monde Javascript. Fin 2016, son jeune concurrent Yarn fait son apparition et gagne très vite en popularité. Seulement une semaine après sa sortie, le projet recueille plus de 15 000 stars sur Github et forme une communauté déjà très active.

- Yarn est issue d’une collaboration entre plusieurs équipes avec notamment des développeurs de Facebook et Google. Ce dernier a été développé dans le but de résoudre un certain nombre de problèmes que ses auteurs eux-mêmes rencontraient en utilisant Npm 

[Pour plus d'information](https://blog.zenika.com/2017/03/13/npm-vs-yarn/)

**! Yarne est plus rapide**

---

## Npm vs Yarn : les commandes

Voici un comparatif des commandes les plus utilisées avec Yarn et Npm :

| NPM | Yarn       | Description Action|
|---|---|---|
| npm install (ou npm i) | yarn (or yarn install) |Installe les dépendances à partir du  package.json |
|npm install `<package>` –save|yarn add `<package>`	|Ajoute un paquet et sauvegarde la référence dans les dépendances du  package.json |
|npm i `<package>` --save-dev|yarn add `<package>` --dev| Installe les dépendences en mode développement |
|npm update –save |yarn upgrade|Met à jour la liste des dépendances.|
|npm install `<package>` -g|yarn global add `<package>`	|Installe un paquet de manière globale sur le système d’exploitation |
|npm uninstall `<package>` –save|yarn remove `<package>`| Supprime une dépendance et sa référence dans le package.json |
|npm run nom_du_raccourci|yarn nom_du_raccourci|Pour lancer ce raccourci qui sont dans package.json|

- Lors d’un yarn add `<package>` ou yarn remove `<package>`, la modification est directement sauvegardée dans le package.json. C’est pourquoi l’option --save n’est pas présente dans Yarn.