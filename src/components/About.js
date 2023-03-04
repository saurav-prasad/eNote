import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function About() {
    const context = useContext(NoteContext);
    return (
        <>
            <div>This is About {context.name} and his role is {context.role}</div>
        </>
    )
}
