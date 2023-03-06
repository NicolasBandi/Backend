import cartsService from '../services/cartsService.js';

export async function create(req, res, next) {
    try {
      const { user } = req
      req.body = { email: user.email, ...req.body}
      const cart = await cartsService.create(req.body)
      return res.status(201).json(cart)
    } catch (error) {
      next(error)
    }
  }
  
  export async function getById(req, res, next) {
    try {
      const cart = await cartsService.getById(req.params.id)
      return res.status(200).json(cart) 
    } catch (error) {
      next(error)
    }
  }

  export async function updateById(req, res, next) {
    try {
      const cart = await cartsService.updateById(req.params.id, req.body)
      return res.status(200).json(cart) 
    } catch (error) {
      next(error)
    }
  }
  
  export async function deleteById(req, res, next) {
    try {
      const cart = await cartsService.deleteById(req.params.id)
      return res.status(200).json(cart) 
    } catch (error) {
      next(error)
    }
  }

  export async function deleteProductById(req, res, next) {
    try {
      const cart = await cartsService.deleteProductById(req.params.id, req.params.id_prod)
      return res.status(200).json(cart) 
    } catch (error) {
      next(error)
    }
  }
  
  export default {
    create,
    getById,
    updateById,
    deleteById,
    deleteProductById,
  }