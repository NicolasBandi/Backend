# Desafio 19
Este servicio permite crear 5 **productos** de manera aleatoria. Posee un servicio de chat usando sockets, y el mismo se obtiene desde el backend **normalizado**. Se debe ingresar con un usuario y una contraseña.

## Configuración
Primero debemos crear un archivo en la raíz proyecto con el nombre `.env` con el siguiente contenido:
```
NODE_PORT=8080
NODE_ENV=local
```
Acá estamos configurando una variable de entorno para nuestro proyecto las cuales se especifican a continuación:
| VARIABLE | VALOR DEFAULT | DESCRIPCIÓN |
| ------ | ------ | ------ |
| `NODE_ENV` | `local` | Entorno en el cual se ejecuta. |
| `MONGODB_URI` | `path to db` | Ruta hacia la base de datos de MongoDB. |
| `DAO_TARGET` | `mem, file, mongo` | Forma en la cual se guarda la persistencia de datos |
| `DAO_TARGET_MSG` | `mem, file, mongo` | Forma en la cual se guarda la persistencia de datos |


## Ejecutar en producción
```sh
npm start
```

## Ejecutar en desarrollo
```sh
npm run dev
```

## Compresion sobre la ruta /info
Sin usar gzip la ruta transfiere 1.4 kB
Usando gzip la ruta transfiere 884 B