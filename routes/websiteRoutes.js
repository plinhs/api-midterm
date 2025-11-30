/**
 * @swagger
 * tags:
 *   name: Website
 *   description: Website Payment API
 */

/**
 * @swagger
 * /web/pay-bill:
 *   post:
 *     summary: Pay bill
 *     tags: [Website]
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
 *                 example: "2024-10"
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Payment processed
 */

const express = require('express');
const router = express.Router();
const WebsiteController = require('../controllers/WebsiteController');

router.post('/pay-bill', (req, res) => WebsiteController.payBill(req, res));

module.exports = router;
