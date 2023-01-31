import { get, getById, add, updateById, deleteById } from "./axios.js";

console.log("-------------------------------------------------------");

console.log("Adding the first product...");

await add({
  nombre: "Producto",
  precio: 99.99,
  foto: "https://definicion.de/wp-content/uploads/2009/06/producto.png",
});

let result = await get();
console.log("GET -> ", result);

result = await add({
  nombre: "Lapicera",
  precio: 89.56,
  foto: "https://aldina.com.ar/wp-content/uploads/2020/08/bic-cristal-trazo-fino-azul-1.jpg",
});
console.log("POST -> ", result);

result = await getById(result.id);
console.log("GET by ID -> ", result);

result = await updateById(
  {
    nombre: "Otra Lapicera",
    precio: 11.11,
    foto: "https://aldina.com.ar/wp-content/uploads/2020/08/bic-cristal-trazo-fino-azul-1.jpg",
  },
  result.id
);
console.log("PUT by ID -> ", result);

result = await deleteById(result.id);
console.log("DELETE by ID -> ", result);

result = await get();
console.log("GET -> ", result);
