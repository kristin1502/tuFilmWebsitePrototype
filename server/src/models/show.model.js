import mongoose, {Schema} from "mongoose";
import modelOptions from "./model.options.js";
export default mongoose.model(
    "Show",
    mongoose.Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        mediaId: {
            type: String,
            required: true,
        },
        mediaPoster: {
            type: String,
            required: true
        },

        showTitle: {
            type: String,
            required: true,
        },
        showLanguage: {
            type: String,
            required: true
        },
        additionalInformation: {
            type: String,
            required: true,
        },
        showTeaser: {
            type: String,
            required: false
        },
        showContent: {
            type: String,
            required: true
        },
        showComment: {
            type: String,
            required: true
        },
        showLocation: {
            type: Schema.Types.ObjectId,
            ref: "Location",
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        showLink: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        aktiv: {
            type: Boolean,
            required: true,
            default: true
        },
        program: {
            type: Schema.Types.ObjectId,
            ref: "Program",
            required: true
        }
    }, modelOptions)
);