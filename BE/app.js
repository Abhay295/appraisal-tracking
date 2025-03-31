const express = require("express")
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("hello")
})

roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

departmentRoutes = require("./src/routes/DepartmentRoutes")
app.use("/department",departmentRoutes)

departmentManagerRoutes = require("./src/routes/DepartmentManagerRoutes")
app.use("/manager",departmentManagerRoutes)

feedbackRoutes = require("./src/routes/FeedbackRoutes")
app.use("/feedback",feedbackRoutes)

performanceReviewRoutes = require("./src/routes/PerformanceReviewRoutes")
app.use("/review",performanceReviewRoutes)

goalRoutes = require("./src/routes/GoalRoutes")
app.use("/goals",goalRoutes)

trainningRecommendationRoutes = require("./src/routes/TrainningRecommendationRoutes")
app.use("/trainning",trainningRecommendationRoutes)

userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)

appraisalRoutes = require("./src/routes/AppraisalRoutes")
app.use("/appraisal",appraisalRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/Appraisal-Tracking").then(()=>{
    console.log("Database connected...");
})
const PORT = 3000;
app.listen(PORT,()=>{
    console.log("running on port",PORT);
    
})