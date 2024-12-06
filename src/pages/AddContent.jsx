// AddNoteForm.js
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddNoteForm({ onNoteAdded , onClose}) {
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const navigate = useNavigate();

    const handleAddNote = async () => {
        const token = localStorage.getItem('token');
        const title = titleRef.current.value;
        const content = contentRef.current.value;

        try {
            await axios.post('http://localhost:3000/note', { title, content }, { headers: { token } });
            titleRef.current.value = '';
            contentRef.current.value = '';
            onNoteAdded();
            onClose();
            // navigate("/dashboard");
        } catch (error) {
            console.error('Error adding note:', error);
        }
        
    };
    

    return (
        <div className="bg-gray-100 p-4 rounded shadow mt-4">
            <input ref={titleRef} className="w-full p-2 mb-4 border rounded" type="text" placeholder="Title"/>

            <textarea ref={contentRef} className="w-full p-2 mb-4 border rounded" placeholder="Content"></textarea>

            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddNote}>Save</button>
        </div>
    );
}
