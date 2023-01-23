const knex = require('knex');

const optionsMariaDB = {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '',
      database: 'test'
    },
    
}

const optionsSqlite3 = {
    client: 'sqlite3',
    connection: {
      filename: './db/ecommerce.sqlite'
    },
    useNullAsDefault: true
}

async function createTable() {
    const knexInstance = knex(optionsMariaDB);
    try {
        const exist = await knexInstance.schema.hasTable('productos')
        if (exist) {
            console.log("Products table already exists");
            return;
        }

        await knexInstance.schema.createTable('productos', (table) => {
            table.increments('id');
            table.string('title', 15).notNullable()
            table.integer('price').notNullable()
            table.string('thumbnail', 150).notNullable()
            table.primary('id');
        })
        console.log("Products table created"); 

    } catch (error) {
        console.error(error.message);
        throw error;

    } finally {
        knexInstance.destroy();
    }
}

async function createTableSqlite() {
    const knexInstance = knex(optionsSqlite3);
    try {
        const exist = await knexInstance.schema.hasTable('ecommerce')
        if (exist) {
            console.log("The ecommerce table already exists");
            return;
        }

        await knexInstance.schema.createTable('ecommerce', (table) => {
            table.string('email', 20).notNullable()
            table.string('message', 200).notNullable()
            table.string('date', 20).notNullable()
        })
        console.log("Ecommerce table created"); 

    } catch (error) {
        console.error(error.message);
        throw error;

    } finally {
        knexInstance.destroy();
    }
}

async function insertProducts(products) {
    const knexInstance = knex(optionsMariaDB);
    try {
        const product = await knexInstance('productos').insert(products);
        console.log('Products created');
        return product;
    } catch (error) {
        console.error(error.message);
        throw error;

    } finally {
        knexInstance.destroy();
    }
}

async function insertMessage(message) {
    const knexInstance = knex(optionsSqlite3);
    try {
        const product = await knexInstance('ecommerce').insert(message);
        console.log('Products created');
        return product;
    } catch (error) {
        console.error(error.message);
        throw error;

    } finally {
        knexInstance.destroy();
    }
}

async function getProducts() {
    const knexInstance = knex(optionsMariaDB);
    try {
        const products = await knexInstance('productos').select('*');
        console.log('Products created');
        return products;
    } catch (error) {
        console.error(error.message);
        throw error;

    } finally {
        knexInstance.destroy();
    }
}

async function getMessages() {
    const knexInstance = knex(optionsSqlite3);
    try {
        const products = await knexInstance('ecommerce').select('*');
        console.log('Found messages');
        return products;
    } catch (error) {
        console.error(error.message);
        throw error;

    } finally {
        knexInstance.destroy();
    }
}

async function getProductsByID(condition) {
    const knexInstance = knex(optionsMariaDB);
    try {
        const productFind = await knexInstance('productos').select('*').where(condition);
        console.log('Product found by ID');
        if (productFind.length == 0) {
            return undefined;
        }
        return productFind;
    } catch (error) {
        console.error(error.message);
        throw error;

    } finally {
        knexInstance.destroy();
    }
}

async function updateProducts(data, conditions) {
    const knexInstance = knex(optionsMariaDB);
    try {
        await knexInstance('productos').update(...data).where(conditions);
        console.log('Product found');
    } catch (error) {
        console.error(error.message);
        throw error;

    } finally {
        knexInstance.destroy();
    }
}

async function deleteProducts(conditions) {
    const knexInstance = knex(optionsMariaDB);
    try {
        const objetoFind = await knexInstance('productos').del().where(conditions);
        console.log('Removed product');
        return objetoFind;
    } catch (error) {
        console.error(error.message);
        throw error;

    } finally {
        knexInstance.destroy();
    }
}

module.exports = {
    createTable,
    insertProducts,
    getProducts,
    getProductsByID,
    updateProducts,
    deleteProducts,
    createTableSqlite,
    insertMessage,
    getMessages,
}