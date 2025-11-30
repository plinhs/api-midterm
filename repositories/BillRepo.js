const { sql, config } = require("../config/config");

class BillRepository {
    async getBill(subscriber_no, month) {
        try {
            let pool = await sql.connect(config);

            const result = await pool.request()
                .input("subscriber_no", sql.Int, subscriber_no)
                .input("month", sql.VarChar, month)
                .query(
                    `SELECT * FROM Bills
                     WHERE subscriber_no=@subscriber_no AND month=@month`
                );

            return result.recordset[0];
        } catch (error) {
            console.error("Error in getBill:", error);
            throw error;
        }
    }

    async getBillDetailed(subscriber_no, month) {
        return await this.getBill(subscriber_no, month);
    }

    async getUnpaidBills(subscriber_no) {
        try {
            let pool = await sql.connect(config);

            const result = await pool.request()
                .input("subscriber_no", sql.Int, subscriber_no)
                .query(
                    `SELECT * FROM Bills
                     WHERE subscriber_no=@subscriber_no AND status='pending'`
                );

            return result.recordset;
        } catch (error) {
            console.error("Error in getUnpaidBills:", error);
            throw error;
        }
    }

    async addBill(bill) {
        try {
            let pool = await sql.connect(config);

            const result = await pool.request()
                .input("subscriber_no", sql.Int, bill.subscriber_no)
                .input("month", sql.VarChar, bill.month)
                .input("total_amount", sql.Decimal(10, 2), bill.total_amount)
                .input("paid_amount", sql.Decimal(10, 2), bill.paid_amount || 0)
                .input("status", sql.VarChar, bill.status || "pending")
                .input("details", sql.NVarChar, bill.details || null)
                .query(
                    `INSERT INTO Bills (subscriber_no, month, total_amount, paid_amount, status, details)
                     VALUES (@subscriber_no, @month, @total_amount, @paid_amount, @status, @details)`
                );

            return result.rowsAffected[0] > 0;
        } catch (error) {
            console.error("Error in addBill:", error);
            throw error;
        }
    }

    async updateBillPayment(bill_id, paid_amount, status) {
        try {
            let pool = await sql.connect(config);

            const result = await pool.request()
                .input("bill_id", sql.Int, bill_id)
                .input("paid_amount", sql.Decimal(10, 2), paid_amount)
                .input("status", sql.VarChar, status)
                .query(
                    `UPDATE Bills
                     SET paid_amount=@paid_amount, status=@status
                     WHERE id=@bill_id`
                );

            return result.rowsAffected[0] > 0;
        } catch (error) {
            console.error("Error in updateBillPayment:", error);
            throw error;
        }
    }
}

module.exports = BillRepository;
