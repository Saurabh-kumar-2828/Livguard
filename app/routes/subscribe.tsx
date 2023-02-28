import {ActionFunction, json} from "@remix-run/node";
import {insertContactLeads} from "~/backend/dealer.server";
import {sendDataToFreshSales} from "~/backend/freshSales.server";
import {insertSubscriptionLeads} from "~/backend/subscribe.server";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {GenericActionData} from "~/routes/contact-us-submission";
import {Dealer} from "~/typeDefinitions";

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const emailId = safeParse(getNonEmptyStringFromUnknown, body.get("emailId"));
    const utmParameters = safeParse(getNonEmptyStringFromUnknown, body.get("utmParameters"));

    if (emailId == null || utmParameters == null ) {
        const actionData: GenericActionData = {
            error: "Invalid input: 0311dcb1-c676-4080-a615-65a88434e86d",
        };
        return json(actionData);
    }

    const utmParametersDecoded = JSON.parse(utmParameters);

    const insertResult = await insertSubscriptionLeads(emailId, utmParametersDecoded);
    if (insertResult instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: 4469037c-6de7-48c4-9c64-66e6eac83234",
        };
        return json(actionData);
    }

    // const freshsalesResult = await sendDataToFreshSales({email: emailId}, utmParametersDecoded);
    // if (freshsalesResult instanceof Error) {
    //     const actionData: GenericActionData = {
    //         error: "Error in submitting form! Error code: 242068d4-24d8-4dc3-b205-8789f28454ed",
    //     };
    //     return json(actionData);
    // }

    const actionData: GenericActionData = {
        error: null,
    };

    return json(actionData);
};
