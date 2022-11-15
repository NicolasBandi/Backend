import express from 'express'
import http from 'http'
import path from 'path'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import handlebars from 'express-handlebars'
import { fileURLToPath } from 'url';
import routers from './routers/index.js'
import { initSocket } from './socket.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: new MongoStore ({
        mongoUrl: process.env.MONGOATLAS_URL ,
        ttl: 600,   // Duracion de la sesion en mongo 10 minutos
    }),
    secret: '82Xl^h2L82bH',
    resave: true,
    saveUninitialized: true,
}))

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/api', routers);

const server = http.createServer(app);
initSocket(server);

//middleware de manejo de errores
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

server.listen(process.env.NODE_PORT, () => {
    console.log(`http server is listening on the port ${server.address().port}`);
    console.log(`http://localhost:${server.address().port}`);
})

server.on("error", error => console.log(`Error en servidor ${error}`));