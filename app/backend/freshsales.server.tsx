import {logBackendError} from "~/global-common-typescript/server/logging.server";
import {getErrorFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {getCurrentIsoTimestamp} from "~/global-common-typescript/utilities/utilities";

export async function sendDataToFreshsales(
    formResponse: {mobile_number?: string; first_name?: string; email?: string; city?: string; otpVerified?: boolean},
    utmParameters: {[searchParameter: string]: string},
): Promise<void | Error> {
    const contactData = {
        first_name: formResponse.first_name,
        mobile_number: formResponse.mobile_number,
        email: formResponse.email,
        city: formResponse.city,
        lead_source_id: "401000150596",
        custom_field: {
            cf_utm_campaign: utmParameters["utm_campaign"] != null ? utmParameters["utm_campaign"] : "",
            cf_utm_medium: utmParameters["utm_medium"] != null ? utmParameters["utm_medium"] : "",
            cf_lead_source: utmParameters["utm_source"] != null ? utmParameters["utm_source"] : "",
            cf_gclid: utmParameters["gclid"] != null ? utmParameters["gclid"] : "",
            cf_fclid: utmParameters["fbclid"] != null ? utmParameters["fbclid"] : "",
            cf_otp_verified: formResponse.otpVerified
        },
        created_at: getCurrentIsoTimestamp(),
    };

    const uniqueIdentifierData = {
        "mobile_number": formResponse.mobile_number,
    };

    try {
        const response = await fetch(`${process.env.FRESH_SALES_API_END_POINT}/contacts/upsert`, {
            method: "POST",
            headers: {
                Authorization: `Token token=${process.env.FRESH_SALES_API_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({unique_identifier: uniqueIdentifierData, contact: contactData}),
        });

        if (!response.ok) {
            throw new Error(`Freshsales API call failed - status = ${response.status}, body = ${JSON.stringify(await response.text())}`);
        }
    } catch (error_: unknown) {
        const error = getErrorFromUnknown(error_);
        logBackendError(error);
        return error;
    }
}
