const getDb = require('../utilities/db').getDb;
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart; //{items: []}
        this._id = id;
    }

    //save a user to the db
    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product){
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });

        let newQty = 1;
        const updatedCartItems = [...this.cart.items];

        if(cartProductIndex >= 0){
            newQty = this.cart.items[cartProductIndex].qty + 1;
            updatedCartItems[cartProductIndex].qty = newQty;
        } else {
            updatedCartItems.push({ productId: new ObjectId(product._id), qty: newQty});
        }

        //to add a product
        const updatedCart = { items: updatedCartItems };
        const db = getDb();
        return db.collection('users').updateOne({_id: new ObjectId(this._id)}, {$set: {cart: updatedCart}} );
    }

    getCart() {
        //return the fully populated cart
        const db = getDb();
        const productIds = this.cart.items.map(i => {
            return i.productId;
        });
        return db.collection('products').find({_id: {$in: productIds}}).toArray()
        .then(products => {
            return products.map(p => {
                return {...p, qty: this.cart.items.find(i => {
                    return i.productId.toString() === p._id.toString();
                }).qty
            };
            })
        });
        //in takes a range of the ids
    }

    //find a user by id
    static findById(userId){
        const db = getDb();
        return db.collection('users').findOne({_id: new ObjectId(userId)})
        .then(user => {
            return user;
        })
        .catch(error => {
            console.log(error);
        });
    }

    deleteItemFromCart(productId) {
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString();
        });
        const db = getDb();
        return db.collection('users').updateOne(
            {_id: new ObjectId(this._id)}, 
            {$set: {cart: {items: updatedCartItems}}});
    }
}


module.exports = User;