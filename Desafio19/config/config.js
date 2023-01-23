export default {
  dao: {
    target: process.env.DAO_TARGET || "mem",
    targetForMessages: process.env.DAO_TARGET_MSG || "mem",
    file: process.env.FILE_PATH || "db/products.db",
    fileForMessages: process.env.FILE_PATH_MSG || "db/messages.db",
    mongo: process.env.MONGODB_URI || "mongodb://localhost:27017/",
  },
};