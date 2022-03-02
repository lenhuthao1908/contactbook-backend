const app = require("./app");
const config = require("./app/config");
const mongoose = require("mongoose");

//connect to database
mongoose.connect(config.db.uri)
    .then(() => {
        console.log("connect to the database!");
    })
    .catch((error) => {
        console.log("cannot connet to the database!", error);
        process.exit();
    });

// start server
const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`);
});