import mongoose, {Schema} from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
    "Location",
    new Schema({
        name: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true
        },
        plaetze : {
            type: Number,
            required: true
        }
        
    }, modelOptions)
);