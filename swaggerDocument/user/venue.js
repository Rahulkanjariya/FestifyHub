/**
 * @swagger
 * /api/v1/user/list/venue:
 *   get:
 *     summary: List all venue
 *     tags: [User/Venue]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           example: 5
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "Concert Hall"
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: "name"
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: "asc"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     venues:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "60b8d295f9f1b2a7d03c5e6f"
 *                           name:
 *                             type: string
 *                             example: "Grand Concert Hall"
 *                           address:
 *                             type: object
 *                             properties:
 *                               streetNo:
 *                                 type: string
 *                                 example: "123"
 *                               city:
 *                                 type: string
 *                                 example: "Surat"
 *                               state:
 *                                 type: string
 *                                 example: "Gujarat"
 *                               pinCode:
 *                                 type: string
 *                                 example: "10001"
 *                           facility:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: "Main Hall"
 *                               description:
 *                                 type: string
 *                                 example: "Spacious hall with seating for 500."
 *                               capacity:
 *                                 type: integer
 *                                 example: 500
 *                           contactInfo:
 *                             type: object
 *                             properties:
 *                               email:
 *                                 type: string
 *                                 example: "info@concertvenue.com"
 *                               mobileNumber:
 *                                 type: string
 *                                 example: "7867564534"
 *       500:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 */

/**
 * @swagger
 * /api/v1/user/venue/detail/{id}:
 *   get:
 *     summary: Get venue detail
 *     tags: [User/Venue]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e6f"
 *                     name:
 *                       type: string
 *                       example: "Grand Concert Hall"
 *                     address:
 *                       type: object
 *                       properties:
 *                         streetNo:
 *                           type: string
 *                           example: "123"
 *                         city:
 *                           type: string
 *                           example: "Surat"
 *                         state:
 *                           type: string
 *                           example: "Gujarat"
 *                         pinCode:
 *                           type: string
 *                           example: "10001"
 *                     facility:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Main Hall"
 *                         description:
 *                           type: string
 *                           example: "Spacious hall with seating for 500."
 *                         capacity:
 *                           type: integer
 *                           example: 500
 *                     contactInfo:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: "info@concertvenue.com"
 *                         mobileNumber:
 *                           type: string
 *                           example: "7867564534"
 *       500:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 */
