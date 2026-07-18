import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <div className='authenticated-main'>
      <div className='playerName'>{props.userName}</div>
      <div>
        <Button className="btn btn-primary me-2" onClick={() => navigate('/profile')}>
          Navigate
        </Button>
        <Button className="btn btn-secondary" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </div>
  );
}
