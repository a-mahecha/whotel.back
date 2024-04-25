const userProvider = require("../Repository/UserProvider");

exports.login = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        const response = await userProvider.login({ userName, password });
        return res.status(200).json(response);        
    } catch (e) {
        console.error('err thrown: ' + e.stack);
        res.status(500).json({ message: e.stack });
    }
};

exports.create = async (req, res, next) => {
    const { name, userName, password } = req.body;
    try {
        const params = {
            name, userName, password,
        };
        const response = await userProvider.create(params);

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
};