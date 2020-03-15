const mongoose = require('mongoose')
const logger = require('../utils/logger')
const config = require('../utils/config')

mongoose.set('useFindAndModify', false)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error(`connection to MongoDB failed: ${error}`)
    })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [] //CHANGED
    })

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
    
module.exports = mongoose.model('Blog', blogSchema)