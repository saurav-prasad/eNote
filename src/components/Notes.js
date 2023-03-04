import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem';
import DarkmodeContext from '../context/DarkMode/DarkmodeContext'
export default function Notes(props) {
    const context1 = useContext(DarkmodeContext);
    const {mode} = context1;
    const {text,updateBox} = mode
    const context = useContext(NoteContext);
    const { state, getNotes, updateNote } = context;
    const [note, setNote] = useState({ _id: "", utitle: "", udescription: "", utag: "General" })
    const history = useHistory()
    useEffect(() => {
        if (localStorage.getItem('detail')) {
            getNotes()
        }
        else {
            history.push('/login')
        }
    }, [])
    const ref = useRef(null)
    const refclose = useRef(null)

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        updateNote(note._id, note.utitle, note.udescription, note.utag)
        refclose.current.click()
        props.showAlert("Note updated", "success")
    }
    const updatenote = (currentNote) => {
        ref.current.click()
        setNote({ _id: currentNote._id, utitle: currentNote.title, udescription: currentNote.description, utag: currentNote.tag })
    }

    return (
        <>
            <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div   className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div  style={{backgroundColor: `${updateBox}`}} className="modal-content">
                        <div className='p-3 container'>
                            <h1 className={`fs-2 mb-4 text-${text}`}>Update note</h1>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="utag" className={`form-label text-${text}`}>Tag</label>
                                    <input type="text" value={note.utag} className="form-control" id="utag" name='utag' aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="utitle" className={`form-label text-${text}`}>Title</label>
                                    <input type="text" value={note.utitle} className="form-control" id="utitle" name='utitle' aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="udescription" className={`form-label text-${text}`}>Description</label>
                                    <input type="text" value={note.udescription} className="form-control" name='udescription' id="udescription" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancle</button>
                            <button disabled={note.udescription.length < 5 || note.utitle.length < 3} type="button" onClick={handleClick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='my-5'>
                <h1 className={`mb-5 text-center text-${text}`}>Your notes here</h1>
                <div className='container'>

                    <div className='row row-cols-1 row-cols-sm-5 row-cols-md-1 justify-content-center'>
                        <h1 className='fs-3 text-danger text-center'>{state.length === 0 && "Empty notes!"}</h1>
                        {state.map((context) => {

                            return <Noteitem showAlert={props.showAlert} updatenote={updatenote} key={context._id} state={context} />
                        })}
                    </div></div>
            </div>
        </>
    )
}
