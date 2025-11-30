const AdminService = require('../services/AdminService')

class AdminController{
    constructor(){
        this.adminService = new AdminService();
    }

    async addBill(req, res){
        const billData = req.body;
        const result = await this.adminService.addBill(billData);
        res.status(200).json(result);
    }
    async addBillBatch(req, res){
        const billList = req.body.list;
        const result = await this.adminService.addBillBatch(billList);
        res.status(200).json(result);
    }
}
module.exports = AdminController;