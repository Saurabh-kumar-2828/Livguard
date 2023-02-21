import {ActionFunction, json} from "@remix-run/node";
import {insertContactLeads} from "~/backend/dealer.server";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {Dealer} from "~/typeDefinitions";

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

    if (emailId == null || name == null || phoneNumber == null) {
        const actionData: DealerLocatorActionData = {
            dealerList: [],
            path: "/contactusSubmission",
            error: "Error in submitting Form",
        };
        return json(actionData);
    }

    await insertContactLeads({phoneNumber: phoneNumber, name: name, emailId: emailId});

    const actionData: DealerLocatorActionData = {
        dealerList: [],
        error: "",
        path: "/contactusSubmission",
    };

    return json(actionData);
};
