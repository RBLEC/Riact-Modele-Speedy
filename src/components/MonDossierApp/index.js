// == Import npm
import React from 'react';
import MonCompoSecondaire from 'src/components/MonCompoSecondaire'
import Header from 'src/components/Header'
import Nav from 'src/components/Nav'
import Main from 'src/components/Main'
import Articles from 'src/components/Articles'
import Aside from 'src/components/Aside'
import Section from 'src/components/Section'
import Footer from 'src/components/Footer'

// == Import
import reactLogo from './react-logo.svg';
import './styles.scss';

// == Composant
const MonDossierApp = () => (
  <div className="mondossierapp">
    <img src={reactLogo} alt="react logo" />
    <h1>Composant : Mon Dossier App</h1>
    < MonCompoSecondaire />
    < Header />
    < Nav />
    < Main />
    < Articles />
    < Aside />
    < Section />
    < Footer />
  </div>
);

// == Export
export default MonDossierApp;