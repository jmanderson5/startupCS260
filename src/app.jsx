import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { About } from './about/about';
import { Chat } from './chat/chat';
import { Login } from './login/login';
import { Profile } from './profile/profile';

export default function App() {
  return (
  <BrowserRouter>
    <div className="app">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <h1>Internship Command Center</h1>
            </a>

            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><NavLink to="/" className="nav-link px-2 link-secondary">Home</NavLink></li>
                <li><NavLink to="/chat" className="nav-link px-2 link-dark">Chat</NavLink></li>
                <li><NavLink to="/profile" className="nav-link px-2 link-dark">Profile</NavLink></li>
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
    </div>
  </BrowserRouter>
  );
}
