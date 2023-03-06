import express from "express";
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url';
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import routers from "./routers/index.js";
import UserModel from "./models/userModel.js";
import { isValidPassword, encryptPassword } from './utils/bcrypt.js';
import { Strategy as JWTstrategy } from "passport-jwt";
import { ExtractJwt as ExtractJWT } from "passport-jwt";
import { initSocket } from './utils/socket.js'
import logger from "./utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Passport config
passport.use('login', new LocalStrategy({
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
      logger.error('Error in login', error.message)
      done(error)
  })
}))

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  const { body } = req
  UserModel.findOne({ email })
    .then((user) => {
      if (user) {
          logger.info(`User ${email} already exists.`);
          return done(null, false, { message : `User ${email} already exists.` });
      }
      if (password != body.verifyPassword) {
          logger.info(`Passwords fields not equals.`);
          return done(null, false, { message : 'Passwords fields not equals.' });
      }

      const newUser = {
          ...body,
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

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

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

// Routers
app.use("/", routers);

// Logger rutas invalidas
app.get("*", function (req, res) {
  logger.warn(`Ruta ${req.path} metodo GET`);
  res.status(404).send(`${req.path} not found`);
});

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json(error);
});

const server = http.createServer(app);
initSocket(server);

export default app;
