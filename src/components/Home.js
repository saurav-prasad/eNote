import React from 'react'
import Addnote from './Addnote'
import Notes from './Notes'

export default function Home(props) {
    return (
        <div className='container'>
            <Addnote showAlert={props.showAlert}/>
            <div>
                <Notes  userName={props.userName} showAlert={props.showAlert}/>
            </div>

        </div>
    )
}
