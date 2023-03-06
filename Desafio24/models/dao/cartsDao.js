import { CustomError } from "../errors/customError.js"

class ProductsDao {
    
    async getById(id) {
      throw new CustomError(500, 'Method not implemented');
    }

    async create(newCart) {
      throw new CustomError(500, 'Method not implemented');
    }

    async updateById(id, newProd) {
      throw new CustomError(500, 'Method not implemented');
    }

    async deleteById(id) {
      throw new CustomError(500, 'Method not implemented');
    }

    async deleteProductById(id, id_prod) {
        throw new CustomError(500, 'Method not implemented');
      }
}

export default ProductsDao;