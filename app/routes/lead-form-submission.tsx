import type {ActionFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {verifyOtp} from "~/backend/authentication.server";
import {insertOrUpdateLeadFormDetails} from "~/backend/dealer.server";
import {sendDataToFreshsales} from "~/backend/freshsales.server";
import {getNonEmptyStringFromUnknown, getObjectFromUnknown, getUuidFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {FormType} from "~/typeDefinitions";

export type GenericActionData = {
    error: string | null;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const inputData = safeParse(getObjectFromUnknown, body.get("inputData"));
    const leadId = safeParse(getUuidFromUnknown, body.get("leadId"));
    const utmParameters = safeParse(getNonEmptyStringFromUnknown, body.get("utmParameters"));
    const formType = safeParse(getNonEmptyStringFromUnknown, body.get("formType"));
    const pageUrl = safeParse(getNonEmptyStringFromUnknown, body.get("pageUrl"));

    if (inputData == null || utmParameters == null || leadId == null || pageUrl == null || formType == null) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: 5873419b-b4e8-4980-9982-5af1740ca619",
        };
        return json(actionData);
    }

    const utmParametersDecoded = JSON.parse(utmParameters);

    if (formType == FormType.offerContactUsSubmission) {
        const insertResult = await insertOrUpdateLeadFormDetails(leadId, {
            phoneNumber: inputData.phoneNumber,
            name: inputData.name,
            otpVerified: false,
            utmParameters: utmParametersDecoded,
            pageUrl: pageUrl,
            termsAndConditionsChecked: inputData.TermsAndConditionsCheckboxClicked,
        });
        if (insertResult instanceof Error) {
            const actionData: GenericActionData = {
                error: "Error in submitting form! Error code: ba73958c-d7fe-4544-ae7e-3eb38e1b43ce",
            };
            return json(actionData);
        }
    } else {
        const insertResult = await insertOrUpdateLeadFormDetails(leadId, {
            phoneNumber: inputData.phoneNumber,
            name: inputData.name,
            emailId: inputData.email,
            city: inputData.city,
            dealer: inputData.dealer,
            otpVerified: false,
            utmParameters: utmParametersDecoded,
            pageUrl: pageUrl,
            termsAndConditionsChecked: inputData.TermsAndConditionsCheckboxClicked,
        });
        if (insertResult instanceof Error) {
            const actionData: GenericActionData = {
                error: "Error in submitting form! Error code: fdda3dc2-79c7-4c93-91a3-0b2cc966ff62",
            };
            return json(actionData);
        }
    }

    const otpVerificationResult = await verifyOtp(inputData.phoneNumber, inputData.otpSubmitted);
    if (!otpVerificationResult.success) {
        const actionData: GenericActionData = {
            error: "Please enter valid otp! Error code: bba11be7-9661-4d64-bc1c-a24f1f974c67",
        };
        return json(actionData);
    }

    if (formType == FormType.offerContactUsSubmission) {
        const insertResult = await insertOrUpdateLeadFormDetails(leadId, {
            phoneNumber: inputData.phoneNumber,
            name: inputData.name,
            otpVerified: true,
            utmParameters: utmParametersDecoded,
            pageUrl: pageUrl,
            termsAndConditionsChecked: inputData.TermsAndConditionsCheckboxClicked,
        });
        if (insertResult instanceof Error) {
            const actionData: GenericActionData = {
                error: "Error in submitting form! Error code: d308273f-64dd-4a3c-9f9f-29e5d436a57b",
            };
            return json(actionData);
        }

        const freshsalesResult = await sendDataToFreshsales(leadId, {mobile_number: inputData.phoneNumber, first_name: inputData.name, otpVerified: true}, utmParametersDecoded, pageUrl);
        if (freshsalesResult instanceof Error) {
            const actionData: GenericActionData = {
                error: "Error in submitting form! Error code: 242068d4-24d8-4dc3-b205-8789f28454ed",
            };
            return json(actionData);
        }
    } else {
        const insertResult = await insertOrUpdateLeadFormDetails(leadId, {
            phoneNumber: inputData.phoneNumber,
            name: inputData.name,
            emailId: inputData.email,
            city: inputData.city,
            dealer: inputData.dealer,
            otpVerified: true,
            utmParameters: utmParametersDecoded,
            pageUrl: pageUrl,
            termsAndConditionsChecked: inputData.TermsAndConditionsCheckboxClicked,
        });
        if (insertResult instanceof Error) {
            const actionData: GenericActionData = {
                error: "Error in submitting form! Error code: ec86ba5e-61f7-46ef-9fd8-02f5220e605a",
            };
            return json(actionData);
        }

        const freshsalesResult = await sendDataToFreshsales(
            leadId,
            {mobile_number: inputData.phoneNumber, first_name: inputData.name, email: inputData.emailId, city: inputData.city, dealer: inputData.dealer, otpVerified: true},
            utmParametersDecoded,
            pageUrl,
        );
        if (freshsalesResult instanceof Error) {
            const actionData: GenericActionData = {
                error: "Error in submitting form! Error code: 0177ace3-f07e-454a-a27f-f210d67702a9",
            };
            return json(actionData);
        }
    }

    const actionData: GenericActionData = {
        error: null,
    };

    return json(actionData);
};
