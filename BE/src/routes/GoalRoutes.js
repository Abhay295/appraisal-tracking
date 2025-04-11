const routes = require("express").Router();
const goalController = require("../controllers/GoalController")

routes.post("/add",goalController.addGoal)
routes.get("/all",goalController.getAllGoals)
routes.get("/:id",goalController.getGoalById)
routes.put("/update/:id",goalController.goalUpdateById)


module.exports = routes