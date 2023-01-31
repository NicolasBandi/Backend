import request from "supertest";
import { expect } from "chai";
import { createSandbox } from "sinon";

import app from "../app.js";
import productsService from "../services/productsService.js";
import { generateProduct } from "../utils/productGenerator.js";

const sandbox = createSandbox();

let product = generateProduct();
console.log(product);

describe("API Products", () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe("GET all products", () => {
    it("Deberia devolver un status 200 al obtener los productos", async () => {
      sandbox.stub(productsService, "get").resolves(product);
      let response = await request(app).get("/api/products");
      expect(response.status).to.eql(200);
      expect(response.body).to.have.property("nombre");
    });
  });

  describe("POST a product", () => {
    it("Deberia devolver un status 201 al crear un producto", async () => {
      sandbox.stub(productsService, "create").resolves(product);
      let response = await request(app).post("/api/products").send(product);
      expect(response.status).to.eql(201);
      expect(response.body).to.have.property("nombre");
      expect(response.body).to.have.property("precio");
      expect(response.body).to.have.property("foto");
      expect(response.body.id).to.be.eq(product.id);
    });
  });

  describe("GET a product by ID", () => {
    it("Deberia devolver un status 200 al obtener el producto por su ID", async () => {
      sandbox.stub(productsService, "getById").resolves(product);
      let response = await request(app).get(`/api/products/${product.id}`);
      expect(response.status).to.eql(200);
      expect(product.nombre).to.eql(response.body.nombre);
    });
  });

  describe("PUT a product by ID", () => {
    it("Deberia devolver un status 200 al actualizar el producto por su ID", async () => {
      sandbox.stub(productsService, "updateById").resolves(product);
      let response = await request(app).put(`/api/products/${product.id}`).send({ key: "--TEST-BODY--" });
      expect(response.status).to.eql(200);
      expect(response.body).to.be.eql(product);
      expect(productsService.updateById.args[0][0]).to.be.eq(product.id); // [0][0] Primera ejecucion, primer parametro (ID, data)
      expect(productsService.updateById.args[0][1]).to.have.property("key");  // [0][1] Primera ejecucion, segundo parametro (id, DATA)
      expect(productsService.updateById.args[0][1].key).to.be.eq("--TEST-BODY--");
    });
  });

  describe("DELETE a product by ID", () => {
    it("Deberia devolver un status 200 al obtener el producto por su ID", async () => {
      sandbox.stub(productsService, "deleteById").resolves(product);
      let response = await request(app).delete(`/api/products/${product.id}`);
      expect(response.status).to.eql(200);
      expect(response.body).to.be.eql(product);
      expect(productsService.deleteById.args[0][0]).to.be.eq(product.id); // [0][0] Primera ejecucion, primer parametro (ID)
    });
  });
});
