const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({ //the id doesnt need to be defined
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    imageUrl: { type: String},
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', //relation setup
        required: true
    }
    //mongoose allows to give up the flexibility but gives some advantages instead
}); //instanciate new product schema/ blueprint

module.exports = mongoose.model('Product', productSchema); //model() give the model a name