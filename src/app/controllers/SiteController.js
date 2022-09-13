const Post = require('../models/Post');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        Post.find({})
            .then(post => {
                res.render('home', { post: multipleMongooseToObject(post) })
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}


module.exports = new SiteController;
