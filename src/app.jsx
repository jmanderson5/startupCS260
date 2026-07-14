import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className="app">
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
            <h1>Internship Command Center</h1>
        </a>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><a href="./index.html" className="nav-link px-2 link-secondary">Home</a></li>
            <li><a href="./chat.html" className="nav-link px-2 link-dark">Chat</a></li>
            <li><a href="./profile.html" className="nav-link px-2 link-dark">Profile</a></li>
        </ul>

        <div className="col-md-3 text-end">
            <button type="button" className="btn btn-outline-primary me-2" 
            onclick="window.location.href='./login.html'">Login</button>
            <button type="button" className="btn btn-primary"
            onclick="window.location.href='./login.html'">Sign-up</button>
        </div>
    </header>
    <main>Application content goes here.</main>
    <footer>
        <span className="text-reset">Benjamin Anderson</span>
        <a href="https://github.com/jmanderson5/startupCS260">Source</a>
    </footer>
  </div>;
}
