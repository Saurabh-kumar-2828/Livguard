import {getPostgresDatabaseManager} from "~/global-common-typescript/server/postgresDatabaseManager.server";
import {getRequiredEnvironmentVariableNew} from "~/global-common-typescript/server/utilities.server";
import {Uuid} from "~/global-common-typescript/typeDefinitions";
import {getUuidFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {getCurrentIsoTimestamp} from "~/global-common-typescript/utilities/utilities";

export async function insertCouponCodeEntry(id: Uuid, couponCode: string): Promise<void | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariableNew("DATABASE_CREDENTIALS_ID")));
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

    const result = await postgresDatabaseManager.execute(
        `
            INSERT INTO
                livguard.find_the_thief_coupon_codes
            VALUES(
                $1,
                $2,
                $3
            )
        `,
        [id, couponCode, getCurrentIsoTimestamp()],
    );

    if (result instanceof Error) {
        return result;
    }
}

export async function insertContestLeads(leadId: Uuid, formResponse: any): Promise<void | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariableNew("DATABASE_CREDENTIALS_ID")));
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

    const result = await postgresDatabaseManager.execute(
        `
            INSERT INTO
                livguard.find_the_thief_leads
            VALUES(
                $1,
                $2,
                $3
            )
        `,
        [leadId, formResponse, getCurrentIsoTimestamp()],
    );

    if (result instanceof Error) {
        return result;
    }
}
