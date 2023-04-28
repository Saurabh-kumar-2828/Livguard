import {ActionFunction, json} from "@remix-run/node";
import {verifyOtp} from "~/backend/authentication.server";
import {insertContactLeads, insertOrUpdateContactLeads} from "~/backend/dealer.server";
import {sendDataToFreshsales} from "~/backend/freshsales.server";
import {getNonEmptyStringFromUnknown, getObjectFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";

export type GenericActionData = {
    error: string | null;
    type: string;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const inputData = safeParse(getObjectFromUnknown, body.get("inputData"));
    const otpSubmitted = safeParse(getNonEmptyStringFromUnknown, body.get("otpSubmitted"));
    const leadId = safeParse(getNonEmptyStringFromUnknown, body.get("leadId"));
    const utmParameters = safeParse(getNonEmptyStringFromUnknown, body.get("utmParameters"));

    if (inputData == null || utmParameters == null || otpSubmitted == null || leadId == null) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: bb551a66-7e7b-4c70-a21d-975dbe3872ca",
            type: "form-submission",
        };
        return json(actionData);
    }

    const otpVerificationResult = await verifyOtp(inputData.phoneNumber, otpSubmitted);
    if (!otpVerificationResult.success) {
        const actionData: GenericActionData = {
            error: "Please enter valid otp! Error code: a73f9127-a627-4066-92cd-c7017056e0fe",
            type: "form-submission",
        };
        return json(actionData);
    }

    // TODO: Type validation
    const utmParametersDecoded = JSON.parse(utmParameters);

    const insertResult = await insertOrUpdateContactLeads(leadId,{phoneNumber: inputData.phoneNumber, name: inputData.name, emailId: inputData.emailId, otpVerified: true, utmParameters: utmParametersDecoded});
    if (insertResult instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: a73f9127-a627-4066-92cd-c7017056e0fe",
            type: "form-submission"
        };
        return json(actionData);
    }

    const freshsalesResult = await sendDataToFreshsales({mobile_number: inputData.phoneNumber, first_name: inputData.name, email: inputData.emailId, otpVerified: true}, utmParametersDecoded);
    if (freshsalesResult instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: 242068d4-24d8-4dc3-b205-8789f28454ed",
            type: "form-submission"
        };
        return json(actionData);
    }

    const actionData: GenericActionData = {
        error: null,
        type: "form-submission"
    };

    return json(actionData);
};
