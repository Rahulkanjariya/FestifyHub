"use strict";

const jwt = require("jsonwebtoken");
require("dotenv").config();
const services = require("../helpers/services");
const { HttpStatus } = require("../utils/httpStatus");
const Msg = require("../utils/messages");
const userRepo = require("../data-access/userRepo");

async function authenticateAnyUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.send(
            services.prepareResponse(
                HttpStatus.NOT_FOUND,
                Msg.TOKEN_REQUIRED
            )
        );
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userRepo.getDetail({ _id: verifiedToken.id });

        if (!user) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.NOT_FOUND,
                    Msg.USER_NOT_EXIST
                )
            );
        }

        req.authUser = user;
        switch (user.type) {
            case 1: // Admin
                authenticateAdmin(req, res, next);
                break;
            case 2: // Organizer
                authenticateOrganizer(req, res, next);
                break;
            case 3: // User
                authenticateUser(req, res, next);
                break;
            default:
                res.status(403).send({
                    responseCode: 403,
                    responseMessage: 'Unauthorized'
                });
                break;
        }

    } catch (error) {
        return res.send(
            services.prepareResponse(
                HttpStatus.UNAUTHORIZED,
                Msg.INVALID_TOKEN
            )
        );
    }
};

async function authenticateAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.send(
            services.prepareResponse(
                HttpStatus.NOT_FOUND,
                Msg.TOKEN_REQUIRED
            )
        );
    }

    try {
        const decodedToken = jwt.decode(token); 

        const currentTimestamp = Date.now() / 1000;
        if (currentTimestamp > decodedToken.exp) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.UNAUTHORIZED,
                    Msg.TOKEN_EXPIRED
                )
            );
        }
        
        const verifiedToken = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userRepo.getDetail({ _id: verifiedToken.id });

        if (!user) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.NOT_FOUND,
                    Msg.USER_NOT_EXIST
                )
            );
        }

        if (user.type === 3) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.UNAUTHORIZED,
                    Msg.UNAUTHORIZED_ACCESS
                )
            );
        }

        req.authUser = user;
        next();

    } catch (error) {
        return res.send(
            services.prepareResponse(
                HttpStatus.UNAUTHORIZED,
                Msg.INVALID_TOKEN
            )
        );
    }
}

async function authenticateOrganizer(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.send(
            services.prepareResponse(
                HttpStatus.NOT_FOUND,
                Msg.TOKEN_REQUIRED
            )
        );
    }

    try {
        const decodedToken = jwt.decode(token); 

        const currentTimestamp = Date.now() / 1000;
        if (currentTimestamp > decodedToken.exp) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.UNAUTHORIZED,
                    Msg.TOKEN_EXPIRED
                )
            );
        }

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userRepo.getDetail({ _id: verifiedToken.id });
        if (!user) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.NOT_FOUND,
                    Msg.USER_NOT_EXIST
                )
            );
        }

        if (user.type !== 2) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.UNAUTHORIZED,
                    Msg.UNAUTHORIZED_ACCESS
                )
            );
        }

        req.authUser = user;
        next();

    } catch (error) {
        return res.send(
            services.prepareResponse(
                HttpStatus.UNAUTHORIZED,
                Msg.INVALID_TOKEN
            )
        );
    }
};

async function authenticateUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.send(
            services.prepareResponse(
                HttpStatus.NOT_FOUND,
                Msg.TOKEN_REQUIRED
            )
        );
    }

    try {
        const decodedToken = jwt.decode(token); 

        const currentTimestamp = Date.now() / 1000;
        if (currentTimestamp > decodedToken.exp) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.UNAUTHORIZED,
                    Msg.TOKEN_EXPIRED
                )
            );
        }

        const verifiedToken = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userRepo.getDetail({ _id: verifiedToken.id });

        if (!user) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.NOT_FOUND,
                    Msg.USER_NOT_EXIST
                )
            );
        }

        if (user.type === 1) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.UNAUTHORIZED,
                    Msg.UNAUTHORIZED_ACCESS
                )
            );
        }

        req.authUser = user;
        next();

    } catch (error) {
        return res.send(
            services.prepareResponse(
                HttpStatus.UNAUTHORIZED,
                Msg.INVALID_TOKEN
            )
        );
    }
};


module.exports = {
    authenticateAnyUser,
    authenticateAdmin,
    authenticateOrganizer,
    authenticateUser
};
