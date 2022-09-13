const newsRouter = require('./news')
const postsRouter = require('./posts')
const userRouter = require('./user')
const siteRouter = require('./site')

function route(app) {
    app.use('/news', newsRouter);
    app.use('/posts', postsRouter);
    app.use('/user', userRouter);

    app.use('/',siteRouter);
}

module.exports = route;
