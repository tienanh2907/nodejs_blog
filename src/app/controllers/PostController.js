const Post = require('../models/Post');
const { mongooseToObject } = require('../../util/mongoose');

class PostController {
    //[GET] /posts/:slug
    show(req, res, next) {
        Post.findOne({ slug: req.params.slug })
            .then(post => res.render('post/show', { post: mongooseToObject(post) }))
            .catch(next);
    }

    //[GET] /posts/create
    create(req, res, next) {
        res.render('post/create')
    }

    //[POST] /posts/store
    store(req, res, next) {
        const post = new Post(req.body);
        post.save()
            .then(() => res.redirect('/user/stored/posts'))
            .catch(error => {

            });
    }

    //[GET] /posts/:id/edit
    edit(req, res, next) {
        Post.findById(req.params.id)
            .then(post => res.render('post/edit', { post: mongooseToObject(post) }))
            .catch(next);
    }

    //[PUT] /posts/:id
    update(req, res, next) {
        Post.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/user/stored/posts'))
            .catch(next);
    }

    //[PATCH] /posts/:id/restore
    restore(req, res, next) {
        Post.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /posts/:id
    delete(req, res, next) {
        Post.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /posts/:id/destroy
    destroy(req, res, next) {
        Post.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /posts/submit-select-option
    submitSelectOption(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Post.delete({ _id: {$in: req.body.postIds} })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break
            default:
                res.json({ message: 'Action invalid' });
        }
    }
}


module.exports = new PostController;
