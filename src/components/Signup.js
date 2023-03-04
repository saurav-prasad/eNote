import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import DarkmodeContext from '../context/DarkMode/DarkmodeContext'

export default function Signup(props) {
    let history = useHistory();
    useEffect(() => {
        if (localStorage.getItem('detail')) {
            history.push('/')
        }
        else {
            history.push('/signup')
        }
    }, [])
    const context = useContext(DarkmodeContext)
    const {mode} = context
    const {text} = mode;
    const host = "http://localhost:5000"
    const [credentials, setCredentials] = useState({ name: "", email: "", phone: "", password: "", cpassword: "" })
    const { name, email, phone, password } = credentials;
    const [message, setMessage] = useState("Confirm your password")
    const handleClick = async (e) => {
                e.preventDefault();
        // saurav1@gmail.com
        // thisisavalidpassword
        // api calls
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone, password })
        });
        const json = await response.json()
        if (json.success) {
            let local = JSON.stringify({
                token: json.token,
                userEmail: json.userName
            })
            localStorage.setItem('detail', local)
            props.userName(JSON.parse(localStorage.getItem('detail')).userEmail);
            props.showAlert("Account created successfully", 'success')
            history.push("/")
        }
        else if (json.emailExist) {
            props.showAlert("User with the email already exists", 'danger')
        }

        else {
            props.showAlert("Sign-in failed, enter valid credentials", 'danger')
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        console.log(credentials)
        if (credentials.password !== e.target.value) {
            setMessage("Password not matched")
        }
        else if (credentials.password.length > 0 && credentials.password === e.target.value) {
            setMessage("Password confirmed")
        }

    }
    return (
        <>
            <div className="container my-5 d-flex justify-content-center align-items-center flex-column">
                <form onSubmit={handleClick} className='w-25'>
                <h1 className={`h3 mb-3 fw-normal text-center fs-2 text-${text}`}>SignUp</h1>
                    <div className="mb-3">
                        <label htmlFor="name" className={`form-label text-${text}`}>* Name</label>
                        <input onChange={onChange} type="text" className="border border-secondary form-control" name='name' id="name" aria-describedby="emailHelp" />
                        <div id="emailHelp" className={`form-text text-${text}`}>Must be atleast 3 characters long.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className={`form-label text-${text}`}>* Email address</label>
                        <input onChange={onChange} type="email" name='email' className="border border-secondary form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="email" className={`form-text text-${text}`}>We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className={`form-label text-${text}`}>Phone</label>
                        <input onChange={onChange} type="tel" className="border border-secondary form-control" id="phone" name='phone' aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className={`form-label text-${text}`}>* Password</label>
                        <input onChange={onChange} type="password" className="border border-secondary form-control" name='password' id="password" />
                        <div id="emailHelp" className={`form-text text-${text}`}>{credentials.password.length < 5? 'Must be 5-20 characters long.':'Looks good!'}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className={`form-label text-${text}`}>* Confirm Password</label>
                        <input onChange={onChange} type="password" className="border border-secondary form-control" name='cpassword' id="cpassword" />
                        <div id="emailHelp" className={`form-text text-${text}`}>{message}</div>
                    </div>
                    <button type="submit" className="btn btn-primary textColor">Submit</button>
                </form>
            </div>
        </>
    )
}
