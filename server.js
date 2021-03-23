const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
//const mongoConnect = require('./utilities/db').mongoConnect;

const User = require('./models/user');
const adminRoute = require('./routes/admin'); //import admin route .js is not needed as it will be added automatically by express
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


const app = express();
const store = new MongoDBStore({
    uri: "mongodb://localhost:27017/BookStoreDB",
    collection: 'sessions'
});

app.set('view engine', ejs);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

//set session
app.use(session({
    secret: 'my super secret secret',
    resave: false, 
    saveUninitialized: false,
    store: store
})); //secret to hash an id in the cookie



app.use((req, res, next) => { //! the order is important!
    if (!req.session.user) {
        return next();
      }
      User.findById(req.session.user._id)
        .then(user => {
          req.user = user;
          next();
        })
        .catch(err => console.log(err));
});


app.use('/admin', adminRoute); // /admin - is a filter
app.use(shopRoutes);
app.use(authRoutes);

/*app.use((req, res)=>{ //use to handle all http requests
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    //res.status(404).send('Page not found');
});*/


app.use((req, res)=>{
    res.render('404.ejs', {pageTitle: "Page Not Found", path: '/error', isAuthenticated: req.isLoggedIn});
});


/*mongoConnect(() => {
    app.listen(8000, ()=>{
        console.log('server is up');
    });
});*/

mongoose.connect('mongodb://localhost:27017/BookStoreDB',  { useUnifiedTopology: true })
.then(result => {
    User.findOne().then(user => {
        if(!user) {
            const user = new User({
            name: "John",
            email: "email@doe.com",
            cart: {
                items: []
            }
        });
        user.save();
        }
    });
    
    app.listen(8000);
}).catch(error => {
    console.log(error);
});

