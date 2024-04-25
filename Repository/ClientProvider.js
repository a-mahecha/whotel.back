require("dotenv").config();
const connectDB = require("../connectMongo");
connectDB();
const ClientModel = require("../ModelsFolder/client.model");

exports.getAll = async (params) => {
    const { limit, orderBy, sortBy, keyword, skip, page } = params;
    const query = {};

    if (keyword) query.name = { $regex: keyword, $options: "i" };

    const data = await ClientModel.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ [orderBy]: sortBy });
    const totalItems = await ClientModel.countDocuments(query);

    return {
        msg: "Ok",
        data,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        limit: +limit,
        currentPage: page,
    };
};

exports.getByDocument = async (params) => {
    const { document } = params;
    const data = await ClientModel.findOne({ document });
    return {
        msg: "Ok",
        data,
    };
};


exports.create = async (params) => {
    const { document, name, lastName, phone } = params;

    const existUser = await ClientModel.findOne({ document });
    if(existUser)
    {
        return {
            msg: "Ok",
            data: null,
            error: "User exist",
        };
    }

    const client = new ClientModel({
        document, name, lastName, phone
    });
    const data = await client.save();
    return {
        msg: "Ok",
        data,
    };
};