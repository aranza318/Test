import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import { generateMockProduct } from "../src/moking/utils.mocking.js";

const expect = chai.expect;
const requester = supertest('http://localhost:8080')

describe("Test de integracion de ecommerce - Okuna - ", ()=>{
  before(async function (){
    this.cookie;
  });
  
  describe('Test de sesion de api', () => { 
    before(function(){
      this.cookie;
      this.mockUser = {
          first_name: "Usuario",
          last_name: "Apellido",
          email : "correodeprueba2@gmail.com",
          age: 30,
          password : "123456",
          role: "admin",
          cart: "123Abc"
      };
  });
    
      
    it("Registrar usuario - POST /api/sessions/register", async function(){
        this.mockUser = {
        first_name: "Usuario",
        last_name: "Apellido",
        email : "correodeprueba2@gmail.com",
        age: 30,
        password : "123456",
        role: "admin",
        cart: "123Abc"
        };
        console.log(this.mockUser);
        const {statusCode, ok, _body} = await requester.post('/api/sessions/register').send(this.mockUser);
        console.log(statusCode);
        console.log(_body);
        expect(statusCode).is.equal(200);
      
    });
    it("Deberia hacer el login del usuario y setearle la cookie - POST /api/sessions/login", async function(){
        const result = await requester.post("/api/sessions/login").send({email: this.mockUser.email, password: this.mockUser.password});
        const { statusCode, ok, _body } = result;
        const cookieResult = result.headers['set-cookie'][0];
        expect(statusCode).to.be.eql(200)
        expect(_body.success).to.be.ok
        const cookieData = cookieResult.split("=");
        this.cookie = {
            name : cookieData[0],
            value : cookieData[1]
        };
        expect(this.cookie.name).to.be.ok.and.eql('coderCookieToken');
        expect(this.cookie.value).to.be.ok
    });
    it("El endpoint actual tiene un usuario con cookie - GET /api/sessions/current", async function(){
        const {_body} = await requester.get("/api/sessions/current").set("Cookie", [`${this.cookie.name}=${this.cookie.value}`])
        expect(_body.email).to.be.ok.and.eql("mock@gmail.com")
    });
  });
  
  describe("Api test para productos", () => {
    describe("Testing de las rutas de productos", () => {
      it("El metodo GET trae todos los productos del array - GET /api/products", async ()=>{
        const response = await requester.get("/api/products");
        const { statusCode, ok, _body } = response;
        expect(statusCode).to.be.eql(200);
        expect(ok).to.be.true;
        expect(_body.payload).to.be.an('array');  
      });
      it("Obtengo un producto (ejemplo) por su ID - GET /api/products/652b29ce8b1c2751a6e223bf", async () => {
        const response = await requester.get("/api/products/652b29ce8b1c2751a6e223bf");
        const { statusCode, ok, _body } = response;
        expect(statusCode).to.be.eql(200);
        expect(ok).to.be.true;
        expect(_body.payload).to.be.an('object');
        expect(_body.payload).to.have.property('_id', '652b29ce8b1c2751a6e223bf');
      })
    })
    describe("El usuario esta loggeado y tiene un rol", () => {
      it("Deberia crear un producto si estas loggeado y tu rol lo permite - POST /api/products/", async function (){
        const productMock = generateMockProduct();
        expect(this.cookie.name).to.be.ok.and.eql('coderCookieToken');
        const { statusCode, ok } = await requester.post("/api/products").set('Cookie', [`${this.cookie.name}=${this.cookie.value}`]).send(productMock);
        expect(ok).to.be.ok
        expect(statusCode).to.be.eql(201)
    });
  });
    describe("Usuario no loggeado", () =>{
      it("Si se quiere crear un producto sin estar loggeado, deberia retornar un status 401 - POST /api/products", async function (){
        const productMock = generateMockProduct();
        const { statusCode, ok } = await requester.post("/api/products").send(productMock);
        expect(ok).to.be.not.ok;
        expect(statusCode).to.be.eql(401)
    });
  });
  });
  
  describe("Testeo para las rutas de carts", () => {
    it("Obtengo todos los carts con el metodo GET - GET /api/carts", async () => {
      const response = await requester.get("/api/carts");
      const { statusCode, ok, _body } = response;
      expect(statusCode).to.be.eql(201);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.an('array');
    });
    it("Obtengo un cart por su ID - GET /api/carts/653138a895929a5c605a22ef", async () => {
      const response = await requester.get("/api/carts/653138a895929a5c605a22ef");
      const { statusCode, ok, _body } = response;
      expect(statusCode).to.be.eql(200);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.an('object');
    });
    it("Crea un cart con el metodo POST", async () => {
      const response = await requester.post("/api/carts");
      const { statusCode, ok, _body } = response;
      expect(statusCode).to.be.eql(200);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.an('object');
    })
  })
});