import React from 'react';
import './unauthenticated.css';
import { useNavigate } from 'react-router-dom';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <main>
        <div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="username">Username @</label>
                <input className="form-control" type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="username" />
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="password">Password 🔒</label>
                <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            </div>
            {displayError && (
              <div className="alert-danger" role="alert">{displayError}</div>
            )}
            <button className="btn btn-primary me-2" onClick={() => loginUser()} disabled={!userName || !password}>
              Login
            </button>
            <button className="btn btn-secondary" onClick={() => createUser()} disabled={!userName || !password}>
              Create
            </button>
        </div>
    </main>
  );
}