// CustomLogin.js
import React, { useState } from "react";
import { useLogin } from "react-admin";
import "./custom-login.css";
import logo from "./fundacionmx.png";
import { useNavigate } from 'react-router-dom';

export const CustomLogin = () => {
  const login = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ username, password });
  };

  const handleKeyPress = (e) =>
{
  if (e.key === "Enter")
  {
    handleLogin();
  }
};

const toggleRegisterView = () => {
  setIsRegistering(!isRegistering);

  if (!isRegistering) {
    navigate('/registrarse');
  } else {
    navigate('/login');
  }
};

  return (
    
    <div className="custom-login"> 
    <img src={logo} alt="Logo de Fundación Por México" className="custom-logo" />
    <h2>Le da la bienvenida</h2>
    <input
      type="text"
      placeholder="Usuario"
      value={username}
      onChange={(e) => setUsername(e.target.value)}

      className="custom-input"
    />
    <input
      type="password"
      placeholder="Contraseña"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      onKeyDown={handleKeyPress}

      className="custom-input"
    />
    <button onClick={handleLogin}>Iniciar sesión</button>
    <button onClick={toggleRegisterView}>{isRegistering ? "Volver" : "Registrarse"}</button>
    </div>
  );
};