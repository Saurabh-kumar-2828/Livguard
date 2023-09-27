import type {ActionFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {verifyOtp} from "~/backend/authentication.server";
import {insertOrUpdateDealerLeads} from "~/backend/dealer.server";
import {sendDataToFreshsales} from "~/backend/freshsales.server";
import {getNonEmptyStringFromUnknown, getObjectFromUnknown, getUuidFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import type {GenericActionData} from "~/routes/lead-form-submission";

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const inputData = safeParse(getObjectFromUnknown, body.get("inputData"));
    const otpSubmitted = safeParse(getNonEmptyStringFromUnknown, body.get("otpSubmitted"));
    const utmParameters = safeParse(getNonEmptyStringFromUnknown, body.get("utmParameters"));
    const leadId = safeParse(getUuidFromUnknown, body.get("leadId"));
    const pageUrl = safeParse(getNonEmptyStringFromUnknown, body.get("pageUrl"));

    if (inputData == null || utmParameters == null || leadId == null || otpSubmitted == null || pageUrl == null) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: 2a355407-ecbf-446d-9e00-96957d90592b",
        };
        return json(actionData);
    }

    const utmParametersDecoded = JSON.parse(utmParameters);

    const insertResult1 = await insertOrUpdateDealerLeads(leadId, {
        phoneNumber: inputData.phoneNumber,
        name: inputData.name,
        emailId: inputData.emailId,
        city: inputData.city,
        otpVerified: false,
        utmParameters: utmParametersDecoded,
        pageUrl: pageUrl,
        termsAndConditionsChecked: inputData.TermsAndConditionsCheckboxClicked,
    });
    if (insertResult1 instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: 7d10b99b-84aa-4016-b568-02d703062ecf",
        };
        return json(actionData);
    }

    const otpVerificationResult = await verifyOtp(inputData.phoneNumber, otpSubmitted);
    if (!otpVerificationResult.success) {
        const actionData: GenericActionData = {
            error: "Please enter valid otp! Error code: c650df83-9ba9-47d0-92f3-8d0bd6691ef3",
        };
        return json(actionData);
    }

    const insertResult = await insertOrUpdateDealerLeads(leadId, {
        phoneNumber: inputData.phoneNumber,
        name: inputData.name,
        emailId: inputData.emailId,
        city: inputData.city,
        otpVerified: true,
        utmParameters: utmParametersDecoded,
        pageUrl: pageUrl,
        termsAndConditionsChecked: inputData.TermsAndConditionsCheckboxClicked,
    });
    if (insertResult instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: 22313ddd-12ae-4bbb-83e3-48e8f7fcaea9",
        };
        return json(actionData);
    }

    const freshsalesResult = await sendDataToFreshsales(
        leadId,
        {mobile_number: inputData.phoneNumber, first_name: inputData.name, email: inputData.emailId, city: inputData.city, otpVerified: true},
        utmParametersDecoded,
        pageUrl,
    );
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
