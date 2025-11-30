const BillRepository = require('../repositories/BillRepo');
const SubscriberRepository = require('../repositories/SubscriberRepo');

class BillService {
    constructor() {
        this.billRepo = new BillRepository();
        this.subscriberRepo = new SubscriberRepository();
    }

    async getBill(subscriber_no, month) {
        const subscriber = await this.subscriberRepo.getSubscriberById(subscriber_no);
        if (!subscriber) return { error: "Subscriber not found" };

        const bill = await this.billRepo.getBill(subscriber_no, month);
        if (!bill) return { error: "Bill not found" };

        return bill;
    }

    async getBillDetailed(subscriber_no, month) {
        const subscriber = await this.subscriberRepo.getSubscriberById(subscriber_no);
        if (!subscriber) return { error: "Subscriber not found" };

        const bill = await this.billRepo.getBillDetailed(subscriber_no, month);
        if (!bill) return { error: "Bill not found" };

        return bill;
    }

    async getUnpaidBills(subscriber_no) {
        const subscriber = await this.subscriberRepo.getSubscriberById(subscriber_no);
        if (!subscriber) return { error: "Subscriber not found" };

        const unpaidBills = await this.billRepo.getUnpaidBills(subscriber_no);
        return unpaidBills;
    }

    async updatePayment(bill_id, paid_amount, status) {
        return await this.billRepo.updateBillPayment(bill_id, paid_amount, status);
    }
}

module.exports = BillService;
