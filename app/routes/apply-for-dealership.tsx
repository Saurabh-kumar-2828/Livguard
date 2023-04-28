import {ActionFunction, json} from "@remix-run/node";
import {verifyOtp} from "~/backend/authentication.server";
import {insertOrUpdateDealerLeads} from "~/backend/dealer.server";
import {sendDataToFreshsales} from "~/backend/freshsales.server";
import {getNonEmptyStringFromUnknown, getObjectFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {GenericActionData} from "~/routes/contact-us-submission";
import {FormType} from "~/typeDefinitions";

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const inputData = safeParse(getObjectFromUnknown, body.get("inputData"));
    const otpSubmitted = safeParse(getNonEmptyStringFromUnknown, body.get("otpSubmitted"));
    const utmParameters = safeParse(getNonEmptyStringFromUnknown, body.get("utmParameters"));
    const leadId = safeParse(getNonEmptyStringFromUnknown, body.get("leadId"));

    if (inputData == null || utmParameters == null || leadId == null || otpSubmitted == null) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: 2a355407-ecbf-446d-9e00-96957d90592b",
            type: FormType.applyForDealership,
        };
        return json(actionData);
    }

    const utmParametersDecoded = JSON.parse(utmParameters);

    const otpVerificationResult = await verifyOtp(inputData.phoneNumber, otpSubmitted);
    if (!otpVerificationResult.success) {
        const actionData: GenericActionData = {
            error: "Please enter valid otp! Error code: c650df83-9ba9-47d0-92f3-8d0bd6691ef3",
            type: FormType.contactUsSubmission,
        };
        return json(actionData);
    }

    const insertResult = await insertOrUpdateDealerLeads(leadId, {phoneNumber: inputData.phoneNumber, name: inputData.name, emailId: inputData.emailId, city: inputData.city, otpVerified: true});
    if (insertResult instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: 22313ddd-12ae-4bbb-83e3-48e8f7fcaea9",
            type: FormType.applyForDealership,
        };
        return json(actionData);
    }

    const freshsalesResult = await sendDataToFreshsales({mobile_number: inputData.phoneNumber, first_name: inputData.name, email: inputData.emailId, city: inputData.city, otpVerified: true}, utmParametersDecoded);
    if (freshsalesResult instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: 221af103-e2ad-4fe1-86af-25ed6494da30",
            type: FormType.applyForDealership,
        };
        return json(actionData);
    }

    const actionData: GenericActionData = {
        error: null,
        type: FormType.applyForDealership,
    };

    return json(actionData);
};
