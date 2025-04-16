    const routes = require("express").Router()
const userController = require("../controllers/UserController") 

routes.post("/signup",userController.signUp)
routes.post("/login",userController.login)
routes.post("/adduser",userController.addUser)
routes.get("/alluser",userController.getAllUser)
routes.get("/getuserbyrole",userController.getUserByRole)
routes.get("/user/:id",userController.getUserById)
routes.delete("/delete/:id",userController.deleteUser)
routes.post("/forgot",userController.forgotPassword)
routes.post("/resetpassword",userController.resetpassword)
// routes.post("/addprofile",userController.addProfileImage)

module.exports = routes
