const ApiError = require("../exceptions/api-error.js");

module.exports = function (req, res, next){
    try{
        if (!req.headers['content-type'].startsWith('multipart/form-data'))
            next(ApiError.BadRequest('Its not multipart/form-data'))
        next();
    }catch (e){
        return next(e)
    }
}