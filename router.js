const Authentication = require("./controllers/authentication");
const BooksController = require("./controllers/books");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    app.get('/', function(req, res){
        res.send('server started successfully'); 
    });
    
    app.get('/test-authorization',requireAuth, function(req, res){
        res.send("authorized");
    });
    app.post('/signin', requireLogin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    app.post('/profile-update',requireAuth, Authentication.updateProfile);
    
    app.post('/add-book',requireAuth, BooksController.addBook);
    app.get('/fetch-all-books', BooksController.fetchAllBooks);
    app.get('/fetch-book-by-id/:bookId', BooksController.fetchBookById);
    app.get('/fetch-all-books-by-user/:userName',requireAuth, BooksController.fetchAllBooksByUser);
    app.post('/request-book',requireAuth, BooksController.requestBook);
    app.post('/update-book-status',requireAuth, BooksController.updateBookStatus);
};