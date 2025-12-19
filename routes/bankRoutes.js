/**
 * @swagger
 * tags:
 *   name: Banking
 *   description: Banking App APIs
 */

/**
 * @swagger
 * /bank/bills:
 *   get:
 *     summary: Get unpaid bills
 *     tags: [Banking]

 *     parameters:
 *       - in: query
 *         name: subscriber_no
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of unpaid bills
 *       404:
 *         description: Subscriber not found
 */


const express = require('express');
const router = express.Router();
const BankController = require('../controllers/BankController');
const { bankAuth } = require('../middleware/auth');

const bankController = new BankController();

router.get('/bills', bankAuth, (req, res) => bankController.getUnpaidBills(req, res));

module.exports = router;
