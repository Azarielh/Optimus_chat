# Use official Bun image
FROM oven/bun:1.1.13

# Set working directory
WORKDIR /app

# Copy package and lock files
COPY bun.lock bunfig.toml package.json ./

# Copy the rest of the code
COPY . .

# Install dependencies
RUN bun install

# Build frontend (if needed)
RUN bun run build || echo "No build script, skipping build"

# Expose port (default Bun port is 3000, change if needed)
EXPOSE 3000

# Start the backend server
ENV NODE_ENV=production
CMD ["bun", "run", "backend/index.ts"]
