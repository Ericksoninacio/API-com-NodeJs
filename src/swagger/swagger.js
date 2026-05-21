const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {

    definition: {
        openapi: '3.0.0',

        info: {
            title: 'Node Store API',
            version: '1.0.0',
            description: 'API Node.js com SQLite'
        },

        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },

    apis: [
        './src/routes/*.js'
    ]
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};