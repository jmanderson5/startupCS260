import React from 'react';
import './login.css';

export function Login() {
  return (
    <main>
        <form action="./profile.html" method="get">
            <div className="input-group mb-3">
                <label className="input-group-text" for="username">Username @</label>
                <input className="form-control" id="username" placeholder="username" />
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" for="password">Password 🔒</label>
                <input className="form-control" type="password" id="password" placeholder="password" />
            </div>

            <button className="btn btn-primary" type="submit">Login</button>
            <button className="btn btn-secondary" type="submit">Create</button>
        </form>
    </main>
  );
}