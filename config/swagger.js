const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mobile Billing API",
      version: "1.0.0",
      description: "API documentation for Mobile Billing System",
    },
    servers: [
      {
        url: "https://api-midterm-bd2m.onrender.com/api/v1",
        description: "Render Deployment",
      },
      {
        url: "http://localhost:3000/api/v1",
        description: "Local Development",
      },
    ],
  },

  // FIX: correct glob from /config to /routes
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.get("/swagger.json", (req, res) => res.json(swaggerSpec));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
