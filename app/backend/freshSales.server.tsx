import {getCurrentIsoTimestamp} from "~/global-common-typescript/utilities/utilities";

export async function sendDataToFreshSales(formResponse: {mobile_number?: string; first_name?: string; email: string; city?: string}, utmParameters: {[searchParameter: string]: string}) {
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
        },
        created_at: getCurrentIsoTimestamp(),
    };

    try {
        const response = await fetch(`${process.env.FRESH_SALES_API_END_POINT}/contacts`, {
            method: "POST",
            headers: {
                Authorization: `Token token=${process.env.FRESH_SALES_API_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({contact: contactData}),
        });

        console.log(await response.json());
    } catch (e) {
        console.log("Fresh Sales API Exception");
        console.log(e);

        return null;
    }
}
