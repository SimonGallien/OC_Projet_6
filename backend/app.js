const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const booksRoutes = require('./routes/book')
const userRoutes = require('./routes/user')
require('dotenv').config() // Charger dotenv

// Vérification de la clé secrète en production
if (process.env.NODE_ENV === 'production') {
    if (
        !process.env.SECRET_KEY ||
        process.env.SECRET_KEY === 'RANDOM_TOKEN_SECRET'
    ) {
        throw new Error(
            'SECRET_KEY de production non définie ou trop faible. Vérifiez votre configuration.'
        )
    }
}

if (process.env.NODE_ENV === 'development') {
    console.log('Running in development mode')
} else if (process.env.NODE_ENV === 'production') {
    console.log('Running in production mode')
}

const app = express()
app.use(express.json())

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    )
    next()
})

app.use('/api/books', booksRoutes)
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app
