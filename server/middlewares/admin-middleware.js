const ApiError = require("../exceptions/api-error.js");

module.exports = function (req, res, next){
    try{
        const roles = req.user.roles;
        if(!roles.contain('ADMIN')) next(ApiError.MethodNotAllowed())
        next()
    }catch (e){
        return next(ApiError.UnauthorizedError())
    }
}