import React, {useState} from "react";
import {useRefresh, useNotify, useRedirect} from 'react-admin';
import host from './const.js'

const Registrarse = () =>{ // Función para crear un usuario nuevo
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const [datos, setDatos]=useState({ //Datos requeridos para el registro
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
        const request = await new Request(`https://${host}:1337/registrarse`, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: new Headers({ 'Content-Type': 'application/json'}),
        });
        try {
            const response = await fetch(request);
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            notify("Usuario ha sido creado");
            redirect("/login");
            refresh();
            
        } catch {
            throw new Error('No se pudo registrar el usuario');
        }
    };

    return ( //html para el registro
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
                    <label htmlFor="fullName">Nombre completo: </label>
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
                    <input 
                        type="text"
                        id="nivel"
                        name="nivel"
                        value={datos.nivel}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="region">Región: </label>
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