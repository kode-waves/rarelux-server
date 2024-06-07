// Import required modules
const http = require('http');
const restify = require("restify");
const corsMiddleware = require("restify-cors-middleware");
const dbConnection = require('./db'); // Import database connection function
const db = require("./db");
const routes = require('./routes'); // Import route handling function
require("dotenv").config({ silent: true }); // Load environment variables

// Define the port to listen on, defaulting to 3001 if not specified in the environment
const port = process.env.PORT || 3001;

// Create Restify server instance
let server;
server = restify.createServer({
    name: "RareLux_Server", // Set server name
});

// Set up server plugins
server.use(restify.plugins.gzipResponse()); // Enable gzip compression
server.use(
  restify.plugins.bodyParser({
    multiples: true, // Support parsing of multiple request bodies
  })
);
server.use(restify.plugins.queryParser()); // Parse query parameters

// Middleware function to handle request body parsing
server.use((req, res, next) => {
  if ((req.method === "PUT" || req.method === "POST") && !req.body) {
    req.body = {}; // Initialize request body if it doesn't exist
  }
  next(); // Move to the next middleware or route handler
});

// Configure CORS (Cross-Origin Resource Sharing) middleware
const cors = corsMiddleware({
  preflightMaxAge: 5, // Optional preflight request caching time
  origins: ['http://localhost:3000', 'https://localhost:3000'], // Whitelisted origins
  credentials: false, // Whether to include credentials in the CORS request
  allowHeaders: ["authorization", "API-Token"], // Allowed request headers
});

server.pre(cors.preflight); // Pre-flight CORS requests
server.use(cors.actual); // Actual CORS requests

// Handle MethodNotAllowed event
server.on("MethodNotAllowed", (req, res) => {
    if (req.method.toUpperCase() === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header("Access-Control-Allow-Methods", "DELETE, GET, POST, PUT");
      res.send(204); // Respond with status code 204 (No Content)
    } else {
      res.send({ message: "methodNotAllowed" }); // Send method not allowed message
    }
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.log(err, "Unable to connect to the database");
    server.close();
  }
  server.db = db;
    // Load routes
  routes(server);
    // Start server
    server.listen(port, () => {
      console.log(`RareLux Server is Running on Port: ${port}`);
  });
});

// Handle SIGTERM signal (graceful shutdown)
process.on("SIGTERM", () => {
    gracefulShutdown((err) => {
      console.log("Shutting the RareLux API Service down...");
      server.close(); // Close the server
      process.exit(err ? 1 : 0); // Exit process with error code if error exists
    });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error(err && err.stack); // Log error and stack trace
    // process.exit(1); // Optionally exit the process with an error code
});
