import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { collection, addDoc, getDoc, doc, updateDoc, getDocs, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate } from 'react-router-dom';
import "./styl.css";

// voici la page du formulaire
const FormulaireFragment = () => {
  const { id } = useParams(); // on récupère l'id du fragment depuis l'URL
  const navigate = useNavigate(); // pour rediriger après enregistrement ou suppression


  // les valeurs du formulaire
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState('');

  // si on modifie un fragment, on vas chercher ses données
  useEffect(() => {
    const fetchFragment = async () => {
      if (id) {
        const fragmentRef = doc(db, "fragments", id);
        const fragmentSnap = await getDoc(fragmentRef);

        if (fragmentSnap.exists()) {
          const data = fragmentSnap.data();
          setTitle(data.title);
          setCode(data.code);
          setTags(data.tags.join(', ')); // on remet les tags sous forme de texte
        } else {
          console.log("Fragment introuvable.");
        }
      }
    };

    fetchFragment();
  }, [id]);

  // fonction qui s'exécute quand on clique sur enregistrer
  const handleSave = async (e) => {
    e.preventDefault();

    // on transforme les tags en tableau
    const tagList = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "");

    try {
      // on récupère tous les tags déjà existants
      const tagsCollectionRef = collection(db, "tags");
      const tagDocsSnapshot = await getDocs(tagsCollectionRef);
      const existingTags = tagDocsSnapshot.docs.map(doc => doc.data().name);

      // on ajoute les nouveaux tags qui n'existent pas encore
      for (let tag of tagList) {
        if (!existingTags.includes(tag)) {
          await addDoc(tagsCollectionRef, { name: tag });
        }
      }

      if (id) {
        // si id existe, on modifie un fragment existant
        const fragmentRef = doc(db, "fragments", id);
        await updateDoc(fragmentRef, {
          title,
          code,
          tags: tagList,
        });
        alert('Fragment modifié avec succès !');
      } else {
        // sinon, on crée un nouveau fragment
        const fragmentsCollectionRef = collection(db, "fragments");
        await addDoc(fragmentsCollectionRef, {
          title,
          code,
          tags: tagList,
        });
        alert('Fragment enregistré avec succès !');
      }

      // on redirige vers la liste des fragments
      navigate('/fragments');

      // on vide le formulaire
      setTitle('');
      setCode('');
      setTags('');

    } catch (error) {
      console.error("Erreur :", error);
      alert('Erreur lors de la sauvegarde.');
    }
  };

  // fonction pour supprimer un fragment
  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm("Es-tu sûr(e) de vouloir supprimer ce fragment ?");
    if (confirmDelete) {
      try {
        const fragmentRef = doc(db, "fragments", id);
        await deleteDoc(fragmentRef);
        alert("Fragment supprimé avec succès !");
        navigate('/fragments'); // retour à la liste
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Erreur lors de la suppression.");
      }
    }
  };

  // le formulaire
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
