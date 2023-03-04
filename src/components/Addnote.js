import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import DarkmodeContext from '../context/DarkMode/DarkmodeContext';

export default function Addnote(props) {
    const context = useContext(NoteContext);
    const context1 = useContext(DarkmodeContext);
    const { mode } = context1;
    const { text } = mode;
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag.length <= 0 ? 'General' : note.tag)
        let a = { title: "", description: "", tag: "" }
        setNote(a)
        props.showAlert("Notes added successfully", "success")
    }
    return (
        <div className='container mt-5'>
            <h1 className={`text-${text}`}>Add a new note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="tag" className={`text-${text} form-label`}>Tag</label>
                    <input type="text" placeholder='General' value={note.tag} className="form-control" id="tag" name='tag' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className={`text-${text} form-label`}>Title</label>
                    <input type="text" value={note.title} className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className={`text-${text} form-text`}>{note.title.length < 3 ? 'Must be atleast 3 characters long.' : "Looks good!"}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className={`text-${text} form-label`}>Description</label>
                    <input type="text" value={note.description} className="form-control" name='description' id="description" onChange={onChange} />
                    <div id="emailHelp" className={`text-${text} form-text`}>{note.description.length < 5 ? 'Must be atleast 5 characters long.' : "Looks good!"}</div>
                </div>
                <button disabled={note.description.length < 5 || note.title.length < 3} type="submit" onClick={handleClick} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
