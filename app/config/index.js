const config = {
    app: {
        port: process.env.PORT || 8080,
    },
    db: {
        uri: process.env.MONGODB || "mongodb://localhost:27017/contactbook"
    }
};

module.exports = config;