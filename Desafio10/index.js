import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import routers from './routers/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routers);


app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

const server = app.listen(process.env.NODE_PORT, () => {
    console.log(`Server is listening on the port ${server.address().port}`);
    console.log(`http://localhost:${server.address().port}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Persistence Type: ${process.env.TIPO_PERSISTENCIA ? process.env.TIPO_PERSISTENCIA : "Memory"}`);
})

server.on("error", error => console.log(`Server error ${error}`));