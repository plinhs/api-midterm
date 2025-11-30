const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Mobile Billing API",
            version: "1.0.0",
            description: "API documentation for Mobile Billing System"
        },
        servers: [
            {
                url: "https://billing-api.azure-api.net/api/v1",
                description: "API Gateway URL"
            },
            {
                url: "http://localhost:3000/api/v1",
                description: "Local Development"
            }
        ],
        components: {
            // securitySchemes: {
            //     BearerAuth: {
            //         type: "http",
            //         scheme: "bearer",
            //         bearerFormat: "JWT"
            //     }
            // }
        }
    },
    apis: ["./routes/*.js"], // Route files contain the annotations
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
    app.get("/swagger.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
