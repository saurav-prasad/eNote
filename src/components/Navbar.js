import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import DarkmodeContext from '../context/DarkMode/DarkmodeContext';

export default function Navbar(props) {
    const context = useContext(DarkmodeContext);
    const { toggleDarkMode, mode } = context;
    const { navbar, text} = mode;
    useEffect(() => {
        toggleDarkMode()
    }, [])

    const toggleMode = () => {
        toggleDarkMode()
    }

    let location = useLocation();
    const history = useHistory()
    const handleLogout = () => {
        localStorage.removeItem('detail')
        history.push('/login')
    }
    return (
        <nav className={`navbar navbar-expand-lg bg-${navbar}`}>
            <div className="container-fluid">
                <Link className={`navbar-brand text-${text}`} to="#">Navbar</Link >
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link text-${text} ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link >
                        </li>
                        <li className="nav-item">
                            <Link className={`text-${text} nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link >
                        </li>
                    </ul>
                    {localStorage.getItem('detail') ? <form className="d-flex" role="search">
                        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                            <li><p className="nav-link mb-0 px-2 link-secondary"><strong className={`text-${text}`}>{props.userName}</strong></p></li>
                        </ul>
                        <Link to="/login" type="button" onClick={handleLogout} className="btn btn-outline-primary me-2 mx-1">Logout</Link>
                    </form> :
                        <form className="d-flex" role="search">
                            <Link to="/login" type="button" className="btn mx-1 btn-primary">Login</Link>
                            <Link to="/signup" type="button" className="btn mx-1 btn-primary">Signup</Link>

                        </form>
                    }
                    <FontAwesomeIcon onClick={toggleMode} style={{ cursor: "pointer" }} className={`text-${text} mx-3`} icon={mode.mode === 'dark' ? faSun : faMoon} />
                </div>
            </div>
        </nav>
    )
}
