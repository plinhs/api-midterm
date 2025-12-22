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
    
    async addBillBatch(req, res) {
    try {
        const billList = req.body.list;

        if (!Array.isArray(billList) || billList.length === 0) {
        return res.status(400).json({ error: "Body must include non-empty 'list' array" });
        }

        const result = await this.adminService.addBillBatch(billList);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    }

}
module.exports = AdminController;