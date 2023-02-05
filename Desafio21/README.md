# Desafio 21
Este es un servicio backend que permite el **manejo de productos**. Permite `crear`, `obtener`, `actualizar` y `eliminar` **productos**. Permite el uso de Graphql.

## Configuración
Primero debemos crear un archivo en la raíz proyecto con el nombre `.env` con el siguiente contenido:
```
PORT=8080
ENV=local
```
Acá estamos configurando una variable de entorno para nuestro proyecto las cuales se especifican a continuación:
| VARIABLE | VALOR DEFAULT | DESCRIPCIÓN |
| ------ | ------ | ------ |
| `PORT` | `8080` | Puerto en el cual se ejecuta el servidor. |
| `ENV` | `local` | Entorno en el cual se ejecuta. |
| `MONGODB_URI` | `path to db` | Ruta hacia la base de datos de MongoDB. |
| `DAO_TARGET` | `mem, file, mongo` | Forma en la cual se guarda la persistencia de datos |


## Ejecutar en producción
```sh
npm start
```

## Ejecutar en desarrollo
```sh
npm run dev
```

## Ejecutar test
```sh
npm test
```