# Testdokploy

A monorepo containing the web frontend and API backend.

## Project Structure

```
├── web/              # Angular frontend application
├── api/api/          # .NET Core Minimal API
├── docker-compose.yml         # Production compose for Dokploy
├── docker-compose.local.yml   # Local development override
└── README.md
```

## Web (Angular Frontend)

The Angular frontend application. See [web/README.md](web/README.md) for details.

```bash
cd web
npm install
npm start
```

## API (.NET Core)

The API backend serving user endpoints.

```bash
cd api/api/api
dotnet run
```

**Endpoints:**
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID

## Docker

### Local Development

```bash
docker-compose -f docker-compose.yml -f docker-compose.local.yml up --build
```

- Web: http://localhost:4200
- API: http://localhost:5000

### Dokploy Deployment

The `docker-compose.yml` is configured for Dokploy with:
- Traefik labels for automatic HTTPS routing
- `dokploy-network` for service discovery
- Environment variable `DOMAIN` for custom domain (defaults to `test.intillo.com`)

**Setup in Dokploy:**
1. Create a new Docker Compose service
2. Connect your GitHub repository
3. Set Compose Path to `./docker-compose.yml`
4. Add domain through Dokploy UI or set `DOMAIN` environment variable
5. Deploy