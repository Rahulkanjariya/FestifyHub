const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/categoryController");
const Msg = require("../../utils/messages");
const { body,param,query } = require("express-validator");
const { authenticateAdmin } = require("../../middleware/authToken");

router.post(
    "/add/category",authenticateAdmin,
    body("name")
        .notEmpty()
        .withMessage(Msg.CATEGORY_NAME_REQUIRED),
    body("description")
        .notEmpty()
        .withMessage(Msg.CATEGORY_DESCRIPTION_REQUIRED),
    controller.addCategory
);

router.get(
    "/list/category",authenticateAdmin,
    query("search").optional().isString(),
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listCategory
);

router.get(
    "/category/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_CATEGORY_ID),
    controller.categoryDetail
);

router.put(
    "/update/category/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_CATEGORY_ID),
    body("name")
        .optional()
        .notEmpty()
        .withMessage(Msg.CATEGORY_NAME_REQUIRED),
    body("description")
        .optional()
        .notEmpty()
        .withMessage(Msg.CATEGORY_DESCRIPTION_REQUIRED),
    controller.updateCategory
);

router.delete(
    "/delete/category/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_CATEGORY_ID),
    controller.deleteCategory
);


module.exports = router;
