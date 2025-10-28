# backend/Dockerfile
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including devDeps for TypeScript build)
RUN npm install

# Copy the rest of your app code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port for backend / socket server
EXPOSE 3000

# Use the built JS output as entrypoint (adjust path if your buildDir differs)
CMD ["node", "dist/index.js"]
