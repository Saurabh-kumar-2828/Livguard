import {getPostgresDatabaseManager} from "~/common--database-manager--postgres/postgresDatabaseManager.server";
import {getRequiredEnvironmentVariable} from "~/common-remix--utilities/utilities.server";
import {NonEmptyString, Uuid} from "~/common--type-definitions/typeDefinitions";
import {getUuidFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {generateUuid, getCurrentIsoTimestamp} from "~/global-common-typescript/utilities/utilities";

export async function insertSubscriptionLeads(formResponse: {emailId: NonEmptyString}, utmParameters: {[searchParameter: string]: string}): Promise<void | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariable("DATABASE_CREDENTIALS_ID")));
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

    const result = await postgresDatabaseManager.execute(
        `
            INSERT INTO livguard.subscription_leads(
                id,
                created_at,
                user_id,
                data,
                metadata
            )
            VALUES(
                $1,
                $2,
                $3,
                $4,
                $5
            )
        `,
        [generateUuid(), getCurrentIsoTimestamp(), null, formResponse, utmParameters],
    );

    if (result instanceof Error) {
        return result;
    }
}
