const BillService = require('../services/BillService');

class MobileController{
    constructor(){
        this.billService = new BillService();
    }

    async queryBill(req, res){
        const { subscriber_no, month } = req.query;
        const bill = await this.billService.getBill(subscriber_no, month);
        if (bill.error) return res.status(404).json(bill);
        res.status(200).json(bill);
    }

    async queryBillDetailed(req, res){
        const { subscriber_no, month } = req.query;
        const bill = await this.billService.getBillDetailed(subscriber_no, month);
        if (bill.error) return res.status(404).json(bill);
        res.status(200).json(bill);
    }

}
module.exports = MobileController;
