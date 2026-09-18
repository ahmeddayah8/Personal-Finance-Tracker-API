import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

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
        url: (process.env.NODE_ENV = "development"
          ? "http://localhost:5000"
          : "https://personal-finance-tracker-api-s11c.onrender.com"),
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

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
