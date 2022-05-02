import React, { useEffect } from 'react';
import Router from 'components/Router';
import { useState } from 'react';
import { authService } from 'fBase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <Router isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        'initializing'
      )}
    </>
  );
}

export default App;
