# Use an official Node.js runtime as the base image
FROM node:14

# Copy the rest of the application files
COPY . /app/

WORKDIR /app

RUN npm install

# Build the React app
RUN npm run build

# Expose port 3000
EXPOSE 4000

# Start the React app
CMD ["npm", "start"]
