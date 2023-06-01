import type {ActionFunction} from "@remix-run/node";
import {getRequiredEnvironmentVariableNew} from "~/global-common-typescript/server/utilities.server";

type ResponseData = {
    message: string;
};

export const action: ActionFunction = async ({request, params}) => {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Action Function Called");
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    const authorizationPasscode = getRequiredEnvironmentVariableNew("GOOGLE_WEBHOOK_AUTHORIZATION_CODE");

    // const body = safeParse(getObjectFromUnknown, await request.text());
    const requestBody = await request.json();

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Request body", requestBody);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    const authorization = requestBody.google_key;

    if (authorization == null || authorization != `Basic ${authorizationPasscode}`) {
        const actionData: ResponseData = {
            message: "Invalid Authorization",
        };

        return new Response(JSON.stringify(actionData), {status: 401});
    }

    const leadId = requestBody.lead_id;
    const userData = requestBody.user_column_data;
    const formId = requestBody.form_id;
    const campaignId = requestBody.campaign_id;
    const isTest = requestBody.is_test;
    const gclId = requestBody.gcl_id;
    const adgroupId = requestBody.adgroup_id;
    const creativeId = requestBody.creative_id;

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
