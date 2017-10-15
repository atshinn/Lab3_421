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
var books = JSON.parse(BooksJSON);

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

app.listen(8000,"localhost");

app.get("/landing", function (req, res) {
    if(req.session.name){
        req.session.destroy(function(){
            res.render("landing")
        });
    }
    else{
        if(!req.session.vistedLanding){
            req.session.vistedLanding = true;
        }
        res.render("landing", books);
    }
});

app.get("/login", function (req, res) {
    if(!req.session.vistedLanding){
        res.redirect("landing");
    }
    else{
        res.render('login', {name: '', pwd: ''});
    }
});

app.get("/purchase",function(req,res){
    req.session.destroy(function(){
        res.redirect("/landing");
    })
});

app.post("/login", function (req, res) {
    var usrName = req.body.name;
    var password = req.body.pwd;
    var submit = req.body.Submit;
    var reset = req.body.Reset;

    if (submit) {

        if(usrName === '' || password === ''){
            res.render('invalid_login', {name: '', pwd: ''});
            return;
        }

        else if(usrName != password){
            res.render('failed_login', {name: '', pwd: ''});
            return;
        }

        else if (usrName == password) {
            req.session.name = usrName;
            res.render('welcome_login', {name: req.session.name});
        }
        

    }
    else if (reset) {
        res.render('login', {name: '', pwd: ''});
    }
});

app.get("/list", function(req, res){
    if(req.session.vistedLanding){
        if(req.session.name){
            res.render('list', {name: req.session.name, books: JSON.parse(BooksJSON).books});
        }
        else{
            res.redirect("/landing");
        }
    }
    else{
        res.redirect("/landing");
    }
});

app.get("/logout",function(req,res){
    if(!req.session.vistedLanding){
        res.redirect("/landing");
    }
    else{
        req.session.destroy(function(){
            res.render("landing",books);
        });
    }
});

app.post("/purchase", function(req,res) {
    if(!req.session.vistedLanding){
        res.redirect("/landing");
    }
    else{
        var summary_table = [];
        var selections = req.body.bookselection;
        var quantity = parseInt(req.body.Quantity);
    
        console.log(selections.length);
        if(typeof selections === 'string'){
            summary_table.push(new PurchaseSumRow(selections,quantity));
        }
        else{
            for(var i = 0 ; i < selections.length ; i++){
                summary_table.push(new PurchaseSumRow(selections[i],quantity));
            }
        }
        var summary = new PurchaseSummary(summary_table,req.session.name);
        res.render("purchase",summary);
    }
});

app.post("/confirm",function(req,res){
    if(!req.session.vistedLanding){
        res.redirect("/landing");
    }
    else{
        var card = req.body.Creditcard;
        var cardNum = req.body.Cardnumber;
        var delivery = (req.body.expressdelivery == 'on') ? 'Yes' : 'No';
        var totalCost = parseFloat(/\d*\.{0,1}\d*$/.exec(req.body.Cost));
        var name = req.session.name;
        
        res.render("confirm",{name:name,card:card,cardNumber:cardNum,delivery:delivery,total:totalCost});
    }
});


function PurchaseSummary(table,name){
    this.name = name;
    this.table = table;
    this.totalCostStr ="Total cost: $" + total_purchase_cost(table).toString();
    this.thankyou = "Thank you " + this.name + " for your purchase"
}
function get(name){
    var index = 0;
    while(index < books.books.length && books.books[index].name != name){
        index++;
    }
    if(index < books.books.length){
        return books.books[index];
    }
    else{
        return null;
    }

}
function calc_single_book_cost(cost,quantity){
    var result = cost * quantity;
    result = result.toFixed(2);
    result = result.toString();
    result = '$' + result;

    return result;
}
function total_purchase_cost(table){
    var total = 0;
    for(var i = 0 ; i < table.length ; i++){
        total += parseFloat(/\d*\.{0,1}\d*$/.exec(table[i].totalCost));
    }
    return total.toFixed(2);
}
function PurchaseSumRow(name,quantity){
    this.name = name;
    this.quantity = parseInt(quantity);
    this.unitCost = parseFloat(/\d*\.{0,1}\d*$/.exec(get(name).price));
    this.totalCost = calc_single_book_cost(this.unitCost,parseInt(this.quantity)).toString();
}

