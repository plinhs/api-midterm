function mobileAuth(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.MOBILE_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

function bankAuth(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.BANK_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

function adminAuth(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.ADMIN_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

module.exports = { mobileAuth, bankAuth, adminAuth };