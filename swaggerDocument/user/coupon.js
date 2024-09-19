/**
 * @swagger
 * /api/v1/user/list/coupon:
 *   get:
 *     summary: List all coupon
 *     tags: [User/Coupon]
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
*     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60b8d295f9f1b2a7d03c5e6f"
 *                   code:
 *                     type: string
 *                     example: "SUMMER2024"
 *                   description:
 *                     type: string
 *                     example: "Get 20% off on all products"
 *                   discount:
 *                     type: number
 *                     example: 20
 *                   validFrom:
 *                     type: string
 *                     format: date
 *                     example: "01-01-2024"
 *                   validUntil:
 *                     type: string
 *                     format: date
 *                     example: "01-06-2024"
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
 * /api/v1/user/coupon/detail/{id}:
 *   get:
 *     summary: Get coupon detail
 *     tags: [User/Coupon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d295f9f1b2a7d03c5e6f"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60b8d295f9f1b2a7d03c5e6f"
 *                 code:
 *                   type: string
 *                   example: "SUMMER2024"
 *                 description:
 *                   type: string
 *                   example: "Get 20% off on all products"
 *                 discount:
 *                   type: number
 *                   example: 20
 *                 validFrom:
 *                   type: string
 *                   format: date
 *                   example: "01-01-2024"
 *                 validUntil:
 *                   type: string
 *                   format: date
 *                   example: "01-06-2024"
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
