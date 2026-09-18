import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Personal Finance Tracker API",
      version: "1.0.0",
      description:
        "API for managing personal income, expenses, transactions and profiles",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    tags: [
      {
        name: "Auth",
        description: "Authentication endpoints",
      },
      {
        name: "Transactions",
        description: "Income and expense transactions",
      },
      {
        name: "Upload",
        description: "Profile picture upload",
      },
      
    ],
  },

  apis: [
    "./routes/*.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;