/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin APIs
 */

/**
 * @swagger
 * /admin/bills:
 *   post:
 *     summary: Add a bill
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscriber_no:
 *                 type: integer
 *               month:
 *                 type: string
 *               total_amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Bill added successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Subscriber not found
 */


/**
 * @swagger
 * /admin/bills/batch:
 *   post:
 *     summary: Add multiple bills from JSON list
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [list]
 *             properties:
 *               list:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [subscriber_no, month, total_amount]
 *                   properties:
 *                     subscriber_no:
 *                       type: integer
 *                       example: 1001
 *                     month:
 *                       type: string
 *                       example: "2024-11"
 *                     total_amount:
 *                       type: number
 *                       example: 150
 *     responses:
 *       200:
 *         description: Batch processing result
 *       400:
 *         description: Invalid batch format
 */


const express = require('express');
const multer = require('multer');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const { adminAuth } = require('../middleware/auth');

const upload = multer({ storage: multer.memoryStorage() });
const adminController = new AdminController();

router.post('/bills', adminAuth, (req, res) => adminController.addBill(req, res));
router.post('/bills/batch', adminAuth, (req, res) => adminController.addBillBatch(req, res));

module.exports = router;
