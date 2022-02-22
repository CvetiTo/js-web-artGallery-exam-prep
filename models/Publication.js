const { Schema, model, Types: { ObjectId } } = require('mongoose');

const IMAGE_Pattern  = /^https?:\/\/(.+)/;

const publicationSchema = new Schema({
    title: { type: String, required: true, minlength: [6, 'Title should be a minimum of 6 characters long'] },
    technique: { type: String, required: true, maxlength: [15, 'Painting technique should be a maximum of 15 characters long'] },
    picture: { type: String, required: true, validate: {
        validator(value) {
            return IMAGE_Pattern.test(value)
        },
        message: 'Art picture must be valid URL'
        }  
    },
    sertificate: { type: String, required: true, enum: ["Yes", "No"] },
    author: { type: ObjectId, ref: 'User', required: true },
    usersShared: { type: [ObjectId], ref: 'User', default: [] }
    
});

const Publication = model('Publication', publicationSchema);

module.exports = Publication;