const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true
    },
    desc: {
        type: String,
        required: true,

    },
    image: {
        type: String,
        required: true,
        // unique: true
    },
    category: {
        type: Array,
        // required: true,
        // unique: true
        // default: false
    },
    size: {
        type: String,
        // required: true,
        // unique: true
        // default: false
    },
    color: {
        type: String,
        // required: true,
        // unique: true
        // default: false
    },
    price: {
        type: Number,
        // required: true,
        // unique: true
        // default: false
    },



}, {
    timestamps: true
});


module.exports = mongoose.model("Product", ProductSchema);