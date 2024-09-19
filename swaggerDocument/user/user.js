/**
 * @swagger
 * /api/v1/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User/User]
 *     security:
 *       - bearerAuth: []
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
 *                     type:
 *                       type: integer
 *                       example: 3
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: john.doe@example.com
 *                     password: 
 *                       type: string
 *                       example: xyz 
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     mobileNumber:
 *                       type: integer
 *                       example: 1234567890
 *                     age: 
 *                       type: integer
 *                       example: 20
 *                     gender:
 *                       type: integer
 *                       example: 1
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
 * /api/v1/user/update/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [User/User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: yash122@gmail.com
 *               password:
 *                 type: string
 *                 example: password123 
 *               firstName:
 *                 type: string
 *                 example: Yash
 *               lastName:
 *                 type: string
 *                 example: Patel
 *               mobileNumber:
 *                 type: number
 *                 example: 1234567890
 *               age:
 *                 type: number
 *                 example: 20
 *               gender:
 *                 type: number
 *                 enum: [1,2,3]
 *                 example: 1
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
 * /api/v1/user/delete/profile:
 *   delete:
 *     summary: Delete user profile
 *     tags: [User/User]
 *     security:
 *       - bearerAuth: []
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
