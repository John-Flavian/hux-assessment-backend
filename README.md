# Contact Manager (Backend)

## Overview

The **Contact Manager Backend** is designed to complement the [Contact Manager](https://github.com/John-Flavian/hux-assessment-frontend) web application. Built with Node.js, Express.js, and Mongoose, this backend service efficiently manages and organizes user contact information. It provides functionality for creating, editing, deleting, and viewing contacts.

## Installation

To set up the backend project, install the required dependencies using one of the following package managers:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## Configuration

### Database

You can use a local MongoDB database if it is installed on your machine.

Alternatively, you can use Docker to run MongoDB. Ensure Docker is running and execute:

```bash
npm run dock:up
```

This command initializes the Docker container for MongoDB. You can modify the configuration in the `docker-compose.yml` file if needed.

To stop the Docker container, use:

```bash
npm run dock:down
```

### Environment Variables

Configure the environment variables by creating a `.env` file in the root directory of the project. Set the following variables:

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/contact-manager
TOKEN_SECRET=secret2024
CLIENT_URL=http://localhost:3000
```

## Development

To start the development server, use one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Features

- **User Registration**: Allows users to create new accounts.
- **User Login**: Authenticates users and manages their sessions.
- **Contact Management**: Supports creation, updating, and deletion of contacts.

## Contribution

This codebase is developed by [@John-Flavian](https://github.com/John-Flavian). Contributions and feedback are welcome.

For more information, visit the [Frontend Repository](https://github.com/John-Flavian/hux-assessment-frontend).

---

Feel free to adjust any sections according to your project's specifics or personal preferences!
