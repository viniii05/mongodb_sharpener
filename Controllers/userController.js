exports.getHome = (req,res) => {
    res.send("Fetching all users");
};

exports.postHome = (req, res) => {
    res.send("Adding a new user");
};

exports.getById = (req, res) => {
    res.send(`Fetching user with ID: ${req.params.id}`);
};