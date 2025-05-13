# Build stage
FROM node:22-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.1.0 --activate


# Set working directory
WORKDIR /app


# Copy package files and panda config file
COPY package.json pnpm-lock.yaml panda.config.ts ./


# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Get Git SHA during build
ARG GIT_SHA
ENV GIT_SHA=${GIT_SHA}

# Build the application
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the env generation script
COPY docker/generate-env.sh /docker-entrypoint.d/

# Make the script executable
RUN chmod +x /docker-entrypoint.d/generate-env.sh

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx with the env generation script
CMD ["/docker-entrypoint.d/generate-env.sh"] 