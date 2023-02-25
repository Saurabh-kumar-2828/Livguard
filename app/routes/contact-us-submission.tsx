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
    const body = await request.formData();

    const phoneNumber = safeParse(getNonEmptyStringFromUnknown, body.get("phoneNumber"));
    const name = safeParse(getNonEmptyStringFromUnknown, body.get("name"));
    const emailId = safeParse(getNonEmptyStringFromUnknown, body.get("emailId"));
    const utmParameters = safeParse(getNonEmptyStringFromUnknown, body.get("utmParameters"));

    if (emailId == null || name == null || phoneNumber == null || utmParameters == null) {
        const actionData: DealerLocatorActionData = {
            dealerList: null,
            error: "Error in submitting Form",
        };
        console.log("error", actionData);
        return json(actionData);
    }

    // console.log(utmParameters);

    const utmParametersDecoded = JSON.parse(utmParameters);

    await insertContactLeads({phoneNumber: phoneNumber, name: name, emailId: emailId, utmParameters: utmParametersDecoded});

    await sendDataToFreshSales({mobile_number: phoneNumber, first_name: name, email: emailId}, utmParametersDecoded);

    const actionData: DealerLocatorActionData = {
        dealerList: null,
        error: null,
    };

    return json(actionData);
};
