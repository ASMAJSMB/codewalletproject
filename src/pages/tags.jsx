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

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTag, setCurrentTag] = useState({ id: null, name: '' });

  const tagsCollection = collection(db, 'tags');

  const fetchTags = async () => {
    const data = await getDocs(tagsCollection);
    setTags(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const openNewModal = () => {
    setEditMode(false);
    setCurrentTag({ id: null, name: '' });
    setModalOpen(true);
  };

  const openEditModal = (tag) => {
    setEditMode(true);
    setCurrentTag(tag);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (currentTag.name.trim() === '') return;

    if (editMode) {
      const tagRef = doc(db, 'tags', currentTag.id);
      await updateDoc(tagRef, { name: currentTag.name });
    } else {
      await addDoc(tagsCollection, { name: currentTag.name });
    }

    setModalOpen(false);
    fetchTags();
  };

  const handleDelete = async () => {
    const tagRef = doc(db, 'tags', currentTag.id);
    await deleteDoc(tagRef);
    setModalOpen(false);
    fetchTags();
  };

  return (
    <div className="container">
      <div className="tags-list">
        
        {tags.map((tag) => (
          <div
            key={tag.id}
            onClick={() => openEditModal(tag)}
            className="tag"
          >
            {tag.name}
          </div>
        ))}
      </div>

      
        <h1 className="title"></h1>
        <button onClick={openNewModal} className="btn btn-new">New</button>
     

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="modal-title">
              {editMode ? 'Edit Tag' : 'New Tag'}
            </h2>

            <input
              type="text"
              value={currentTag.name}
              onChange={(e) =>
                setCurrentTag({ ...currentTag, name: e.target.value })
              }
              className="modal-input"
              placeholder="Tag name"
            />

            <div className="modal-actions">
              {editMode && (
                <button onClick={handleDelete} className="btn btn-delete">
                  Delete
                </button>
              )}
              <button onClick={handleSave} className="btn btn-save">
                Save
              </button>
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
