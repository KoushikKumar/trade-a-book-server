const Authentication = require("./controllers/authentication");
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
};