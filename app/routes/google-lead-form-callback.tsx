import type {ActionFunction, LoaderFunction} from "@remix-run/node";
import {getRequiredEnvironmentVariableNew} from "~/global-common-typescript/server/utilities.server";
import type {Uuid} from "~/global-common-typescript/typeDefinitions";
import {getObjectFromUnknown, getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {generateUuid} from "~/global-common-typescript/utilities/utilities";

type ResponseData = {
    message: string;
};

export const loader: LoaderFunction = async ({request, params}) => {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Loader Function Called");
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    const authorizationPasscode = getRequiredEnvironmentVariableNew("GOOGLE_WEBHOOK_AUTHORIZATION_CODE");

    // const body = safeParse(getObjectFromUnknown, await request.text());
    const body = await request.text();

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Request text", body);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    const jsonBody = JSON.parse(body);

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Request text", jsonBody);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    const authorization = safeParse(getStringFromUnknown, jsonBody.get("google_key"));

    if (authorization == null || authorization != `Basic ${authorizationPasscode}`) {
        const actionData: ResponseData = {
            message: "Invalid Authorization",
        };

        return new Response(JSON.stringify(actionData), {status: 401});
    }

    const leadId = safeParse(getStringFromUnknown, jsonBody.get("lead_id"));
    const userData = safeParse(getObjectFromUnknown, jsonBody.get("user_column_data"));
    const formId = safeParse(getStringFromUnknown, jsonBody.get("form_id"));
    const campaignId = safeParse(getStringFromUnknown, jsonBody.get("campaign_id"));
    const isTest = safeParse(getObjectFromUnknown, jsonBody.get("is_test"));
    const gclId = safeParse(getObjectFromUnknown, jsonBody.get("is_test"));
    const adgroupId = safeParse(getObjectFromUnknown, jsonBody.get("is_test"));
    const creativeId = safeParse(getObjectFromUnknown, jsonBody.get("is_test"));

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

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Google sheet data", googleSheetData);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    return new Response(JSON.stringify({}), {status: 200});
};

export const action: ActionFunction = async ({request, params}) => {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Action Function Called");
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    const authorizationPasscode = getRequiredEnvironmentVariableNew("GOOGLE_WEBHOOK_AUTHORIZATION_CODE");

    // const body = safeParse(getObjectFromUnknown, await request.text());
    const body = await request.text();

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Request text", body);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    const jsonBody = JSON.parse(body);

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Request text", jsonBody);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    const authorization = safeParse(getStringFromUnknown, jsonBody.get("google_key"));

    if (authorization == null || authorization != `Basic ${authorizationPasscode}`) {
        const actionData: ResponseData = {
            message: "Invalid Authorization",
        };

        return new Response(JSON.stringify(actionData), {status: 401});
    }

    const leadId = safeParse(getStringFromUnknown, jsonBody.get("lead_id"));
    const userData = safeParse(getObjectFromUnknown, jsonBody.get("user_column_data"));
    const formId = safeParse(getStringFromUnknown, jsonBody.get("form_id"));
    const campaignId = safeParse(getStringFromUnknown, jsonBody.get("campaign_id"));
    const isTest = safeParse(getObjectFromUnknown, jsonBody.get("is_test"));
    const gclId = safeParse(getObjectFromUnknown, jsonBody.get("is_test"));
    const adgroupId = safeParse(getObjectFromUnknown, jsonBody.get("is_test"));
    const creativeId = safeParse(getObjectFromUnknown, jsonBody.get("is_test"));

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

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Google sheet data", googleSheetData);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    return new Response(JSON.stringify({}), {status: 200});
};
