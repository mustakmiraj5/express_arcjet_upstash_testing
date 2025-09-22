import { createRequire } from "module";
import Subscription from "../model/subscription.model.js";
import dayjs from "dayjs";

// import { serve } from "@upstash/workflow/express";

const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
const REMINDERS = [30, 7, 1]; // days before renewal to send reminders


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

    for(const daysBefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context, `reminder_${daysBefore}_days before`, reminderDate);
        }
        await triggerReminder(context, `reminder_${daysBefore}_days before`);
    }
})

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'email name');
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${date.toDateString()} for ${label}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label}`);
        // Here you would integrate with your email service to send the actual email
    });
}