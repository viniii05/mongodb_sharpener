const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Student & Course Portal API!");
});

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);

app.use("*", (req, res) => {
    res.status(404).send("Page not found");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
