const authController = require('../controllers/auth.js');
const homeController = require('../controllers/home.js');
const publicationController = require('../controllers/publication.js')

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(publicationController);

    app.get('*', (req, res) =>{
        res.render('404', { title: 'Page Not Found'});
    });
}