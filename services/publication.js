
const Publication = require('../models/Publication.js');

async function getAllPublication() {
    return Publication.find({}).lean();
}
async function getPublicationsByUser(userId) {
    return Publication.find({ author: userId }).populate('title').lean();
}


async function getPublicationById(id) {
    return Publication.findById(id).lean();
}

async function getPublicationAndUsers(id) {
    return Publication.findById(id).populate('author').populate('usersShared').lean();
}

async function createPublication(publication) {
    const result = new Publication(publication);
    await result.save();
}

async function updatePublication(id, publication) {
    const existing = await Publication.findById(id);

    existing.title = publication.title;
    existing.technique = publication.technique;
    existing.picture = publication.picture;
    existing.sertificate = publication.sertificate;
    existing.author = publication.author;
    existing.usersShared = publication.usersShared;

    await existing.save();
}

async function deleteById(id) {
    await Publication.findByIdAndDelete(id);
}

async function sharePublication(publicationId, userId, value) {
    const publication = await Publication.findById(publicationId);

    if(publication.usersShared.includes(userId)) {
        throw new Error('User is already share this publication');
    }

    publication.usersShared.push(userId);
    publication.rating += value;
    await publication.save();
}

/*async function vote(postId, userId, value) {
    const post = await Post.findById(postId);

    if(post.votes.includes(userId)) {
        throw new Error('User has already voted');
    }

    post.votes.push(userId);
    post.rating += value;

    await post.save();
} */

module.exports = {
    getAllPublication,
    createPublication,
    getPublicationAndUsers,
    updatePublication, 
    deleteById,
    getPublicationById,
    getPublicationsByUser,
    sharePublication
}
