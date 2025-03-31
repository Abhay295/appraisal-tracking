const routes = require("express").Router();
const departmentManagerController = require("../controllers/DepartmentManagerController")

routes.post("/add",departmentManagerController.addmanager)
routes.get("/all",departmentManagerController.getAllManagers)

module.exports = routes