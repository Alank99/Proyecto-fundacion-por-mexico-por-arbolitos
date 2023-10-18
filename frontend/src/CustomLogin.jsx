// CustomLogin.js
import React, { useState } from "react";
import { useLogin } from "react-admin";
import "./custom-login.css";
import logo from "./fundacionmx.png";

export const CustomLogin = () => {
  const login = useLogin();
  //configuracion inicial de los estados de usuario y contraseña
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  
  const handleLogin = () => { //al hacer click en el botón de iniciar sesión, llama al método login de react-admin
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
      onChange={(e) => setUsername(e.target.value)} //Cambia el estado de usuario por el valor ingresado

      className="custom-input"
    />
    <input
      type="password"
      placeholder="Contraseña"
      value={password}
      onChange={(e) => setPassword(e.target.value)}//Cambia el estado de contraseña por el valor ingresado
      onKeyDown={handleKeyPress}

      className="custom-input"
    />
    <button onClick={handleLogin}>Iniciar sesión</button>
    </div></div>
  );
};