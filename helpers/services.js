"use strict";

const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ErrorCode = {
    REQUIRED_CODE: 422,
};

async function bcryptPassword(password) {
    const genSalt = await bcrypt.genSalt(10)
    const hasPassword = await bcrypt.hash(password, genSalt)
    return hasPassword;
}

async function generatePassword() {
    let length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function generateToken(user) {
    const payload = {
        id: user._id,
    };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn:"60d"
    };
    return jwt.sign(payload, secret, options);
}

function prepareResponse(status, message, data) {
    if (data != null || data != undefined) {
        return {
            responseCode: status,
            responseMessage: message,
            responseData: data,
        };
    }
    return {
        responseCode: status,
        responseMessage: message,
    };
}

function hashValidatorErrors(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array()[0];
        res.status(400).json(prepareResponse(ErrorCode.REQUIRED_CODE, err.msg, null));
        return true;
    } else {
        return false;
    }
}

function parsePagination(query) {
    const perPage = query.perPage > 0 ? Number(query.perPage) : 10;
    const page = query.page > 0 ? Number(query.page) - 1 : 0;
    const skip = perPage * page;
    return { skip, perPage, page };
}

module.exports = {
    bcryptPassword: bcryptPassword,
    generatePassword: generatePassword,
    generateToken: generateToken,
    prepareResponse: prepareResponse,
    hashValidatorErrors: hashValidatorErrors,
    parsePagination: parsePagination,
}

