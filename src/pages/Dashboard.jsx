import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddNoteForm from './AddContent';
import EditNoteForm from './Editnote';
import { Note } from './icon';

export default function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    useEffect(() => {
        fetchNotes();
        setShowForm(false);
    }, []);

    const fetchNotes = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:3000/notes', { headers: { token } });
            setNotes(response.data.Notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const handleDeleteNote = async (noteId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:3000/note/${noteId}`, { headers: { token } });
            setNotes(notes.filter(note => note._id !== noteId));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div className="pt-4 pb-4">
            <div className="flex justify-between items-center bg-purple-100">
                <div className='flex pt-1'>
                    <div className='pr-2'>{<Note/>}</div>
                    <div className='pt-2'><h1 className="text-2xl font-bold"> MemoMate</h1></div>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setShowForm(!showForm)}>
                    + Add Note
                </button>
            </div>
            {showForm && <AddNoteForm onNoteAdded={fetchNotes} onClose={setShowForm(false)} />}



            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {notes.length === 0 ? (<div>No notes available.</div>) : (notes.map(note => (
                    <div key={note._id} className="bg-white p-4 rounded shadow relative">
                        <h2 className="text-xl font-bold">{note.title}</h2>
                        <p className="mt-2 text-sm">{note.content}</p>
                        <div className="absolute top-2 right-2 ">
                            <button className="bg-red-500 text-white text-xs py-1 px-2 rounded"onClick={() => handleDeleteNote(note._id)}>Delete</button>
                            <button className='bg-purple-500 text-white text-xs py-1 px-2 rounded' onClick={() => setEditingNote(note)}>Edit</button>
                        </div>
                        {editingNote && (<EditNoteForm note={editingNote} fetchNotes={fetchNotes} onClose={() => setEditingNote(null)}/>)}
                    </div>
                    ))
                )}
            </div>
        </div>
    );
}
