
const router = require('express').Router();
const { isUser, isOwner } = require('../middlewere/guards.js');
const preload = require('../middlewere/preload.js');
const { createPublication, updatePublication, deleteById, sharePublication } = require('../services/publication.js');
const mapErrors = require('../util/mappers.js');



router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Publication', data: {} });
});

router.post('/create', isUser(), async (req, res) => {
    const publication = {
        title: req.body.title,
        technique: req.body.technique,
        picture: req.body.picture,
        sertificate: req.body.sertificate,
        usersShared: req.body.usersShared, 
        author: req.session.user._id
    };

    try{
        await createPublication(publication);
        res.redirect('/gallery');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        const isYes = req.body.sertificate == 'Yes';
        res.render('create', { title: 'Create Publication', data: publication, isYes, errors });
    }
   
});


router.get('/edit/:id', preload(), (req, res) => {// isOwner(),
    res.render('edit', { title: 'Edit Page'});
});

router.post('/edit/:id',preload(), isOwner(), async (req, res) => {// 
    const id = req.params.id;
    const publication = {
        title: req.body.title,
        technique: req.body.technique,
        picture: req.body.picture,
        certificate: req.body.certificate,
        
    };

    console.log(req.body);
    try{
        await updatePublication(id, publication);
        res.redirect('/gallery/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        publication._id = id;
        res.render('edit', { title: 'Edit Page', publication, errors });
    }
    
});

router.get('/delete/:id',  async (req, res) => {//preload(), isOwner(),
    await deleteById(req.params.id);
    res.redirect('/gallery');
});

router.get('/share/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await sharePublication(id, req.session.user._id);
    } catch(err) {
        console.error(err);    
    } finally {
        res.redirect('/' + id);
    }
    
});

/*
router.get('/vote/:id/:type', isUser(), async (req, res) => {
    const id = req.params.id;
    const value = req.params.type == 'upvote' ? 1 : -1;
    try {
        await vote(id, req.session.user._id, value);
        res.redirect('/catalog/' + id);
    } catch(err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('details', { title: 'Post Details', errors });
    }
});
*/

module.exports = router;
