# Use official Bun image
FROM oven/bun:1.2.14

# Set working directory
WORKDIR /app

ENV NODE_ENV=production

# Copy package and lock files
COPY bun.lock bunfig.toml package.json ./

# Copy the rest of the code
COPY . .

# Install dependencies
RUN bun install

# Expose port (default Bun port is 3000, change if needed)
EXPOSE 3000

# Start the application
CMD ["bun", "run", "backend/index.ts"]
