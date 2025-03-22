const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true }
            }
        ]
    }
});

// ✅ Add to Cart Method
userSchema.methods.addToCart = async function (product) {
    const cartProductIndex = this.cart.items.findIndex(item => 
        item.productId.toString() === product._id.toString()
    );

    let updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        // Product exists in cart, increase quantity
        updatedCartItems[cartProductIndex].quantity += 1;
    } else {
        // New product, add it with quantity 1
        updatedCartItems.push({
            productId: product._id,
            quantity: 1
        });
    }

    this.cart.items = updatedCartItems;
    await this.save();
    return this;
};

// ✅ Find user by email method
userSchema.statics.findByEmail = async function (email) {
    return await this.findOne({ email });
};

userSchema.methods.removeFromCart = async function (productId) {
    this.cart.items = this.cart.items.filter(item => 
        item.productId.toString() !== productId.toString()
    );
    
    await this.save();
    return this;
};

const User = mongoose.model('User',userSchema);
module.exports = User;