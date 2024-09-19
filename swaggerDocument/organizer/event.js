/**
 * @swagger
 * /api/organizer/add/event:
 *   post:
 *     summary: Add a new event
 *     tags: [Organizer/Event]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Summer Fest"
 *               description:
 *                 type: string
 *                 example: "A grand summer festival with live music, food stalls, and fun activities."
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "12-09-2024"
 *               startTime:
 *                 type: string
 *                 format: time
 *                 example: "08:00:00"
 *               endTime:
 *                 type: string
 *                 format: time
 *                 example: "12:00:30"
 *               ticketPrice:
 *                 type: number
 *                 example: 50
 *               totalTicket:
 *                 type: number
 *                 example: 500
 *               availableTicket:
 *                 type: number
 *                 example: 450
 *               status:
 *                 type: integer
 *                 enum: [1, 2, 3]
 *                 example: 2
 *               categoryId:
 *                 type: string
 *                 example: "60b8d295f9f1b2a7d03c5e6f"
 *               venueId:
 *                 type: string
 *                 example: "60b8d295f9f1b2a7d03c5e6e"
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
 *                       example: "60b8d295f9f1b2a7d03c5e6d"
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
 * /api/organizer/list/event:
 *   get:
 *     summary: List all event
 *     tags: [Organizer/Event]
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
 * /api/organizer/event/detail/{id}:
 *   get:
 *     summary: Get event detail
 *     tags: [Organizer/Event]
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

/**
 * @swagger
 * /api/organizer/update/event/{id}:
 *   put:
 *     summary: Update an existing event
 *     tags: [Organizer/Event]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Summer Fest"
 *               description:
 *                 type: string
 *                 example: "An updated description for the summer festival."
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-01"
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-10-01T18:00:00Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-10-01T23:00:00Z"
 *               ticketPrice:
 *                 type: number
 *                 example: 55
 *               totalTicket:
 *                 type: number
 *                 example: 600
 *               availableTicket:
 *                 type: number
 *                 example: 580
 *               status:
 *                 type: number
 *                 enum: [1,2,3,4]
 *                 example: 1
 *               categoryId:
 *                 type: string
 *                 example: "60b8d295f9f1b2a7d03c5e6f"
 *               venueId:
 *                 type: string
 *                 example: "60b8d295f9f1b2a7d03c5e6e"
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
 * /api/organizer/delete/event/{id}:
 *   delete:
 *     summary: Delete an existing event
 *     tags: [Organizer/Event]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
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
