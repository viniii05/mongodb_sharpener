const express = require('express');

const adminRoutes = require('./routes/admin');
const mongoConnect = require('./util/database').mongoConnect;
const app = express();

app.use(adminRoutes);
mongoConnect(() => {
    app.listen(3000);
})