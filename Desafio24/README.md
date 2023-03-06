# Proyecto Final 32125
Servicio backend que permite el **manejo de productos** y **manejo de carritos**. Permite `crear`, `obtener`, `actualizar` y `eliminar` los mismos.
Posee un manejo de mensajes a traves de websocket.
Autenticacion a traves de passport con JWT.

## Configuración
Creamos un archivo en la raíz proyecto con el nombre `.env` con el siguiente contenido:
```
PORT=8080
ENV=local
```
Acá estamos configurando una variable de entorno para nuestro proyecto las cuales se especifican a continuación:
| VARIABLE | VALOR DEFAULT | DESCRIPCIÓN |
| ------ | ------ | ------ |
| `PORT` | `port` | Puerto en el cual se ejecuta el servidor. |
| `ENV` | `development` or `production` | Entorno en el cual se ejecuta. |
| `MONGODB_URI` | `path to db` | Ruta hacia la base de datos de MongoDB. |
| `DAO_TARGET` | `memory, file, mongo` | Forma en la cual se guarda la persistencia de datos |
| `PRODUCTS_FILE_PATH` | `path to file` | Ruta hacia la base de datos de archivos. |
| `CARTS_FILE_PATH` | `path to file` | Ruta hacia la base de datos de archivos. |
| `MESSAGES_FILE_PATH` | `path to file` | Ruta hacia la base de datos de archivos. |
| `NODEMAILER_TRANSPORT_MAIL` | `Direccion de email` | Email desde el cual se envia la confirmacion de la compra. |
| `NODEMAILER_TRANSPORT_PASS` | `Password del email` | Password del email desde el cual se envia la confirmacion de la compra. |

## Ejecutar en producción
```sh
npm start
```

## Ejecutar en desarrollo
```sh
npm run dev
```

## Postman Collection

En la raíz del proyecto encontrarán el archivo `Proyecto Final.postman_collection.json` que les permitirá probar desde postman los endpoint del servicio.