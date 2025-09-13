import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.post('/', (req, res) => {
    // Handle create subscription logic
});

subscriptionRouter.get('/', (req, res) => {
    // Handle get all subscriptions logic
});

subscriptionRouter.get('/:id', (req, res) => {
    // Handle get subscription details logic
});

subscriptionRouter.put('/:id', (req, res) => {
    // Handle update subscription logic
});

subscriptionRouter.delete('/:id', (req, res) => {
    // Handle delete subscription logic
});

export default subscriptionRouter;
