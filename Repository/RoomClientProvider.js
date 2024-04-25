require("dotenv").config();
const connectDB = require("../connectMongo");
connectDB();
const RoomClientModel = require("../ModelsFolder/roomClient.model");
const ClientModel = require("../ModelsFolder/client.model");
const RoomModel = require("../ModelsFolder/room.model");

exports.getAll = async (params) => {
    const { limit, orderBy, sortBy, keyword, skip, page } = params;
    const query = {};

    if (keyword) query.name = { $regex: keyword, $options: "i" };

    const data = await RoomClientModel.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ [orderBy]: sortBy });
    const totalItems = await RoomClientModel.countDocuments(query);

    return {
        msg: "Ok",
        data,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        limit: +limit,
        currentPage: page,
    };
};

exports.getByRoom = async (params) => {
    const { roomNumber } = params;
    const data = await RoomClientModel.find({ roomNumber });
    return {
        msg: "Ok",
        data,
    };
};

exports.getByClientId = async (params) => {
    const { clientId } = params;
    const data = await RoomClientModel.find({ clientId });
    return {
        msg: "Ok",
        data,
    };
};

exports.create = async (params) => {
    const { roomNumber, clientId, startDate, endDate, total } = params;

    const clientExist = await ClientModel.findOne({ document: clientId });
    if (!clientExist) {
        return {
            msg: "Ok",
            data: null,
            error: "Client not found",
        };
    }

    const roomExist = await RoomModel.findOne({ number: roomNumber });
    if (!roomExist) {
        return {
            msg: "Ok",
            data: null,
            error: "Room not found",
        };
    }

    const roomClientExist = await RoomClientModel.findOne({ roomNumber, clientId, active: true });
    if (roomClientExist) {
        return {
            msg: "Ok",
            data: null,
            error: "Room active",
        };
    }

    const room = new RoomClientModel({
        roomNumber,
        clientId,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        active: true,
        total
    });
    const data = await room.save();
    return {
        msg: "Ok",
        data,
    };
};

exports.updateStatus = async (id) => {
    const data = await RoomClientModel.findByIdAndUpdate(
        id,
        {
            active: false,
        },
        { new: true }
    );
    return {
        msg: "Ok",
        data,
    };
}