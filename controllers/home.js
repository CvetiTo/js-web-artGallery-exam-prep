const router = require('express').Router();
const { isUser } = require('../middlewere/guards.js');
const preload = require('../middlewere/preload.js');
const { getAllPublication, getPublicationsByUser } = require('../services/publication.js');



router.get('/', (req, res) => {
    res.render('home');
});


router.get('/gallery', async (req, res) => {
    const publications = await getAllPublication();
    res.render('gallery', { title: 'Gallery', publications });
});

router.get('/details/:id', preload(true), (req, res) => {
    const publication = res.locals.publication
    publication.usersSharedNum =  Number(publication.usersShared.length) + 1;
    publication.sharedList = publication.usersShared.map(b => b.username).join(', ');
    
    if(req.session.user) {
        publication.hasUser = true;
        publication.isOwner = req.session.user._id == publication.author._id;

        if(publication.usersShared.some(s => s._id == req.session.user._id)) {
            publication.isShared = true;
        }
    }
    
    res.render('details', { title: 'Deatils Page' });
});

router.get('/profile', isUser(), async (req,res) => {
    const publicationsByUser = await getPublicationsByUser(res.locals.user._id)
    console.log(publicationsByUser)
    
    res.locals.user.publicationsCount = publicationsByUser.length;
    res.locals.user.publications = publicationsByUser;
    
    res.render('profile', {title: 'Profile Page'})
});


module.exports = router;