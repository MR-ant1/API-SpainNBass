"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (res, errorMessage, statusErrorCode = 500) => {
    res.status(statusErrorCode).json({
        success: false,
        message: errorMessage
    });
};
exports.handleError = handleError;
