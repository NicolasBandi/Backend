# Tercera Entrega Proyecto Final
Este es un servicio backend que permite el **manejo de productos y de carritos**. Este servicio permite `crear`, `obtener`, `actualizar` y `eliminar` **productos y carritos**. Ideal para un **ecommerce**.

## Configuración
Primero debemos crear un archivo en la raíz proyecto con el nombre `.env` con el siguiente contenido:
```
NODE_PORT=8080
NODE_ENV=local
TIPO_PERSISTENCIA=""
```
Acá estamos configurando una variable de entorno para nuestro proyecto las cuales se especifican a continuación:
| VARIABLE | VALOR DEFAULT | DESCRIPCIÓN |
| ------ | ------ | ------ |
| `PORT` | `8080` | Puerto por donde escuchará nuestro servicio. |
| `ENV` | `local` | Entorno en el cual se ejecuta. |
| `PERSISTENCE_TYPE` | `` | Persistencia en memoria. |
| `MODE` | `` | Modo fork o modo cluster. |
|  | `json` | Persistencia en archivo. |
|  | `mongodb` | Persistencia en memoria. |
|  | `firebase` | Persistencia en firebase. |
| `MONGODB_URI` | | Ruta a la base de datos. |
| `NODEMAILER_MAIL_TARGET` | | Direccion de email a la cual llegan desde la api. |
| `TWILIO_ACCOUNT_SID` | | ID cuenta Twilio. |
| `TWILIO_AUTH_TOKEN` | | Token cuenta Twilio. |
| `TWILIO_PHONE_NUMBER` | | Numero desde el cual se mandan los mensajes de whatsapp. |

## Ejecutar en producción
```sh
npm start
```

## Ejecutar en desarrollo
```sh
npm run dev
```

## Aclaraciones sobre la aplicacion
Tanto en el archivo `script.js` como en `productos.js`, van a encontrar una variable booleana **administrador** (lineas 21 y 6 respectivamente). Ambas se puede cambiar a false o dejarla en true y ver como cambia el funcionamiento de la aplicacion.

Para el uso de Firebase, se debera agregar la ruta al archivo con los datos de la base de datos a utilizar desafio10-ea450-firebase-adminsdk-525l3-d5ac83866d es la de mi db utilizada :D


