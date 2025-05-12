import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import "./stylfragment.css";
import FormulaireFragment from '../components/FormulaireFragment';

const FragmentsPage = () => {
  const [fragments, setFragments] = useState([]);
  const [codeVisibleId, setCodeVisibleId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFragments = async () => {
      const querySnapshot = await getDocs(collection(db, 'fragments'));
      const fragmentsData = [];

      querySnapshot.forEach(doc => {
        fragmentsData.push({ ...doc.data(), id: doc.id });
      });

      setFragments(fragmentsData);
    };

    fetchFragments();
  }, []);

  const handleShowCode = (id) => {
    if (codeVisibleId === id) {
      setCodeVisibleId(null); 
    } else {
      setCodeVisibleId(id); 
    }
  };

  const handleNavigate = (id) => {
    navigate(`/formulaire/${id}`);
  };

  const handleCopyCode = (code, e) => {
    e.stopPropagation(); 
    navigator.clipboard.writeText(code)
      .then(() => {
        alert("Code copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="fragments-page">
      <h1 className='fr'>Fragments</h1>

      

      <div className="button-container">
  <Link to="/formulaire/new">
    <button className="new-fragment-button">New Fragment</button>
  </Link>
</div>


      <div className="fragments-list">
        {fragments.length === 0 ? (
          <p>No fragments available.</p>
        ) : (
          fragments.map((fragment) => (
            <div
              key={fragment.id}
              className="fragment-card"
              onClick={() => handleNavigate(fragment.id)}
            >
              <div className="fragment-header">
                <h3>{fragment.title}</h3>
                <button
                  className="eye-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowCode(fragment.id);
                  }}
                >
                  <FaEye />
                </button>
              </div>
              <p>Tags: {fragment.tags.join(', ')}</p>

              {codeVisibleId === fragment.id && (
                <div className="code-container">
                  <button
                    className="close-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCodeVisibleId(null);
                    }}
                  >
                    ✖
                  </button>
                  <pre className="code-display">{fragment.code}</pre>
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
