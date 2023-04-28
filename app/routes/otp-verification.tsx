import {ActionFunction, json} from "@remix-run/node";
import {sendOtp} from "~/backend/authentication.server";
import {insertOrUpdateContactLeads} from "~/backend/dealer.server";
import {sendDataToFreshsales} from "~/backend/freshsales.server";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";

export type GenericActionData = {
    error: string | null;
    type: string;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const phoneNumber = safeParse(getNonEmptyStringFromUnknown, body.get("phoneNumber"));
    const name = safeParse(getNonEmptyStringFromUnknown, body.get("name"));
    const leadId = safeParse(getNonEmptyStringFromUnknown, body.get("leadId"));
    const emailId = safeParse(getNonEmptyStringFromUnknown, body.get("emailId"));
    const utmParameters = safeParse(getNonEmptyStringFromUnknown, body.get("utmParameters"));

    if (phoneNumber == null || utmParameters == null || name == null || leadId == null || emailId == null) {
        const actionData: GenericActionData = {
            error: "Inputs cann't be null! Error code: bb551a66-7e7b-4c70-a21d-975dbe3872ca",
            type: "otp-verification"
        };
        return json(actionData);
    }

    const utmParametersDecoded = JSON.parse(utmParameters);
    const insertResult = await insertOrUpdateContactLeads(leadId, {phoneNumber: phoneNumber, name: name, emailId: emailId, otpVerified: false , utmParameters: utmParametersDecoded});
    if (insertResult instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: a73f9127-a627-4066-92cd-c7017056e0fe",
            type: "form-submission",
        };
        return json(actionData);
    }

    const freshsalesResult = await sendDataToFreshsales({mobile_number: phoneNumber, first_name: name, email: emailId, otpVerified: false}, utmParametersDecoded);
    if (freshsalesResult instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: 242068d4-24d8-4dc3-b205-8789f28454ed",
            type: "form-submission",
        };
        return json(actionData);
    }

    const result = await sendOtp(phoneNumber, name);
    if (result instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error while sending otp! Error code: a73f9127-a627-4066-92cd-c7017056e0fe",
            type: "otp-verification",
        };
        return json(actionData);
    }

    const actionData: GenericActionData = {
        error: null,
        type: "otp-verification",
    };

    return json(actionData);
};
