require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require("../connectMongo");
connectDB();
const UserModel = require("../ModelsFolder/user.model");


exports.login = async (params) => {
    const { userName, password } = params;
    const user = await UserModel.findOne({ userName });
    if (user) {
        const isPasswordMatch = bcrypt.compareSync(password, user.password);
        if (isPasswordMatch) {
            const token = jwt.sign(
                {
                    identificacion: user.userName
                },
                process.env.SECRET_KEY,
                {
                    expiresIn: "12h"
                }
            );
            user.lastLogin = new Date();
            await user.save();
            return {
                msg: "Ok",
                data: {
                    user,
                    token,
                },
            };
        } else {
            return {
                msg: "Ok",
                data: null,
            };
        }
    } else {
        return {
            msg: "Ok",
            data: null,
        };
    }
};

exports.create = async (params) => {
    const { name, userName, password } = params;
    const client = new UserModel({
        name, userName, password: bcrypt.hashSync(password, 10), lastLogin: new Date()
    });
    const data = await client.save();
    return {
        msg: "Ok",
        data,
    };
};