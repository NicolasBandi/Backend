export default {
  dao: {
    target: process.env.PERSISTENCE_TYPE || "mem",
    file: process.env.PRODUCTS_FILE_PATH || "db/products.db",
    mongo: process.env.MONGODB_URI || "mongodb://localhost:27017/",
  },
  cart: {
    file: process.env.CARTS_FILE_PATH || "db/carts.db",
  },
  message: {
    file: process.env.MESSAGES_FILE_PATH || "db/messages.db",
  },
};