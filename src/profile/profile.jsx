import React from 'react';

import { UserPage } from './userPage';
import { EditPage } from './editPage';
import { Editing } from './editing';

export function Profile({ userName, authState, onProfileChange }) {
  return (
    <main>
      <div>
        {authState !== AuthState.Unknown && <h1>Welcome to Internship Command Center</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}
