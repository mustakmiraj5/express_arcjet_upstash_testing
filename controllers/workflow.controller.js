import { createRequire } from "module";
import Subscription from "../model/subscription.model.js";
import dayjs from "dayjs";

// import { serve } from "@upstash/workflow/express";

const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");



export const sendReminders = serve( async(context) => {
    const { subscriptionId } = context.requestPayload;

    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== 'active'){
        throw new Error("Subscription not found");
    }

    const renewalDate = dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())){
        console.log(`Subscription ${subscriptionId} has already renewed.`);
        return;
    }

})

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user', 'email name');
    })
}