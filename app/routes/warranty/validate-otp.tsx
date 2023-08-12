import {ActionFunction, json} from "@remix-run/node";
import {verifyOtp} from "~/backend/authentication.server";
import {getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";

type ActionData = {
    error: string | null;
    isInvalidOtp: boolean | null;
};

export const action: ActionFunction = async ({request}) => {
    const body = await request.formData();

    const phoneNumber = safeParse(getStringFromUnknown, body.get("phoneNumber"));
    const otpSubmitted = safeParse(getStringFromUnknown, body.get("otpSubmitted"));

    if (phoneNumber == null || otpSubmitted == null) {
        const actionData: ActionData = {
            error: "Phone Number and OTP cannot be empty. Error code: 378990d9-5700-4bbc-aaf9-ce061ddf05f7",
            isInvalidOtp: null,
        };
        return json(actionData);
    }

    const otpVerificationResult = await verifyOtp(phoneNumber, otpSubmitted);

    if (!otpVerificationResult.success) {
        const actionData: ActionData = {
            error: "Please enter valid otp! Error code: de045453-d716-43c5-8b7d-d638b4fa6c57",
            isInvalidOtp: true,
        };
        return json(actionData);
    }

    const actionData: ActionData = {
        error: null,
        isInvalidOtp: null,
    };

    return json(actionData);
};
