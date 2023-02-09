'use strict'

const Product = use('App/Models/Product')

class ProductsController {
    async index() {
        return await Product.all()
    }

    async store({ request, response }) {
        const body = request.all()
        await Product.create(body)
        return response.json(body)
    }

    async show ({ params }) {
        return await Product.findOrFail(params.id)
    }

    async update ({ params, request, response }) {
        const body = request.all()
        await Product.query().where('id', params.id).update(body)
        return response.json(body) 
    }

    async destroy ({ params, response}) {
        const product = await Product.findOrFail(params.id)
        await product.delete()
        return response.json(product)
    }
}

module.exports = ProductsController