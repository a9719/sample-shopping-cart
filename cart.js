var mongoose = require('mongoose');
var Product = require('./product').schema;
var CartSchema = mongoose.Schema(
    {
        products: { type: [Product] }
    });
module.exports = mongoose.model('cart', CartSchema);
