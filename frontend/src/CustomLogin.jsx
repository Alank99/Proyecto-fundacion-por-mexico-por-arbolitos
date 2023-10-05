// CustomLogin.js
import React, { useState, useContext } from 'react';
import { AuthContext, useLogin} from 'react-admin';

export const CustomLogin = () => {
  const { buttonColor } = useContext(AuthContext); 
  const login = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login({ username, password });
  };

  return (
    <div>
      <h2>Fundación Por México le da la bienvenida.</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={{ backgroundColor: buttonColor, color: 'white' }} onClick={handleLogin}>
        Iniciar sesión
      </button>
    </div>
  );
};