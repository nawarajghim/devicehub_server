# backend/Dockerfile
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the code
COPY . .

# Expose port for backend / socket server
EXPOSE 3000

# Ensure your server listens on 0.0.0.0
CMD ["node", "index.js"]
