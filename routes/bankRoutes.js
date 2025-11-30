/**
 * @swagger
 * tags:
 *   name: Banking
 *   description: Banking App APIs
 */

/**
 * @swagger
 * /bank/unpaid-bills:
 *   get:
 *     summary: Get unpaid bills
 *     tags: [Banking]
 *     security:
 *       - BearerAuth: []
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
//const auth = require('../middleware/auth');

//router.get('/unpaid-bills', auth, (req, res) => BankController.getUnpaidBills(req, res));
const bankController = new BankController();

router.get('/unpaid-bills', (req, res) => bankController.getUnpaidBills(req, res));

module.exports = router;
