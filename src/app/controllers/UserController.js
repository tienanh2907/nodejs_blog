const Post = require('../models/Post');
const { multipleMongooseToObject } = require('../../util/mongoose');

class UserController {
    //GET /user/stored/posts
    storedPosts(req, res, next) {
        Promise.all([Post.find({}).sortable(req), Post.countDocumentsDeleted()])
            .then(([post, countDelete]) => res.render('user/stored-posts', {
                countDelete,
                post: multipleMongooseToObject(post)
            }))
            .catch(next);
    }

    //GET /user/trash/posts
    trashPosts(req, res, next) {
        Post.findDeleted({})
            .then(post => res.render('user/trash-posts', {
                post: multipleMongooseToObject(post)
            }))
            .catch(next);
    }

}

module.exports = new UserController;