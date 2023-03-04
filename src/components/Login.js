import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import DarkmodeContext from '../context/DarkMode/DarkmodeContext'

export default function Login(props) {
    const history = useHistory()
    useEffect(() => {
        if (localStorage.getItem('detail')) {
            history.push('/')
        }
        else {
            history.push('/login')
        }
    }, [])
    const context = useContext(DarkmodeContext)
    const { mode } = context;
    const { text } = mode;
    const host = "http://localhost:5000"
    const [state, setState] = useState({ email: "", password: "", remember: false })
    const handleClick = async (e) => {
        e.preventDefault();
        // saurav1@gmail.com
        // thisisavalidpassword
        // api calls
        const response = await fetch(`${host}/api/auth/loginuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state)
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            let local = JSON.stringify({
                token: json.token,
                userEmail: json.userName
            })
            localStorage.setItem('detail', local)
            props.userName(JSON.parse(localStorage.getItem('detail')).userEmail);
            history.push("/")
        }
        else {
            props.showAlert("Logging failed, enter valid credentials", 'danger')
        }
    }
    const onChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value })
    }
    return (
        <>
            <main className="form-signin w-50 m-auto my-5">
                <form onSubmit={handleClick} >
                    <h1 className={`h3 mb-5 fw-normal text-center fs-2 text-${text}`}>Login to explore eNote</h1>

                    <div className="form-floating">
                        <input onChange={onChange} required type="email" className="my-3 border border-secondary form-control" id="email" placeholder="name@example.com" />
                        <label htmlFor="email">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input onChange={onChange} minLength={5} required type="password" className="my-3 border border-secondary form-control" id="password" placeholder="Password" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                </form>
            </main>
        </>
    )
}
