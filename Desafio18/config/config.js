export default {
  dao: {
    target: process.env.DAO_TARGET || "mem",
    file: process.env.FILE_PATH || "db/products.db",
    mongo: process.env.MONGODB_URI || "mongodb://localhost:27017/",
  },
};