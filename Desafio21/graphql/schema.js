import { buildSchema } from 'graphql'

export default buildSchema(`
  type Product {
    id: ID!
    nombre: String
    precio: Int
    foto: String
  }
  input ProductInput {
    nombre: String
    precio: Int
    foto: String
  }
  type Query {
    getProducts(query: String): [Product]
    getProductById(id: ID!): Product
  }
  type Mutation {
    createProduct(data: ProductInput!): Product
    updateProduct(id: ID!, data: ProductInput!): Product
    deleteProduct(id: ID!): Product
  }
`)

// query {
//   getProducts{
//     id
//     nombre
//     precio
//     foto
//   }
// }

// mutation {
//   createProduct (data: {
//     nombre: "asdasd",
//     precio: 111,
//     foto: "asd"
//   }) {
//     id
//     nombre
//     precio
//     foto
//   }
// }

// query {
//   getProductById (id: "e80b9948-9929-4699-9611-e85fab5147e4"){
//     id
//     nombre
//     precio
//     foto
//   }
// }

// mutation {
//   updateProduct (id: "ad56321c-0684-48a1-b2dd-60fecd7f317b", data: {
//     nombre: "qweqwe",
//     precio: 999,
//     foto: "zxczxczxc"
//   }) {
//     id
//     nombre
//     precio
//     foto
//   }
// }

// mutation {
//   deleteProduct (id: "7d1e1e3f-3c85-47ce-a5a4-e5fb4a0431b1"){
//     id
//     nombre
//     precio
//     foto
//   }
// }