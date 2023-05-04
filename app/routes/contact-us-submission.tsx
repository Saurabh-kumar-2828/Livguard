import {ActionFunction, json} from "@remix-run/node";
import {verifyOtp} from "~/backend/authentication.server";
import {insertOrUpdateContactLeads} from "~/backend/dealer.server";
import {sendDataToFreshsales} from "~/backend/freshsales.server";
import {getNonEmptyStringFromUnknown, getObjectFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {FormType} from "~/typeDefinitions";

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
    const formType = safeParse(getNonEmptyStringFromUnknown, body.get("formType"));

    if (inputData == null || utmParameters == null || otpSubmitted == null || leadId == null) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: bb551a66-7e7b-4c70-a21d-975dbe3872ca",
            type: FormType.contactUsSubmission,
        };
        return json(actionData);
    }

    const otpVerificationResult = await verifyOtp(inputData.phoneNumber, otpSubmitted);
    if (!otpVerificationResult.success) {
        const actionData: GenericActionData = {
            error: "Please enter valid otp! Error code: bba11be7-9661-4d64-bc1c-a24f1f974c67",
            type: FormType.contactUsSubmission,
        };
        return json(actionData);
    }

       const utmParametersDecoded = JSON.parse(utmParameters);

    if (formType == FormType.offerContactUsSubmission){
        const insertResult = await insertOrUpdateContactLeads(leadId, {
            phoneNumber: inputData.phoneNumber,
            name: inputData.name,
            otpVerified: true,
            utmParameters: utmParametersDecoded,
        });
        if (insertResult instanceof Error) {
            const actionData: GenericActionData = {
                error: "Error in submitting form! Error code: d308273f-64dd-4a3c-9f9f-29e5d436a57b",
                type: FormType.contactUsSubmission,
            };
            return json(actionData);
        }

        const freshsalesResult = await sendDataToFreshsales({mobile_number: inputData.phoneNumber, first_name: inputData.name, otpVerified: true}, utmParametersDecoded);
        if (freshsalesResult instanceof Error) {
            const actionData: GenericActionData = {
                error: "Error in submitting form! Error code: 242068d4-24d8-4dc3-b205-8789f28454ed",
                type: FormType.contactUsSubmission,
            };
            return json(actionData);
        }
    }else{
        const insertResult = await insertOrUpdateContactLeads(leadId, {
            phoneNumber: inputData.phoneNumber,
            name: inputData.name,
            emailId: inputData.emailId,
            otpVerified: true,
            utmParameters: utmParametersDecoded,
        });
        if (insertResult instanceof Error) {
            const actionData: GenericActionData = {
                error: "Error in submitting form! Error code: d308273f-64dd-4a3c-9f9f-29e5d436a57b",
                type: FormType.contactUsSubmission,
            };
            return json(actionData);
        }

        const freshsalesResult = await sendDataToFreshsales({mobile_number: inputData.phoneNumber, first_name: inputData.name, email: inputData.emailId, otpVerified: true}, utmParametersDecoded);
        if (freshsalesResult instanceof Error) {
            const actionData: GenericActionData = {
                error: "Error in submitting form! Error code: 242068d4-24d8-4dc3-b205-8789f28454ed",
                type: FormType.contactUsSubmission,
            };
            return json(actionData);
        }
    }

    const actionData: GenericActionData = {
        error: null,
        type: FormType.contactUsSubmission,
    };

    return json(actionData);
};
