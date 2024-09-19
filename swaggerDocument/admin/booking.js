/**
 * @swagger
 * /api/admin/list/booking:
 *   get:
 *     summary: List of all booking
 *     tags: [Admin/Booking]
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
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: "bookingDate"
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: "desc"
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
 *                     bookings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "60b8d295f9f1b2a7d03c5e6f"
 *                           userId:
 *                             type: string
 *                             example: "60b8d295f9f1b2a7d03c5e6e"
 *                           eventId:
 *                             type: string
 *                             example: "60b8d295f9f1b2a7d03c5e6d"
 *                           bookingDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-09-18T12:00:00Z"
 *                           totalAmount:
 *                             type: number
 *                             example: 100.00
 *                           status:
 *                             type: string
 *                             example: "confirmed"
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
