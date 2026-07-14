import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <main>
        <form onSubmit={handleSubmit} method="get">
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="username">Username @</label>
                <input className="form-control" id="username" placeholder="username" />
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="password">Password 🔒</label>
                <input className="form-control" type="password" id="password" placeholder="password" />
            </div>

            <button className="btn btn-primary" type="submit">Login</button>
            <button className="btn btn-secondary" type="submit">Create</button>
        </form>
    </main>
  );
}