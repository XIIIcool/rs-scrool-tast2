class MongoError extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.name = 'MongoError';
    }

}

module.exports = MongoError;