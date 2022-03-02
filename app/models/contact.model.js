const mongodb = require("mongoose");

const schema = mongodb.Schema(
    {
        name: {
            type: String,
            required: [true, "contact name is required"],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        address: String,
        phone: String,
        favorite: Boolean,
    },
    {timestamps: true}
);

// replace _id with and remove _v
schema.method("toJSON", function () {
    const { _v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("contact", schema);