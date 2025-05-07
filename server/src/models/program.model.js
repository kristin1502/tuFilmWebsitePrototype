import mongoose, {Schema} from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
    "Programm",
    new Schema({
        semester: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        public: {
            type: Boolean,
            required: true
        },
        shows: [
            {
                type: Schema.Types.ObjectId,
                ref: "Show",
                required: true
            }
        ]
    }, modelOptions)
);