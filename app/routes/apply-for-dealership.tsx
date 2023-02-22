import {ActionFunction, json} from "@remix-run/node";
import {insertDealerLeads} from "~/backend/dealer.server";
import {sendDataToFreshSales} from "~/backend/freshSales.server";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {Dealer} from "~/typeDefinitions";

// TODO: Rework for fetcher
type DealerLocatorActionData = {
    dealerList: Array<Dealer>;
    path: string;
    error: string;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const phoneNumber = safeParse(getNonEmptyStringFromUnknown, body.get("phoneNumber"));
    const name = safeParse(getNonEmptyStringFromUnknown, body.get("name"));
    const emailId = safeParse(getNonEmptyStringFromUnknown, body.get("emailId"));
    const city = safeParse(getNonEmptyStringFromUnknown, body.get("city"));

    if (city == null || name == null || phoneNumber == null || emailId == null) {
        const actionData: DealerLocatorActionData = {
            dealerList: [],
            path: "/applyForDealership",
            error: "Error in submitting Form",
        };
        return json(actionData);
    }

    await insertDealerLeads({phoneNumber:phoneNumber,name:name,emailId:emailId,city:city});

    await sendDataToFreshSales({mobile_number: phoneNumber, first_name: name, email: emailId, city: city});

    const actionData: DealerLocatorActionData = {
        dealerList: [],
        error: "",
        path: "/applyForDealership",
    };

    return json(actionData);
};
