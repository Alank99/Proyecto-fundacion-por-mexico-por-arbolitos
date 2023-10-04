import React, { useState } from 'react';
import host from './const.js'

const NuevoComentario = () => {
    const [datos, setDatos] = useState({
        descripcion: "",
      });
  
      const handleChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
          });
        };
  
      const handleSendData = async() => {
          console.log(JSON.stringify(datos))
          // Convert the form data to JSON
          const request = await new Request(`http://${host}:1337/tickets/:id/comentario`, {
            method: 'POST',
              body: JSON.stringify(datos),
              headers: new Headers({ 'Content-Type': 'application/json' }),
          });
          try {
              const response = await fetch(request);
              if (response.status < 200 || response.status >= 300) {
                  throw new Error(response.statusText);
              }
              
          } catch {
              throw new Error('No se pudo subir');
          }
      };
      const {descripcion}= datos;
      return(
          <div>
              <form>
                <div>
                    <label htmlFor="descripcion">descripcion:</label>
                    <input
                        type='text'
                        id='descripcion'
                        name='descripcion'
                        value={descripcion}
                        onChange={handleChange}
                    />
                </div>
                  <div>
                      <button type="button" onClick={handleSendData}>
                          Enviar comentario
                      </button>
                  </div>
              </form>
          </div>
  
      );
};

export default NuevoComentario;