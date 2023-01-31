import { CustomError } from "../errors/customError.js"

class ProductsDao {

    async getAll() {
        throw new CustomError(500, 'Method not implemented');
    }
    
    async getById(id) {
      throw new CustomError(500, 'Method not implemented');
    }

    async create(newProd) {
      throw new CustomError(500, 'Method not implemented');
    }

    async updateById(id, newProd) {
      throw new CustomError(500, 'Method not implemented');
    }

    async deleteById(id) {
      throw new CustomError(500, 'Method not implemented');
    }
}

export default ProductsDao;