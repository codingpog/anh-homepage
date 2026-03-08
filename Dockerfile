# --- Stage 1: Builder ---
FROM node:22

# Set working directory for builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install --omit=dev

# Copy rest of the code
COPY . .

EXPOSE 5000

CMD ["npm", "start"]