const ApiError = require("../exceptions/api-error.js");

module.exports = function (req, res, next){
    try{
        console.log(req.headers['content-type']);
        console.log(!req.headers['content-type']?.startsWith('multipart/form-data'))
        if (!req.headers['content-type']?.startsWith('multipart/form-data'))
            next(ApiError.BadRequest('Its not multipart/form-data'))
        next();
    }catch (e){
        console.log(e)
        return next(e)
    }
}