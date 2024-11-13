# Product API

A simple product API with Swagger documentation.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later recommended)
- npm (usually comes with Node.js)

## Installation

```
npm install
```

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading:

```
npm run dev
```

This will start the server using `ts-node-dev`, which will watch for file changes and automatically restart the server.

## API Documentation

This project uses Swagger for API documentation. Once the server is running, you can access the Swagger UI at:

```
http://localhost:<port>/api-docs
```

Replace `<port>` with the port number your server is running on.

## Scripts

- `npm run dev`: Starts the development server with hot-reloading
- `npm run build`: Compiles TypeScript to JavaScript
- `npm start`: Runs the compiled JavaScript in production mode
- `npm test`: Placeholder for running tests (currently not implemented)

## Dependencies

- express: Web framework for Node.js
- body-parser: Middleware to parse incoming request bodies
- cors: Middleware to enable CORS
- swagger-jsdoc: Generates Swagger/OpenAPI specifications
- swagger-ui-express: Serves Swagger UI for API documentation
