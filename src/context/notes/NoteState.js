import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const [state, setstate] = useState([])
    // get all notes : READ
    const getNotes = async () => {
        // api calls
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(localStorage.getItem('detail')).token
            },
        });
        const json = await response.json();
        setstate(json)
    }
    // Add a note : CREATE
    const addNote = async (title, description, tag) => {
        // api calls
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(localStorage.getItem('detail')).token
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        setstate(state.concat(json))
    }
    // update a note : UPDATE
    const updateNote = async (id, title, description, tag) => {
        // api calls
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(localStorage.getItem('detail')).token
            },
            body: JSON.stringify({ title, description, tag })
        });

        // Logic to edit in client side
        let newNote = JSON.parse(JSON.stringify(state))
        for (let index = 0; newNote.length > index; index++) {
            let element = newNote[index]
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break
            }
        }
        setstate(newNote)
    }

    // delete a note : DELETE
    const deleteNote = async (noteId) => {
        const response = await fetch(`${host}/api/notes/deletenotes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(localStorage.getItem('detail')).token
            },
        });
        const delNote = state.filter((n) => { return n._id !== noteId })
        setstate(delNote)
    }
    return (
        <NoteContext.Provider value={{ state, addNote, deleteNote, updateNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;