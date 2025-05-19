import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import './tagstyle.css';

// Composant Tags pour gérer la liste des tags (ajout, modification, suppression)
export default function Tags() {
  // État pour stocker les tags récupérés depuis Firestore
  const [tags, setTags] = useState([]);
  // État pour gérer l'affichage du modal (popup)
  const [modalOpen, setModalOpen] = useState(false);
  // État pour savoir si on est en mode édition ou création
  const [editMode, setEditMode] = useState(false);
  // État pour stocker le tag actuellement édité ou créé
  const [currentTag, setCurrentTag] = useState({ id: null, name: '' });
  

  // Référence à la collection "tags" dans Firestore
  const tagsCollection = collection(db, 'tags');

  // Fonction pour récupérer les tags depuis Firestore
  const fetchTags = async () => {
    const data = await getDocs(tagsCollection);
    // On transforme les documents Firestore en objets JS avec id
    setTags(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  // Chargement initial des tags au montage du composant
  useEffect(() => {
    fetchTags();
  }, []);

  // Ouvre le modal en mode création (nouveau tag)
  const openNewModal = () => {
    setEditMode(false);
    setCurrentTag({ id: null, name: '' }); // Reset du tag en cours
    setModalOpen(true);
  };

  // Ouvre le modal en mode édition avec le tag sélectionné
  const openEditModal = (tag) => {
    setEditMode(true);
    setCurrentTag(tag); // On charge les données du tag dans le formulaire
    setModalOpen(true);
  };

  // Sauvegarde le tag (création ou mise à jour)
  const handleSave = async () => {
    if (currentTag.name.trim() === '') return; // Empêche d'enregistrer un tag vide

    if (editMode) {
      // En mode édition, on met à jour le tag existant
      const tagRef = doc(db, 'tags', currentTag.id);
      await updateDoc(tagRef, { name: currentTag.name });
    } else {
      // En mode création, on ajoute un nouveau document dans Firestore
      await addDoc(tagsCollection, { name: currentTag.name });
    }

    setModalOpen(false); // Ferme le modal
    fetchTags();         // Recharge la liste des tags pour mettre à jour l'affichage
  };

  // Supprime le tag actuellement sélectionné
  const handleDelete = async () => {
    const tagRef = doc(db, 'tags', currentTag.id);
    await deleteDoc(tagRef);
    setModalOpen(false); // Ferme le modal après suppression
    fetchTags();         // Recharge la liste mise à jour
  };

  return (
    <div className="container">
      {/* Liste des tags affichés sous forme de div cliquables */}
      <div className="tags-list">
        {tags.map((tag) => (
          <div
            key={tag.id}
            onClick={() => openEditModal(tag)} // Ouvre le modal en mode édition au clic
            className="tag"
          >
            {tag.name}
          </div>
        ))}
      </div>

      {/* Bouton pour créer un nouveau tag */}
      <h1 className="title"></h1>
      <button onClick={openNewModal} className="btn btn-new">New</button>

      {/* Modal pour créer/éditer un tag */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            {/* Titre du modal selon le mode */}
            <h2 className="modal-title">
              {editMode ? 'Edit Tag' : 'New Tag'}
            </h2>

            {/* Input pour le nom du tag */}
            <input
              type="text"
              value={currentTag.name}
              onChange={(e) =>
                setCurrentTag({ ...currentTag, name: e.target.value }) // Met à jour le state au changement de texte
              }
              className="modal-input"
              placeholder="Tag name"
            />

            {/* Actions disponibles dans le modal */}
            <div className="modal-actions">
              {/* Bouton supprimer visible uniquement en mode édition */}
              {editMode && (
                <button onClick={handleDelete} className="btn btn-delete">
                  Delete
                </button>
              )}

              {/* Bouton pour sauvegarder les modifications */}
              <button onClick={handleSave} className="btn btn-save">
                Save
              </button>

              {/* Bouton pour fermer le modal sans sauvegarder */}
              <button onClick={() => setModalOpen(false)} className="btn btn-cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
