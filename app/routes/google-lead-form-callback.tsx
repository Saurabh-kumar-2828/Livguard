import type {ActionFunction} from "@remix-run/node";
import {getRequiredEnvironmentVariableNew} from "~/global-common-typescript/server/utilities.server";
import {getSingletonValue, safeExecute} from "~/global-common-typescript/utilities/utilities";

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

    if (authorization == null || authorization != authorizationPasscode) {
        const actionData: ResponseData = {
            message: "Invalid Authorization",
        };

        return new Response(JSON.stringify(actionData), {status: 401});
    }

    const userData: Array<{column_name: string; string_value: string; column_id: string}> = requestBody.user_column_data;

    const leadId = requestBody.lead_id;
    const formId = requestBody.form_id;
    const campaignId = requestBody.campaign_id;
    const isTest = requestBody.is_test;
    const gclId = requestBody.gcl_id;
    const adgroupId = requestBody.adgroup_id;
    const creativeId = requestBody.creative_id;

    const fullName =
        safeExecute(
            getSingletonValue,
            userData.filter((item) => item["column_id"] == "FULL_NAME"),
        )?.string_value ?? "";
    const phoneNumber =
        safeExecute(
            getSingletonValue,
            userData.filter((item) => item["column_id"] == "PHONE_NUMBER"),
        )?.string_value ?? "";
    const email =
        safeExecute(
            getSingletonValue,
            userData.filter((item) => item["column_id"] == "EMAIL"),
        )?.string_value ?? "";
    const postalCode =
        safeExecute(
            getSingletonValue,
            userData.filter((item) => item["column_id"] == "POSTAL_CODE"),
        )?.string_value ?? "";
    const city =
        safeExecute(
            getSingletonValue,
            userData.filter((item) => item["column_id"] == "CITY"),
        )?.string_value ?? "";

    const googleSheetData = {
        leadId: leadId,
        formId: formId,
        campaignId: campaignId,
        isTest: isTest,
        gclId: gclId,
        adgroupId: adgroupId,
        creativeId: creativeId,
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        postalCode: postalCode,
        city: city,
    };

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Google sheet data", googleSheetData);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    return new Response(JSON.stringify({}), {status: 200});
};
