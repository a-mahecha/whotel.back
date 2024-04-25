const roomProvider = require("../Repository/RoomProvider");

exports.getAll = async (req, res, next) => {
    const { limit = 5, orderBy = "name", sortBy = "asc", keyword } = req.query;
    let page = +req.query?.page;
    if (!page || page <= 0) page = 1;
    const skip = (page - 1) * + limit;
    const query = {};
    if (keyword) query.name = { $regex: keyword, $options: "i" };

    try {
        const params = {
            limit,
            orderBy,
            sortBy,
            keyword,
            skip,
            page,
        };
        const response = await roomProvider.getAll(params);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
};

exports.getByNumber = async (req, res, next) => {
    const { number } = req.body;
    try {
        const response = await roomProvider.getByNumber({ number });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
};

exports.create = async (req, res, next) => {
    const { name, number } = req.body;
    try {
        const params = {
            name, number
        };
        const response = await roomProvider.create(params);

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
};