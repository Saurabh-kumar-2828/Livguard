import {ActionFunction, json} from "@remix-run/node";
import {insertDealerLeads} from "~/backend/dealer.server";
import {sendDataToFreshsales} from "~/backend/freshsales.server";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {GenericActionData} from "~/routes/contact-us-submission";
import {Dealer} from "~/typeDefinitions";

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const phoneNumber = safeParse(getNonEmptyStringFromUnknown, body.get("phoneNumber"));
    const name = safeParse(getNonEmptyStringFromUnknown, body.get("name"));
    const emailId = safeParse(getNonEmptyStringFromUnknown, body.get("emailId"));
    const city = safeParse(getNonEmptyStringFromUnknown, body.get("city"));
    const utmParameters = safeParse(getNonEmptyStringFromUnknown, body.get("utmParameters"));

    if (city == null || name == null || phoneNumber == null || emailId == null || utmParameters == null) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: 2a355407-ecbf-446d-9e00-96957d90592b",
        };
        return json(actionData);
    }

    const utmParametersDecoded = JSON.parse(utmParameters);

    const insertResult = await insertDealerLeads({phoneNumber: phoneNumber, name: name, emailId: emailId, city: city});
    if (insertResult instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: 22313ddd-12ae-4bbb-83e3-48e8f7fcaea9",
        };
        return json(actionData);
    }

    const freshsalesResult = await sendDataToFreshsales({mobile_number: phoneNumber, first_name: name, email: emailId, city: city}, utmParametersDecoded);
    if (freshsalesResult instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: 221af103-e2ad-4fe1-86af-25ed6494da30",
        };
        return json(actionData);
    }

    const actionData: GenericActionData = {
        error: null,
    };

    return json(actionData);
};
