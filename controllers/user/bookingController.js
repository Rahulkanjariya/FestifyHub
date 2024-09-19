const services = require("../../helpers/services");
const Msg = require("../../utils/messages");
const { HttpStatus } = require("../../utils/httpStatus");
const eventRepo = require("../../data-access/eventRepo");
const couponRepo = require("../../data-access/couponRepo");
const bookingRepo = require("../../data-access/bookingRepo");

module.exports = {
    addBooking: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const event = await eventRepo.getDetail({ _id: req.body.eventId });
            if (!event) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.EVENT_NOT_FOUND
                    )
                );
            }

            const eventPrice = event.ticketPrice;
            const quantity = req.body.quantity;
            const totalAmount = eventPrice * quantity;

            const bookingDetail = {
                userId: req.authUser.id,
                eventId: req.body.eventId,
                quantity: quantity,
                status: req.body.status,
                totalAmount: totalAmount,
                paymentMethod: req.body.paymentMethod,
                paymentStatus: req.body.paymentStatus,
            };

            const newBooking = await bookingRepo.addBooking(bookingDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.BOOKING_CREATED,
                    { _id: newBooking.id }
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

    applyCoupon: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req,res)) {
                return;
            }

            const { bookingId,couponId } = req.body;

            const booking = await bookingRepo.getDetail({ _id:bookingId });
            if (!booking) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.BOOKING_NOT_FOUND
                    )
                )
            }

            let discount = 0;

            if (req.body.couponId) {
                const coupon = await couponRepo.getDetail({ _id:couponId });
                if (!coupon) {
                    return res.send(
                        services.prepareResponse(
                            HttpStatus.BAD_REQUEST,
                            Msg.INVALID_COUPON
                        )
                    );
                }

                const currentDate = new Date();
                const couponExpiryDate = new Date(coupon.expiryDate);
                if (currentDate > couponExpiryDate) {
                    return res.send(
                        services.prepareResponse(
                            HttpStatus.BAD_REQUEST,
                            Msg.COUPON_EXPIRED
                        )
                    );
                }

                if (coupon.usedCount >= coupon.maxUses) {
                    return res.send(
                        services.prepareResponse(
                            HttpStatus.BAD_REQUEST,
                            Msg.COUPON_MAX_USES
                        )
                    );
                }
                discount = coupon.discount;
                await couponRepo.updateCouponUsage(req.body.couponId);
            }
            
            const discountAmount = discount;
            const totalAmount = (booking.totalAmount) - discount;

            await bookingRepo.updateBooking(bookingId, { totalAmount });

            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.COUPON_APPLIED,
                    {
                        discountAmount,
                        totalAmount
                    }
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

    bookingDetail: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req,res)) {
                return;
            }

            const bookingId = req.params.id;

            const bookingInfo = await bookingRepo.getUserBooking({ _id:bookingId });
            if (!bookingInfo) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.BOOKING_NOT_FOUND
                    )
                )
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { bookingInfo }
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

    cancelBooking: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const bookingId = req.params.id;
            const result = await bookingRepo.cancelBooking(bookingId);

            if (!result) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.BOOKING_NOT_FOUND
                    )
                );
            }
    
            return res.send(
                services.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.BOOKING_CANCELED
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
};
