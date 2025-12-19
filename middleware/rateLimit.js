const queryCount = new Map();

function rateLimitMobile(req, res, next) {
    const { subscriber_no } = req.query;
    if (!subscriber_no) {
        return res.status(400).json({ error: "subscriber_no is required" });
    }
    
    const today = new Date().toDateString();
    const key = `${subscriber_no}-${today}`;
    
    const count = queryCount.get(key) || 0;
    
    if (count >= 3) {
        return res.status(429).json({ error: "Rate limit exceeded. Maximum 3 queries per day." });
    }
    
    queryCount.set(key, count + 1);
    next();
}

module.exports = { rateLimitMobile };