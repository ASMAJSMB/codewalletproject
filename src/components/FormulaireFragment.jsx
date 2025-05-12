import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { collection, addDoc, getDoc, doc, updateDoc, getDocs, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate } from 'react-router-dom';
import "./styl.css";
// voici la page du formulaire 
const FormulaireFragment = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState('');

  
  useEffect(() => {
    const fetchFragment = async () => {
      if (id) {
        const fragmentRef = doc(db, "fragments", id);
        const fragmentSnap = await getDoc(fragmentRef);

        if (fragmentSnap.exists()) {
          const data = fragmentSnap.data();
          setTitle(data.title);
          setCode(data.code);
          setTags(data.tags.join(', ')); 
        } else {
          console.log("Fragment introuvable.");
        }
      }
    };

    fetchFragment();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();

    const tagList = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "");

    try {
      const tagsCollectionRef = collection(db, "tags");
      const tagDocsSnapshot = await getDocs(tagsCollectionRef);
      const existingTags = tagDocsSnapshot.docs.map(doc => doc.data().name);

      for (let tag of tagList) {
        if (!existingTags.includes(tag)) {
          await addDoc(tagsCollectionRef, { name: tag });
        }
      }

      if (id) {
        
        const fragmentRef = doc(db, "fragments", id);
        await updateDoc(fragmentRef, {
          title,
          code,
          tags: tagList,
        });
        console.log('Fragment mis à jour avec succès');
        alert('Fragment modifié avec succès !');
      } else {
        
        const fragmentsCollectionRef = collection(db, "fragments");
        await addDoc(fragmentsCollectionRef, {
          title,
          code,
          tags: tagList,
        });
        console.log('Fragment ajouté avec succès');
        alert('Fragment enregistré avec succès !');
      }

      
      navigate('/fragments');

      
      setTitle('');
      setCode('');
      setTags('');

    } catch (error) {
      console.error("Erreur :", error);
      alert('Erreur lors de la sauvegarde.');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm("Es-tu sûr(e) de vouloir supprimer ce fragment ?");
    if (confirmDelete) {
      try {
        const fragmentRef = doc(db, "fragments", id);
        await deleteDoc(fragmentRef);
        alert("Fragment supprimé avec succès !");
        navigate('/fragments'); 
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Erreur lors de la suppression.");
      }
    }
  };

  return (
    <div className="form-container">
      <h1>{id ? "Modifier Fragment" : "Nouveau Fragment"}</h1>
      <form onSubmit={handleSave}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="code">Code</label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="tags">Tags</label>
          <textarea
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Séparez les tags par des virgules"
          />
        </div>

        <div className="buttons">
          <button type="submit">{id ? "Mettre à jour" : "Enregistrer"}</button>
          <button onClick={handleDelete} type="button" className="delete-button">Delete</button>
        </div>
      </form>
    </div>
  );
};

export default FormulaireFragment;
