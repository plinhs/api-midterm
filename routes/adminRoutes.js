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
 *     summary: Add multiple bills from CSV file
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: CSV file with bill data
 *     responses:
 *       200:
 *         description: Batch processing result
 *       400:
 *         description: Invalid CSV format
 */


const express = require('express');
const multer = require('multer');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const { adminAuth } = require('../middleware/auth');

const upload = multer({ storage: multer.memoryStorage() });
const adminController = new AdminController();

router.post('/bills', adminAuth, (req, res) => adminController.addBill(req, res));
router.post('/bills/batch', adminAuth, upload.single('file'), (req, res) => adminController.addBillBatch(req, res));

module.exports = router;
