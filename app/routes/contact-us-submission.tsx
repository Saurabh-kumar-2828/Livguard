import {ActionFunction, json} from "@remix-run/node";
import {insertContactLeads} from "~/backend/dealer.server";
import {sendDataToFreshSales} from "~/backend/freshSales.server";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {Dealer} from "~/typeDefinitions";

export type GenericActionData = {
    error: string | null;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const phoneNumber = safeParse(getNonEmptyStringFromUnknown, body.get("phoneNumber"));
    const name = safeParse(getNonEmptyStringFromUnknown, body.get("name"));
    const emailId = safeParse(getNonEmptyStringFromUnknown, body.get("emailId"));
    const utmParameters = safeParse(getNonEmptyStringFromUnknown, body.get("utmParameters"));

    if (emailId == null || name == null || phoneNumber == null || utmParameters == null) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: bb551a66-7e7b-4c70-a21d-975dbe3872ca",
        };
        return json(actionData);
    }

    // TODO: Type validation
    const utmParametersDecoded = JSON.parse(utmParameters);

    const insertResult = await insertContactLeads({phoneNumber: phoneNumber, name: name, emailId: emailId, utmParameters: utmParametersDecoded});
    if (insertResult instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: a73f9127-a627-4066-92cd-c7017056e0fe",
        };
        return json(actionData);
    }

    const freshsalesResult = await sendDataToFreshSales({mobile_number: phoneNumber, first_name: name, email: emailId}, utmParametersDecoded);
    if (freshsalesResult instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: 242068d4-24d8-4dc3-b205-8789f28454ed",
        };
        return json(actionData);
    }

    const actionData: GenericActionData = {
        error: null,
    };

    return json(actionData);
};
