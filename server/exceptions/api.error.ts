module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status: any, message: string, errors: any) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, "The user is not logged in!", "Error");
    }

    static BadRequest(message: string, errors: any[] = []) {
        return new ApiError(400, message, errors);
    }

    static Conflict(message: string, errors: any[] = []) {
        return new ApiError(409, message, errors);
    }
}