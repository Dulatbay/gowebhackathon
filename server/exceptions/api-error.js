module.exports = class ApiError extends Error{
    status;
    errors;

    constructor(status, message, errors=[]) {
        super(message);
        this.errors = errors
        this.status = status
    }

    static UnauthorizedError(){
        return new ApiError(401, "User is not authorized")
    }

    static BadRequest(message, errors=[]){
        return new ApiError(400, message, errors)
    }
    static MethodNotAllowed(){
        return new ApiError(405, 'Method is not allowed')
    }


    static NotFound(message){
        return new ApiError(404, message)
    }
}