
import userRoute from "./userRoute.js";
import contactRoute from "./contactRoute.js"
import petRouter from "./petRoute.js"
import PetMrouter from "./PetCroute.js"
import express from 'express';

import cors from 'cors';

const route = express.Router();
route.use("/user", userRoute);
route.use("/contact", contactRoute);
route.use("/pets", petRouter);
route.use("/petM",PetMrouter)
export default route;