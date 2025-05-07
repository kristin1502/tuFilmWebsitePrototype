import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";
const addFavorite = async (req, res) => {
    try {
        const isFavorite = await favoriteModel.findOne({
            user: req.user.id,
            mediaId: req.body.mediaId
        });
        if (isFavorite)
            return responseHandler.ok(res, isFavorite);
        const favorite = new favoriteModel({
            ...req.body,
            user: req.user.id
        });
        await favorite.save();
        responseHandler.created(res, favorite);
    }
    catch {
        responseHandler.error(res);
    }
};
const removeFavorite = async (req, res) => {
    console.log("in Remove Favorite");
    try {
        const { favoriteId } = req.params;
        const favorite = await favoriteModel.findOne({
            user: req.user.id,
            _id: favoriteId
        });
        if (!favorite)
            return responseHandler.notfound(res);
        await favoriteModel.deleteOne({ _id: favorite._id });
        responseHandler.ok(res);
    }
    catch (e) {
        console.log(e);
        responseHandler.error(res);
    }
};
const getFavoriteOfUser = async (req, res) => {
    try {
        const favorite = await favoriteModel.find({
            user: req.user.id
        }).sort("-createdAt");
        responseHandler.ok(res, favorite);
    }
    catch {
        responseHandler.error(res);
    }
};
export default {
    addFavorite,
    removeFavorite,
    getFavoriteOfUser
};
//# sourceMappingURL=favorite.controller.js.map