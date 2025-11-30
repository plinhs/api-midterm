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
 * /admin/add-bill-batch:
 *   post:
 *     summary: Add multiple bills from JSON list
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
 *                   properties:
 *                     subscriber_no:
 *                       type: integer
 *                     month:
 *                       type: string
 *                     total_amount:
 *                       type: number
 *     responses:
 *       200:
 *         description: Batch processing result
 *       400:
 *         description: Invalid batch format
 */


const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
//const auth = require('../middleware/auth');

//router.post('/add-bill', auth, (req, res) => AdminController.addBill(req, res));
//router.post('/add-bill-batch', auth, (req, res) => AdminController.addBillBatch(req, res));
const adminController = new AdminController();

router.post('/add-bill', (req, res) => adminController.addBill(req, res));
router.post('/add-bill-batch', (req, res) => adminController.addBillBatch(req, res));

module.exports = router;
