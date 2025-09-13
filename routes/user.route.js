import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => {
    // Handle get all users
});

userRouter.get('/:id', (req, res) => {
    // Handle get user details
});

userRouter.post('/', (req, res) => {
    // Handle create user logic
});

userRouter.put('/:id', (req, res) => {
    // Handle update user logic
});

userRouter.delete('/:id', (req, res) => {
    // Handle delete user logic
});

export default userRouter;
