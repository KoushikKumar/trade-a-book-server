const Book = require("../models/book");

exports.addBook = function(req, res, next) {
    const image = req.body.image;
    const title = req.body.title;
    const author = req.body.author;
    const pages = req.body.pages;
    const price = req.body.price;
    const year = req.body.year;
    const description = req.body.description;
    const sellerInfo = req.body.sellerInfo;
    const buyersInfo = {};
    
    const book = new Book({
        image, 
        title, 
        author, 
        pages,
        price,
        year, 
        description, 
        sellerInfo, 
        buyersInfo
    });
    
     book.save(function(err) {
        if(err) {
            return next(err);
        }
        console.log(title + " added successfully by "+ sellerInfo.name);
        res.json({status:"success"});
    });
};

exports.fetchAllBooks = function(req, res, next) {
    Book.find({}, function(err, books) {
        if(err) {
            return next(err);
        }
        res.json(books);
    });
};

exports.fetchBookById = function(req, res, next) {
    const bookId = req.params.bookId;
    Book.findOne({_id:bookId}, function(err, book){
        if(err) {
            return next(err);
        }
        res.json(book);
    });
};

exports.fetchAllBooksByUser = function(req, res, next) {
    const userName = req.params.userName;
    Book.find( { "sellerInfo.name": userName } , function(err, books){
        if(err) {
            return next(err);
        }
        res.json(books);
    });
};

exports.requestBook = function(req, res, next) {
    const userName = req.body.userName;
    const address = req.body.address;
    const bookId = req.body.bookId;
    
    Book.findOne({_id:bookId}, function(err, book) {
        if(err) {
           next(err);
        }
        const buyersInfo = book.buyersInfo;
        buyersInfo[userName] = {
            address, "status":"Request Pending"
        };
        Book.findOneAndUpdate({_id:bookId}, {buyersInfo}, function(err, data) {
            if(err) {
              next(err);
            } 
          res.json({status:"Updated"});
        }); 
    });
};

exports.updateBookStatus = function(req, res, next) {
    const status = req.body.status;
    const bookId = req.body.bookId;
    const buyerName = req.body.buyerName;
    
    Book.findOne({_id:bookId}, function(err, book) {
        if(err) {
           next(err);
        }
        const buyersInfo = book.buyersInfo;
        buyersInfo[buyerName]["status"] = status; 
        Book.findOneAndUpdate({_id:bookId},{buyersInfo},function(err, data) {
            if(err) {
               next(err);
            } 
           res.json({status:"Updated"});
        });
    });
};