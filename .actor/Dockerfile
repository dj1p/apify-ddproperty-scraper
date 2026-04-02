FROM apify/actor-node-playwright-chrome:20

COPY package*.json ./
RUN npm --quiet set progress=false \
    && npm install --omit=optional \
    && echo "Node.js version:" \
    && node --version \
    && echo "NPM version:" \
    && npm --version

COPY . ./
RUN npm run build \
    && npm prune --omit=dev --omit=optional

CMD npm start --silent
