const exports = require("express");
const { router } = require("../../app");
const contacts = require("../controllers/contact.controller");

module.exports = (app) => {
    const routes = express.Router();

    //Retrieve all contacts
    router.get("/", contacts.findAll);

    // Create a new contact
    router.port("/", contacts.create);

    //Delete  all contacts
    router.delete("/", contacts.deleteAll);

    // Retrieve all favorite contacts
    router.get("/favorite", contacts.findAllFavorite);

    //Retrieve a single contact with id
    router.get("/:id", contacts.findOne);

    //Updete a contact with id
    router.put("/:id", contacts.update);

    //Delete a contact with id
    router.put("/:id", contacts.delete);

    app.use("/api/contacts", routes);
}