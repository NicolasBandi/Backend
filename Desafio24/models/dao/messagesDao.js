import { CustomError } from "../errors/customError.js"

class MessagesDao {

    async get() {
        throw new CustomError(500, 'Method not implemented');
    }
    
    async getById(id) {
      throw new CustomError(500, 'Method not implemented');
    }

    async create(newProd) {
      throw new CustomError(500, 'Method not implemented');
    }
}

export default MessagesDao;