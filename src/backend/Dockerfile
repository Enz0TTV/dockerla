FROM node:22-alpine

WORKDIR /app

# 1. Dépendances
COPY package*.json ./
RUN npm ci

# 2. Code source et compilation TypeScript
COPY . .
RUN npm run build && npm prune --omit=dev

# 3. Sécurité & Environnement
ENV NODE_ENV=production
ENV PORT=3000
USER node

EXPOSE 3000

# 4. Healthcheck natif Node 22 (sans curl ni wget)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/health').then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

CMD ["node", "dist/server.js"]
