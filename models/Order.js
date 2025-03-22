// const { getDb } = require("../util/database");
// const { ObjectId } = require("mongodb");

// class Order {
//     constructor(userId, items, date = new Date()) {
//         this.userId = new ObjectId(userId);
//         this.items = items;
//         this.date = date;
//     }

//     async save() {
//         const db = getDb();
//         try {
//             await db.collection("orders").insertOne(this);
//             console.log("Order saved successfully");
//         } catch (error) {
//             console.error("Error saving order:", error);
//         }
//     }

//     static async findOrdersByUserId(userId) {
//         const db = getDb();
//         try {
//             return await db.collection("orders")
//                 .find({ userId: new ObjectId(userId) })
//                 .toArray();
//         } catch (error) {
//             console.error("Error fetching orders:", error);
//             return [];
//         }
//     }
// }

// module.exports = Order;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true }
    },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
