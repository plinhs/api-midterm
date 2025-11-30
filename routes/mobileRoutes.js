/**
 * @swagger
 * tags:
 *   name: Mobile
 *   description: Mobile App APIs
 */

/**
 * @swagger
 * /mobile/query-bill:
 *   get:
 *     summary: Query bill
 *     tags: [Mobile]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subscriber_no
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *           example: "2024-10"
 *     responses:
 *       200:
 *         description: Bill details returned
 */

/**
 * @swagger
 * /mobile/query-bill-detailed:
 *   get:
 *     summary: Query detailed bill
 *     tags: [Mobile]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subscriber_no
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 */

const express = require('express');
const router = express.Router();
const MobileController = require('../controllers/MobileController');
const auth = require('../middleware/auth');

router.get('/query-bill', auth, (req, res) => MobileController.queryBill(req, res));
router.get('/query-bill-detailed', auth, (req, res) => MobileController.queryBillDetailed(req, res));

module.exports = router;
