// CustomLogin.js
import React, { useState } from "react";
import { useLogin } from "react-admin";
import "./custom-login.css";
import logo from "./fundacionmx.png";

export const CustomLogin = () => {
  const login = useLogin();
  //Guarda la información
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  
  const handleLogin = () => { //Inicia sesión
    login({ username, password });
  };

  const handleKeyPress = (e) => 
{
  if (e.key === "Enter") //Si se presiona enter, se inicia sesión
  {
    handleLogin();
  }
};

  return ( //Muestra la página de inicio de sesión
    <div className="login-page">
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
    </div></div>
  );
};