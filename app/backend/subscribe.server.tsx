import {execute} from "~/global-common-typescript/server/postgresDatabaseManager.server";
import {NonEmptyString} from "~/global-common-typescript/typeDefinitions";
import {generateUuid, getCurrentIsoTimestamp} from "~/global-common-typescript/utilities/utilities";

export async function insertSubscriptionLeads(formResponse: {emailId: NonEmptyString}) {
    const result = await execute(
        `
            INSERT INTO livguard.subscription_leads(
                id,
                created_at,
                user_id,
                data
            )
            VALUES(
                $1,
                $2,
                $3
            )
        `,
        [generateUuid(), null, getCurrentIsoTimestamp(), formResponse],
    );

    if (result instanceof Error) {
        return result;
    }
}
