import type {ActionFunction} from "@remix-run/node";
import {sendGoogleLeadDataToFreshsales} from "~/backend/freshsales.server";
import {getRequiredEnvironmentVariable} from "~/common-remix--utilities/utilities.server";
import {getSingletonValue} from "~/global-common-typescript/utilities/utilities";
import {safeExecute} from "~/utilities";

type ResponseData = {
    message: string;
};

export const action: ActionFunction = async ({request, params}) => {
    const authorizationPasscode = getRequiredEnvironmentVariable("GOOGLE_WEBHOOK_AUTHORIZATION_CODE");
    const requestBody = await request.json();
    const authorization = requestBody.google_key;

    if (authorization == null || authorization != authorizationPasscode) {
        const actionData: ResponseData = {
            message: "Invalid Authorization",
        };
        return new Response(JSON.stringify(actionData), {status: 401});
    }

    const userData: Array<{column_name: string; string_value: string; column_id: string}> = requestBody.user_column_data;
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
        leadId: requestBody.lead_id,
        formId: requestBody.form_id,
        campaignId: requestBody.campaign_id,
        isTest: requestBody.is_test,
        gclId: requestBody.gcl_id,
        adgroupId: requestBody.adgroup_id,
        creativeId: requestBody.creative_id,
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        postalCode: postalCode,
        city: city,
    };

    const response = await sendGoogleLeadDataToFreshsales(googleSheetData);
    if (response instanceof Error) {
        const actionData: ResponseData = {
            message: response.message,
        };
        return new Response(JSON.stringify(actionData), {status: 500});
    }

    return new Response(JSON.stringify({}), {status: 200});
};
