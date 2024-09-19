const services = require("../../helpers/services");
const Msg = require("../../utils/messages");
const { HttpStatus } = require("../../utils/httpStatus");
const categoryRepo = require("../../data-access/categoryRepo");

module.exports = {
    addCategory: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req,res)) {
                return;
            }
            
            const categoryExist = await categoryRepo.getDetail({ name: req.body.name });
            if (categoryExist) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.CONFLICT,
                        Msg.CATEGORY_EXISTS
                    )
                )
            }

            const categoryDetail = {
                name: req.body.name,
                description: req.body.description
            }

            const newCategory = await categoryRepo.addCategory(categoryDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.CATEGORY_CREATED,
                    { id:newCategory.id }
                )
            );

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            )
        }
    },

    listCategory : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { perPage, page, skip } = services.parsePagination(req.query);
            let query = {};
            let sort = {};

            if (req.query.search) {
                query.$or = [
                    { name: { $regex: req.query.search, $options: 'i' } },
                ];
            }

            if (req.query.sortBy) {
                sort[req.query.sortBy] = req.query.sortOrder === 'desc' ? -1 : 1;
            }

            const { list, total } = await categoryRepo.listCategory(query, skip, perPage, sort);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        category: list,
                        page: page + 1,
                        perPage: perPage,
                        totalRecords: total,
                        totalPages: totalPages,
                    }
                )
            );

        } catch (error){
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },

    categoryDetail: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req,res)) {
                return;
            }

            const { id } = req.params;

            const categoryInfo = await categoryRepo.getDetail({ _id:id });
            if (!categoryInfo) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.CATEGORY_NOT_FOUND
                    )
                )
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { categoryInfo }
                )
            )

        } catch (error) {
            res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            )
        }
    },

    updateCategory : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { id } = req.params;
            const existCategory = await categoryRepo.getDetail({ _id: id });
            if (!existCategory) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.CATEGORY_NOT_FOUND
                    )
                );
            }

            const categoryDetail = {
                name: req.body.name,
                description: req.body.description
            };
            
            const updatedCategory = await categoryRepo.updateCategory(id,categoryDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.CATEGORY_UPDATED,
                    { id: updatedCategory.id }
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

    deleteCategory : async function (req,res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { id } = req.params;
            const deleteCategory = await categoryRepo.deleteCategory(id);

            if (!deleteCategory) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.CATEGORY_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.CATEGORY_DELETED
                )
            );

        } catch (error){
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    }

}