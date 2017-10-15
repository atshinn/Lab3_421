var BooksJSON = (
    '{ "books": ['
    + '{ "id": "book1", "name": "The Image-Guided Surgical Toolkit", "price": "$0.99", "url": "http://www.igstk.org/IGSTK/help/documentation.html" }'
    + ', { "id": "book2", "name": "Abraham Lincoln", "price": "$19.95", "url": "http://www.learnlibrary.com/abraham-lincoln/lincoln.htm" }'
    + ', { "id": "book3", "name": "Adventures of Tom Sawyer", "price": "$10.50", "url": "http://www.pagebypagebooks.com/Mark_Twain/Tom_Sawyer/" }'
    + ', { "id": "book4", "name": "Catcher in the Rye", "price": "$22.95", "url": "https://www.goodreads.com/book/show/5107.The_Catcher_in_the_Rye" }'
    + ', { "id": "book5", "name": "The Legend of Sleepy Hollow", "price": "$15.99", "url": "http://www.learnlibrary.com/sleepy-hollow/sleepy-hollow.htm" }'
    + ', { "id": "book6", "name": "Moby Dick", "price": "$24.45", "url": "https://www.amazon.com/Moby-Dick-Herman-Melville/dp/1503280780" }'
    + ', { "id": "book7", "name": "Java Programming 101", "price": "$12.95", "url": "https://www.javaworld.com/blog/java-101/" }'
    + ', { "id": "book8", "name": "Robinson Crusoe", "price": "$11.99", "url": "http://www.learnlibrary.com/rob-crusoe/" }'
    + ', { "id": "book9", "name": "The Odyssey", "price": "$32.00", "url": "http://classics.mit.edu/Homer/odyssey.html" }'
    + '] }'
);

//var bookList = '{"books":[{"id":"book1","name":"Book Title","price":"9.99","url":"http://something.org/book"},{"id":"book2","name":"Book Title 2","price":"1.99","url":"http://something.org/book2"}]}';

var books = JSON.parse(BooksJSON);
//console.log(books.books[1].name);

function Purchase(name,book,quantity){
    var index = 0;
    //console.log(book);
    //console.log(books.books.length);

    while(index < books.books.length && books.books[index].name != name){
        index++;
    }


    if(index >= books.books.length){
        this.defined = true;
        //this.book = books.books[index];
        this.book = book;
        this.name = name;
        this.thankyou = "Thank you " + this.name;

        for (var i = 0; i < books.books.length; i++){
            //console.log(books.books[i].name);
            //console.log(book[i]);
            //console.log(books.books.length);
            if (book == books.books[i].name){
                //console.log(book);
                this.priceNum = Number.parseFloat(books.books[i].price.match('\\$(.+)')[1]);
                //book[i].unitCost = this.priceNum;
                //console.log(book[i].price);
                this.unitCost = this.priceNum;
                //console.log(books.books[i].price);
            }
        }


        //this.unitCost = "2.09";
        //this.unitCost = books.books.;
        this.quantity = quantity;
        this.totalCost = (parseFloat(this.unitCost) * parseInt(this.quantity,10)).toFixed(2);
        this.costStr = "The total cost is $" + this.totalCost.toString();
        this.defined = true;
    }
    else{
        var defined = false;
    }

}

console.log('Running...');
//console.log(books.toString());

var express = require('express');
var app = express();
var session = require('express-session');
var bodParser = require('body-parser');
var nocache = require('nocache');

app.use(nocache());
app.use(bodParser.json()); // support json encoded bodies
app.use(bodParser.urlencoded({extended: true})); // support encoded bodies
app.use(session({secret: 'inittowinit'}));
app.set('views', './views');
app.set('view engine', 'pug');

var loginHtml = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html><head>' +
    '<meta http-equiv="content-type" content="text/html; charset=windows-1252">' +
    '<title>Bookstore: Login page</title></head><body><h1>Bookstore: Login page</h1><br>' +
    '<form action="login" method="post"><table width="75%"><tbody><tr><td width="48%">Enter your name</td>' +
    '<td width="52%"><input name="usrname" type="text"></td></tr><tr><td width="48%">Enter your password</td>' +
    '<td width="52%"><input name="pwd" type="text"></td></tr></tbody></table><p>' +
    '<input name="Submit" value="Login" type="submit"><input name="Reset" value="Reset form" type="reset"></p></form></body></html>';

