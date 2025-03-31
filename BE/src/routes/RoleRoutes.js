const routes = require("express").Router()
const roleController = require("../controllers/RoleController")

routes.post("/addrole",roleController.addRole)
routes.get("/roles",roleController.getAllRole)
routes.get("/role/:id",roleController.getRoleById)

module.exports = routes