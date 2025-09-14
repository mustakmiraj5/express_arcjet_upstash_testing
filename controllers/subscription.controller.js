import Subscription from "../model/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })
        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: subscription
        });
    } catch (error) {
        next(error);
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        // check if the user is the same as the token
        if(req.params.id !== req.user._id.toString()){
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }
        const subscriptions = await Subscription.find({ userId: req.user._id });
        res.status(200).json({
            success: true,
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
}