var landingHtml = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252"><title></title>' +
    '</head><body><h2>All the books in the bookstore!</h2><br><table cellpadding="10"><tbody><tr><th>Name</th><th>Price</th>' +
    '<th>More Info</th></tr><tr><td>The Image-Guided Surgical Toolkit</td><td>$0.99</td>' +
    '<td><a href="http://www.igstk.org/IGSTK/help/documentation.html">Get Info</a></td></tr>' +
    '<tr><td>Abraham Lincoln</td><td>$19.95</td><td><a href="http://www.learnlibrary.com/abraham-lincoln/lincoln.htm">Get Info</a></td></tr>' +
    '<tr><td>Adventures of Tom Sawyer</td><td>$10.50</td><td><a href="http://www.pagebypagebooks.com/Mark_Twain/Tom_Sawyer/">Get Info</a></td></tr>' +
    '<tr><td>Catcher in the Rye</td><td>$22.95</td><td><a href="https://www.goodreads.com/book/show/5107.The_Catcher_in_the_Rye">Get Info</a></td></tr>' +
    '<tr><td>The Legend of Sleepy Hollow</td><td>$15.99</td><td><a href="http://www.learnlibrary.com/sleepy-hollow/sleepy-hollow.htm">Get Info</a></td></tr>' +
    '<tr><td>Moby Dick</td><td>$24.45</td><td><a href="https://www.amazon.com/Moby-Dick-Herman-Melville/dp/1503280780">Get Info</a></td></tr>' +
    '<tr><td>Java Programming 101</td><td>$12.95</td><td><a href="https://www.javaworld.com/blog/java-101/">Get Info</a></td></tr>' +
    '<tr><td>Robinson Crusoe</td><td>$11.99</td><td><a href="http://www.learnlibrary.com/rob-crusoe/">Get Info</a></td></tr>' +
    '<tr><td>The Odyssey</td><td>$32.00</td><td><a href="http://classics.mit.edu/Homer/odyssey.html">Get Info</a></td></tr></tbody></table>' +
    'I want to <a href="http://localhost:8000/login">purchase something</a>!</body></html>';

var invalidLoginHtml = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html><head>' +
    '<meta http-equiv="content-type" content="text/html; charset=windows-1252"><title>Bookstore: Login page</title></head>' +
    '<body><h1>Bookstore: Login page</h1><br>    <form action="login" method="post"><table width="75%"><' +
    'tbody><tr><td width="48%">Enter your name</td><td width="52%"><input name="usrname" type="text"></td></tr>' +
    '<tr><td width="48%">Enter your password</td><td width="52%"><input name="pwd" type="text"></td></tr></tbody></table><p>' +
    '<input name="Submit" value="Login" type="submit"><input name="Reset" value="Reset form" type="reset"></p>' +
    '<p>Fields cannot be left blank</p></form></body></html>';

var failedLoginHtml = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html><head>' +
    '<meta http-equiv="content-type" content="text/html; charset=windows-1252"><title>Bookstore: Login page</title></head>' +
    '<body><h1>Bookstore: Login page</h1><br>    <form action="login" method="post"><table width="75%"><' +
    'tbody><tr><td width="48%">Enter your name</td><td width="52%"><input name="usrname" type="text"></td></tr>' +
    '<tr><td width="48%">Enter your password</td><td width="52%"><input name="pwd" type="text"></td></tr></tbody></table><p>' +
    '<input name="Submit" value="Login" type="submit"><input name="Reset" value="Reset form" type="reset"></p>' +
    '<p>Wrong User name or password</p></form></body></html>';

var successfulLoginHtml = '<html><head><meta http-equiv="content-type" content="text/html; charset=windows-1252">' +
    '<title>Bookstore: Logged in</title></head><body><h1>Bookstore: Logged in</h1>' +
    '<br><br>Welcome , you have successfully logged in! Click <a href="http://localhost:8000/list">here</a> to order some books!</body></html>';

