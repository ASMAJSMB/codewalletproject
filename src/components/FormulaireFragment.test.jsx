import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormulaireFragment from './FormulaireFragment';
import { MemoryRouter, Route, Routes } from 'react-router-dom';



// Mock Firebase modules pour Jest
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
}));

jest.mock('firebase/analytics', () => ({
  getAnalytics: jest.fn(),
  isSupported: jest.fn(() => Promise.resolve(false)),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  getDocs: jest.fn(),
  deleteDoc: jest.fn(),
}));

// Mock des fonctions firestore
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  getDocs: jest.fn(),
  deleteDoc: jest.fn(),
}));

import { collection, addDoc, getDoc, doc, updateDoc, getDocs, deleteDoc } from 'firebase/firestore';

const mockNavigate = jest.fn();

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: null }), // Par défaut pas d'id
}));

describe('FormulaireFragment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('affiche le formulaire en mode création', () => {
    render(
      <MemoryRouter>
        <FormulaireFragment />
      </MemoryRouter>
    );

    expect(screen.getByText(/new fragmennt/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toHaveValue('');
    expect(screen.getByLabelText(/Code/i)).toHaveValue('');
    expect(screen.getByLabelText(/Tags/i)).toHaveValue('');
  });

  test('soumission du formulaire crée un fragment', async () => {
    getDocs.mockResolvedValue({ docs: [] });
    addDoc.mockResolvedValue({ id: 'newId' });

    render(
      <MemoryRouter>
        <FormulaireFragment />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test title' } });
    fireEvent.change(screen.getByLabelText(/Code/i), { target: { value: 'console.log("test")' } });
    fireEvent.change(screen.getByLabelText(/Tags/i), { target: { value: 'tag1, tag2' } });

    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledTimes(3); // 2 tags ajoutés + 1 fragment
      expect(mockNavigate).toHaveBeenCalledWith('/fragments');
    });
  });

  test('clic sur delete appelle deleteDoc', async () => {
    // Mock useParams avec id
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
      useParams: () => ({ id: 'testId' }),
    }));

    render(
      <MemoryRouter>
        <FormulaireFragment />
      </MemoryRouter>
    );

    // Simuler la confirmation window.confirm
    window.confirm = jest.fn(() => true);

    fireEvent.click(screen.getByText(/Delete/i));

    await waitFor(() => {
      expect(deleteDoc).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/fragments');
    });
  });

  test('affiche les données du fragment si id est défini', async () => {
    // Mock useParams avec id
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
      useParams: () => ({ id: 'fragment123' }),
    }));

    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({
        title: 'Titre existant',
        code: 'code existant',
        tags: ['tagA', 'tagB'],
      }),
    });

    render(
      <MemoryRouter>
        <FormulaireFragment />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Title/i)).toHaveValue('Titre existant');
      expect(screen.getByLabelText(/Code/i)).toHaveValue('code existant');
      expect(screen.getByLabelText(/Tags/i)).toHaveValue('tagA, tagB');
    });
  });
});
