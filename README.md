# Testdokploy

A monorepo containing the web frontend and API backend.

## Project Structure

```
├── web/          # Angular frontend application
├── api/          # API backend (to be implemented)
└── docker-compose.yml
```

## Web (Angular Frontend)

The Angular frontend application. See [web/README.md](web/README.md) for details.

```bash
cd web
npm install
npm start
```

## API (Backend)

The API backend. To be implemented.

## Docker

To build and run with Docker Compose:

```bash
docker-compose up --build
```