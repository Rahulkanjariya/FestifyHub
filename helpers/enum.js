const type = {
    ADMIN: 1,
    ORGANIZER: 2,
    USER: 3,
};

const gender = {
    MALE: 1,
    FEMALE: 2,
    OTHER: 3
};

const status = {
    ACTIVE: 1,
    INACTIVE: 0
};

const eventStatus = {
    UPCOMING: 1,
    ONGOING: 2,
    COMPLETED: 3,
    CANCELED: 4,
};

const bookingStatus = {
    CONFIRMED: 1,
    CANCELED: 2,
    PENDING: 3
};

const paymentMethod = {
    CREDIT_CARD: 1,
    DEBIT_CARD: 2,
    CASH_ON_DELIVERY: 3,
};

const paymentStatus = {
    PENDING: 1,
    COMPLETED: 2,
    FAILED: 3
};

module.exports = {
    type,
    gender,
    status,
    eventStatus,
    bookingStatus,
    paymentMethod,
    paymentStatus
}