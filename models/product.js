const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);

// const { ObjectId } = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
//     constructor(title, price, description, imageUrl, id) {
//         this.title = title;
//         this.price = Number(price);
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = id ? new ObjectId(id) : null;
//     }

//     save() {
//         const db = getDb();
//         if (this._id) {
//             return db.collection('products')
//                 .updateOne({ _id: this._id }, { $set: this })
//                 .then(() => console.log('Product updated!'))
//                 .catch(err => console.log(err));
//         } else {
//             return db.collection('products')
//                 .insertOne(this)
//                 .then(() => console.log('Product added!'))
//                 .catch(err => console.log(err));
//         }
//     }

//     static fetchAll() {
//         const db = getDb();
//         return db.collection('products').find().toArray()
//             .then(products => products.map(product => ({
//                 ...product,
//                 price: Number(product.price) 
//             })))
//             .catch(err => console.log(err));
//     }

//     static findById(prodId) {
//         const db = getDb();
//         return db.collection('products')
//             .findOne({ _id: new ObjectId(prodId) })
//             .then(product => product ? { ...product, price: Number(product.price) } : null)
//             .catch(err => console.log("Error fetching product by ID:", err));
//     }

//     static deleteById(prodId) {
//         const db = getDb();
//         return db.collection('products')
//             .deleteOne({ _id: new ObjectId(prodId) })
//             .then(() => console.log('Product deleted!'))
//             .catch(err => console.log(err));
//     }
// }

// module.exports = Product;
