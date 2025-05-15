# Prueba tecnica a2censo

## Dependencias

- node v20.11.1
- docker-compose

## Variables de entorno
```
DB_NAME="a2censo"
DB_USER="admin"
DB_PASSWORD="admin"
DB_HOST="localhost"
DB_PORT="5432"
API_TOKEN="54448c59-eec8-4d24-849a-7b0eeea1003d"
```

## Instalacion

- `docker-compose up -d`
- `nvm use`
- `npm i`
- `npm run dev`

## Endpoints

- `GET /users` -- Con autenticación
- `POST /users/login`
- `POST /users/signup`
- `GET /logs`
