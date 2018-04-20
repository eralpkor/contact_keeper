var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer')
   // flash       = require('connect-flash'),
    //passport    = require('passport'),
    //LocalStrategy = require('passport-local'),
    //passportLocalMongooseEmail = require('passport-local-mongoose-email'),
    // Campground = require("./models/customer"),
    // Comment = require("./models/comment"),
    // User = require("./models/user"),
    //seedDB = require("./seeds")
// APP config
mongoose.connect('mongodb://localhost/test');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(expressSanitizer());
app.use(methodOverride('_method'));
// SCHEMA SETUP, Mongoose model config
const customerSchema = new mongoose.Schema({
    name: String,
    last: String,
    middle: String,
    email: String,
    phone: Number,
    company: String,
    typeOfBusiness: String,
    address_1: String,
    address_2: String,
    city: String,
    state: String,
    zip: Number,
    notes: String,
    created: {type: Date, default: Date.now}
});

var Customer = mongoose.model('Customer', customerSchema);
// RESTful Routes
app.get('/', function (req, res) {
    res.render('landing');
});

app.get('/customers', function (req, res) {
    Customer.find({}, function (err, allCustomers) {
        if (err) {
            console.log(err);
        }else{
            console.log('Showing customers');
            res.render('index', { customers: allCustomers });
        }
    });
});
// Create route
app.post('/customers', function(req, res) {
    var name = req.body.name;
    var last = req.body.last;
    //var image = req.body.image; // Customer pictures if any
    var middle = req.body.middle;
    var email = req.body.email;
    var phone = req.body.phone;
    var company = req.body.company;
    var typeOfBusiness = req.body.typeOfBusiness;
    var address_1 = req.body.address_1;
    var address_2 = req.body.address_2;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var notes = req.body.notes;
    var created = req.body.created;
    var newCustomer = {name, last, middle, email, phone, company, typeOfBusiness, address_1, address_2, city, state, zip, notes, created};
// Create a new customer and save to db
Customer.create(newCustomer, function(err, newlyCreated) {
    if (err) {
        console.log(err);
    }else{
            // Redirect back to customers page
        res.redirect('/customers');
        }
    });
});
// ADD new
app.get("/customers/new", function (req, res) {
    res.render("new.ejs");
});
// Search
app.get('/customers/:id', function(req, res) {
    Customer.findById(req.params.id, function(err, foundCustomer){
        if (err) {
            console.log(err);
        }else{
            res.render('show', {customer: foundCustomer});
        }
    });
});
// EDIT Route
app.get('/customers/:id/edit', function (req, res) {
    Customer.findById(req.params.id, function (err, foundCustomer) {
        if (err) {
            res.redirect('/customers');
        }else{
            res.render('edit', {customer: foundCustomer});
        }
    });
});

// UPDATE Route
app.put('/customers/:id', function (req, res) {
    Customer.findByIdAndUpdate(req.params.id, req.body.customer, function (err, updatedCustomer) {
        if (err) {
            res.redirect('/customers');
            console.log('error update');
        }else{
            console.log('Result: ' + res);
            //res.send('Done');
            res.redirect('/customers/' + req.params.id);
            console.log('Edit updated');
        }
    }); // (id, newData, callback)
});

// DELETE Route
app.delete('/customers/:id', function (req, res) {
    Customer.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/customers');
        }else{
            res.redirect('/customers');
        }
    });
});
// Express options
var PORT = 3000;
var IP = '127.0.0.1';
// var options = {
//     dotfiles: 'ignore',
//     etag: false,
//     extensions: ['htm', 'html'],
//     index: false,
//     maxAge: '1d',
//     redirect: false,
//     setHeaders: function (res, path, stat) {
//         res.set('x-timestamp', Date.now())
//     }
// }
// app.use(express.static('public', options));
app.listen(3000, function () {
    console.log(`The Server Has Started on PORT: ${PORT} `);
});
