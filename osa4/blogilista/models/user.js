const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username:  {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, retObject) => {
        retObject.id = retObject._id.toString()
        delete retObject._id
        delete retObject.__v
        delete retObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User