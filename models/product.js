const { ObjectId } = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = Number(price);  // Ensure price is stored as a number
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new ObjectId(id) : null; // Convert id to ObjectId for updates
    }

    save() {
        const db = getDb();
        if (this._id) {
            // Update existing product
            return db.collection('products')
                .updateOne({ _id: this._id }, { $set: this })
                .then(() => console.log('Product updated!'))
                .catch(err => console.log(err));
        } else {
            // Add new product
            return db.collection('products')
                .insertOne(this)
                .then(() => console.log('Product added!'))
                .catch(err => console.log(err));
        }
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray()
            .then(products => products.map(product => ({
                ...product,
                price: Number(product.price)  // Ensure price is a number
            })))
            .catch(err => console.log(err));
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection('products')
            .findOne({ _id: new ObjectId(prodId) })
            .then(product => product ? { ...product, price: Number(product.price) } : null)
            .catch(err => console.log("Error fetching product by ID:", err));
    }

    static deleteById(prodId) {
        const db = getDb();
        return db.collection('products')
            .deleteOne({ _id: new ObjectId(prodId) })
            .then(() => console.log('Product deleted!'))
            .catch(err => console.log(err));
    }
}

module.exports = Product;
