"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = class ApiError extends Error {
    status;
    errors;
    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static UnauthorizedError() {
        return new ApiError(401, "The user is not logged in!");
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
};
