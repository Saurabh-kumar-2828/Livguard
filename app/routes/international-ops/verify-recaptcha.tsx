import {ActionFunction, json} from "@remix-run/node";
import {getDealersForPinCode, updateWarrantyRecordWithDob, verifyGoogleRecaptcha} from "~/backend/dealer.server";
import {getStringFromUnknown, getUuidFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {Dealer} from "~/typeDefinitions";

export type VerifyRecaptchaActionData = {
    error: string | null;
    submitedSuccessfully: boolean;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const recaptchaToken = safeParse(getStringFromUnknown, body.get("recaptchaToken"));

    if (recaptchaToken == null) {
        const actionData: VerifyRecaptchaActionData = {
            error: "Recaptcha token cannot be null! Error Code: c9512ad8-a0bf-4400-b6ae-763e832ee49f",
            submitedSuccessfully: false,
        };
        return actionData;
    }

    const verification = await verifyGoogleRecaptcha(recaptchaToken);

    if (verification instanceof Error) {
        const actionData: VerifyRecaptchaActionData = {
            error: "Error in verifying recaptcha! Error code: c1f291ac-7b87-4a71-b3d1-c7a4a7e3871b",
            submitedSuccessfully: false,
        };
        return actionData;
    }

    const actionData: VerifyRecaptchaActionData = {
        error: null,
        submitedSuccessfully: true,
    };

    return json(actionData);
};
