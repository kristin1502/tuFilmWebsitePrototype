import privateClient from "../client/private.client";

const suggestionEndpoints = {
    list: "suggestions",
    add: "suggestions",
    all: "suggestions/all",
    remove: ({suggestionId}) => `suggestions/${suggestionId}`
}

const suggestionApi = {
    add: async ({
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content
    }) => {
        try{
            const response = await privateClient.post(
                suggestionEndpoints.add,
                {
                    mediaId,
                    mediaType,
                    mediaTitle,
                    mediaPoster,
                    content
                }
            );

            return { response };
        } catch (err) { return {err}; }
    },

    remove: async ({suggestionId}) => {
        try{
            const response = await privateClient.delete(
                suggestionEndpoints.remove({suggestionId})
            );

            return { response };
        } catch (err) { return {err}; }
    },

    getList: async () => {
        try{
            const response = await privateClient.get(
                suggestionEndpoints.list
            );

            return { response };
        } catch (err) { return {err}; }
    },

    getAll: async () => {
        try{
            const response = await privateClient.get(
                suggestionEndpoints.all
            );

            return { response };
        } catch (err) { return {err}; }
    }
};

export default suggestionApi;