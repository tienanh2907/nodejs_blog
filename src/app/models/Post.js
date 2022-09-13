const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String },
    author: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'title', unique: true },
}, {
    timestamps: true,
});

mongoose.plugin(slug);

//Custom query helpers
PostSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        const result = this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
        return result;
    }
    return this;
};

PostSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Post', PostSchema);
