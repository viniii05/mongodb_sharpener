const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require("./routes/auth");
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use('/cart', cartRoutes);
app.use(authRoutes);
app.use(orderRoutes);

mongoConnect(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
});
