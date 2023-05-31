# Restify API

API para convertir videos, para usar solo clona el repositorio y ejecuta estos comandos

```bash
npm install
npm run dev
```

## Endpoints

| Endpoint                     | Método | Acceso  | Descripción                  |
| ---------------------------- | ------ | ------- | ---------------------------- |
| /api/v1/transform/webmtomp4  | GET    | Público | Convierte webm a mp4         |
| /api/v1/transform/mp4towebm  | GET    | Público | Convierte mp4 a webm         |
| /api/v1/transform/mutevideos | GET    | Público | Quita el audio de dos videos |
