require('dotenv').config()
const express = require('express')
const bodyParserErrorHandler = require('express-body-parser-error-handler')
const routes = require('./routes.js')
const http = require('http')

const app = express()

app.use(express.json())
app.use(bodyParserErrorHandler())

app.use('/api/v1', routes)

const httpServer = http.createServer(app)

module.exports = { httpServer }