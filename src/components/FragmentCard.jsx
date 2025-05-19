import React, { useState } from 'react';
import './styles.css'; // Fichier CSS pour le style du composant
import { Eye } from 'lucide-react'; // Icône représentant un œil pour afficher le code
import { useNavigate } from 'react-router-dom'; // Pour rediriger vers une autre page
import { db } from '../firebase.js'; // Connexion à la base Firebase (non utilisé ici mais probablement pour des extensions futures)


const FragmentCard = ({ fragment }) => {
  // Décomposition des propriétés du fragment
  const { id, title, description, tags, code } = fragment;

  const [showModal, setShowModal] = useState(false);

  // Hook pour naviguer entre les pages
  const navigate = useNavigate();

  // Fonction déclenchée quand on clique sur la carte
  const handleCardClick = () => {
    navigate(`/fragment-form/${id}`); // Redirige vers le formulaire de modification du fragment
  };

  // Fonction déclenchée quand on clique sur l'icône "œil"
  const handleEyeClick = (e) => {
    e.stopPropagation(); // Empêche le déclenchement du clic sur la carte (évite d'être redirigé)
    setShowModal(true);  // Affiche le modal contenant le code
  };

  return (
    <>
      
      <div className="fragment-card" onClick={handleCardClick}>
        <div className="fragment-header">
          <h3>{title}</h3>
          <Eye size={20} onClick={handleEyeClick} className="eye-icon" /> {/* Icône œil pour voir le code */}
        </div>
        <p className="fragment-description">{description}</p> 
         {/* Affichage de la description  */}
        <div className="fragment-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span> // Affiche les tags un par un
          ))}
        </div>
      </div>

       {/* Modal qui s’affiche pour voir le code  */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h4>Code du fragment</h4>
            <pre>{code}</pre> 
            <button onClick={() => setShowModal(false)}>Fermer</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FragmentCard;
