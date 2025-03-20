const express = require("express");
const router = express.Router();

const students = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

router.get("/", (req, res) => {
    const studentNames = students.map(student => student.name).join(", ");
    res.send(`Students: ${studentNames}`);
});

router.get("/:id", (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send("Student not found");
    res.send(`Student: ${student.name}`);
});

module.exports = router;
