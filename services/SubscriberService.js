const BillRepository = require('../repositories/BillRepo');
const SubscriberRepository = require('../repositories/SubscriberRepo');

class AdminService {
    constructor() {
        this.billRepo = new BillRepository();
        this.subscriberRepo = new SubscriberRepository();
    }

    async addBill(billData) {

        const subscriber = await this.subscriberRepo.getSubscriberById(billData.subscriber_no);
        if (!subscriber) return { error: "Subscriber not found" };

        const existing = await this.billRepo.getBill(billData.subscriber_no, billData.month);
        if (existing) return { error: "Bill already exists for this month" };

        await this.billRepo.addBill(billData);
        return { message: "Bill added successfully" };
    }

    async addBillBatch(billArray) {
        let results = [];

        for (const bill of billArray) {
            const subscriber = await this.subscriberRepo.getSubscriberById(bill.subscriber_no);

            if (!subscriber) {
                results.push({ bill, status: "Error: subscriber not found" });
                continue;
            }

            const existing = await this.billRepo.getBill(bill.subscriber_no, bill.month);

            if (existing) {
                results.push({ bill, status: "Error: bill already exists" });
                continue;
            }

            await this.billRepo.addBill(bill);
            results.push({ bill, status: "Success" });
        }

        return results;
    }
}

module.exports = AdminService;
