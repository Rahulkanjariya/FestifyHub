const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'FestifyHub API',
            version: '1.0.0',
            description: 'API documentation for FestifyHub',
        },
        servers: [
            {
                url: process.env.BASE_URL,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: []
        }],
    },
    apis: [
        "./swaggerDocument/auth/*.js",
        "./swaggerDocument/admin/*.js",
        "./swaggerDocument/organizer/*.js",
        "./swaggerDocument/user/*.js",  
    ],
};

const swaggerSpec = swaggerJsdoc(options)
module.exports = {
    swaggerSpec
};


