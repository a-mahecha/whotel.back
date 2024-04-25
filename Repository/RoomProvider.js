require("dotenv").config();
const connectDB = require("../connectMongo");
connectDB();
const RoomModel = require("../ModelsFolder/room.model");

exports.getAll = async (params) => {
    const { limit, orderBy, sortBy, keyword, skip, page } = params;
    const query = {};

    if (keyword) query.name = { $regex: keyword, $options: "i" };

    const data = await RoomModel.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ [orderBy]: sortBy });
    const totalItems = await RoomModel.countDocuments(query);

    return {
        msg: "Ok",
        data,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        limit: +limit,
        currentPage: page,
    };
};

exports.getByNumber = async (params) => {
    const { number } = params;
    const data = await RoomModel.findOne({ number });
    return {
        msg: "Ok",
        data,
    };
};


exports.create = async (params) => {
    const { name, number } = params;

    const existRoom = await RoomModel.findOne({ number });
    if(existRoom)
    {
        return {
            msg: "Ok",
            data: null,
            error: "Room exist",
        };
    }

    const room = new RoomModel({
        name, number,
    });
    const data = await room.save();
    return {
        msg: "Ok",
        data,
    };
};