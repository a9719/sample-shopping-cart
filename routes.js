var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('./product');
var Cart = require('./cart');
var itemcount = 0;
var shoppingcart;
//Declaring a global cart because with every new cart the cart will be reset and emptied.
router.put('/add', function (req, res) {
    //if first addition to the cart the body will contain a newcart option else not
    if (shoppingcart && typeof req.body.newcart == "undefined") {
        console.log("Cart already in session")
    }
    else {
        shoppingcart = new Cart({
            products: []
        });
        shoppingcart.save();
        itemcount = 0;
    }
    var product = new Product({
        "name": req.body.name,
        "price": req.body.price,
        "quantity": req.body.quantity

    });

    product.save();
    shoppingcart.products[itemcount] = product;
    itemcount = itemcount + 1; //increase the list of items in the cart
    res.send("added successfully")
})

router.get('/total', function (req, res) {

    var total = 0;
    for (var j = 0; j < itemcount; j++) {
        total = shoppingcart.products[j].price * shoppingcart.products[j].quantity + total;
    }
    res.send("The total is: " + total);

})

router.put('/remove', function (req, res) {
    for (var j = 0; j < itemcount; j++) {

        if (shoppingcart.products[j].name == req.body.name) {
            if (shoppingcart.products[j].quantity >= req.body.quantity) {
                shoppingcart.products[j].quantity = shoppingcart.products[j].quantity - req.body.quantity;
            }
            if (shoppingcart.products[j].quantity == 0) {
                shoppingcart.products.splice(j, 1)
                //itemcount should decrease so that the program doesn't look for something that is undefined
                itemcount = itemcount - 1;
            }
            break;
        }
    }
    res.send("item removed");
})

module.exports = router;