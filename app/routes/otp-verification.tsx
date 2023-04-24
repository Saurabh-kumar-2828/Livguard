import {ActionFunction, json} from "@remix-run/node";
import {sendOtp} from "~/backend/authentication.server";
import {insertContactLeads} from "~/backend/dealer.server";
import {sendDataToFreshsales} from "~/backend/freshsales.server";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {Dealer} from "~/typeDefinitions";

export type GenericActionData = {
    error: string | null;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const phoneNumber = safeParse(getNonEmptyStringFromUnknown, body.get("phoneNumber"));
    const name = safeParse(getNonEmptyStringFromUnknown, body.get("name"));
    const utmParameters = safeParse(getNonEmptyStringFromUnknown, body.get("utmParameters"));

    if (phoneNumber == null || utmParameters == null || name == null) {
        const actionData: GenericActionData = {
            error: "Inputs cann't be null! Error code: bb551a66-7e7b-4c70-a21d-975dbe3872ca",
        };
        return json(actionData);
    }

    const result = await sendOtp(phoneNumber, name);
    if (result instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error while sending otp! Error code: a73f9127-a627-4066-92cd-c7017056e0fe",
        };
        return json(actionData);
    }

    // TODO: Type validation
    // const utmParametersDecoded = JSON.parse(utmParameters);

    // const freshsalesResult = await sendDataToFreshsales({mobile_number: phoneNumber}, utmParametersDecoded);
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
