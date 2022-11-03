import { knex } from '../../db.js';

export async function createProductoTable() {
    try {
        const isCreated = await knex.schema.hasTable('productos');
        if(isCreated) {
            console.log(' The table <product> already exists created in the DB!!')
        } else {
            await knex.schema.createTable('producto', (table) => {
                table.increments('id').primary().notNullable(),
                table.timestamp('timestamp').notNullable(),
                table.string('title', 100).notNullable(),
                table.float('price').notNullable(),
                table.string('description', 300),
                table.string('code').unique(),
                table.string('image', 200),
                table.integer('stock').notNullable()
            })
            console.log('The table <producto> has been created!!')
        }
    } catch (error) {
        console.log(error);
    }
}

export async function createCarritoTable() {
    try {
        const isCreated = await knex.schema.hasTable('carrito');
        if (isCreated) {
            console.log('The table <carrito> already exists created in the DB')
        } else {
            await knex.schema.createTable('carrito', (table) => {
                table.increments('id').primary().notNullable(),
                table.timestamp('timestamp').notNullable()
            })
            console.log('The table <cart> has been created!!')
        }
    } catch (error) {
        console.log(error);
    }
}

export async function createProductoCarritoTable() {
    try {
        const isCreated = await knex.schema.hasTable('productoCarrito');
        if (isCreated) {
            console.log('🔴 La tabla <productoCarrito> ya existe creada en la DB')
        } else {
            await knex.schema.createTable('productoCarrito', (table) => {
                table.increments('id').primary().notNullable(),
                // <FK carrito>
                table.integer('carritoId').unsigned().notNullable(),
                table.foreign('carritoId').references('id').inTable('carrito').onDelete('CASCADE'),
                // <FK producto>
                table.integer('productoId').unsigned().notNullable(),
                table.foreign('productoId').references('id').inTable('producto').onDelete('CASCADE')
            })
            console.log('🟢 La tabla <productoCarrito> ha sido creada')
        }
    } catch (error) {
        console.log(error);
    }
    
}