# Desafio 20
Este es un servicio backend que permite el **manejo de productos**. Permite `crear`, `obtener`, `actualizar` y `eliminar` **productos**.

## Configuración
Primero debemos crear un archivo en la raíz proyecto con el nombre `.env` con el siguiente contenido:
```
PORT=8080
ENV=local
```
Acá estamos configurando una variable de entorno para nuestro proyecto las cuales se especifican a continuación:
| VARIABLE | VALOR DEFAULT | DESCRIPCIÓN |
| ------ | ------ | ------ |
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

## Ejecutar test (Mocha)
```sh
npm test
```