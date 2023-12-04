import {logBackendError} from "~/global-common-typescript/server/logging.server";
import {Uuid} from "~/common--type-definitions/typeDefinitions";
import {getErrorFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {getCurrentIsoTimestamp} from "~/global-common-typescript/utilities/utilities";

export async function sendDataToFreshsales(
    leadId: Uuid,
    formResponse: {mobile_number?: string; first_name?: string; email?: string; city?: string; otpVerified?: boolean; dealer?: string; pinCode?: string},
    utmParameters: {[searchParameter: string]: string},
    pageUrl: string,
): Promise<void | Error> {
    const contactData = {
        first_name: formResponse.first_name,
        mobile_number: formResponse.mobile_number,
        emails: formResponse.email,
        city: formResponse.city,
        lead_source_id: "401000150596",
        custom_field: {
            cf_utm_campaign: utmParameters["utm_campaign"] != null ? utmParameters["utm_campaign"] : "",
            cf_utm_medium: utmParameters["utm_medium"] != null ? utmParameters["utm_medium"] : "",
            cf_lead_source: utmParameters["utm_source"] != null ? utmParameters["utm_source"] : "organic",
            cf_gclid: utmParameters["gclid"] != null ? utmParameters["gclid"] : "",
            cf_fclid: utmParameters["fbclid"] != null ? utmParameters["fbclid"] : "",
            cf_otp_verified: formResponse.otpVerified,
            cf_page_url: pageUrl,
            cf_contact_id: `w: ${leadId}`,
        },
        created_at: getCurrentIsoTimestamp(),
        zipcode: formResponse.pinCode,
        sales_accounts: formResponse.dealer,
    };

    console.log("COntact data :::::", contactData);

    const uniqueIdentifierData = {
        mobile_number: formResponse.mobile_number,
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

        const responseData = await response.json();
        console.log("Response from Freshsales", responseData);

        if (!response.ok) {
            throw new Error(`Freshsales API call failed - status = ${response.status}, body = ${JSON.stringify(responseData)}`);
        }
    } catch (error_: unknown) {
        const error = getErrorFromUnknown(error_);
        logBackendError(error);
        return error;
    }
}

export async function sendDataToFreshsalesForOrmTracking(formResponse: {product: string; name: string; phoneNumber: string; emailId: string; queryDetails: string}): Promise<void | Error> {
    const contactData = {
        name: formResponse.name,
        mobile_number: formResponse.phoneNumber,
        emails: formResponse.emailId,
        lead_source_id: "401000150606",
        custom_field: {
            cf_query: formResponse.queryDetails,
            cf_lead_source: "social media",
            cf_product_type: formResponse.product,
        },
        created_at: getCurrentIsoTimestamp(),
    };

    const uniqueIdentifierData = {
        mobile_number: formResponse.phoneNumber,
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

export async function sendGoogleLeadDataToFreshsales(googleLeadData: {
    leadId: any;
    formId: any;
    campaignId: any;
    isTest: any;
    gclId: any;
    adgroupId: any;
    creativeId: any;
    fullName: string;
    phoneNumber: string;
    email: string;
    postalCode: string;
    city: string;
}): Promise<void | Error> {
    const uniqueIdentifierData = {
        mobile_number: googleLeadData.phoneNumber,
    };

    const contactData = {
        first_name: googleLeadData.fullName,
        mobile_number: googleLeadData.phoneNumber,
        email: googleLeadData.email,
        city: googleLeadData.city,
        zip_code: googleLeadData.postalCode,
        lead_source_id: "401000274587",
        custom_field: {
            cf_utm_campaign: googleLeadData.campaignId,
            cf_lead_source: "google lead form",
            cf_gclid: googleLeadData.gclId,
            cf_adgroup_id: googleLeadData.adgroupId,
            cf_creative_id: googleLeadData.creativeId,
            cf_lead_id: googleLeadData.leadId,
            cf_form_id: googleLeadData.formId,
            cf_is_test: googleLeadData.isTest,
        },
        created_at: getCurrentIsoTimestamp(),
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
