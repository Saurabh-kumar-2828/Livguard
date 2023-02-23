import {ActionFunction, json} from "@remix-run/node";
import {insertContactLeads} from "~/backend/dealer.server";
import {sendDataToFreshSales} from "~/backend/freshSales.server";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {Dealer} from "~/typeDefinitions";

// TODO: Rework for fetcher
type DealerLocatorActionData = {
    dealerList: Array<Dealer> | null;
    error: string | null;
};

export const action: ActionFunction = async ({request, params}) => {
    console.log("Phone Number");
    const body = await request.formData();

    const phoneNumber = safeParse(getNonEmptyStringFromUnknown, body.get("phoneNumber"));
    const name = safeParse(getNonEmptyStringFromUnknown, body.get("name"));
    const emailId = safeParse(getNonEmptyStringFromUnknown, body.get("emailId"));

    if (emailId == null || name == null || phoneNumber == null) {
        const actionData: DealerLocatorActionData = {
            dealerList: null,
            error: "Error in submitting Form",
        };
        return json(actionData);
    }


    await insertContactLeads({phoneNumber: phoneNumber, name: name, emailId: emailId});

    await sendDataToFreshSales({mobile_number: phoneNumber, first_name: name, email: emailId});

    console.log("Helllllooooooo submitted");

    const actionData: DealerLocatorActionData = {
        dealerList: null,
        error: null,
    };

    console.log(actionData);

    return json(actionData);
};
