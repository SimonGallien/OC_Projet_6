const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

// Configuration de `memoryStorage` pour stocker l'image en mémoire temporairement
const storage = multer.memoryStorage()
const upload = multer({ storage }).single('image')

// Fonction pour traiter l'image avec `sharp`
async function optimizeImage(buffer, filename) {
    const outputFilePath = path.join('images', filename)

    await sharp(buffer) // Traite l'image en mémoire
        .resize({ width: 800 }) // Redimensionne à 800px de large
        .webp({ quality: 80 }) // Conversion en WebP avec qualité 80%
        .toFile(outputFilePath) // Enregistre l'image optimisée dans le dossier 'images'

    return outputFilePath // Retourne le chemin de l'image optimisée
}

// Middleware pour gérer l'upload et l'optimisation
const handleImageUpload = async (req, res, next) => {
    if (!req.file) return next() // Passe au middleware suivant si aucune image

    // Génération du nom de fichier unique
    const timestamp = Date.now()
    const originalName = path.parse(req.file.originalname).name
    const outputFileName = `${originalName}-${timestamp}.webp`

    try {
        // Optimisation de l'image
        const optimizedImagePath = await optimizeImage(
            req.file.buffer,
            outputFileName
        )

        // Mise à jour de `req.file` pour pointer vers l'image optimisée
        req.file.path = optimizedImagePath
        req.file.filename = outputFileName

        next()
    } catch (error) {
        console.error("Erreur lors du traitement de l'image:", error)
        res.status(500).json({ error: "Erreur lors du traitement de l'image" })
    }
}

module.exports = [upload, handleImageUpload]
