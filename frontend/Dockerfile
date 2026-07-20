FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy application files
COPY . /app/

# Expose Vite default port
EXPOSE 5173

# Run development server
CMD ["npm", "run", "dev", "--", "--host"]
