import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => {
    // Handle sign-up logic
});

authRouter.post('/sign-in', (req, res) => {
    // Handle sign-in logic
});

authRouter.post('/sign-out', (req, res) => {
    // Handle sign-out logic
});

export default authRouter;