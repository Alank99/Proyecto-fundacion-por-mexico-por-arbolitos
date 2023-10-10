// CustomLogin.js
import React, { useState } from "react";
import { useLogin } from "react-admin";
import "./custom-login.css";

export const CustomLogin = () => {
  const login = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    
    <div className="custom-login"> <h2>"Fundación Por México" le da la bienvenida.</h2>
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
    </div>
  );
};