import express from 'express';
import Hello from "./Hello.js"
import Lab5 from "./Lab5.js";
import cors from "cors"; 
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";


import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from './Kanbas/assignments/routes.js';



mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const app = express();
app.use(cors());
app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app); 

Hello(app)
Lab5(app)
app.listen(process.env.PORT || 4000);