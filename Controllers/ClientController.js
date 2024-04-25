const clientProvider = require("../Repository/ClientProvider");

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
        const response = await clientProvider.getAll(params);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
};

exports.getByDocument = async (req, res, next) => {
    const { document } = req.body;
    try {
        const response = await clientProvider.getByDocument({ document });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
};

exports.create = async (req, res, next) => {
    const { document, name, lastName, phone } = req.body;
    try {
        const params = {
            document,
            name,
            lastName,
            phone,
        };
        const response = await clientProvider.create(params);

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
};