module.exports = {
  openapi: "3.0.3",
  info: {
    title: "MiniCRM API",
    version: "1.0.0",
    description: "API documentation for MiniCRM (customers, orders, campaigns, logs, auth).",
  },
  servers: [
    { url: "https://mini-crm-eut5.onrender.com/api", description: "Production server" },
    { url: "http://localhost:8000/api", description: "Development server" }
  ],
  paths: {
    "/customer": {
      get: {
        summary: "List customers",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Array of customers" } },
      },
      post: {
        summary: "Create customer",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  phone: { type: "string" },
                },
                required: ["name", "email"],
              },
            },
          },
        },
        responses: { 201: { description: "Customer created" } },
      },
    },
    "/customer/bulk": {
      post: {
        summary: "Bulk upload customers",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true },
        responses: { 200: { description: "Bulk upload accepted" } },
      },
    },
    "/order": {
      get: { summary: "List orders", security: [{ bearerAuth: [] }], responses: { 200: { description: "Array of orders" } } },
      post: {
        summary: "Create order",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  customerId: { type: "string" },
                  amount: { type: "number" },
                },
                required: ["customerId", "amount"],
              },
            },
          },
        },
        responses: { 201: { description: "Order created" } },
      },
    },
    "/campaign": {
      get: { summary: "List campaigns", security: [{ bearerAuth: [] }], responses: { 200: { description: "Array of campaigns" } } },
      post: {
        summary: "Create campaign",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  rules: { type: "object" },
                },
                required: ["name", "rules"],
              },
            },
          },
        },
        responses: { 201: { description: "Campaign created and messages enqueued" } },
      },
    },
    "/dashboard": {
      get: { summary: "Dashboard data (campaigns with stats & summaries)", security: [{ bearerAuth: [] }], responses: { 200: { description: "Dashboard payload" } } },
    },
    "/logs": {
      get: { summary: "List communication logs", security: [{ bearerAuth: [] }], responses: { 200: { description: "Logs" } } },
    },
    "/ai/messages": {
      post: { summary: "Generate AI messages (debug)", responses: { 200: { description: "Messages" } } },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT Bearer token authentication"
      },
      cookieAuth: { type: "apiKey", in: "cookie", name: "connect.sid" },
    },
  },
};


