class Payment {
    constructor(payment_id, bill_id, amount, payment_date, status) {
        this.payment_id = payment_id;   
        this.bill_id = bill_id;         
        this.amount = amount;           
        this.payment_date = payment_date; 
        this.status = status;   
    }
}

module.exports = Payment;