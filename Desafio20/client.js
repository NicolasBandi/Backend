import { get, getById, add, updateById, deleteById } from "./axios.js";

console.log("-------------------------------------------------------");

console.log("Adding the first product...");

await add({
  nombre: "Blu Ray 4k Doctor Strange In Multiverse Of Madness Ultra Hd",
  precio: 13999.99,
  foto: "https://http2.mlstatic.com/D_NQ_NP_682063-MLA50693882882_072022-O.webp",
});

let result = await get();
console.log("GET -> ", result);

result = await add({
  nombre: "The Batman 4k Ultra Hd + Blu-ray + Digital Code",
  precio: 12500.99,
  foto: "https://http2.mlstatic.com/D_NQ_NP_707502-MLA51215185201_082022-O.webp",
});
console.log("POST -> ", result);

result = await getById(result.id);
console.log("GET by ID -> ", result);

result = await updateById(
  {
    nombre: "Blu-ray Mr. Nobody / Sr. Nadie / Extended Director´s Cut",
    precio: 9000,
    foto: "https://http2.mlstatic.com/D_NQ_NP_13295-MLA20074435103_042014-O.webp",
  },
  result.id
);
console.log("PUT by ID -> ", result);

result = await deleteById(result.id);
console.log("DELETE by ID -> ", result);

result = await get();
console.log("GET -> ", result);
