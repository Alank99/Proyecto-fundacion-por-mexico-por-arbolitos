import React, { useState } from 'react';
import {useRefresh, useNotify} from 'react-admin';
import host from './const.js'

const NuevoComentario = (props) => { // Función para crear un comentario nuevo
    const refresh = useRefresh();
    const notify = useNotify();

    const [datos, setDatos] = useState({ //Datos requeridos para el comentario
        contenido: "",
      });
  
      const handleChange = (e) => { //Coloca la información en su lugar
        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
          });
        };
  
      const handleSendData = async() => {
          // Convert the form data to JSON
          const request = await new Request(`https://${host}:1337/comentarios/${Number(props.id_tik)}`, {//el id del tiktok se pasa como parametro, pero es tomado desde tickets.js
            method: 'POST',
              body: JSON.stringify(datos),
              headers: new Headers({ 'Content-Type': 'application/json' , "Authentication": localStorage.getItem("auth") }),
          });
          try {
              const response = await fetch(request);
              if (response.status < 200 || response.status >= 300) {
                  throw new Error(response.statusText);
              }
              notify("Comentario se ha subido correctamente");
              refresh();
              
          } catch {
              throw new Error('No se pudo subir');
          }
      };
      const {contenido}= datos;
      return( //html
          <div>
              <form>
                <div>
                    <label htmlFor="contenido">Nuevo comentario:</label>
                    <br/>
                    <textarea
                        placeholder='Ingresa un comentario'
                        type='text'
                        id='contenido'
                        name='contenido'
                        value={contenido}
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