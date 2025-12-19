/**
 * @swagger
 * tags:
 *   name: Mobile
 *   description: Mobile App APIs
 */

/**
 * @swagger
 * /mobile/bills:
 *   get:
 *     summary: Query bill
 *     tags: [Mobile]
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
 *       429:
 *         description: Rate limit exceeded (3 queries per day)
 */

/**
 * @swagger
 * /mobile/bills/detailed:
 *   get:
 *     summary: Query detailed bill
 *     tags: [Mobile]
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
 *     responses:
 *       200:
 *         description: Detailed bill returned
 *       404:
 *         description: Bill not found
 *       429:
 *         description: Rate limit exceeded (3 queries per day)
 */


const express = require('express');
const router = express.Router();
const MobileController = require('../controllers/MobileController');
const { rateLimitMobile } = require('../middleware/rateLimit');
const { mobileAuth } = require('../middleware/auth');

const mobileController = new MobileController();

router.get('/bills', mobileAuth, rateLimitMobile, (req, res) => mobileController.queryBill(req, res));
router.get('/bills/detailed', mobileAuth, (req, res) => mobileController.queryBillDetailed(req, res));


module.exports = router;
