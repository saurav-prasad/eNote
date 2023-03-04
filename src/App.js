import './App.css';
// React Router
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import Darkmodestate from './context/DarkMode/DarkmodeState';

function App() {

  const [userName, setUserName] = useState(localStorage.getItem('detail') ? JSON.parse(localStorage.getItem('detail')).userEmail : "")
  const [alert, setAlert] = useState({ message: '', type: '' });
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert({ message: '', type: '' });
    }, 1500)
  }
  const username = (name) => {
    setUserName(name)
  }
  return (

    <>
      <NoteState >
        <Darkmodestate>
          <Router>
            <Navbar userName={userName} />
            <Alert alert={alert} />
            <div className="container">
              <Switch>
                {/* Home */}
                <Route exact path="/" ><Home userName={userName} showAlert={showAlert} /></Route>
                {/* About */}
                <Route exact path="/about" ><About /></Route>
                {/* Login */}
                <Route exact path="/login" ><Login userName={username} showAlert={showAlert} /></Route>
                {/* Signup */}
                <Route exact path="/signup" ><Signup userName={username} showAlert={showAlert} /></Route>
              </Switch>
            </div>
          </Router>
        </Darkmodestate>
      </NoteState>
    </>
  );
}

export default App;
