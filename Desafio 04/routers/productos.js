const express = require("express");
const { Router } = express;
const Contenedor = require("../productos/clases");
/* se instacia la clase*/
const productos = new Contenedor("./productos/productos.txt");
const router = Router();
const noEncontrado = { error: "El producto no fue encontrado :(" };
// Middleware a nivel del Router

/*Se obtiene el producto segun la id */
router.get("/productos/:id", async (req, res) => {
      let id = parseInt(req.params.id);
      const producto = await productos.getById(id);
      !producto && res.status(404).json(noEncontrado);
      res.status(200).json(producto);
});
/*Se obtienen todos los productos */
router.get("/productos", async (_, res) => {
      const arrayProductos = await productos.getAll();
      !arrayProductos && res.status(404).json(noEncontrado);
      res.status(200).json(arrayProductos);
});

/* se agrega un producto*/
router.post("/productos", async (req, res) => {
      let { body: data } = req;
      const producto = await productos.save(data);
      res.status(200).json(data);
});

/* se modifica un producto*/
router.put("/productos/:id", async (req, res) => {
      let id = parseInt(req.params.id);
      let { body: data } = req;
      const arrayProductos = await productos.modificar(id, data);
      !arrayProductos && res.status(404).json(noEncontrado);
      res.status(200).end();
});
/* se elimina un producto*/
router.delete("/productos/:id", async (req, res) => {
      let id = parseInt(req.params.id);
      const producto = await productos.deleteById(id);
      !producto && res.status(404).json(noEncontrado);
      res.status(200).end();
});

module.exports = router;
