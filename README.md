*Choose your language: [🇫🇷 Français](#-dockerla---projet-docker) | [🇬🇧 English](#-english-version) | [🇩🇪 Deutsch](#-deutsche-version) | [🇨🇳 中文](#-中文版)*

---

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

---

# 🇬🇧 English Version
# 🐳 Dockerla - Docker Project

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Caddy](https://img.shields.io/badge/Caddy-%230A2F4C.svg?style=for-the-badge&logo=caddy&logoColor=white)

Welcome to **Dockerla**, a complete infrastructure orchestrated by Docker. This repository contains all the necessary configurations to deploy a modern web application including a Frontend, a Backend API, a database, and administration/monitoring tools.

---

##  Services Architecture

The project is built around several interconnected containers via `compose.yml`:

- **Caddy**: High-performance web server acting as a *Reverse Proxy* and hosting the Frontend static files.
- **Backend**: Node.js API (built from the `src/backend` folder).
- **Database (db)**: PostgreSQL 18 instance.
- **pgAdmin**: Powerful web administration interface for the PostgreSQL database.
- **Dozzle**: Real-time Docker log web viewer, lightweight and fast.

---

##  Prerequisites

Before you start, make sure you have installed on your machine:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

##  Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your_repo_url>
   cd dockerla-main
   ```

2. **Configure environment variables**
   Copy the example file and rename it to `.env`. You can modify the values inside according to your security or configuration needs.
   ```bash
   cp .env.example .env
   ```
   > **Note:** If you modify the database user (`POSTGRES_USER`) in the `.env` file, be sure to update the `./db/pgadmin/servers.json` file accordingly so pgAdmin can connect automatically.

3. **Start the containers**
   Start the entire infrastructure in the background:
   ```bash
   docker compose up -d
   ```

---

##  Services Access

Once the containers are started, Caddy automatically redirects traffic to the right services. You can access them via your browser:

| Service | Description | URL | Exposed Port |
| :--- | :--- | :--- | :--- |
| **Frontend** | Client-side application (served via Caddy) | [http://localhost](http://localhost) | `80` and `443` |
| **Backend API** | Direct access to the Node.js API | [http://localhost:3000](http://localhost:3000) | `3000` |
| **pgAdmin** | Database management interface | [http://localhost:8080](http://localhost:8080) | `8080` |
| **Dozzle** | Log visualization for all containers | [http://localhost:8888](http://localhost:8888) | `8888` |

*Default credentials (configured via `.env.example`):*
- **pgAdmin**: `admin@admin.com` / `changeme`
- **Postgres**: User: `dbuser` / Password: `changeme` / Database: `mieuxges`

---

##  Project Structure

```text
dockerla-main/
├── .env                 # Environment variables (create from .env.example)
├── .env.example         # Environment variables template
├── compose.yml          # Main Docker Compose configuration file
├── conf/
│   └── Caddyfile        # Caddy Reverse Proxy configuration and routes
├── db/
│   ├── migrations/      # SQL scripts executed automatically on DB startup
│   └── pgadmin/         # servers.json file to preconfigure servers in pgAdmin
└── src/
    ├── backend/         # Source code and Dockerfile of the Node.js API
    └── frontend/        # Frontend static files served by Caddy (/srv)
```

---

##  Management and Useful Commands

- **View logs via terminal:**
  ```bash
  docker compose logs -f
  ```
  *( Tip: visit [http://localhost:8888](http://localhost:8888) to use Dozzle, it's much more visual!)*

- **Stop containers gracefully:**
  ```bash
  docker compose down
  ```

- **Stop and remove volumes (⚠️ Warning, this deletes the local database):**
  ```bash
  docker compose down -v
  ```

- **Rebuild images:**
  Useful if you modified the code in `src/backend/` or the `Dockerfile`.
  ```bash
  docker compose build
  # Or rebuild and restart in a single command:
  docker compose up -d --build
  ```

<br>
<br>

---

# 🇩🇪 Deutsche Version
# 🐳 Dockerla - Docker Projekt

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Caddy](https://img.shields.io/badge/Caddy-%230A2F4C.svg?style=for-the-badge&logo=caddy&logoColor=white)

Herzlich willkommen bei **Dockerla**, einer vollständigen Infrastruktur, die von Docker orchestriert wird. Dieses Repository enthält alle notwendigen Konfigurationen, um eine moderne Webanwendung bereitzustellen, einschließlich Frontend, Backend-API, Datenbank und Administrations-/Überwachungswerkzeugen.

---

##  Service-Architektur

Das Projekt ist um mehrere Container herum aufgebaut, die über die Datei `compose.yml` miteinander verbunden sind:

- **Caddy**: Leistungsstarker Webserver, der als *Reverse Proxy* fungiert und die statischen Frontend-Dateien hostet.
- **Backend**: Node.js-API (erstellt aus dem Ordner `src/backend`).
- **Datenbank (db)**: PostgreSQL 18-Instanz.
- **pgAdmin**: Leistungsstarke Web-Administrationsoberfläche für die PostgreSQL-Datenbank.
- **Dozzle**: Echtzeit-Web-Viewer für Docker-Protokolle, leichtgewichtig und schnell.

---

##  Voraussetzungen

Bevor Sie beginnen, stellen Sie sicher, dass Sie Folgendes auf Ihrem Computer installiert haben:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Installation & Start

1. **Repository klonen**
   ```bash
   git clone <ihre_repo_url>
   cd dockerla-main
   ```

2. **Umgebungsvariablen konfigurieren**
   Kopieren Sie die Beispieldatei und benennen Sie sie in `.env` um. Sie können die Werte entsprechend Ihren Sicherheits- oder Konfigurationsanforderungen ändern.
   ```bash
   cp .env.example .env
   ```
   > **Hinweis:** Wenn Sie den Datenbankbenutzer (`POSTGRES_USER`) in der Datei `.env` ändern, stellen Sie sicher, dass Sie die Datei `./db/pgadmin/servers.json` entsprechend aktualisieren, damit sich pgAdmin automatisch verbinden kann.

3. **Container starten**
   Starten Sie die gesamte Infrastruktur im Hintergrund:
   ```bash
   docker compose up -d
   ```

---

##  Zugriff auf die Dienste

Sobald die Container gestartet sind, leitet Caddy den Datenverkehr automatisch an die richtigen Dienste weiter. Sie können über Ihren Browser darauf zugreifen:

| Dienst | Beschreibung | URL | Freigegebener Port |
| :--- | :--- | :--- | :--- |
| **Frontend** | Clientseitige Anwendung (über Caddy bereitgestellt) | [http://localhost](http://localhost) | `80` und `443` |
| **Backend API** | Direkter Zugriff auf die Node.js-API | [http://localhost:3000](http://localhost:3000) | `3000` |
| **pgAdmin** | Verwaltungsoberfläche für die Datenbank | [http://localhost:8080](http://localhost:8080) | `8080` |
| **Dozzle** | Protokollanzeige für alle Container | [http://localhost:8888](http://localhost:8888) | `8888` |

*Standard-Anmeldedaten (konfiguriert über `.env.example`):*
- **pgAdmin**: `admin@admin.com` / `changeme`
- **Postgres**: Benutzer: `dbuser` / Passwort: `changeme` / Datenbank: `mieuxges`

---

##  Projektstruktur

```text
dockerla-main/
├── .env                 # Umgebungsvariablen (erstellen aus .env.example)
├── .env.example         # Vorlage für Umgebungsvariablen
├── compose.yml          # Hauptkonfigurationsdatei für Docker Compose
├── conf/
│   └── Caddyfile        # Konfiguration des Caddy Reverse Proxy und seiner Routen
├── db/
│   ├── migrations/      # SQL-Skripte, die automatisch beim Start der Datenbank ausgeführt werden
│   └── pgadmin/         # servers.json Datei zur Vorkonfiguration von Servern in pgAdmin
└── src/
    ├── backend/         # Quellcode und Dockerfile der Node.js-API
    └── frontend/        # Statische Frontend-Dateien, die von Caddy bereitgestellt werden (/srv)
```

---

##  Verwaltung und nützliche Befehle

- **Protokolle über das Terminal anzeigen:**
  ```bash
  docker compose logs -f
  ```
  *( Tipp: Besuchen Sie [http://localhost:8888](http://localhost:8888), um Dozzle zu verwenden, es ist viel übersichtlicher!)*

- **Container sanft stoppen:**
  ```bash
  docker compose down
  ```

- **Volumes stoppen und entfernen (⚠️ Achtung, dies löscht die lokale Datenbank):**
  ```bash
  docker compose down -v
  ```

- **Images neu erstellen:**
  Nützlich, wenn Sie den Code in `src/backend/` oder die `Dockerfile` geändert haben.
  ```bash
  docker compose build
  # Oder neu erstellen und mit einem einzigen Befehl neu starten:
  docker compose up -d --build
  ```

<br>
<br>

---

# 🇨🇳 中文版
# 🐳 Dockerla - Docker 项目

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Caddy](https://img.shields.io/badge/Caddy-%230A2F4C.svg?style=for-the-badge&logo=caddy&logoColor=white)

欢迎使用 **Dockerla**，这是一个由 Docker 编排的完整基础设施。该存储库包含部署现代 Web 应用程序（包括前端、后端 API、数据库和管理/监控工具）所需的所有配置。

---
*Choose your language: [🇫🇷 Français](#-dockerla---projet-docker) | [🇬🇧 English](#-english-version) | [🇩🇪 Deutsch](#-deutsche-version) | [🇨🇳 中文](#-中文版)*

---

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

---

# 🇬🇧 English Version
# 🐳 Dockerla - Docker Project

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Caddy](https://img.shields.io/badge/Caddy-%230A2F4C.svg?style=for-the-badge&logo=caddy&logoColor=white)

Welcome to **Dockerla**, a complete infrastructure orchestrated by Docker. This repository contains all the necessary configurations to deploy a modern web application including a Frontend, a Backend API, a database, and administration/monitoring tools.

---

##  Services Architecture

The project is built around several interconnected containers via `compose.yml`:

- **Caddy**: High-performance web server acting as a *Reverse Proxy* and hosting the Frontend static files.
- **Backend**: Node.js API (built from the `src/backend` folder).
- **Database (db)**: PostgreSQL 18 instance.
- **pgAdmin**: Powerful web administration interface for the PostgreSQL database.
- **Dozzle**: Real-time Docker log web viewer, lightweight and fast.

---

##  Prerequisites

Before you start, make sure you have installed on your machine:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

##  Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your_repo_url>
   cd dockerla-main
   ```

2. **Configure environment variables**
   Copy the example file and rename it to `.env`. You can modify the values inside according to your security or configuration needs.
   ```bash
   cp .env.example .env
   ```
   > **Note:** If you modify the database user (`POSTGRES_USER`) in the `.env` file, be sure to update the `./db/pgadmin/servers.json` file accordingly so pgAdmin can connect automatically.

3. **Start the containers**
   Start the entire infrastructure in the background:
   ```bash
   docker compose up -d
   ```

---

##  Services Access

Once the containers are started, Caddy automatically redirects traffic to the right services. You can access them via your browser:

| Service | Description | URL | Exposed Port |
| :--- | :--- | :--- | :--- |
| **Frontend** | Client-side application (served via Caddy) | [http://localhost](http://localhost) | `80` and `443` |
| **Backend API** | Direct access to the Node.js API | [http://localhost:3000](http://localhost:3000) | `3000` |
| **pgAdmin** | Database management interface | [http://localhost:8080](http://localhost:8080) | `8080` |
| **Dozzle** | Log visualization for all containers | [http://localhost:8888](http://localhost:8888) | `8888` |

*Default credentials (configured via `.env.example`):*
- **pgAdmin**: `admin@admin.com` / `changeme`
- **Postgres**: User: `dbuser` / Password: `changeme` / Database: `mieuxges`

---

##  Project Structure

```text
dockerla-main/
├── .env                 # Environment variables (create from .env.example)
├── .env.example         # Environment variables template
├── compose.yml          # Main Docker Compose configuration file
├── conf/
│   └── Caddyfile        # Caddy Reverse Proxy configuration and routes
├── db/
│   ├── migrations/      # SQL scripts executed automatically on DB startup
│   └── pgadmin/         # servers.json file to preconfigure servers in pgAdmin
└── src/
    ├── backend/         # Source code and Dockerfile of the Node.js API
    └── frontend/        # Frontend static files served by Caddy (/srv)
```

---

##  Management and Useful Commands

- **View logs via terminal:**
  ```bash
  docker compose logs -f
  ```
  *( Tip: visit [http://localhost:8888](http://localhost:8888) to use Dozzle, it's much more visual!)*

- **Stop containers gracefully:**
  ```bash
  docker compose down
  ```

- **Stop and remove volumes (⚠️ Warning, this deletes the local database):**
  ```bash
  docker compose down -v
  ```

- **Rebuild images:**
  Useful if you modified the code in `src/backend/` or the `Dockerfile`.
  ```bash
  docker compose build
  # Or rebuild and restart in a single command:
  docker compose up -d --build
  ```

<br>
<br>

---

# 🇩🇪 Deutsche Version
# 🐳 Dockerla - Docker Projekt

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Caddy](https://img.shields.io/badge/Caddy-%230A2F4C.svg?style=for-the-badge&logo=caddy&logoColor=white)

Herzlich willkommen bei **Dockerla**, einer vollständigen Infrastruktur, die von Docker orchestriert wird. Dieses Repository enthält alle notwendigen Konfigurationen, um eine moderne Webanwendung bereitzustellen, einschließlich Frontend, Backend-API, Datenbank und Administrations-/Überwachungswerkzeugen.

---

##  Service-Architektur

Das Projekt ist um mehrere Container herum aufgebaut, die über die Datei `compose.yml` miteinander verbunden sind:

- **Caddy**: Leistungsstarker Webserver, der als *Reverse Proxy* fungiert und die statischen Frontend-Dateien hostet.
- **Backend**: Node.js-API (erstellt aus dem Ordner `src/backend`).
- **Datenbank (db)**: PostgreSQL 18-Instanz.
- **pgAdmin**: Leistungsstarke Web-Administrationsoberfläche für die PostgreSQL-Datenbank.
- **Dozzle**: Echtzeit-Web-Viewer für Docker-Protokolle, leichtgewichtig und schnell.

---

##  Voraussetzungen

Bevor Sie beginnen, stellen Sie sicher, dass Sie Folgendes auf Ihrem Computer installiert haben:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Installation & Start

1. **Repository klonen**
   ```bash
   git clone <ihre_repo_url>
   cd dockerla-main
   ```

2. **Umgebungsvariablen konfigurieren**
   Kopieren Sie die Beispieldatei und benennen Sie sie in `.env` um. Sie können die Werte entsprechend Ihren Sicherheits- oder Konfigurationsanforderungen ändern.
   ```bash
   cp .env.example .env
   ```
   > **Hinweis:** Wenn Sie den Datenbankbenutzer (`POSTGRES_USER`) in der Datei `.env` ändern, stellen Sie sicher, dass Sie die Datei `./db/pgadmin/servers.json` entsprechend aktualisieren, damit sich pgAdmin automatisch verbinden kann.

3. **Container starten**
   Starten Sie die gesamte Infrastruktur im Hintergrund:
   ```bash
   docker compose up -d
   ```

---

##  Zugriff auf die Dienste

Sobald die Container gestartet sind, leitet Caddy den Datenverkehr automatisch an die richtigen Dienste weiter. Sie können über Ihren Browser darauf zugreifen:

| Dienst | Beschreibung | URL | Freigegebener Port |
| :--- | :--- | :--- | :--- |
| **Frontend** | Clientseitige Anwendung (über Caddy bereitgestellt) | [http://localhost](http://localhost) | `80` und `443` |
| **Backend API** | Direkter Zugriff auf die Node.js-API | [http://localhost:3000](http://localhost:3000) | `3000` |
| **pgAdmin** | Verwaltungsoberfläche für die Datenbank | [http://localhost:8080](http://localhost:8080) | `8080` |
| **Dozzle** | Protokollanzeige für alle Container | [http://localhost:8888](http://localhost:8888) | `8888` |

*Standard-Anmeldedaten (konfiguriert über `.env.example`):*
- **pgAdmin**: `admin@admin.com` / `changeme`
- **Postgres**: Benutzer: `dbuser` / Passwort: `changeme` / Datenbank: `mieuxges`

---

##  Projektstruktur

```text
dockerla-main/
├── .env                 # Umgebungsvariablen (erstellen aus .env.example)
├── .env.example         # Vorlage für Umgebungsvariablen
├── compose.yml          # Hauptkonfigurationsdatei für Docker Compose
├── conf/
│   └── Caddyfile        # Konfiguration des Caddy Reverse Proxy und seiner Routen
├── db/
│   ├── migrations/      # SQL-Skripte, die automatisch beim Start der Datenbank ausgeführt werden
│   └── pgadmin/         # servers.json Datei zur Vorkonfiguration von Servern in pgAdmin
└── src/
    ├── backend/         # Quellcode und Dockerfile der Node.js-API
    └── frontend/        # Statische Frontend-Dateien, die von Caddy bereitgestellt werden (/srv)
```

---

##  Verwaltung und nützliche Befehle

- **Protokolle über das Terminal anzeigen:**
  ```bash
  docker compose logs -f
  ```
  *( Tipp: Besuchen Sie [http://localhost:8888](http://localhost:8888), um Dozzle zu verwenden, es ist viel übersichtlicher!)*

- **Container sanft stoppen:**
  ```bash
  docker compose down
  ```

- **Volumes stoppen und entfernen (⚠️ Achtung, dies löscht die lokale Datenbank):**
  ```bash
  docker compose down -v
  ```

- **Images neu erstellen:**
  Nützlich, wenn Sie den Code in `src/backend/` oder die `Dockerfile` geändert haben.
  ```bash
  docker compose build
  # Oder neu erstellen und mit einem einzigen Befehl neu starten:
  docker compose up -d --build
  ```

<br>
<br>

---

# 🇨🇳 中文版
# 🐳 Dockerla - Docker 项目

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Caddy](https://img.shields.io/badge/Caddy-%230A2F4C.svg?style=for-the-badge&logo=caddy&logoColor=white)

欢迎使用 **Dockerla**，这是一个由 Docker 编排的完整基础设施。该存储库包含部署现代 Web 应用程序（包括前端、后端 API、数据库和管理/监控工具）所需的所有配置。

---

##  服务架构

该项目围绕多个通过 `compose.yml` 相互连接的容器构建：

- **Caddy**：高性能 Web 服务器，充当反向代理（*Reverse Proxy*）并托管前端静态文件。
- **Backend**：Node.js API（从 `src/backend` 文件夹构建）。
- **Database (db)**：PostgreSQL 18 实例。
- **pgAdmin**：功能强大的 PostgreSQL 数据库 Web 管理界面。
- **Dozzle**：实时 Docker 日志 Web 浏览器，轻量且快速。

---

##  先决条件

在开始之前，请确保您的计算机上已安装：
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

##  安装与启动

1. **克隆存储库**
   ```bash
   git clone <您的存储库_url>
   cd dockerla-main
   ```

2. **配置环境变量**
   复制示例文件并将其重命名为 `.env`。您可以根据安全性或配置需要修改其中的值。
   ```bash
   cp .env.example .env
   ```
   > **注意：** 如果您在 `.env` 文件中修改了数据库用户（`POSTGRES_USER`），请务必相应地更新 `./db/pgadmin/servers.json` 文件，以便 pgAdmin 能够自动连接。

3. **启动容器**
   在后台启动整个基础设施：
   ```bash
   docker compose up -d
   ```

---

##  访问服务

容器启动后，Caddy 会自动将流量重定向到正确的服务。您可以通过浏览器访问它们：

| 服务 | 描述 | URL | 暴露端口 |
| :--- | :--- | :--- | :--- |
| **Frontend (前端)** | 客户端应用程序（通过 Caddy 提供） | [http://localhost](http://localhost) | `80` 和 `443` |
| **Backend API (后端 API)** | 直接访问 Node.js API | [http://localhost:3000](http://localhost:3000) | `3000` |
| **pgAdmin** | 数据库管理界面 | [http://localhost:8080](http://localhost:8080) | `8080` |
| **Dozzle** | 所有容器的日志可视化 | [http://localhost:8888](http://localhost:8888) | `8888` |

*默认凭据（通过 `.env.example` 配置）：*
- **pgAdmin**: `admin@admin.com` / `changeme`
- **Postgres**: 用户: `dbuser` / 密码: `changeme` / 数据库: `mieuxges`

---

##  项目结构

```text
dockerla-main/
├── .env                 # 环境变量（从 .env.example 创建）
├── .env.example         # 环境变量模板
├── compose.yml          # Docker Compose 主配置文件
├── conf/
│   └── Caddyfile        # Caddy 反向代理配置及其路由
├── db/
│   ├── migrations/      # 数据库启动时自动执行的 SQL 脚本
│   └── pgadmin/         # 用于在 pgAdmin 中预配置服务器的 servers.json 文件
└── src/
    ├── backend/         # Node.js API 的源代码和 Dockerfile
    └── frontend/        # 由 Caddy 提供的静态前端文件 (/srv)
```

---

##  管理和常用命令

- **通过终端查看日志：**
  ```bash
  docker compose logs -f
  ```
  *( 提示：访问 [http://localhost:8888](http://localhost:8888) 使用 Dozzle，它更加直观！)*

- **平滑停止容器：**
  ```bash
  docker compose down
  ```

- **停止并删除卷（⚠️ 警告，这将删除本地数据库）：**
  ```bash
  docker compose down -v
  ```

- **重建镜像：**
  如果您修改了 `src/backend/` 中的代码或 `Dockerfile`，这将非常有用。
  ```bash
  docker compose build
  # 或者在一条命令中重建并重新启动：
  docker compose up -d --build
  ```

##  服务架构

该项目围绕多个通过 `compose.yml` 相互连接的容器构建：

- **Caddy**：高性能 Web 服务器，充当反向代理（*Reverse Proxy*）并托管前端静态文件。
- **Backend**：Node.js API（从 `src/backend` 文件夹构建）。
- **Database (db)**：PostgreSQL 18 实例。
- **pgAdmin**：功能强大的 PostgreSQL 数据库 Web 管理界面。
- **Dozzle**：实时 Docker 日志 Web 浏览器，轻量且快速。

---

##  先决条件

在开始之前，请确保您的计算机上已安装：
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

##  安装与启动

1. **克隆存储库**
   ```bash
   git clone <您的存储库_url>
   cd dockerla-main
   ```

2. **配置环境变量**
   复制示例文件并将其重命名为 `.env`。您可以根据安全性或配置需要修改其中的值。
   ```bash
   cp .env.example .env
   ```
   > **注意：** 如果您在 `.env` 文件中修改了数据库用户（`POSTGRES_USER`），请务必相应地更新 `./db/pgadmin/servers.json` 文件，以便 pgAdmin 能够自动连接。

3. **启动容器**
   在后台启动整个基础设施：
   ```bash
   docker compose up -d
   ```

---

##  访问服务

容器启动后，Caddy 会自动将流量重定向到正确的服务。您可以通过浏览器访问它们：

| 服务 | 描述 | URL | 暴露端口 |
| :--- | :--- | :--- | :--- |
| **Frontend (前端)** | 客户端应用程序（通过 Caddy 提供） | [http://localhost](http://localhost) | `80` 和 `443` |
| **Backend API (后端 API)** | 直接访问 Node.js API | [http://localhost:3000](http://localhost:3000) | `3000` |
| **pgAdmin** | 数据库管理界面 | [http://localhost:8080](http://localhost:8080) | `8080` |
| **Dozzle** | 所有容器的日志可视化 | [http://localhost:8888](http://localhost:8888) | `8888` |

*默认凭据（通过 `.env.example` 配置）：*
- **pgAdmin**: `admin@admin.com` / `changeme`
- **Postgres**: 用户: `dbuser` / 密码: `changeme` / 数据库: `mieuxges`

---

##  项目结构

```text
dockerla-main/
├── .env                 # 环境变量（从 .env.example 创建）
├── .env.example         # 环境变量模板
├── compose.yml          # Docker Compose 主配置文件
├── conf/
│   └── Caddyfile        # Caddy 反向代理配置及其路由
├── db/
│   ├── migrations/      # 数据库启动时自动执行的 SQL 脚本
│   └── pgadmin/         # 用于在 pgAdmin 中预配置服务器的 servers.json 文件
└── src/
    ├── backend/         # Node.js API 的源代码和 Dockerfile
    └── frontend/        # 由 Caddy 提供的静态前端文件 (/srv)
```

---

##  管理和常用命令

- **通过终端查看日志：**
  ```bash
  docker compose logs -f
  ```
  *( 提示：访问 [http://localhost:8888](http://localhost:8888) 使用 Dozzle，它更加直观！)*

- **平滑停止容器：**
  ```bash
  docker compose down
  ```

- **停止并删除卷（⚠️ 警告，这将删除本地数据库）：**
  ```bash
  docker compose down -v
  ```

- **重建镜像：**
  如果您修改了 `src/backend/` 中的代码或 `Dockerfile`，这将非常有用。
  ```bash
  docker compose build
  # 或者在一条命令中重建并重新启动：
  docker compose up -d --build
  ```
