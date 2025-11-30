const { sql, config } = require("../config/config");

class PaymentRepository {

    async addPayment(payment) {
        try {
            let pool = await sql.connect(config);

            const result = await pool.request()
                .input("bill_id", sql.Int, payment.bill_id)
                .input("amount", sql.Decimal(10, 2), payment.amount)
                .input("payment_date", sql.Date, payment.payment_date)
                .input("status", sql.VarChar, payment.status)
                .query(
                    `INSERT INTO Payments (bill_id, amount, payment_date, status)
                     VALUES (@bill_id, @amount, @payment_date, @status)`
                );

            return result.rowsAffected[0] > 0;
        } catch (error) {
            console.error("Error in addPayment:", error);
            throw error;
        }
    }

    async getPaymentsByBillId(bill_id) {
        try {
            let pool = await sql.connect(config);

            const result = await pool.request()
                .input("bill_id", sql.Int, bill_id)
                .query(
                    `SELECT * FROM Payments
                     WHERE bill_id=@bill_id ORDER BY payment_date DESC`
                );

            return result.recordset;
        } catch (error) {
            console.error("Error in getPaymentsByBillId:", error);
            throw error;
        }
    }
}

module.exports = PaymentRepository;
