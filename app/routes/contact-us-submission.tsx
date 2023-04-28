import {ActionFunction, json} from "@remix-run/node";
import {verifyOtp} from "~/backend/authentication.server";
import {insertContactLeads} from "~/backend/dealer.server";
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
    // const phoneNumber = safeParse(getNonEmptyStringFromUnknown, body.get("phoneNumber"));
    // const name = safeParse(getNonEmptyStringFromUnknown, body.get("name"));
    // const emailId = safeParse(getNonEmptyStringFromUnknown, body.get("emailId"));
    const utmParameters = safeParse(getNonEmptyStringFromUnknown, body.get("utmParameters"));

    // if (emailId == null || name == null || phoneNumber == null || utmParameters == null) {
    //     const actionData: GenericActionData = {
    //         error: "Error in submitting form! Error code: bb551a66-7e7b-4c70-a21d-975dbe3872ca",
    //     };
    //     return json(actionData);
    // }

    console.log("utm parameters :", utmParameters);
    console.log("inputData :", inputData);
    console.log("otp submitted :", otpSubmitted);

    if (inputData == null || utmParameters == null || otpSubmitted == null) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: bb551a66-7e7b-4c70-a21d-975dbe3872ca",
            type: "form-submission",
        };
        return json(actionData);
    }

    // TODO: Type validation
    const utmParametersDecoded = JSON.parse(utmParameters);

    const insertResult = await insertContactLeads({phoneNumber: inputData.phoneNumber, name: inputData.name, emailId: inputData.emailId, utmParameters: utmParametersDecoded});
    if (insertResult instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: a73f9127-a627-4066-92cd-c7017056e0fe",
            type: "form-submission"
        };
        return json(actionData);
    }

    const freshsalesResult = await sendDataToFreshsales({mobile_number: inputData.phoneNumber, first_name: inputData.name, email: inputData.emailId}, utmParametersDecoded);
    if (freshsalesResult instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: 242068d4-24d8-4dc3-b205-8789f28454ed",
            type: "form-submission"
        };
        return json(actionData);
    }

    const otpVerificationResult = await verifyOtp(inputData.phoneNumber, otpSubmitted);
    if (!otpVerificationResult.success) {
        const actionData: GenericActionData = {
            error: "Error in submitting otp form! Error code: a73f9127-a627-4066-92cd-c7017056e0fe",
            type: "form-submission",
        };
        return json(actionData);
    }

    const actionData: GenericActionData = {
        error: null,
        type: "form-submission"
    };

    return json(actionData);
};
