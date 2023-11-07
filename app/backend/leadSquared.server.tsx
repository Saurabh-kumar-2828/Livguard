import {logBackendError} from "~/global-common-typescript/server/logging.server";
import {getErrorFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {getRequiredEnvironmentVariable} from "~/server/utilities.server";

export async function createLeadInLeadSquared(formResponse: Array<{Attribute: string; Value: string}>): Promise<void | Error> {
    const leadSquaredBaseURl = getRequiredEnvironmentVariable("LEAD_SQUARED_BASE_URL");
    const leadSquaredAccessKey = getRequiredEnvironmentVariable("LEAD_SQUARED_ACCESS_KEY");
    const leadSquaredSecretKey = getRequiredEnvironmentVariable("LEAD_SQUARED_SECRET_KEY");

    try {
        const response = await fetch(`${leadSquaredBaseURl}LeadManagement.svc/Lead.Capture?accessKey=${leadSquaredAccessKey}&secretKey=${leadSquaredSecretKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formResponse),
        });

        if (!response.ok) {
            throw new Error(`Lead Squared API call failed - status = ${response.status}, body = ${JSON.stringify(await response.text())}`);
        }
    } catch (error_: unknown) {
        const error = getErrorFromUnknown(error_);
        logBackendError(error);
        return error;
    }
}
