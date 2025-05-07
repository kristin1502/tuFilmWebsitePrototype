import showModel from '../models/show.model.js';
import programModel from '../models/program.model.js';
import responseHandler from '../handlers/response.handler.js';
const createShow = async (req, res) => {
    try {
        const { programId } = req.body;
        const show = new showModel({
            ...req.body
        });
        await show.save();
        // Optional: Show direkt zu einem Programm hinzufügen
        if (programId) {
            const program = await programModel.findById(programId);
            if (!program)
                return responseHandler.notfound(res);
            program.shows.push(show._id);
            await program.save();
        }
        responseHandler.created(res, show);
    }
    catch (error) {
        responseHandler.error(res);
    }
};
const getShowById = async (req, res) => {
    try {
        const { showId } = req.params;
        const show = await showModel.findById(showId).populate('showLocation').lean();
        if (!show)
            return responseHandler.notfound(res);
        responseHandler.ok(res, show);
    }
    catch (error) {
        responseHandler.error(res);
    }
};
const getAllShows = async (req, res) => {
    try {
        const shows = await showModel.find().populate('showLocation').lean();
        responseHandler.ok(res, shows);
    }
    catch (error) {
        responseHandler.error(res);
    }
};
const updateShow = async (req, res) => {
    try {
        const { showId } = req.params;
        const show = await showModel.findByIdAndUpdate(showId, req.body, { new: true });
        if (!show)
            return responseHandler.notfound(res);
        responseHandler.ok(res, show);
    }
    catch (error) {
        responseHandler.error(res);
    }
};
const deleteShow = async (req, res) => {
    try {
        const { showId } = req.params;
        const show = await showModel.findById(showId);
        if (!show)
            return responseHandler.notfound(res);
        // Entferne die Show aus allen Programmen
        await programModel.updateMany({ shows: showId }, { $pull: { shows: showId } });
        await show.deleteOne();
        responseHandler.ok(res);
    }
    catch (error) {
        responseHandler.error(res);
    }
};
export default {
    createShow,
    getShowById,
    getAllShows,
    updateShow,
    deleteShow
};
//# sourceMappingURL=program.controller.js.map