import { Router } from "express";
import { getUsers, getUsersById } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', authorize, getUsers);

userRouter.get('/:id', authorize, getUsersById);

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
