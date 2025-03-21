const { ObjectId } = require("mongodb");
const getDb = require("../util/database").getDb;
const bcrypt = require("bcryptjs");

class User {
    constructor(name, email, password, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cart = cart;
        this.createdAt = new Date();
        if (id) this._id = new ObjectId(id);
    }

    async save() {
        if (!this.password) {
            throw new Error("Password is undefined");
        }

        const db = getDb();
        try {
            const hashedPassword = await bcrypt.hash(this.password, 12);
            this.password = hashedPassword;
            return await db.collection("users").insertOne(this);
        } catch (error) {
            console.error("Error inserting user:", error);
        }
    }

    addToCart(product) {
        const db = getDb();
        
        return db.collection('users').findOne({ _id: new ObjectId(this._id) })
            .then(user => {
                const cart = user.cart || { items: [] };
                const cartItems = cart.items;
                
                // Check if the product already exists in the cart
                const existingProductIndex = cartItems.findIndex(item => item._id.toString() === product._id.toString());
    
                if (existingProductIndex >= 0) {
                    // If product exists, increase its quantity
                    cartItems[existingProductIndex].quantity += 1;
                } else {
                    // If product does not exist, add it with quantity 1
                    cartItems.push({ ...product, quantity: 1 });
                }
    
                // Update the user's cart in the database
                return db.collection('users').updateOne(
                    { _id: new ObjectId(this._id) },
                    { $set: { cart: { items: cartItems } } }
                );
            })
            .catch(err => console.error("Error updating cart:", err));
    }
    

    static async findByEmail(email) {
        const db = getDb();
        return await db.collection("users").findOne({ email });
    }

    static async findUserById(userId) {
        const db = getDb();
        return await db.collection("users").findOne({ _id: new ObjectId(userId) });
    }
}

module.exports = User;
