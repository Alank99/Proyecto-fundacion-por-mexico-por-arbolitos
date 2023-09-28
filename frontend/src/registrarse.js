import React, {useState} from "react";
import host from './const.js'

const Registrarse = () =>{

    const [datos, setDatos]=useState({
        username: "",
        password: "",
        fullName: "",
        nivel:"",
        region:"",
    });

    const handleChange= (event)=>{
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        });
    };

    const handleSendData = async() => {
        // Convert the form data to JSON
        const request = await new Request(`http://${host}:1337/registrarse`, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: new Headers({ 'Content-Type': 'application/json'}),
        });
        try {
            const response = await fetch(request);
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            
        } catch {
            throw new Error('No se pudo registrar el usuario');
        }
    };

    return (
        <div>
            <h2>Registro de nuevos usuarios</h2>
            <form>
                <div>
                    <label htmlFor="username">Usuario: </label>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        value={datos.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={datos.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="fullName">Nombre Completo: </label>
                    <input 
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={datos.fullName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="nivel">Nivel: </label>
                    <select name="cars" id="cars">
                        <option value="Local">Local</option>
                        <option value="Nacional">Nacional</option>
                        <option value="Ejecutivo">Ejecutivo</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="region">Region: </label>
                    <input 
                        type="text"
                        id="region"
                        name="region"
                        value={datos.region}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="button" onClick={handleSendData}>
                        Crear Usuario
                    </button>
                </div>
            </form>
        </div>
    );

};

export default Registrarse;