import React from 'react';
import './unauthenticated.css';
import { useNavigate } from 'react-router-dom';

export function Unauthenticated(props) {
  const navigate = useNavigate();
  
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
    navigate('/profile');
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
    navigate('/profile');
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

            <button className="btn btn-primary me-2" onClick={() => loginUser()} disabled={!userName || !password}>Login</button>
            <button className="btn btn-secondary" onClick={() => createUser()} disabled={!userName || !password}>Create</button>
        </div>
    </main>
  );
}