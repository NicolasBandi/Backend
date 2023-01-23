# Segunda Entrega Proyecto Final

## Configuración
Crear un archivo en la raíz proyecto con el nombre `.env` con el siguiente contenido:
```
NODE_PORT=8080
NODE_ENV=local
TIPO_PERSISTENCIA=" Inserte aqui json, mongodb o firebase :D"
```
|  | `json` | Persistencia en archivo. |
|  | `mongodb` | Persistencia en memoria. |
|  | `firebase` | Persistencia en firebase. |

## Aclaraciones sobre la aplicacion
Tanto en el archivo `script.js` como en `productos.js`, van a encontrar una variable booleana **administrador** . Ambas se puede cambiar a false o dejarla en true y ver como cambia el funcionamiento de la aplicacion.

Para el uso de Firebase, se debera agregar la ruta al archivo con los datos de la base de datos a utilizar desafio10-ea450-firebase-adminsdk-525l3-d5ac83866d es la de mi db utilizada :D

Nico
