// == Import npm
import React from 'react';

// == Import
import './styles.scss';

// == Composant
function List() {
  
  return (
    <div className="list">
      <h1>Composant : List</h1>
      <p>Création d'une liste</p>
      <div>
        <header>Header</header>
        <ul>
          <li>Liste 1</li>
        </ul>
        <ul>
          <li>
            Liste 2
          </li>
        </ul>
      </div>
    </div>
  );
}

// == Export
export default List;