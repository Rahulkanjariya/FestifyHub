"use strict";

const Msg = {
    
    // Authentication
    INVALID_EMAIL: "Please enter a valid email address.",
    INVALID_PASSWORD: "Invalid password. Please try again.",
    INVALID_MOBILE_NUMBER: "Mobile number must be between 10 to 12 digits.",
    INVALID_USER_ID: "Invalid user ID.",
    INCORRECT_PASSWORD: "Password must be at least 6 characters long.",
    CURRENT_PASSWORD_REQUIRED: "Please enter your current password.",
    EMAIL_REQUIRED: "Email address is required.",
    PASSWORD_REQUIRED: "Password is required.",

    // UserController
    USER_TYPE_REQUIRED: "User type must be 'Admin', 'Organizer', or 'User'.",
    FIRST_NAME_REQUIRED: "First name is required.",
    LAST_NAME_REQUIRED: "Last name is required.",
    MOBILE_NUMBER_REQUIRED: "Mobile number is required.",
    AGE_REQUIRED: "Age is required.",
    INVALID_DATE_FORMAT: "Invalid date format. Please use 'DD-MM-YYYY'.",
    GENDER_REQUIRED: "Gender must be 'Male', 'Female', or 'Other'.",
    USER_ID_REQUIRED: "User ID is required.",
    USER_NOT_FOUND: "User not found.",
    USER_EXISTS: "User already exists.",
    EMAIL_EXIST: "Email address already exists.",
    EMAIL_SEND_ERROR: "There was an error sending the email. Please try again later.",
    PASSWORD_RESET_SUCCESS: "Password reset successfully. Check your email for the new password.",
    USER_REGISTER: "User registered successfully.",
    USER_LOGIN: "Login successful.",
    USER_PROFILE_UPDATE: "Profile updated successfully.",
    USER_ACCOUNT_DELETE: "User account deleted successfully.",
    PASSWORD_NOT_MATCH: "Passwords do not match.",
    PASSWORD_UPDATE: "Password updated successfully.",
    USER_PROFILE_DELETE: "User profile deleted successfully.",

    // CategoryController
    CATEGORY_NAME_REQUIRED: "Category name is required.",
    CATEGORY_DESCRIPTION_REQUIRED: "Category description is required",
    CATEGORY_EXISTS: "Category name already exists.",
    INVALID_CATEGORY_ID: "Invalid category ID.",
    CATEGORY_NOT_FOUND: "Category not found.",
    CATEGORY_CREATED: "Category created successfully.",
    CATEGORY_UPDATED: "Category updated successfully.",
    CATEGORY_DELETED: "Category deleted successfully.",

    // VenueController
    VENUE_NAME_REQUIRED: "Venue name is required.",
    STREET_NO_REQUIRED: "Street number is required.",
    CITY_REQUIRED: "City is required.",
    STATE_REQUIRED: "State is required.",
    PIN_CODE_REQUIRED: "PIN code is required.",
    FACILITY_NAME_REQUIRED: "Facility name is required.",
    FACILITY_DESCRIPTION_REQUIRED: "Facility description is required.",
    VENUE_ALREADY_EXIST: "Venue already exist.",
    FACILITY_CAPACITY_INVALID: "Facility capacity must be a valid number.",
    INVALID_VENUE_ID: "Invalid venueId.",
    VENUE_NOT_FOUND: "Venue not found.",
    VENUE_CREATED: "Venue added successfully.",
    VENUE_UPDATED: "Venue updated successfully.",
    VENUE_DELETED: "Venue deleted successfully.",

    // EventController
    EVENT_NAME_REQUIRED: "Event name is required.",
    DESCRIPTION_REQUIRED: "Description is required.",
    DATE_REQUIRED: "Date is required.",
    START_TIME_REQUIRED: "Start time is required.",
    INVALID_START_TIME_FORMAT: "Invalid start time format",
    INVALID_END_TIME_FORMAT: "Invalid end time format",
    END_TIME_REQUIRED: "End time is required.",
    TICKET_PRICE_REQUIRED: "Ticket price is required.",
    TOTAL_TICKET_REQUIRED: "Total ticket count is required.",
    AVAILABLE_TICKET_REQUIRED: "Available ticket count is required",
    STATUS_REQUIRED: "Status is required.",
    CATEGORY_ID_REQUIRED: "Category ID is required.",
    EVENT_NOT_FOUND: "Event not found",
    INVALID_EVENT_ID: "Invalid eventId",
    INVALID_CATEGORY_DATE: "Invalid date format. Please use 'DD-MM-YYYY'.",
    INVALID_CATEGORY_ID: "Category ID must be a valid MongoDB ID.",
    VENUE_ID_REQUIRED: "Venue ID is required.",
    INVALID_VENUE_ID: "Venue ID must be a valid MongoDB ID.",
    EVENT_EXIST: "Event name already exist.",
    EVENT_CREATED: "Event added successfully.",
    EVENT_UPDATED: "Event updated successfully.",
    EVENT_DELETED: "Event deleted successfully",

    // ReviewController
    RATING_REQUIRED: "Rating is required.",
    INVALID_RATING: "Rating must be between 1 and 5.",
    COMMENT_REQUIRED: "Comment is required.",
    INVALID_REVIEW_ID: "Invalid review ID.",
    REVIEWS_NOT_FOUND: "No reviews found.",
    INVALID_COMMENT_LENGTH: "Comment cannot exceed 500 characters.",

    // CouponController
    COUPON_CODE_REQUIRED: "Coupon code is required",
    COUPON_DESCRIPTION_REQUIRED: "Coupon description is required",
    DISCOUNT_AMOUNT_REQUIRED: "Discount amount is required.",
    EXPIRY_DATE_REQUIRED: "Expiry date is required.",
    INVALID_EXPIRY_DATE: "Invalid date format. Please use 'DD-MM-YYYY'.",
    INVALID_MAX_USES: "Max uses must be a positive integer.",
    INVALID_COUPON_ID: "Invalid coupon ID.",
    COUPON_CODE_ALREADY_EXIST: "Coupon code already exist.",
    COUPON_MAX_USES: "This coupon has reached its maximum usage limit.",
    COUPON_ID_REQUIRED: "Coupon id required",
    COUPON_EXPIRED: "Coupon has expired",
    INVALID_COUPON: "Invalid coupon",
    COUPON_NOT_FOUND: "Coupon not found.",
    COUPON_CREATED: "Coupon created successfully.",
    COUPON_DELETED: "Coupon deleted successfully.",
    

    // BookingController
    USER_ID_REQUIRED: "User ID is required",
    USER_ID_INVALID: "Invalid User ID",
    EVENT_ID_REQUIRED: "Event ID is required",
    EVENT_ID_INVALID: "Invalid Event ID",
    COUPON_ID_REQUIRED: "Coupon ID is required",
    COUPON_ID_INVALID: "Invalid Coupon ID",
    QUANTITY_REQUIRED: "Quantity is required",
    QUANTITY_INVALID: "Quantity must be a positive integer",
    TOTAL_AMOUNT_REQUIRED: "Total amount is required",
    TOTAL_AMOUNT_INVALID: "Total amount must be a positive number",
    STATUS_REQUIRED: "Booking status is required",
    PAYMENT_METHOD_REQUIRED: "Payment method is required",
    PAYMENT_STATUS_REQUIRED: "Payment status is required",
    BOOKING_ID_INVALID: "Invalid booking ID",
    BOOKING_NOT_FOUND: "Booking not found",
    INSUFFICIENT_TICKETS: "Insufficient tickets available for this event",
    
    BOOKING_CREATED: "Booking created successfully",
    BOOKING_STATUS_UPDATED: "Booking status updated successfully",
    BOOKING_CANCELED: "Booking cancel successfully",


    // Token
    TOKEN_REQUIRED: "Token is required.",
    INVALID_TOKEN: "Invalid token.",
    USER_NOT_EXIST: "User not found. Please remove the old token and try again.",
    TOKEN_EXPIRED: "Token has expired.",
    UNAUTHORIZED_ACCESS: "Unauthorized access.",

    // General
    INVALID_REQUEST: "Invalid request.",
    SUCCESS: "Success.",
    SERVER_ERROR: "Internal server error.",
};

module.exports = Msg;
