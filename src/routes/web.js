import express from "express";
import homepageController from "../controllers/homepageController"
import chatBotController from "../controllers/chatbotController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homepageController.getHomePage);
    router.get("/webhook", chatBotController.getWebhook);
    router.post("/webhook", chatBotController.postWebhook);
    
    return app.use("/", router);
};

module.exports = initWebRoutes;