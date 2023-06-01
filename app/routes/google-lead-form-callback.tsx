import type {LoaderFunction} from "@remix-run/node";
import {getRequiredEnvironmentVariableNew} from "~/global-common-typescript/server/utilities.server";
import type {Uuid} from "~/global-common-typescript/typeDefinitions";
import {getObjectFromUnknown, getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {generateUuid} from "~/global-common-typescript/utilities/utilities";

type ActionData = {
    error: boolean;
    errorCode: Uuid | null;
    message: string;
};

export const loader: LoaderFunction = async ({request, params}) => {
    const authorizationPasscode = getRequiredEnvironmentVariableNew("GOOGLE_WEBHOOK_AUTHORIZATION_CODE");

    const body = await request.formData();

    const authorization = safeParse(getStringFromUnknown, body.get("google_key"));

    if (authorization == null || authorization != `Basic ${authorizationPasscode}`) {
        const actionData: ActionData = {
            error: true,
            errorCode: generateUuid(),
            message: "Invalid Authorization",
        };

        return new Response(JSON.stringify(actionData), {status: 401});
    }

    const leadId = safeParse(getStringFromUnknown, body.get("lead_id"));
    const userData = safeParse(getObjectFromUnknown, body.get("user_column_data"));
    const formId = safeParse(getStringFromUnknown, body.get("form_id"));
    const campaignId = safeParse(getStringFromUnknown, body.get("campaign_id"));
    const isTest = safeParse(getObjectFromUnknown, body.get("is_test"));
    const gclId = safeParse(getObjectFromUnknown, body.get("is_test"));
    const adgroupId = safeParse(getObjectFromUnknown, body.get("is_test"));
    const creativeId = safeParse(getObjectFromUnknown, body.get("is_test"));

    const googleSheetData = {
        leadId: leadId,
        userData: userData,
        formId: formId,
        campaignId: campaignId,
        isTest: isTest,
        gclId: gclId,
        adgroupId: adgroupId,
        creativeId: creativeId,
    };

    console.log("Google sheet data", googleSheetData);

    const actionData = {
        error: false,
        errorCode: null,
        message: "Leads successfully passed",
    };

    return new Response(JSON.stringify(actionData), {status: 200});
};
