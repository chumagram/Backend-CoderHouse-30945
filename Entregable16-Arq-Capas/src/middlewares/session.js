const session = require('express-session') // para el inicio de sesión
const dotenv = require('dotenv').config() // para variables de entorno
const MongoStore = require('connect-mongo') // para crear la session
const cookieParser = require('cookie-parser') // para las cookies de sesión

const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

function local (routeApp, passport) {

    routeApp.use(cookieParser());

    routeApp.use(session({
        store: MongoStore.create({ 
            mongoUrl: process.env.MONGODB_URI,
            mongoOptions: advancedOptions
        }),
        secret: 'chumagram',
        cookie: {
            maxAge: parseInt(process.env.SESSION_TIME),
            httpOnly: false,
            secure: false
        },
        //rolling: true, 
        resave: false, 
        saveUninitialized: false
    }))
    
    // Middleware de passport
    routeApp.use(passport.initialize());
    routeApp.use(passport.session());
}

module.exports = {local}