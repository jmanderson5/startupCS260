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
            <NavLink to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <h1>Internship Command Center</h1>
            </NavLink>

            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><NavLink to="/" className="nav-link px-2 link-secondary">Home</NavLink></li>
                <li><NavLink to="/chat" className="nav-link px-2 link-dark">Chat</NavLink></li>
                <li><NavLink to="/profile" className="nav-link px-2 link-dark">Profile</NavLink></li>
            </ul>

            <form className="col-md-3 text-end" method="get" action="login">
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="submit" className="btn btn-secondary">Sign-up</button>
            </form>
        </header>

        <Routes>
            <Route path='/' element={<About />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
        
        <footer>
            <span className="text-reset">Benjamin Anderson</span>
            <a href="https://github.com/jmanderson5/startupCS260">Source</a>
        </footer>
    </div>
  </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}