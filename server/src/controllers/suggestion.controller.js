import responseHandler from "../handlers/response.handler.js";
import suggestionModel from "../models/suggestion.model.js";

const create = async (req, res) => {
    try{
        const {movieId} = req.params;

        const suggestion = new suggestionModel({
            user: req.user.id,
            movieId,
            ...req.body
        });

        await suggestion.save();

        responseHandler.created(res, {
            ...suggestion._doc,
            id: suggestion.id,
            user: req.user
        });
    }catch{
        responseHandler.error(res);
    }
};

const remove = async (req, res) => {
    console.log("remove suggestion " + req.params.suggestionId);
    try{
        const {suggestionId} = req.params;

        const suggestion = await suggestionModel.findOne({
            _id: suggestionId,
            user: req.user.id
        });

        if(!suggestion) return responseHandler.notfound(res);

        // Verwende deleteOne() anstelle von remove()
        await suggestionModel.deleteOne({ _id: suggestionId });

        responseHandler.ok(res);
    }catch (err){
        console.log("Error removing suggestion: ", err);
        responseHandler.error(res);
    }
};

const getSuggestionsOfUser = async (req, res) => {
    try{
        const suggestions = await suggestionModel.find({
           user: req.user.id
        }).populate("user").sort("-createdAt");

        responseHandler.ok(res, suggestions);
    }catch{
        responseHandler.error(res);
    }
};

const all = async (req, res) => {
    try{
        const suggestions = await suggestionModel.find({}).populate("user").sort("-createdAt");

        responseHandler.ok(res, suggestions);
    }catch{
        responseHandler.error(res);
    }
};

export default {
    create,
    remove,
    getSuggestionsOfUser,
    all
};