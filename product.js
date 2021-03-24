var mongoose = require('mongoose');
var ProductSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }
);
module.exports = mongoose.model('product', ProductSchema);
