const routes = require("express").Router()
const performanceReviewController = require("../controllers/PerformanceReviewController")


routes.post("/add",performanceReviewController.addReview)
routes.get("/all",performanceReviewController.getAllReviews)
routes.get("/:id",performanceReviewController.getReviewsById)


module.exports = routes