'use strict';

const db = require('../database/database');

exports.get = async() => {

    return new Promise((resolve, reject) => {

        db.all(
            `
            SELECT
                o.id,
                o.number,
                o.status,
                c.id as customer_id,
                c.name as customer_name,
                p.id as product_id,
                p.title as product_title,
                oi.quantity
            FROM orders o
            LEFT JOIN customers c
                ON c.id = o.customer_id
            LEFT JOIN order_items oi
                ON oi.order_id = o.id
            LEFT JOIN products p
                ON p.id = oi.product_id
            `,
            [],
            (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            }
        );
    });
}

exports.create = async(data) => {

    return new Promise((resolve, reject) => {

        db.run(
            `
            INSERT INTO orders
            (
                number,
                status,
                customer_id
            )
            VALUES (?, ?, ?)
            `,
            [
                data.number,
                data.status,
                data.customer
            ],
            function(err) {

                if (err) {
                    reject(err);
                    return;
                }

                const orderId = this.lastID;
                if (!data.items || data.items.length === 0) {
                    resolve(orderId);
                    return;
                }

                const stmt = db.prepare(
                    `
                    INSERT INTO order_items
                    (
                        order_id,
                        product_id,
                        quantity
                    )
                    VALUES (?, ?, ?)
                    `
                );

                data.items.forEach(item => {
                    stmt.run([
                        orderId,
                        item.product,
                        item.quantity || 1
                    ]);
                });
                stmt.finalize();
                resolve(orderId);
            }
        );
    });
}