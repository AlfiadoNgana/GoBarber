const express = require('express')
var redis = require('redis')
const session = require('express-session')
var RedisStore = require('connect-redis')(session)
const nunjucks = require('nunjucks')
const path = require('path')

class App {
  constructor() {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares() {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(
      session({
        store: new RedisStore({
          host: 'localhost',
          port: 6379,
          client: redis.createClient(),
        }),
        secret: 'p@ssw0rd',
        resave: true,
        saveUninitialized: true,
      })
    )
  }

  views() {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true,
    })
    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  routes() {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