var listHtml = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html><head>' +
    '<meta http-equiv="content-type" content="text/html; charset=windows-1252"><title></title>' +
    '</head><body><h1>Please the following information:</h1><br>' +
    '<h2>Name:</h2></body></html>';


function sendHtmlRes(res, responseHtml, status) {

    if (status) {
        res.status(status);
    }
    else {
        res.status(200);
    }
    res.set({
        'Content-Type': 'text/html',
        'Content-Length': responseHtml.length
    });

    res.send(responseHtml);

    console.log("response sent");
}

function sendErrRes(res, status) {
    res.status(status);
    res.set
}

app.listen(8000, 'localhost');

app.get("/landing", function (req, res) {
    res.render("landing", books);
});

app.get("/login", function (req, res) {
    var htmlResponse = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html><head>' +
        '<meta http-equiv="content-type" content="text/html; charset=windows-1252">' +
        '<title>Bookstore: Login page</title>' +
        '</head><body><h1>Bookstore: Login page</h1><br>' +
        '<form action="login" method="post"><table width="75%"><tbody><tr><td width="48%">Enter your name</td>' +
        '<td width="52%"><input name="usrname" type="text"></td></tr><tr><td width="48%">Enter your password</td>' +
        '<td width="52%"><input name="pwd" type="text"></td></tr></tbody></table><p> <input name="Submit" value="Login" type="submit">' +
        '<input name="Reset" value="Reset form" type="reset"></p></form></body></html>';

    //res.render('login');
    res.render('login', {name: '', pwd: ''});
    //sendHtmlRes(res, loginHtml);
});

app.post("/login", function (req, res) {
    var usrName = req.body.name;
    var password = req.body.pwd;
    var submit = req.body.Submit;
    var reset = req.body.Reset;

    if (submit) {

        //console.log(usrName);
        //console.log(password);
        if(usrName === '' || password === ''){
            //var responseHtml = invalidLoginHtml;
            res.render('invalid_login', {name: '', pwd: ''});
            return;
        }

        else if(usrName != password){
            //var responseHtml = invalidLoginHtml;
            res.render('failed_login', {name: '', pwd: ''});
            return;
        }

        else if (usrName == password) {
            //req.body.name = usrName;
            req.session.name = usrName;
            res.render('welcome_login', {name: req.session.name});
            //var responseHtml = successfulLoginHtml;
        }
        else if (reset) {
            //var responseHtml = loginHtml;
            res.render('login', {name: '', pwd: ''});
        }

    }

    //res.render('welcome_login', {name: req.session.name});
    //sendHtmlRes(res, responseHtml);
});

app.get("/list", function(req, res){
    //res.render("booklist", books);
    res.render('list', {name: req.session.name, books: JSON.parse(BooksJSON).books});
    //res.render("booklist", {name: nameIs, books: books});
    //res.render('list',books);
    //console.log(req.body.name);
});

app.post("/purchase", function(req,res) {
    //console.log(req.body.Quantity);
    //console.log(req.body.bookselection);
    //console.log(req.body.Quantity);
    // var purchase;
    //
    // console.log(req.body.bookselection);
    //
    // if (req.body.bookselection.length > 1) {
    //     for(var i=0; i < req.body.bookselection.length; i++){
    //         purchase = new Purchase(req.session.name,req.body.bookselection[i],req.body.Quantity);
    //     }
    // }

    var purchase = new Purchase(req.session.name,req.body.bookselection,req.body.Quantity);
    //var purchase = new Purchase();
    //var priceNum = Number.parseFloat(books.price.match('\\$(.+)')[1]);
    //book.quantity = req.body.Quantity;
    //books.price =
    //purchase.quantity = req.body.Quantity;

    var book = Object.assign({}, books);

    // books.quantity = req.body.Quantity;
    //
    // books.price = purchase.unitCost;
    //
    // book.price = books.price;
    //
    // book.unitCost = book.price;
    //
    // book.totalCost = purchase.totalCost;

    //console.log(book.unitCost);

    //console.log(book.totalCost);

    //books.price = books.books.price;
    //books.unitCost = priceNum;
    //if(purchase.defined)
        //res.render('purchase', {name: req.session.name})

    // console.log(JSON.stringify(purchase));
    // console.log('======================');

    res.render("purchase", purchase);
    console.log("render finished");
});

