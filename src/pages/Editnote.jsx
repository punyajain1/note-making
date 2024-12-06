import React, { useRef } from 'react';
import axios from 'axios';

export default function EditNoteForm({ note, fetchNotes, onClose }) {
    const titleRef = useRef(note.title); // Ref for the title input
    const contentRef = useRef(note.content); // Ref for the content input

    const handleEditNote = async () => {
        const token = localStorage.getItem('token');
        const updatedContent = {
            title: titleRef.current.value, // Get value from the title input
            content: contentRef.current.value, // Get value from the content input
        };
        try {
            await axios.put(
                `http://localhost:3000/note/${note._id}`,
                updatedContent,
                { headers: { token } }
            );
            fetchNotes(); // Refresh the notes list
            onClose(); // Close the edit form
        } catch (error) {
            console.error('Error editing note:', error);
        }
    };

    return (
        <div style={{ border: '1px solid gray', padding: '10px', marginTop: '10px' }}>
            <h2>Edit Note</h2>
            <input
                type="text"
                placeholder="Title"
                defaultValue={note.title} // Set default value
                ref={titleRef} // Attach ref to the input
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <textarea
                placeholder="Content"
                defaultValue={note.content} // Set default value
                ref={contentRef} // Attach ref to the textarea
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <button onClick={handleEditNote} style={{ marginRight: '10px' }}>
                Save
            </button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}
