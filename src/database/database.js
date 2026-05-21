const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {

    if (err) {

        console.error('Erro ao conectar SQLite:', err.message);

    } else {

        console.log('SQLite conectado');

        db.serialize(() => {

            // CUSTOMERS
            db.run(`
                CREATE TABLE IF NOT EXISTS customers (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL
                )
            `);

            // PRODUCTS
            db.run(`
                CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    description TEXT,
                    price REAL,
                    slug TEXT UNIQUE,
                    tags TEXT,
                    active INTEGER DEFAULT 1
                )
            `);

            // ORDERS
            db.run(`
                CREATE TABLE IF NOT EXISTS orders (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    number TEXT,
                    status TEXT,
                    customer_id INTEGER,
                    FOREIGN KEY(customer_id)
                    REFERENCES customers(id)
                )
            `);

            // ORDER ITEMS
            db.run(`
                CREATE TABLE IF NOT EXISTS order_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    order_id INTEGER,
                    product_id INTEGER,
                    quantity INTEGER DEFAULT 1,
                    FOREIGN KEY(order_id)
                    REFERENCES orders(id),
                    FOREIGN KEY(product_id)
                    REFERENCES products(id)
                )
            `);

            console.log('Tabelas criadas');

        });

    }

});

module.exports = db;