const BillRepository = require('../repositories/BillRepo');
const PaymentRepository = require('../repositories/PaymentRepo');
const SubscriberRepository = require('../repositories/SubscriberRepo');

class PaymentService {
    constructor() {
        this.billRepo = new BillRepository();
        this.paymentRepo = new PaymentRepository();
        this.subscriberRepo = new SubscriberRepository();
    }

    async payBill(subscriber_no, month, amount) {

        const subscriber = await this.subscriberRepo.getSubscriberById(subscriber_no);
        if (!subscriber) return { error: "Subscriber not found" };

        const bill = await this.billRepo.getBill(subscriber_no, month);
        if (!bill) return { error: "Bill not found" };

        if (amount <= 0) {
            return { error: "Invalid payment amount" };
        }

        const remaining = bill.total_amount - bill.paid_amount;

        if (amount > remaining) {
            return { error: "Payment exceeds remaining balance" };
        }

        const newPaidAmount = bill.paid_amount + amount;
        const newStatus = newPaidAmount >= bill.total_amount ? "paid" : "pending";

        await this.billRepo.updateBillPayment(bill.id, newPaidAmount, newStatus);

        await this.paymentRepo.addPayment({
            bill_id: bill.id,
            amount,
            payment_date: new Date(),
            status: newStatus
        });

        return {
            message: "Payment successful",
            bill_id: bill.id,
            paid_amount: newPaidAmount,
            status: newStatus
        };
    }
}

module.exports = PaymentService;
