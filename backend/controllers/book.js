const Book = require('../models/Book')
const fs = require('fs')

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(400).json({ error }))
}

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => res.status(200).json(book))
        .catch((error) => res.status(400).json({ error }))
}

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book)
    delete bookObject._id
    delete bookObject._userId
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
        }`,
    })

    book.save()
        .then(() => {
            res.status(201).json({ message: 'Livre enregistré !' })
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

exports.modifyBook = (req, res, next) => {
    const bookObject = req.file
        ? {
              ...JSON.parse(req.body.book),
              imageUrl: `${req.protocol}://${req.get('host')}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body }

    delete bookObject._userId
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' })
            } else {
                Book.updateOne(
                    { _id: req.params.id },
                    { ...bookObject, _id: req.params.id }
                )
                    .then(() =>
                        res.status(200).json({ message: 'Livre modifié!' })
                    )
                    .catch((error) => res.status(401).json({ error }))
            }
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' })
            } else {
                const filename = book.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => {
                            res.status(200).json({
                                message: 'Livre supprimé !',
                            })
                        })
                        .catch((error) => res.status(401).json({ error }))
                })
            }
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

exports.addRatingBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            // Vérifier que l'utilisateur n'a pas déjà noté ce livre
            console.log(
                "Vérification que l'utilisateur n'ai pas déjà noté ce livre"
            )
            const userHasRated = book.ratings.some(
                (rating) => rating.userId === req.auth.userId
            ) // some retounre true ou false
            console.log('Vérification éffectué', userHasRated)
            if (userHasRated) {
                return res
                    .status(401)
                    .json({ message: 'Vous avez déjà noté ce livre.' })
            }
            // Vérifier que la note se situe bien entre 0 et 5
            const rating = req.body.rating
            if (rating > 0 && rating <= 5) {
                // Ajouter la nouvelle note au tableau des ratings
                const newRating = { userId: req.auth.userId, grade: rating }
                book.ratings.push(newRating)

                // Mettre à jour la note moyenne
                const totalRatings = book.ratings.reduce(
                    (sum, rate) => sum + rate.grade,
                    0
                ) // reduce permet de calculer la somme total, rate est l'objet actuel et sum la somme initialiser à 0
                book.averageRating = totalRatings / book.ratings.length

                // Sauvegarder les changements du livre dans la base de données MongoDB
                book.save()
                    .then((book) => res.status(200).json(book))
                    .catch((error) => res.status(401).json({ error }))
            } else {
                res.status(400).json({
                    message: 'La note doit être entre 0 et 5',
                })
            }
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

exports.getBestBooks = (req, res, next) => {
    console.log('bestBooks')
    Book.find()
        // Liste de tous les livres
        .then((books) => {
            // Trie les livres par `averageRating` de manière décroissante
            const sortedBooks = books.sort(
                (a, b) => b.averageRating - a.averageRating
            )

            // Prend les 3 premiers livres de la liste triée
            const bestBooks = sortedBooks.slice(0, 3)
            console.log(bestBooks)

            // Renvoie les 3 meilleurs livres
            res.status(200).json(bestBooks)
        })

        .catch((error) => res.status(400).json({ error }))
}
