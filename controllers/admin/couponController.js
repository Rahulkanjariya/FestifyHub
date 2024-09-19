const moment = require("moment");
const services = require("../../helpers/services");
const Msg = require("../../utils/messages");
const { HttpStatus } = require("../../utils/httpStatus");
const couponRepo = require("../../data-access/couponRepo");

module.exports = {
    addCoupon: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const existingCoupon = await couponRepo.getDetail({ code: req.body.code });
            if (existingCoupon) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.CONFLICT,
                        Msg.COUPON_CODE_ALREADY_EXIST
                    )
                )
            }
            
            const couponDetail = {
                code: req.body.code,
                description: req.body.description,
                discount: req.body.discount,
                expiryDate: moment(req.body.expiryDate, "DD-MM-YYYY").valueOf(),
                maxUses: req.body.maxUses,
                usedCount: req.body.usedCount,
            };
            
            const newCoupon = await couponRepo.addCoupon(couponDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.COUPON_CREATED,
                    { id: newCoupon.id }
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

    listCoupon : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { perPage, page, skip } = services.parsePagination(req.query);
            const { list, total } = await couponRepo.listCoupon(skip, perPage);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        coupon: list,
                        page: page + 1,
                        perPage: perPage,
                        totalRecords: total,
                        totalPages: totalPages,
                    }
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

    couponDetail : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { id } = req.params;
            const couponInfo = await couponRepo.getDetail({ _id:id });

            if (!couponInfo) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.COUPON_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { couponInfo }
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

    deleteCoupon : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { id } = req.params;
            const deleteCoupon = await couponRepo.deleteCoupon(id);

            if (!deleteCoupon) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.COUPON_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.COUPON_DELETED
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
    }

}