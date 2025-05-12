import React, { useState } from 'react';
import './styles.css';
import { Eye } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase.js';

const FragmentCard = ({ fragment }) => {
  const { id, title, description, tags, code } = fragment;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/fragment-form/${id}`);
  };

  const handleEyeClick = (e) => {
    e.stopPropagation(); 
    setShowModal(true);
  };

  return (
    <>
      <div className="fragment-card" onClick={handleCardClick}>
        <div className="fragment-header">
          <h3>{title}</h3>
          <Eye size={20} onClick={handleEyeClick} className="eye-icon" />
        </div>
        <p className="fragment-description">{description}</p>
        <div className="fragment-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>

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
