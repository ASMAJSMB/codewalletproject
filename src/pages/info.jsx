import React from "react";
import { db } from '../firebase.js';
import './style.css';  

const Info = () => {
  return (
    <div className="info-container">
      <h1 className="page-title">Informations sur l'Application</h1>

     
      <section className="info-section">
        <h2>Fonctionnalités de l'application</h2>
        <ul>
          <li><strong>Gestion des Tags :</strong> Ajoutez, modifiez et supprimez des tags facilement.</li>
          <li><strong>Authentification sécurisée :</strong> Connexion et gestion des comptes utilisateurs avec des options de sécurité avancées.</li>
          <li><strong>Interface responsive :</strong> L'application s'adapte à tous les types d'écrans, que ce soit sur desktop, tablette ou mobile.</li>
          <li><strong>Stockage Cloud :</strong> Toutes les données sont stockées dans Firebase pour une gestion sécurisée et fiable.</li>
        </ul>
      </section>

      
      <section className="info-section">
        <h2>Développeurs</h2>
        <p>L'application a été développée par une équipe de passionnés de technologie et de développement web.</p>
        <ul>
          <li><strong>Développeuse Frontend :</strong> Asma Haddad - Developpeuse fullstack .</li> 
        </ul>
      </section>

     
      <section className="info-section">
        <h2>Cadre Légal et Gestion des Données</h2>
        <p>
          Cette application respecte les lois en vigueur concernant la protection des données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD) de l'Union Européenne. Les informations collectées par l'application sont exclusivement utilisées pour le fonctionnement interne et la gestion des utilisateurs. Aucune donnée personnelle n'est partagée avec des tiers sans consentement préalable.
        </p>
        <p>
          Pour plus d'informations sur notre politique de confidentialité et les conditions d'utilisation, veuillez consulter les sections appropriées dans les paramètres de l'application.
        </p>
      </section>
    </div>
  );
};

export default Info;
