# Setup

- Copier `.env.example` vers `.env`
- Lancer le projet Docker Compose avec `docker compose up -d --build`

## File structure

- `conf` : Fichiers de configuration divers (contient le Caddyfile pour le reverse proxy pour le moment)
- `db` : Scripts d'initialisation / seeding DB et configuration de pgadmin
- `src` : Code source pour le backend et le frontend

## Containers

- `db` : PostgreSQL avec des scripts d'initialisation de la db
- `pgadmin` : Administration de la base de données
- `backend` : Backend principal du site en Node.js
- `caddy` : Reverse proxy servant le backend, le frontend et le Dozzle
- `dozzle` : Service de monitoring des conteneurs