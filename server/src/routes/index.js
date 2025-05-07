import express from "express";
import userRoute from "./user.route.js";
import mediaRoute from "./media.route.js";
import personRoute from "./person.route.js";
import suggestionRoute from "./suggestion.route.js";
//import programRoute from "./program.route.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/person", personRoute);
//router.use("/program", mediaRoute);
router.use("/suggestions", suggestionRoute);
router.use("/:mediaType", mediaRoute);

export default router;