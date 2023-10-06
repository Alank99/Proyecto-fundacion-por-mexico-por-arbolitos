const request = require("supertest");
const {app, client, connectDB} = require("../app");
const server = require("../server");
const { response } = require("express");

describe("Pruebas del backend", () => {
    let token;
    test("Conectarse a la base de datos", () => {
        return expect(connectDB()).resolves.toBe();
    });
    test("Obtener los tickets sin autorizacion", () => {
      return request(app)
        .get("/tickets")
        .then(response => {
          expect(response.statusCode).toBe(401);
        });
    });
    test("Hacer login con credenciales no validas", async () => {
      return request(app)
      .post('/login')
      .send({
        username: 'invalido', password: 'invalido'
      })
      .then(response => {
        expect(response.body).not.toHaveProperty('token')
        expect(response.statusCode).toBe(401)
      });  
    });
    test("Hacer login con credenciales validas", () => {
      return request(app)
      .post('/login')
      .send({
        username: 'root', password: 'root'
      })
      .then(response => {
        token = response.body.token;
        expect(response.body).toHaveProperty('token')
        expect(response.statusCode).not.toBe(401)
      });  
    });
    test("Obtener los tickets con autorizacion", () => {
      return request(app)
      .get('/tickets')
      .set('Authentication', token)
      .then(response => {
        expect(response.statusCode).not.toBe(401)
      }); 
    });
    server.close();
});