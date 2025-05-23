import React from 'react';

import { render, screen } from '@testing-library/react';

// Pour ajouter des vérifications utiles (comme "toBeInTheDocument")
import '@testing-library/jest-dom';

// On importe le composant à tester
import App from './src/App.jsx';

// On commence la suite de tests pour le composant App
describe('App', () => {

  // Ce test vérifie que le bouton "New Fragment" s'affiche
  test('affiche le bouton "New Fragment"', () => {
    render(<App />); // On affiche App
    const bouton = screen.getByText(/new fragment/i); // On cherche le texte
    expect(bouton).toBeInTheDocument(); // On vérifie qu'il est là
  });

  // Ce test vérifie que le titre "Fragments" est affiché
  test('affiche le titre principal "Fragments"', () => {
    render(<App />); // On affiche App
    const titre = screen.getByText(/^fragments$/i); // On cherche le titre
    expect(titre).toBeInTheDocument(); // On vérifie qu'il est là
  });
});
