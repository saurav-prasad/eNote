import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import DarkmodeContext from '../context/DarkMode/DarkmodeContext'; 

export default function Noteitem(props) {
    const context1 = useContext(DarkmodeContext);
    const {mode } = context1;
    const {noteBox,text} = mode;
    const { title, description, tag } = props.state;
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    return (
        <div style={{backgroundColor: `${noteBox}`}} className={`position-relative modal-content align-items-center m-3 p-3 w-25 col rounded-4 shadow`}>
            <div className="modal-header border-bottom-0 flex-column">
                <strong className={`d-inline-block fs-6 fw-bold mb-2 text-${text === 'light'?'primary':'primary'}`}>{tag}</strong>
                <h1 className={`modal-title fs-4 text-${text}`}>{title}</h1>
            </div>
            <FontAwesomeIcon onClick={()=>{return props.updatenote(props.state)}} style={{ cursor: "pointer" }} className={`text-${text} position-absolute top-0 start-100 translate-middle`} icon={faPenToSquare} />
            <FontAwesomeIcon style={{ cursor: "pointer" }} className={`text-${text} position-absolute bottom-0 start-50 translate-middle-x`} onClick={()=>{deleteNote(props.state._id);props.showAlert("Note deleted",'danger')}} icon={faTrash} />
            <div className="modal-body m-3">
                <p className={`text-${text}`}>{description}</p>
            </div>

        </div>

    )
}
