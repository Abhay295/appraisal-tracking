const routes = require("express").Router();
const departmentController = require("../controllers/DepartmentController")

routes.post("/add",departmentController.addDepartment)
routes.get("/departments",departmentController.allDepartment)

module.exports = routes