const services = require("../../helpers/services");
const Msg = require("../../utils/messages");
const { HttpStatus } = require("../../utils/httpStatus");
const userRepo = require("../../data-access/userRepo");

module.exports = {
    profile: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req,res)) {
                return;
            }

            const id = req.authUser.id;
            
            const userInfo = await userRepo.getDetail({ _id:id });
            if (!userInfo) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                )
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { userInfo }
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

    updateProfile: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req,res)) {
                return;
            }

            const id = req.authUser.id;

            const existUser = await userRepo.getDetail({ _id:id });
            if (!existUser) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                )
            }

            const userDetail = {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mobileNumber: req.body.mobileNumber,
                age: req.body.age,
                gender: req.body.gender
            }

            if (req.body.password) {
                userDetail.password = await services.bcryptPassword(req.body.password);
            }

            const updatedUser = await userRepo.updateProfile(id, userDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.USER_PROFILE_UPDATE,
                    { id:updatedUser.id }
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

    deleteProfile: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req,res)) {
                return;
            }

            const id = req.authUser.id;
            const result = await userRepo.deleteUser(id);

            if (!result) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                )
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.USER_PROFILE_DELETE
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
    }
}