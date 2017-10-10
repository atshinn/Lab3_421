var bookList = '{"books":[{"id":"book1","name":"Book Title","price":"9.99","url":"http://something.org/book"},{"id":"book2","name":"Book Title 2","price":"1.99","url":"http://something.org/book2"}]}';

var books = JSON.parse(bookList);

console.log(books.toString());
console.log(books.books.toString());
var express = require('express');
var app = express();
var bodParser = require('body-parser');

app.use(bodParser.json()); // support json encoded bodies
app.use(bodParser.urlencoded({ extended: true })); // support encoded bodies
app.set('views','./views')
app.set('view engine', 'pug')

var loginHtml = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html><head><meta http-equiv="content-type" content="text/html; charset=windows-1252"><title>Bookstore: Login page</title></head><body><h1>Bookstore: Login page</h1><br><form action="login" method="post"><table width="75%"><tbody><tr><td width="48%">Enter your name</td><td width="52%"><input name="usrname" type="text"></td></tr><tr><td width="48%">Enter your password</td><td width="52%"><input name="pwd" type="text"></td></tr></tbody></table><p> <input name="Submit" value="Login" type="submit"><input name="Reset" value="Reset form" type="reset"></p></form></body></html>';
var landingHtml = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252"><title></title></head><body><h2>All the books in the bookstore!</h2><br><table cellpadding="10"><tbody><tr><th>Name</th><th>Price</th><th>More Info</th></tr><tr><td>The Image-Guided Surgical Toolkit</td><td>$0.99</td><td><a href="http://www.igstk.org/IGSTK/help/documentation.html">Get Info</a></td></tr><tr><td>Abraham Lincoln</td><td>$19.95</td><td><a href="http://www.learnlibrary.com/abraham-lincoln/lincoln.htm">Get Info</a></td></tr><tr><td>Adventures of Tom Sawyer</td><td>$10.50</td><td><a href="http://www.pagebypagebooks.com/Mark_Twain/Tom_Sawyer/">Get Info</a></td></tr><tr><td>Catcher in the Rye</td><td>$22.95</td><td><a href="https://www.goodreads.com/book/show/5107.The_Catcher_in_the_Rye">Get Info</a></td></tr><tr><td>The Legend of Sleepy Hollow</td><td>$15.99</td><td><a href="http://www.learnlibrary.com/sleepy-hollow/sleepy-hollow.htm">Get Info</a></td></tr><tr><td>Moby Dick</td><td>$24.45</td><td><a href="https://www.amazon.com/Moby-Dick-Herman-Melville/dp/1503280780">Get Info</a></td></tr><tr><td>Java Programming 101</td><td>$12.95</td><td><a href="https://www.javaworld.com/blog/java-101/">Get Info</a></td></tr><tr><td>Robinson Crusoe</td><td>$11.99</td><td><a href="http://www.learnlibrary.com/rob-crusoe/">Get Info</a></td></tr><tr><td>The Odyssey</td><td>$32.00</td><td><a href="http://classics.mit.edu/Homer/odyssey.html">Get Info</a></td></tr></tbody></table>I want to <a href="http://localhost:8000/login">purchase something</a>!</body></html>';
var failedLoginHtml = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html><head><meta http-equiv="content-type" content="text/html; charset=windows-1252"><title>Bookstore: Login page</title></head><body><h1>Bookstore: Login page</h1><br>    <form action="login" method="post"><table width="75%"><tbody><tr><td width="48%">Enter your name</td><td width="52%"><input name="usrname" type="text"></td></tr><tr><td width="48%">Enter your password</td><td width="52%"><input name="pwd" type="text"></td></tr></tbody></table><p> <input name="Submit" value="Login" type="submit"><input name="Reset" value="Reset form" type="reset"></p><p>Wrong User name or password</p></form></body></html>';
var successfulLoginHtml = '<html><head><meta http-equiv="content-type" content="text/html; charset=windows-1252"><title>Bookstore: Logged in</title></head><body><h1>Bookstore: Logged in</h1><br><br>Welcome , you have successfully logged in! Click <a href="http://localhost:8000/list">here</a> to order some books!</body></html>';


function sendHtmlRes(res,responseHtml,status){
    
    if(status){
        res.status(status);
    }
    else{
        res.status(200);
    }    
    res.set({
        'Content-Type':'text/html',
        'Content-Length': responseHtml.length
    });

    res.send(responseHtml);

    console.log("response sent");
}

function sendErrRes(res,status){
    res.status(status);
    res.set
}

app.listen(8000,'localhost');

app.get("/landing",function(req,res){
    res.render("landing",books);
    console.log(books.books);
});

app.get("/login",function(req,res){
    var htmlResponse = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html><head><meta http-equiv="content-type" content="text/html; charset=windows-1252"><title>Bookstore: Login page</title></head><body><h1>Bookstore: Login page</h1><br><form action="login" method="post"><table width="75%"><tbody><tr><td width="48%">Enter your name</td><td width="52%"><input name="usrname" type="text"></td></tr><tr><td width="48%">Enter your password</td><td width="52%"><input name="pwd" type="text"></td></tr></tbody></table><p> <input name="Submit" value="Login" type="submit"><input name="Reset" value="Reset form" type="reset"></p></form></body></html>';

    sendHtmlRes(res,loginHtml);
});

app.post("/login",function(req,res){
    var usrName = req.body.usrname;
    var password = req.body.pwd;
    var submit = req.body.Submit;
    var reset = req.body.Reset;

    if(submit){
        if(usrName == password){
            var responseHtml = successfulLoginHtml;
        }
        else{
            var responseHtml = failedLoginHtml; 
        }
    }
    else if(reset){
        var responseHtml = loginHtml;
    }
    sendHtmlRes(res,responseHtml);
});

