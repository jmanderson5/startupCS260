import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { About } from './about/about';
import { Chat } from './chat/chat';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { AuthState } from  './login/authState';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
  <BrowserRouter>
    <div className="app">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3">
            <NavLink to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <h1>Internship Command Center</h1>
            </NavLink>

            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><NavLink to="/" end className={({ isActive }) =>
                    `nav-link px-2 ${isActive ? 'link-secondary' : 'link-dark'}`
                }>Home</NavLink></li>
                <li><NavLink to="/chat" className={({ isActive }) =>
                    `nav-link px-2 ${isActive ? 'link-secondary' : 'link-dark'}`
                }>Chat</NavLink></li>
                <li><NavLink to="/profile" className={({ isActive }) =>
                    `nav-link px-2 ${isActive ? 'link-secondary' : 'link-dark'}`
                }>Profile</NavLink></li>
                <li><NavLink to="/login" className={({ isActive }) =>
                    `nav-link px-2 ${isActive ? 'link-secondary' : 'link-dark'}`
                }>Login</NavLink></li>
            </ul>
        </header>

        <Routes>
            <Route path='/' element={<About />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/profile' element={<Profile />} />
            <Route 
                path='/login' 
                element={
                    <Login
                        userName={userName}
                        authState={authState}
                        onAuthChange={(userName, authState) => {
                            setAuthState(authState);
                            setUserName(userName);

                            if (newUserName) {
                                localStorage.setItem('userName', UserName);
                            } else {
                                localStorage.removeItem('userName');
                            }
                        }}
                    />
                } 
            />
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
