import React, { useState } from 'react';
import host from './const.js'

const NuevoTicket = () => {
    const [datos, setDatos] = useState({
        prioridad: "",
        categoria: "",
        subcategoria: "",
        descripcion: "",
        aula: "",
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
          const request = await new Request(`http://${host}:1337/tickets`, {
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
              throw new Error('No se pudieron subir los datos');
          }
      };
      const {prioridad, categoria, subcategoria, descripcion,aula}= datos;
      return(
          <div>
              <h2>Nuevo ticket</h2>
              <form>
                <div>
                    <label htmlFor="prioridad">Prioridad:</label>
                    <input
                        type='text'
                        id='prioridad'
                        name='prioridad'
                        value={prioridad}
                        onChange={handleChange}
                    />
                </div>
                  <div>
                      <label htmlFor="categoria">Categoria:</label>
                      <input 
                          type="text"
                          id="categoria"
                          name="categoria"
                          value={categoria}
                          onChange={handleChange}
                      />
                  </div>
                  <div>
                      <label htmlFor="subcategoria">Subcategoria:</label>
                      <input 
                          type="text"
                          id="subcategoria"
                          name="subcategoria"
                          value={subcategoria}
                          onChange={handleChange}
                      />
                  </div>
                  <div>
                      <label htmlFor="descripcion">Descripcion:</label>
                      <input 
                          type="text"
                          id="descripcion"
                          name="descripcion"
                          value={descripcion}
                          onChange={handleChange}
                      />
                  </div>
                    <div>
                        <label htmlFor="aula">Aula:</label>
                        <input 
                            type="text"
                            id="aula"
                            name="aula"
                            value={aula}
                            onChange={handleChange}
                        />
                    </div>
                  <div>
                      <button type="button" onClick={handleSendData}>
                          Enviar Ticket
                      </button>
                  </div>
              </form>
          </div>
  
      );
};

export default NuevoTicket;