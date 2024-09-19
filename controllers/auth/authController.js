const services = require("../../helpers/services");
const bcrypt = require("bcryptjs");
const Msg = require("../../utils/messages");
const { HttpStatus } = require("../../utils/httpStatus");
const userRepo = require("../../data-access/userRepo");
const { sendEmail } = require("../../helpers/emailService");

module.exports = {
    signUp: async function (req,res) {
        try { 
            if (services.hashValidatorErrors(req,res)) {
                return;
            }

            const { email } = req.body;
            const emailExist = await userRepo.getDetail({ email });

            if (emailExist) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.CONFLICT,
                        Msg.EMAIL_EXIST
                    )
                )
            }

            const userDetail = {
                type: req.body.type,
                email: req.body.email,
                password: await services.bcryptPassword(req.body.password),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mobileNumber: req.body.mobileNumber,
                age: req.body.age,
                gender: req.body.gender
            }

            const newUser = await userRepo.addUser(userDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.USER_REGISTER,
                    { id:newUser.id }
                )
            )

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            )
        }
    },

    login: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { email } = req.body;
            const userLogin = await userRepo.getDetail({ email });
            if (!userLogin) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.BAD_REQUEST,
                        Msg.INVALID_EMAIL
                    )
                );
            }

            const passwordMatch = await bcrypt.compare(req.body.password, userLogin.password)
            if (!passwordMatch) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.UNAUTHORIZED,
                        Msg.INVALID_PASSWORD
                    )
                );
            }
            
            const token = services.generateToken(userLogin);
            return res.send(
                services.prepareResponse(
                    HttpStatus.SUCCESS,
                    Msg.USER_LOGIN,
                    { token: token }
                )
            );

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },

    updatePassword: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const id = req.authUser.id;
            const { currentPassword, newPassword } = req.body;

            const user = await userRepo.getDetail({ _id: id });
            if (!user) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                );
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.UNAUTHORIZED,
                        Msg.PASSWORD_NOT_MATCH
                    )
                );
            }

            await userRepo.updatePassword(id, newPassword);
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.PASSWORD_UPDATE
                )
            );

        } catch (error) {
            console.error(error);
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },

    forgotPassword: async function(req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }
            
            const { email } = req.body;

            const user = await userRepo.getDetail({ email });
            if(!user) {
                return res.send (
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                )
            }
            
            const newPassword = await services.generatePassword();            
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();

            const emailSent = await sendEmail(
                user.email,
                'Password Reset',
                `Your new password is ${newPassword}.`
            );
            
            if (!emailSent) {
                return res.send (
                    services.prepareResponse(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        Msg.EMAIL_SEND_ERROR
                    )
                )
            }
            return res.send (
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.PASSWORD_RESET_SUCCESS
                )
            )

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },
}