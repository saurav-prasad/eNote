import { useState } from "react";
import DarkmodeContext from "./DarkmodeContext";

const Darkmodestate = (props) => {
    const darkTheme = window.matchMedia("(prefers-color-scheme:dark)")
    let currentTheme = darkTheme === true ? 'dark' : 'light'

    const [mode, setMode] = useState({ mode: currentTheme })

    const toggleDarkMode = () => {
        // Light mode
        if (mode.mode === 'dark') {
            document.body.style.backgroundColor = 'white';
            //  document.body.style.color = 'black';
            document.querySelectorAll('.textColor').forEach((e) => {
                e.style.color = '#212529'
            })
            setMode({ mode: 'light', body: 'light', navbar: 'light', text: 'dark', noteColor: '',updateBox:'#fff', noteBox: 'rgb(255 255 255)' })
        }

        // Dark mode
        else if (mode.mode === 'light') {
            document.body.style.backgroundColor = 'rgb(59 67 76)';
            //  document.body.style.color = 'white';
            document.querySelectorAll('.textColor').forEach((e) => {
                e.style.color = '#f8f9fa'
            })
            setMode(({ mode: 'dark', body: 'dark', navbar: 'dark', text: 'light',updateBox:'rgb(49 55 65)',noteBox: 'rgb(49 55 65)' }))
        }
    }
    return (
        <DarkmodeContext.Provider value={{ toggleDarkMode, mode }}>
            {props.children}
        </DarkmodeContext.Provider>
    )
}
export default Darkmodestate;