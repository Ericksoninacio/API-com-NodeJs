'use strict';

const db = require('../database/database');

exports.create = async(data) => {
    return new Promise((resolve, reject) => {

        db.run(
            `INSERT INTO customers(name, email, password)
             VALUES (?, ?, ?)`,
            [data.name, data.email, data.password],
            function(err) {

                if (err) {
                    reject(err);
                    return;
                }

                resolve({
                    id: this.lastID,
                    ...data
                });
            }
        );

    });
}

exports.authenticate = async(data) => {
    return new Promise((resolve, reject) => {

        db.get(
            `SELECT * FROM customers
             WHERE email = ?
             AND password = ?`,
            [data.email, data.password],
            function(err, row) {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(row);
            }
        );

    });
}

exports.getById = async(id) => {
    return new Promise((resolve, reject) => {

        db.get(
            `SELECT * FROM customers
             WHERE id = ?`,
            [id],
            function(err, row) {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(row);
            }
        );

    });
}