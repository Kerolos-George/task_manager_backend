const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
            description: 'API documentation for managing tasks',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
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
            schemas: {
                Task: {  
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Auto-generated ID of the task',
                            example: '60d0fe4f5311236168a109ca'
                        },
                        user_id: {
                            type: 'string',
                            description: 'ID of the user who created the task',
                            example: '60d0fe4f5311236168a109c9'
                        },
                        title: {
                            type: 'string',
                            description: 'Title of the task',
                            example: 'Finish project documentation'
                        },
                        description: {
                            type: 'string',
                            description: 'Detailed description of the task',
                            example: 'Complete the documentation for the new project feature'
                        },
                        status: {
                            type: 'string',
                            description: 'Status of the task (completed or incomplete)',
                            enum: ['completed', 'incomplete'],
                            example: 'incomplete'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when the task was created',
                            example: '2023-06-15T12:00:00Z'
                        }
                    }
                },
                TaskInput: {  
                    type: 'object',
                    required: ['title', 'description'],
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Title of the task',
                            example: 'Finish project documentation'
                        },
                        description: {
                            type: 'string',
                            description: 'Detailed description of the task',
                            example: 'Complete the documentation for the new project feature'
                        },
                        status: {
                            type: 'string',
                            description: 'Status of the task (completed or incomplete)',
                            enum: ['completed', 'incomplete'],
                            example: 'incomplete'
                        }
                    }
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
