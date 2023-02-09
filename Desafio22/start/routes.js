'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Product = use('App/Models/Product')

Route.on('/').render('welcome')

// Route.get('products', 'GetProductsController.index')

// Route.post('products', 'GetProductsController.store')

// Route.get('products/:id', 'GetProductsController.show')

// Route.put('products/:id', 'GetProductsController.update')

// Route.delete('products/:id', 'GetProductsController.destroy')

Route.resource('products', 'ProductsController').apiOnly()
