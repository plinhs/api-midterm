class Bill {
    constructor(id, subscriber_no, month, total_amount,paid_amount, status, details) {
        this.id = id;
        this.subscriber_no = subscriber_no;
        this.month = month;
        this.total_amount = total_amount;
        this.paid_amount = paid_amount;
        this.status = status;             
        this.details = details; 
    }
}

module.exports = Bill;