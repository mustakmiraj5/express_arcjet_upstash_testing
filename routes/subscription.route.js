import { Router } from "express";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.get('/', (req, res) => {
    // Handle get all subscriptions logic
}); 

subscriptionRouter.get('/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id', authorize, (req, res) => {
    // Handle update subscription logic
});

subscriptionRouter.delete('/:id', authorize, (req, res) => {
    // Handle delete subscription logic
});

export default subscriptionRouter;
