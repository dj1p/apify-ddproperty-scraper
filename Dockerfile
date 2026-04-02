# Build stage
FROM apify/actor-node-playwright-chrome:20 AS builder

COPY --chown=myuser:myuser package*.json ./

RUN npm install --include=dev --audit=false

COPY --chown=myuser:myuser . ./

RUN npm run build

# Final image
FROM apify/actor-node-playwright-chrome:20

COPY --chown=myuser:myuser package*.json ./

RUN npm --quiet set progress=false \
    && npm install --omit=dev --omit=optional --audit=false \
    && echo "Installed NPM packages:" \
    && (npm list --omit=dev --all || true) \
    && echo "Node.js version:" \
    && node --version \
    && echo "NPM version:" \
    && npm --version \
    && rm -rf ~/.npm

# Copy built JS from builder
COPY --from=builder --chown=myuser:myuser /home/myuser/dist ./dist

COPY --chown=myuser:myuser . ./

CMD ["node", "dist/main.js"]
