import {getPostgresDatabaseManager} from "~/global-common-typescript/server/postgresDatabaseManager.server";
import {getRequiredEnvironmentVariableNew} from "~/global-common-typescript/server/utilities.server";
import {NonEmptyString, Uuid} from "~/global-common-typescript/typeDefinitions";
import {getUuidFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {generateUuid, getCurrentIsoTimestamp} from "~/global-common-typescript/utilities/utilities";

export async function insertSubscriptionLeads(formResponse: {emailId: NonEmptyString}, utmParameters: {[searchParameter: string]: string}): Promise<void | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariableNew("DATABASE_CREDENTIALS_ID")));
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
