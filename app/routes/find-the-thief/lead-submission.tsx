import {ActionFunction, json} from "@remix-run/node";
import {verifyOtp} from "~/backend/authentication.server";
import {insertContestLeads} from "~/backend/find-the-thief.server";
import {safeParse, getStringFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {generateUuid} from "~/global-common-typescript/utilities/utilities";
import {getUrlFromRequest} from "~/utilities";

type ActionData = {
    error: string | null;
    isInvalidOtp?: boolean;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const name = safeParse(getStringFromUnknown, body.get("name"));
    const email = safeParse(getStringFromUnknown, body.get("email"));
    const phoneNumber = safeParse(getStringFromUnknown, body.get("phoneNumber"));
    const couponCode = safeParse(getStringFromUnknown, body.get("couponCode"));
    const otpSubmitted = safeParse(getStringFromUnknown, body.get("otpSubmitted"));
    const utmParameters = safeParse(getStringFromUnknown, body.get("utmParameters"));

    if (name == null || email == null || phoneNumber == null || couponCode == null || otpSubmitted == null || utmParameters == null) {
        const actionData: ActionData = {
            error: "Inputs cannot be null! Error code: de48144e-bfe9-4296-a580-bd88b3d545da",
        };
        return json(actionData);
    }

    const otpVerificationResult = await verifyOtp(phoneNumber, otpSubmitted);

    if (!otpVerificationResult.success) {
        const actionData: ActionData = {
            error: "Please enter valid otp! Error code: d435e6ac-5d65-4d7f-adf0-d717b87a4aeb",
            isInvalidOtp: true,
        };
        return json(actionData);
    }

    const utmParametersDecoded = JSON.parse(utmParameters);

    const leadId = generateUuid();

    const insertResult = await insertContestLeads(leadId, {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        couponCode: couponCode,
        utmParameters: utmParameters,
    });

    if (insertResult instanceof Error) {
        const actionData: ActionData = {
            error: "Error in submiting form! Error code: 94ef491f-3250-46ca-bbca-91af7dd8b89c",
        };
        return json(actionData);
    }

    const pageUrl = getUrlFromRequest(request);

    // const freshsalesResult = await sendDataToFreshsales(leadId, {mobile_number: phoneNumber, first_name: name, email: email, otpVerified: true}, utmParametersDecoded, pageUrl);
    // if (freshsalesResult instanceof Error) {
    //     const actionData: ActionData = {
    //         error: "Error in submitting form! Error code: 6c8973bf-3522-421f-ac72-c8c99c9d440b",
    //     };
    //     return json(actionData);
    // }

    const actionData: ActionData = {
        error: null,
    };

    return json(actionData);
};
