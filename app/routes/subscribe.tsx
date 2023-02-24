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
    const utmParameters = safeParse(getNonEmptyStringFromUnknown, body.get("utmParameters"));

    if (emailId == null || utmParameters == null ) {
        const actionData: SubscribeActionData = {
            dealerList: null,
            error: "Error in submitting Form",
        };
        return json(actionData);
    }

    console.log(utmParameters);

    const utmParametersDecoded = JSON.parse(utmParameters);

    //await insertSubscriptionLeads({email: emailId});

    await sendDataToFreshSales({email: emailId}, utmParametersDecoded);

    const actionData: SubscribeActionData = {
        dealerList: null,
        error: null,
    };

    return json(actionData);
};
