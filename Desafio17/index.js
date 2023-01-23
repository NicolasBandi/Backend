import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import handlebars from 'express-handlebars'
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import cluster from 'cluster'
import os from 'os'
import mongoose from 'mongoose';

import routers from './routers/index.js'
import { init } from './utils/mongodb.js'
import UserModel from './models/user.js'
import { isValidPassword, encryptPassword } from './utils/bcrypt.js';
import logger from './utils/logger.js'

// MongoDB Atlas initialize
await init()

if (process.env.MODE === 'cluster' && cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        logger.info(`worker ${worker.process.pid} | code ${code} | signal ${signal}`)
        logger.info('Starting a new worker...')
        cluster.fork()
    })
} else {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const app = express();
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));

    passport.use('sign-in', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, done) => {
        UserModel.findOne({ email })
          .then((user) => {
            if (!user) {
                logger.info(`User with ${email} not found.`)
                return done(null, false)
              }
            if (!isValidPassword(password, user.password)) {
                logger.info('Invalid Password')
                return done(null, false)
              }
              done(null, user)
          })
          .catch(error => {
            logger.error('Error in sign-in', error.message)
            done(error)
        })
    }))
    
    passport.use('sign-up', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, (req, email, password, done) => {
        const { body } = req
        UserModel.findOne({ email })
          .then((user) => {
            if (user) {
                logger.info(`User ${email} already exists.`);
                return done(null, false);
            }
            const newUser = {
                ...body,
                cart: mongoose.Types.ObjectId(),
                password: encryptPassword(password),
            }
            return UserModel.create(newUser);
            })
          .then((newUser) => {
            if (newUser) {
                logger.info(`User ${newUser.email} registration succesful.`);
                done(null, newUser);
            }
          })
          .catch(error => {
            logger.error('Error in sign-in', error.message);
            done(error);
        })
    }))
    
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    
    passport.deserializeUser((_id, done) => {
    UserModel.findById(_id)
        .then(user => done(null, user))
        .catch(done)
    })

    app.use(session({
        secret: '82Xl^h2L82bH',
        resave: false,
        saveUninitialized: false,
        cookie:{_expires: (10 * 60 * 1000)}, // Time in ms === 10 minutes
    }))
    
    app.use(passport.initialize());
    app.use(passport.session());

    app.engine('handlebars', handlebars.engine());
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, 'views'));
    
    app.use('/api', routers);

    // Invalid routes logs
    app.get('*', function (req, res) { 
        logger.warn(`Route ${req.originalUrl} GET not found`)
        res.status(404).send(`Route ${req.originalUrl} not found`);
    })
    
    // Middleware error handle
    app.use(function (err, req, res, next) {
        logger.error(err.stack);
        res.status(500).send('Something broke!');
    })
    
    const server = app.listen(process.env.PORT, () => {
        logger.info(`Server running in http://localhost:${process.env.PORT}/ from process ${process.pid}`);
        logger.info(`Environment: ${process.env.ENV}`);
        logger.info(`Persistence type: ${process.env.PERSISTENCE_TYPE ? process.env.PERSISTENCE_TYPE : "Memoria"}`);
        logger.info(`Mode: ${process.env.MODE ? process.env.MODE : "Fork"}`);
    })
    
    server.on("error", error => logger.error(`Error in server ${error}`));
}
