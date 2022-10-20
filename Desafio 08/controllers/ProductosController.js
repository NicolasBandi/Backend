const { createTable, insertProducts, getProducts, getProductsByID, updateProducts, deleteProducts } = require('../knex');

// const productos = [
//     {
//         id: 1,
//         title: "Escuadra",
//         price: 123.45,
//         thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
//     },
//     {
//         id: 2,
//         title: "Calculadora",
//         price: 234.56,
//         thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
//     },
//     {
//         id: 3,
//         title: "Globo Terráqueo",
//         price: 345.67,
//         thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
//     },
// ]

(async function () {

    try {
        await createTable();
        // await insertProducts(productos);
    } catch (error) {
        console.error(error.message);
    }
    
})();

class ProductosController {
    static async obtenerTodos () {
        const productos = await getProducts();
        return productos;
    }

    static async obtenerPorId (id) {
        const objetoFind = await getProductsByID({ id: id });
        return objetoFind;
    }

    static async agregar (req) {
        let { body : data } = req;
        await insertProducts(data);
        return data;
    }

    static async actualizar (id, req) {
        const objetoFind = await getProductsByID({ id: id });
        if (objetoFind) {
            await updateProducts([req.body], { id: id });
            return req.body;
        }
        return undefined;
    }

    static async borrar (id) {
        const objetoFind = await getProductsByID({ id: id });
        if (objetoFind) {
            const productos = await deleteProducts({ id: id });
            return productos;
        }
        return undefined;
    }
}

module.exports = ProductosController;