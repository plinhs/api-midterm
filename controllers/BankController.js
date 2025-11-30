const BillService = require('../services/BillService')

class BankController{
    constructor(){
        this.billService = new BillService();
    }

    async getUnpaidBills(req, res){
        const { subscriber_no } = req.query;
        const unpaidBills = await this.billService.getUnpaidBills(subscriber_no);
        if (unpaidBills.error) return res.status(404).json(unpaidBills);
        res.status(200).json(unpaidBills);
    }


}
module.exports = BankController;