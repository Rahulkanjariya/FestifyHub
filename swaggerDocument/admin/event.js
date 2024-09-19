/**
 * @swagger
 * /api/admin/list/event:
 *   get:
 *     summary: List all event
 *     tags: [Admin/Event]
 *     security:
 *       - bearerAuth: []
  *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, date, ticketPrice]
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 5
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
 *                     events:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "60b8d295f9f1b2a7d03c5e6d"
 *                           name:
 *                             type: string
 *                             example: "Summer Fest"
 *                           description:
 *                             type: string
 *                             example: "A grand summer festival with live music, food stalls, and fun activities."
 *                           date:
 *                             type: string
 *                             format: date
 *                             example: "2024-09-15"
 *                           startTime:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-09-15T18:00:00Z"
 *                           endTime:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-09-15T23:00:00Z"
 *                           ticketPrice:
 *                             type: number
 *                             example: 50
 *                           totalTicket:
 *                             type: number
 *                             example: 500
 *                           availableTicket:
 *                             type: number
 *                             example: 450
 *                           status:
 *                             type: number
 *                             enum: [1,2,3,4]
 *                             example: 1
 *                           category:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: "Music Festivals"
 *                           venue:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: "Central Park"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-09-01T10:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-09-10T15:00:00Z"
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     perPage:
 *                       type: integer
 *                       example: 10
 *                     totalRecords:
 *                       type: integer
 *                       example: 50
 *                     totalPages:
 *                       type: integer
 *                       example: 5
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
 * /api/admin/event/detail/{id}:
 *   get:
 *     summary: Get event detail
 *     tags: [Admin/Event]
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
 *                       example: "60b8d295f9f1b2a7d03c5e6d"
 *                     name:
 *                       type: string
 *                       example: "Summer Music Festival"
 *                     description:
 *                       type: string
 *                       example: "A vibrant music festival featuring multiple bands."
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2024-12-01"
 *                     startTime:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-01T14:00:00Z"
 *                     endTime:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-01T22:00:00Z"
 *                     ticketPrice:
 *                       type: number
 *                       example: 60
 *                     totalTicket:
 *                       type: number
 *                       example: 1200
 *                     availableTicket:
 *                       type: number
 *                       example: 800
 *                     status:
 *                       type: number
 *                       enum: [1,2,3,4]
 *                       example: 1
 *                     categoryId:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e6f"
 *                     venueId:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e6e"
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
