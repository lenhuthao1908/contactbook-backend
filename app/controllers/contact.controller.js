const { default: mongoose } = require("mongoose");
const { BadRequestError } = require("../errors");


//Create and save a new contact
exports.create = async (req, res, next) => {
    //validate request
    if(!req.body.name){
        return next(new BadRequestError(400, "Name can not be empty"));
    }

    //Create a contact
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        favorite: req.body.favorite === true,
    });

    //save contact in the database
    const [error, document] = await handlePromise(contact.save());

    if(error){
        return next(new BadRequestError(500, "An error occurred while creating the contact"));
    }

    return res.send(document);
};


//retieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
    const conditions = { };
    const {name} = req.query;
    if(name){
        condition.name = {$regex: new RegExp(name), $options: "i"};
    }

    const [error, document] = await handlePromise(Contact.find(condition));

    if(error){
        return next(new BadRequestError(500, "An error occurred while retrieving the contacts"));
    }

    return res.send(documents);
};


//Find a single contact with an id
exports.findOne = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && monoosse.isValiObjectId(id) ? id : null,
    };

    const [error, documents] = await handlePromise(coontact.findOne(condition));

    if(error) {
        return next(new BadRequestError(500, `Error retrieving contact with id=$(req.params.id)`));
    }

    if(!document){
        return next(new BadRequestError(404, "Contact not found"));
    }

    return res.send(document);
};


//Update a contact by the id in the request
exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new BadRequestError(404, "Data to update can not be empty"));
    }

    const { id } = req.params;
    const conditions = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    if(error) {
        return next(new BadRequestError(500, `Error updating contact with id+${req.params.id}`));
    }

    if(!document){
        return next(new BadRequestError(404, "Contact not found"));
    }

    return res.send({message:"Contact was updated successfully", });
};


//Delete a contact with the specified id in the contact
exports.delete = async (req, res, next) => {
    const { id } = req.params;
    const condition = { 
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    const [error, document] =await handlePromise(
        Contact.findOneAndDelete(condition)
    );

    if(error) {
        return next(new BadRequestError(500, `Could not delete contact with id=$(req.params.id)`));
    }

    if(!document) {
        return next(new BadRequestError(404, "Contact not found"));
    }

    return res.send({message:"Contact was deleted successfully,"});
};


//Delete all contacts of a user from the database
exports.deleteAll = async (req, res, next) => {
    const [error, data] = await handlePromise(
        Contact.deleteMany({ })
    );

    if(error){
        return next(new BadRequestError(500, "An error occurred while removing all contacts"));
    }

    return res.send({
        message: `${data.deleteCount} contacts were delete successfully`,
    });
};


//Find all favarite contacts of a user
exports.findAllFavorite = async (req, res, next) => {
    const [error, documents] = await handlePromise(
        Contact.find({favorite: true, })
    );

    if(error){
        return next(new BadRequestError(500, "An error occurred while retrieving favorite contacts"));
    }

    return res.send(document);
};

