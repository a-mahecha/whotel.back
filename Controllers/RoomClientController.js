const roomClientProvider = require("../Repository/RoomClientProvider");

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
        const response = await roomClientProvider.getAll(params);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
};

exports.getByRoom = async (req, res, next) => {
    const { roomNumber } = req.body;
    try {
        const response = await roomClientProvider.getByRoom({ roomNumber });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
};

exports.getByClientId = async (req, res, next) => {
    const { clientId } = req.body;
    try {
        const response = await roomClientProvider.getByClientId({ clientId });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
};

exports.create = async (req, res, next) => {
    const { roomNumber, clientId, startDate, endDate, total } = req.body;
    try {
        const params = {
            roomNumber, clientId, startDate, endDate, total
        };
        const response = await roomClientProvider.create(params);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
};

exports.updateStatus = async (req, res, next) => {
    const { id } = req.body;
    try {
        const response = await roomClientProvider.updateStatus(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
};