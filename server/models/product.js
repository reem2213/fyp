const mongoose=require('mongoose');

const productSchema= new mongoose.Schema({
    name: String,
    image: String,
    rating: Number,
    price: Number,
    url:String


})


const productModel=mongoose.model('product',productSchema);
module.exports=productModel;