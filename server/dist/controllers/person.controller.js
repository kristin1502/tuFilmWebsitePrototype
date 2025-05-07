import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
const personDetail = async (req, res) => {
    try {
        const { personId } = req.params;
        const person = await tmdbApi.personalDetail({ personId });
        responseHandler.ok(res, person);
    }
    catch {
        responseHandler.error(res);
    }
};
const personMedia = async (req, res) => {
    try {
        const { personId } = req.params;
        const medias = await tmdbApi.personalMedia({ personId });
        responseHandler.ok(res, medias);
    }
    catch {
        responseHandler.error(res);
    }
};
export default {
    personDetail,
    personMedia
};
//# sourceMappingURL=person.controller.js.map