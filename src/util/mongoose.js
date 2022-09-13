module.exports = {
    multipleMongooseToObject(mongooseObjects) {
        return mongooseObjects.map(mongooseObjects => mongooseObjects.toObject());
    },
    mongooseToObject(mongooseObjects) {
        return mongooseObjects ? mongooseObjects.toObject() : mongooseObjects;
    },
};
