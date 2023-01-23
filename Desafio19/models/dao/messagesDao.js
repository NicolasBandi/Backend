import CustomError from "../errors/customError.js"

class ProductsDao {

    async getAll() {
        throw new CustomError(500, 'Method not implemented');
    }

    async create(newMsg) {
      throw new CustomError(500, 'Method not implemented');
    }
}

export default ProductsDao;