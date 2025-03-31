const routes = require("express").Router()
const trainningRecommendationController = require("../controllers/TrainningRecommendationController")


routes.post("/add",trainningRecommendationController.addTrainning)
routes.get("/all",trainningRecommendationController.getAllTrainning)


module.exports = routes