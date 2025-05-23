import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import "./stylfragment.css";
import FormulaireFragment from '../components/FormulaireFragment';



// Composant pour afficher la liste des fragments de code
const FragmentsPage = () => {
  // État pour stocker les fragments récupérés de la base de données
  const [fragments, setFragments] = useState([]);
  // État pour gérer l'affichage du code d'un fragment (id du fragment affiché)
  const [codeVisibleId, setCodeVisibleId] = useState(null);
  const navigate = useNavigate();

  // useEffect pour charger les fragments depuis Firestore au chargement du composant
  useEffect(() => {
    const fetchFragments = async () => {
      const querySnapshot = await getDocs(collection(db, 'fragments'));
      const fragmentsData = [];

      querySnapshot.forEach(doc => {
        // On récupère les données et on ajoute l'id du document
        fragmentsData.push({ ...doc.data(), id: doc.id });
      });

      setFragments(fragmentsData); // on met à jour l'état avec les fragments récupérés
    };

    fetchFragments();
  }, []);

  // Fonction pour afficher/masquer le code d'un fragment au clic sur l'oeil
  const handleShowCode = (id) => {
    if (codeVisibleId === id) {
      setCodeVisibleId(null);  // cache le code si déjà visible
    } else {
      setCodeVisibleId(id);    // affiche le code du fragment sélectionné
    }
  };

  // Navigue vers la page de formulaire pour modifier le fragment sélectionné
  const handleNavigate = (id) => {
    navigate(`/formulaire/${id}`);
  };

  // Copie le code dans le presse-papier et affiche un message de succès ou d'erreur
  const handleCopyCode = (code, e) => {
    e.stopPropagation(); // empêche la propagation du clic au parent (pour éviter la navigation)
    navigator.clipboard.writeText(code)
      .then(() => {
        alert("Code copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="fragments-page ">
      <h1 className='fr'>Fragments</h1>

      {/* Bouton pour créer un nouveau fragment */}
      <div className="button-container">
        <Link to="/formulaire/new">
          <button className="new-fragment-button">New Fragment</button>
        </Link>
      </div>

      {/* Liste des fragments */}
      <div className="fragments-list">
        {fragments.length === 0 ? (
          <p>No fragments available.</p> // message si aucun fragment trouvé
        ) : (
          fragments.map((fragment) => (
            <div
              key={fragment.id}
              className="fragment-card"
              onClick={() => handleNavigate(fragment.id)} // navigation vers modification
            >
              <div className="fragment-header">
                <h3>{fragment.title}</h3>
                {/* Bouton œil pour afficher le code */}
                <button
                  className="eye-button"
                  onClick={(e) => {
                    e.stopPropagation(); // évite la navigation en cliquant sur l'œil
                    handleShowCode(fragment.id);
                  }}
                >
                  <FaEye />
                </button>
              </div>

              {/* Affichage des tags */}
              <p>Tags: {fragment.tags.join(', ')}</p>

              {/* Affichage conditionnel du code */}
              {codeVisibleId === fragment.id && (
                <div className="code-container">
                  {/* Bouton pour fermer l'affichage du code */}
                  <button
                    className="close-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCodeVisibleId(null);
                    }}
                  >
                    ✖
                  </button>

                  {/* Zone affichant le code */}
                  <pre className="code-display">{fragment.code}</pre>

                  {/* Bouton pour copier le code */}
                  <button
                    className="copy-button"
                    onClick={(e) => handleCopyCode(fragment.code, e)}
                  >
                    Copy
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FragmentsPage;
