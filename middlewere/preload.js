
const publicService = require('../services/publication.js');

function preload(populate){
    return async function (req, res, next) {
        const id = req.params.id;

        if(populate) {
            res.locals.publication = await publicService.getPublicationAndUsers(id);
        } else {
            res.locals.publication = await publicService.getPublicationById(id);
        }
        next();
    };
}

module.exports = preload;