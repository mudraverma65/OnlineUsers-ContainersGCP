# Use an official Node.js LTS (Long Term Support) image as the base image
FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install app dependencies
RUN npm ci --production

# Copy only the necessary files for building the React app
COPY public/ public/
COPY src/ src/

# Build the React app
RUN npm run build

# Expose the port your app listens on (typically 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]