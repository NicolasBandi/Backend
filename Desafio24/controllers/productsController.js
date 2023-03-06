import productsService from '../services/productsService.js';

export async function create(req, res, next) {
    try {
      const product = await productsService.create(req.body)
      return res.status(201).json(product)
    } catch (error) {
      next(error)
    }
  }
  
  export async function get(req, res, next) {
    try {
      const product = await productsService.get()
      return res.status(200).json(product) 
    } catch (error) {
      next(error)
    }
  }
  
  export async function getById(req, res, next) {
    try {
      const product = await productsService.getById(req.params.id)
      return res.status(200).json(product) 
    } catch (error) {
      next(error)
    }
  }

  export async function getByCategory(req, res, next) {
    try {
      const product = await productsService.getByCategory(req.params.categoria)
      return res.status(200).json(product) 
    } catch (error) {
      next(error)
    }
  }
  
  export async function updateById(req, res, next) {
    try {
      const product = await productsService.updateById(req.params.id, req.body)
      return res.status(200).json(product) 
    } catch (error) {
      next(error)
    }
  }
  
  export async function deleteById(req, res, next) {
    try {
      const product = await productsService.deleteById(req.params.id)
      return res.status(200).json(product) 
    } catch (error) {
      next(error)
    }
  }
  
  export default {
    create,
    get,
    getById,
    getByCategory,
    updateById,
    deleteById,
  }