const request = require("supertest");
const {app, client, connectDB} = require("../app");
const server = require("../server");
const { response } = require("express");

describe("Pruebas del backend", () => {
    let token;
    test("Conectarse a la base de datos", () => {
        return expect(connectDB()).resolves.toBe(); //llama la conexion del server.js y verifica que se conecte
    });

    test("Obtener los tickets sin autorizacion", () => {
      return request(app)
        .get("/tickets") //hace un llamada al app al endpoint de tickets
        .then(response => {
          expect(response.statusCode).toBe(401); //espera que el estado de un error con el codigo 401 == no autorizacion
        });
    });

    test("Hacer login con credenciales no validas", async () => {
      return request(app)
      .post('/login') // llamas al endpoint del login del post 
      .send({
        username: 'invalido', password: 'invalido' //envias un json con un usuario y password invalido
      })
      .then(response => {
        expect(response.body).not.toHaveProperty('token')
        expect(response.statusCode).toBe(401)   //espera que el estado de un error con el codigo 401 == no autorizacion y sin regresan un token
      });  
    });

    test("Hacer login con credenciales validas", () => {
      return request(app)
      .post('/login')   // llamas al endpoint del login del post
      .send({
        username: 'root', password: 'root' //envias un json con un usuario y password con credencialesvalidas 
                                          //se debe de coincide con tus datos en mongodb de userio
      })
      .then(response => {
        token = response.body.token;
        expect(response.body).toHaveProperty('token')
        expect(response.statusCode).not.toBe(401)  //espera que no te de un error y te de un token
      });  
    });

    test("Obtener los tickets con autorizacion", () => {
      return request(app)
      .get('/tickets')        //llamas al endpoint de tickets
      .set('Authentication', token)  //envias el token que te dio el login valido
      .then(response => {
        expect(response.statusCode).not.toBe(401) //espera que no te de un error 
      }); 
    });
    server.close(); //matas al server
});