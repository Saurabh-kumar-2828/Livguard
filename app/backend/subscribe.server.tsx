import {execute} from "~/global-common-typescript/server/postgresDatabaseManager.server";
import {NonEmptyString} from "~/global-common-typescript/typeDefinitions";
import {generateUuid, getCurrentIsoTimestamp} from "~/global-common-typescript/utilities/utilities";

export async function insertSubscriptionLeads(emailId: NonEmptyString, utmParameters: {[searchParameter: string]: string}): Promise<void | Error> {
    const result = await execute(
        `
            INSERT INTO livguard.subscription_leads(
                id,
                created_at,
                user_id,
                email_id,
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
        [generateUuid(), getCurrentIsoTimestamp(), null, emailId, utmParameters],
    );

    if (result instanceof Error) {
        return result;
    }
}
