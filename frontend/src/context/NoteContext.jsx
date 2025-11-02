import { createContext, useEffect } from "react";
import { useState } from "react";
import BACKEND_URL from "../api/url.js";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch notes from backend
    const getNotes = async () => {
        setLoading(true)
        try {
            const response = await BACKEND_URL.get("/get-notes");
            setNotes(response.data);
        }
        catch (error) {
            console.error("Error fetching notes:", error);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getNotes();
    }, []);

    // create a new note
    const createNote = async (note) => {
        const response = await BACKEND_URL.post("/create-note", note);
        setNotes([...notes, response.data]);
    }

    // update an existing note
    const updateNote = async (id, updateNote) => {
        const response = await BACKEND_URL.put(`/update-note/${id}`, updateNote);
        setNotes(notes.map((note) => (note._id === id ? response.data : note)));
    }

    // delete a note
    const deleteNote = async (id) => {
        const response = await BACKEND_URL.delete(`/delete-note/${id}`);
        if (response.status === 200) {
            setNotes(notes.filter((note) => note._id !== id));
        }
    }

    return (
        <NoteContext.Provider value={{notes, loading, createNote, updateNote,   deleteNote}}>
            {children}
        </NoteContext.Provider>
    )
}