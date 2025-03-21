const { ObjectId } = require("mongodb");
const getDb = require("../utils/database").getDb;

class User {
    constructor(name, email, password, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
        if (id) this._id = new ObjectId(id);
    }

    // Function to insert a new user
    async save() {
        const db = getDb();
        try {
            const result = await db.collection("users").insertOne(this);
            return result;
        } catch (error) {
            console.error("Error inserting user:", error);
        }
    }

    // Function to find user by ID
    static async findUserById(userId) {
        const db = getDb();
        try {
            const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
            return user;
        } catch (error) {
            console.error("Error finding user by ID:", error);
            return null;
        }
    }
}

module.exports = User;
