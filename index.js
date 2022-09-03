const Container = require('./class');
const data = require('./database');

const products = new Container('./database.txt');
products.save(data);
products.getById(1);
products.getAll();
products.deleteById(1);
products.deleteAll();