const { sql, config } = require("../config/config");

class SubscriberRepository {

    async getSubscriberById(subscriber_no) {
        try {
            let pool = await sql.connect(config);

            const result = await pool.request()
                .input("subscriber_no", sql.Int, subscriber_no)
                .query("SELECT * FROM Subscribers WHERE subscriber_no=@subscriber_no");

            return result.recordset[0];
        } catch (error) {
            console.error("Error in getSubscriberById:", error);
            throw error;
        }
    }

    async addSubscriber(data) {
        try {
            let pool = await sql.connect(config);

            const result = await pool.request()
                .input("subscriber_no", sql.Int, data.subscriber_no)
                .input("name", sql.VarChar, data.name)
                .input("email", sql.VarChar, data.email)
                .input("phone_model", sql.VarChar, data.phone_model)
                .query(
                    `INSERT INTO Subscribers (subscriber_no, name, email, phone_model)
                     VALUES (@subscriber_no, @name, @email, @phone_model)`
                );

            return result.rowsAffected[0] > 0;
        } catch (error) {
            console.error("Error in addSubscriber:", error);
            throw error;
        }
    }
}

module.exports = SubscriberRepository;
