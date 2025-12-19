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
        try {
            if (!req.file) {
                return res.status(400).json({ error: "CSV file required" });
            }
            
            const csvData = req.file.buffer.toString();
            const result = await this.adminService.addBillBatchFromCSV(csvData);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
module.exports = AdminController;