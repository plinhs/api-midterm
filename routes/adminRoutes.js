/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin APIs
 */

/**
 * @swagger
 * /admin/add-bill:
 *   post:
 *     summary: Add a bill
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subscriber_no
 *               - month
 *               - total_amount
 *             properties:
 *               subscriber_no:
 *                 type: integer
 *                 example: 1001
 *               month:
 *                 type: string
 *                 example: "2024-10"
 *               total_amount:
 *                 type: number
 *                 example: 125.50
 *               paid_amount:
 *                 type: number
 *                 example: 0
 *               status:
 *                 type: string
 *                 example: "pending"
 *               details:
 *                 type: string
 *                 example: "Calls, SMS, Data usage"
 */


/**
 * @swagger
 * /admin/add-bill-batch:
 *   post:
 *     summary: Add multiple bills from a batch JSON list
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               list:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - subscriber_no
 *                     - month
 *                     - total_amount
 *                   properties:
 *                     subscriber_no:
 *                       type: integer
 *                       example: 1001
 *                     month:
 *                       type: string
 *                       example: "2024-11"
 *                     total_amount:
 *                       type: number
 *                       example: 150.75
 *                     paid_amount:
 *                       type: number
 *                       example: 0
 *                     status:
 *                       type: string
 *                       example: "pending"
 *                     details:
 *                       type: string
 *                       example: "Batch uploaded bill"
 */


const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const auth = require('../middleware/auth');

router.post('/add-bill', auth, (req, res) => AdminController.addBill(req, res));
router.post('/add-bill-batch', auth, (req, res) => AdminController.addBillBatch(req, res));

module.exports = router;
