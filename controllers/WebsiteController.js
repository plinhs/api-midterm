const PaymentService = require('../services/PaymentService');

class WebsiteController{
    constructor(){
        this.paymentService = new PaymentService();
    }

    async payBill(req, res){
        const { subscriber_no, month, amount } = req.body;
        const payment = await this.paymentService.payBill(subscriber_no, month, amount);
        if (payment.error) return res.status(404).json(payment);
        res.status(200).json(payment);
    }
}
module.exports = WebsiteController;