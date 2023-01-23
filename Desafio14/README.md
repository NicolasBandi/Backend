## Configuración
Primero debemos crear un archivo en la raíz proyecto con el nombre `.env` con el siguiente contenido (Por defecto si no se agrega el paramametro es el 8080):
```
NODE_PORT=8080
NODE_ENV=local
MONGODB_URI=mongodb://localhost:27017
```

## Ejecutar en producción
```sh
npm start
```

## Nuevas rutas

http://localhost:8080/api/info
http://localhost:8080/api/randoms
