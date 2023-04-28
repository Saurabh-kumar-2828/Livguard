import {ActionFunction, json} from "@remix-run/node";
import {sendOtp} from "~/backend/authentication.server";
import {insertOrUpdateContactLeads, insertOrUpdateDealerLeads} from "~/backend/dealer.server";
import {sendDataToFreshsales} from "~/backend/freshsales.server";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {FormType} from "~/typeDefinitions";

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
    const formType = safeParse(getNonEmptyStringFromUnknown, body.get("formType"));
    let city: string | null = "";
    if(formType == FormType.applyForDealership){
        city = safeParse(getNonEmptyStringFromUnknown, body.get("city"));
    }

    if (phoneNumber == null || utmParameters == null || name == null || leadId == null || emailId == null || formType == null || city == null) {
        const actionData: GenericActionData = {
            error: "Inputs cann't be null! Error code: bb551a66-7e7b-4c70-a21d-975dbe3872ca",
            type: FormType.otpVerification
        };
        return json(actionData);
    }

    const utmParametersDecoded = JSON.parse(utmParameters);

    if(formType == FormType.contactUsSubmission){
        const insertResult = await insertOrUpdateContactLeads(leadId, {phoneNumber: phoneNumber, name: name, emailId: emailId, otpVerified: false, utmParameters: utmParametersDecoded});
        if (insertResult instanceof Error) {
            const actionData: GenericActionData = {
                error: "Error in submitting form! Error code: a73f9127-a627-4066-92cd-c7017056e0fe",
                type: FormType.otpVerification,
            };
            return json(actionData);
        }
    }else if(formType == FormType.applyForDealership){
        const insertResult = await insertOrUpdateDealerLeads(leadId, {phoneNumber: phoneNumber, name: name, emailId: emailId, city: city, otpVerified: true});
        if (insertResult instanceof Error) {
            const actionData: GenericActionData = {
                error: "Error in submitting form! Error code: 22313ddd-12ae-4bbb-83e3-48e8f7fcaea9",
                type: FormType.applyForDealership,
            };
            return json(actionData);
        }
    }

    const freshsalesResult = await sendDataToFreshsales({mobile_number: phoneNumber, first_name: name, email: emailId, city: city, otpVerified: false}, utmParametersDecoded);
    if (freshsalesResult instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting form! Error code: 242068d4-24d8-4dc3-b205-8789f28454ed",
            type: FormType.otpVerification,
        };
        return json(actionData);
    }

    const result = await sendOtp(phoneNumber, name);
    if (result instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error while sending otp! Error code:c7547ab4-41ba-472c-b60a-11a9c97c652c",
            type: FormType.otpVerification,
        };
        return json(actionData);
    }

    const actionData: GenericActionData = {
        error: null,
        type: FormType.otpVerification,
    };

    return json(actionData);
};
