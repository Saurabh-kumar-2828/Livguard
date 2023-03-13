import {getPostgresDatabaseManager} from "~/global-common-typescript/server/postgresDatabaseManager.server";
import {NonEmptyString} from "~/global-common-typescript/typeDefinitions";
import {generateUuid, getCurrentIsoTimestamp} from "~/global-common-typescript/utilities/utilities";

export async function insertSubscriptionLeads(formResponse: {emailId: NonEmptyString}, utmParameters: {[searchParameter: string]: string}): Promise<void | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(null, null);
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
