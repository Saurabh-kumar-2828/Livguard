import {getPostgresDatabaseManager} from "~/common--database-manager--postgres/postgresDatabaseManager.server";
import {getRequiredEnvironmentVariable} from "~/common-remix--utilities/utilities.server";
import {Uuid} from "~/common--type-definitions/typeDefinitions";
import {getUuidFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {getCurrentIsoTimestamp} from "~/global-common-typescript/utilities/utilities";

export async function insertCouponCodeEntry(id: Uuid, couponCode: string): Promise<void | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariable("DATABASE_CREDENTIALS_ID")));
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
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariable("DATABASE_CREDENTIALS_ID")));
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
