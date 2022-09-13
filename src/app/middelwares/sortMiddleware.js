module.exports = function sortMiddleware(req,res,next){
    res.locals.sort = {
        enabled: false,
        type: 'default',
    };

    if(req.query.hasOwnProperty('sort')){
        Object.assign(res.locals.sort,{
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        })
    }

    next();
}
