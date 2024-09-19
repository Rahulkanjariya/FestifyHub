/**
 * @swagger
 * /api/v1/user/add/booking:
 *   post:
 *     summary: Create a new booking
 *     tags: [User/Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *                 example: "66e2c6c5bde7199a0d7a2980"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               status:
 *                 type: integer
 *                 enum: [1,2,3]
 *                 example: 1
 *               paymentMethod:
 *                 type: integer
 *                 enum: [1,2,3]
 *                 example: 1
 *               paymentStatus:
 *                 type: integer
 *                 enum: [1,2,3]
 *                 example: 2
 *     responses:
 *       201:
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
 *                       example: "60f8d0df5a4a664b3c92bc99"
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
 * /api/v1/user/apply/coupon:
 *   post:
 *     summary: Apply a coupon to a booking
 *     tags: [User/Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingId:
 *                 type: string
 *                 example: "66ea6f52b2cbbb71ae4ce06b"
 *               couponId:
 *                 type: string
 *                 example: "66e82993a85e47769517606f"
 *             required: true
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
 *                     discountAmount:
 *                       type: number
 *                     newTotal:
 *                       type: number
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
 * /api/v1/user/booking/detail/{id}:
 *   get:
 *     summary: Get booking detail
 *     tags: [User/Booking]
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
 *                     bookingId:
 *                       type: string
 *                       example: "12345"
 *                     userId:
 *                       type: string
 *                       example: "67890"
 *                     eventId:
 *                       type: string
 *                       example: "98765"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     price:
 *                       type: number
 *                       format: integer
 *                       example: 100
 *                     totalAmount:
 *                       type: number
 *                       format: integer
 *                       example: 100
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
 * /api/v1/user/booking/cancel/{id}:
 *   delete:
 *     summary: Cancel a specific booking
 *     tags: [User/Booking]
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
 *                    type: string
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
 *                    type: string
 */
