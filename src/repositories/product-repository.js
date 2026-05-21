'use strict';

const db = require('../database/database');

exports.get = async() => {

    return new Promise((resolve, reject) => {

        db.all(
            `SELECT id, title, price, slug
             FROM products
             WHERE active = 1`,
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

exports.getBySlug = async(slug) => {

    return new Promise((resolve, reject) => {

        db.get(
            `SELECT title, description, price, slug, tags
             FROM products
             WHERE slug = ?
             AND active = 1`,
            [slug],
            (err, row) => {

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
            `SELECT *
             FROM products
             WHERE id = ?`,
            [id],
            (err, row) => {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(row);
            }
        );

    });

}

exports.getByTag = async(tag) => {

    return new Promise((resolve, reject) => {

        db.all(
            `SELECT title, description, price, slug, tags
             FROM products
             WHERE tags LIKE ?
             AND active = 1`,
            [`%${tag}%`],
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
            `INSERT INTO products
            (title, description, price, slug, tags, active)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.title,
                data.description,
                data.price,
                data.slug,
                data.tags,
                data.active ? 1 : 0
            ],
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

exports.update = async(id, data) => {

    return new Promise((resolve, reject) => {

        db.run(
            `UPDATE products
             SET
                title = ?,
                description = ?,
                price = ?,
                slug = ?
             WHERE id = ?`,
            [
                data.title,
                data.description,
                data.price,
                data.slug,
                id
            ],
            function(err) {

                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            }
        );

    });

}

exports.delete = async(id) => {

    return new Promise((resolve, reject) => {

        db.run(
            `DELETE FROM products
             WHERE id = ?`,
            [id],
            function(err) {

                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            }
        );

    });

}