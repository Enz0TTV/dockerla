# 🐳 Dockerla - Projet Docker

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Caddy](https://img.shields.io/badge/Caddy-%230A2F4C.svg?style=for-the-badge&logo=caddy&logoColor=white)

Bienvenue sur **Dockerla**, une infrastructure complète orchestrée par Docker. Ce dépôt contient l'ensemble des configurations nécessaires pour déployer une application web moderne comprenant un Frontend, une API Backend, une base de données et des outils d'administration/monitoring.

---

##  Architecture des Services

Le projet s'articule autour de plusieurs conteneurs interconnectés via `compose.yml` :

- **Caddy** : Serveur web très performant faisant office de *Reverse Proxy* et hébergeant les fichiers statiques du Frontend.
- **Backend** : API en Node.js (construite à partir du dossier `src/backend`).
- **Base de données (db)** : Instance de PostgreSQL 18.
- **pgAdmin** : Interface web puissante d'administration pour la base de données PostgreSQL.
- **Dozzle** : Visualiseur web des logs Docker en temps réel, léger et performant.

---

##  Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre machine :
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

##  Installation & Lancement

1. **Cloner le dépôt**
   ```bash
   git clone <votre_url_de_depot>
   cd dockerla-main
   ```

2. **Configurer les variables d'environnement**
   Copiez le fichier d'exemple et renommez-le en `.env`. Vous pouvez modifier les valeurs à l'intérieur selon vos besoins de sécurité ou de configuration.
   ```bash
   cp .env.example .env
   ```
   > **Note :** Si vous modifiez l'utilisateur de la base de données (`POSTGRES_USER`) dans le fichier `.env`, veillez à mettre à jour le fichier `./db/pgadmin/servers.json` en conséquence pour que pgAdmin puisse s'y connecter automatiquement.

3. **Lancer les conteneurs**
   Démarrez l'ensemble de l'infrastructure en arrière-plan :
   ```bash
   docker compose up -d
   ```

---

##  Accès aux Services

Une fois les conteneurs démarrés, Caddy redirige automatiquement le trafic vers les bons services. Vous pouvez y accéder via votre navigateur :

| Service | Description | URL | Port exposé |
| :--- | :--- | :--- | :--- |
| **Frontend** | Application côté client (servie via Caddy) | [http://localhost](http://localhost) | `80` et `443` |
| **Backend API** | Accès direct à l'API Node.js | [http://localhost:3000](http://localhost:3000) | `3000` |
| **pgAdmin** | Interface de gestion de la base de données | [http://localhost:8080](http://localhost:8080) | `8080` |
| **Dozzle** | Visualisation des logs de tous les conteneurs | [http://localhost:8888](http://localhost:8888) | `8888` |

*Identifiants par défaut (configurés via `.env.example`) :*
- **pgAdmin** : `admin@admin.com` / `changeme`
- **Postgres** : Utilisateur : `dbuser` / Mot de passe : `changeme` / Base : `mieuxges`

---

## Structure du Projet

```text
dockerla-main/
├── .env                 # Variables d'environnement (à créer depuis .env.example)
├── .env.example         # Template des variables d'environnement
├── compose.yml          # Fichier de configuration principal Docker Compose
├── conf/
│   └── Caddyfile        # Configuration du Reverse Proxy Caddy et de ses routes
├── db/
│   ├── migrations/      # Scripts SQL exécutés automatiquement au démarrage de la BDD
│   └── pgadmin/         # Fichier servers.json pour préconfigurer les serveurs dans pgAdmin
└── src/
    ├── backend/         # Code source et Dockerfile de l'API Node.js
    └── frontend/        # Fichiers statiques du front servis par Caddy (/srv)
```

---

##  Gestion et Commandes Utiles

- **Voir les logs via le terminal :**
  ```bash
  docker compose logs -f
  ```
  *( Astuce : visitez [http://localhost:8888](http://localhost:8888) pour utiliser Dozzle, c'est bien plus visuel !)*

- **Arrêter les conteneurs en douceur :**
  ```bash
  docker compose down
  ```

- **Arrêter et supprimer les volumes (⚠️ Attention, cela supprime la base de données locale) :**
  ```bash
  docker compose down -v
  ```

- **Reconstruire les images :**
  Utile si vous avez modifié le code dans `src/backend/` ou le `Dockerfile`.
  ```bash
  docker compose build
  # Ou reconstruire et redémarrer en une seule commande :
  docker compose up -d --build
  ```

<br>
<br>