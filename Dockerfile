# 1. Use official Node image
FROM node:20-alpine

# 2. Set working directory inside container
WORKDIR /usr/src/app

# 3. Copy package files first (for caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of the app
COPY . .

# 6. Expose port (inside container)
EXPOSE 3000

# 7. Start the app
CMD ["node", "app.js"]
