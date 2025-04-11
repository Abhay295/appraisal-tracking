const routes = require("express").Router();
const appraisalController = require("../controllers/AppraisalController")


routes.post("/add",appraisalController.addAppraisal)
routes.get("/all",appraisalController.getAllAppraisal)
routes.get("/:id",appraisalController.getAppraisalById)
routes.put("/update/:id",appraisalController.updatePercentage)

module.exports = routes;