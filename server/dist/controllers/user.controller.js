import userModel from "../models/user.models.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
const signup = async (req, res) => {
    try {
        const { username, password, displayName } = req.body;
        const checkUser = await userModel.findOne({ username });
        if (checkUser)
            responseHandler.badrequest(res, "username already used");
        const user = new userModel();
        user.displayName = displayName;
        user.username = username;
        /** @type {any} */
        const typedUser = user;
        typedUser.setPassword(password);
        await user.save();
        const token = jsonwebtoken.sign({ data: user.id }, process.env.TOKEN_SECRET, { expiresIn: "24h" });
        responseHandler.created(res, {
            token,
            ...user.toObject(),
            id: user.id
        });
    }
    catch {
        responseHandler.error(res);
    }
};
const signin = async (req, res) => {
    console.log(req.url);
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username }).select("username password salt id displayName");
        if (!user)
            return responseHandler.badrequest(res, "User not exist");
        /** @type {any} */
        const typedUser = user;
        if (!typedUser.validPassword(password))
            return responseHandler.badrequest(res, "Wrong password");
        const token = jsonwebtoken.sign({ data: user.id }, process.env.TOKEN_SECRET, { expiresIn: "24h" });
        user.password = undefined;
        user.salt = undefined;
        responseHandler.created(res, {
            token,
            ...user.toObject(),
            id: user.id
        });
    }
    catch {
        responseHandler.error(res);
    }
};
const updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;
        const user = await userModel.findById(req.user.id).select("password id salt");
        if (!user)
            return responseHandler.unauthorize(res);
        /** @type {any} */
        const typedUser = user;
        if (!typedUser.validPassword(password))
            return responseHandler.badrequest(res, "Wrong password");
        typedUser.setPassword(newPassword);
        await user.save;
        responseHandler.ok(res);
    }
    catch {
        responseHandler.error(res);
    }
};
const getInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user)
            responseHandler.notfound(res);
        responseHandler.ok(res, user);
    }
    catch {
        responseHandler.error(res);
    }
};
export default {
    signup,
    signin,
    getInfo,
    updatePassword
};
//# sourceMappingURL=user.controller.js.map