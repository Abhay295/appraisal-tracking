const routes = require("express").Router()
const feedbackController = require("../controllers/FeedbackController")


routes.post("/add",feedbackController.addFeedback)
routes.get("/all",feedbackController.getAllFeedbacks)

module.exports = routes