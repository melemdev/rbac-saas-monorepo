# Fastify Server

A modern, fast and low overhead web framework for Node.js.

## Features

- TypeScript support
- CORS enabled
- Swagger documentation
- Health check endpoint
- Hot reload during development

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev
```

The server will start at http://localhost:3333

### API Documentation

Swagger documentation is available at http://localhost:3333/documentation

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

## Project Structure

```
server/
├── src/
│   └── index.ts      # Main application file
├── package.json      # Project dependencies and scripts
└── tsconfig.json     # TypeScript configuration
``` 