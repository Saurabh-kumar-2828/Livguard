import {ActionFunction, json} from "@remix-run/node";
import {insertContactLeads} from "~/backend/dealer.server";
import {sendDataToFreshSales} from "~/backend/freshSales.server";
import {insertSubscriptionLeads} from "~/backend/subscribe.server";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {Dealer} from "~/typeDefinitions";

// TODO: Rework for fetcher
type SubscribeActionData = {
    dealerList: Array<Dealer> | null;
    error: string | null;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const emailId = safeParse(getNonEmptyStringFromUnknown, body.get("emailId"));

    if (emailId == null ) {
        const actionData: SubscribeActionData = {
            dealerList: null,
            error: "Error in submitting Form",
        };
        return json(actionData);
    }

    await insertSubscriptionLeads({email: emailId});

    console.log("Helllllooooooo submitted");

    const actionData: SubscribeActionData = {
        dealerList: null,
        error: null,
    };

    console.log(actionData);

    return json(actionData);
};
