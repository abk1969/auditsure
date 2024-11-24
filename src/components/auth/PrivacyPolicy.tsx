import React from 'react';

export function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
      <div className="prose dark:prose-invert">
        <h2>1. Collecte des données</h2>
        <p>
          Nous collectons uniquement les données nécessaires à la fourniture de nos services
          de conformité ISO 22342. Ces données incluent :
        </p>
        <ul>
          <li>Informations d'identification de l'organisation</li>
          <li>Coordonnées professionnelles</li>
          <li>Données relatives à la conformité ISO 22342</li>
        </ul>

        <h2>2. Utilisation des données</h2>
        <p>
          Vos données sont utilisées exclusivement pour :
        </p>
        <ul>
          <li>Fournir nos services de conformité</li>
          <li>Améliorer votre expérience utilisateur</li>
          <li>Respecter nos obligations légales</li>
        </ul>

        <h2>3. Protection des données</h2>
        <p>
          Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles
          conformes au RGPD pour protéger vos données.
        </p>

        <h2>4. Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez des droits suivants :
        </p>
        <ul>
          <li>Droit d'accès</li>
          <li>Droit de rectification</li>
          <li>Droit à l'effacement</li>
          <li>Droit à la portabilité</li>
          <li>Droit d'opposition</li>
        </ul>
      </div>
    </div>
  );
}