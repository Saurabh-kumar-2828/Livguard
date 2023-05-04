import {getPostgresDatabaseManager} from "~/global-common-typescript/server/postgresDatabaseManager.server";
import {Uuid} from "~/global-common-typescript/typeDefinitions";
import {generateUuid, getCurrentIsoTimestamp} from "~/global-common-typescript/utilities/utilities";
import {Dealer} from "~/typeDefinitions";

export async function getDealerForCity(city: string): Promise<Array<Dealer> | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(null, null);
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

    const result = await postgresDatabaseManager.execute(
        `
            SELECT
                *
            FROM
                livguard.dealer
            WHERE
                city ILIKE $1 OR
                pin_code ILIKE $1
            ORDER BY
                dealer_name DESC
        `,
        [`%${city}%`],
    );

    if (result instanceof Error) {
        return result;
    }

    return result.rows.map((row) => rowToDealerInformation(row));
}

function rowToDealerInformation(row: any): Dealer {
    const dealer: Dealer = {
        state: row.state,
        dealerCode: row.dealer_code,
        name: row.dealer_name,
        address: row.address,
        phoneNumber: row.phone_number,
        pinCode: row.pin_code,
        city: row.city,
        latitude: row.latitude,
        longitude: row.longitude,
        stateCode: row.state_code,
    };

    return dealer;
}

export async function insertOrUpdateDealerLeads(leadId: string, formResponse: {phoneNumber: string; name: string; emailId?: string; city: string; otpVerified: boolean}): Promise<void | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(null, null);
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

    const lead = await postgresDatabaseManager.execute(
        `SELECT
            *
        FROM
            livguard.dealer_form_leads
        WHERE
            id = $1
        `,
        [leadId],
    );

    if (lead instanceof Error) {
        return lead;
    }
    if (lead.rowCount == 0) {
        const result = await postgresDatabaseManager.execute(
            `
                INSERT INTO
                    livguard.dealer_form_leads
                VALUES(
                    $1,
                    $2,
                    $3,
                    $4
                )
            `,
            [leadId, getCurrentIsoTimestamp(), formResponse, getCurrentIsoTimestamp()],
        );

        if (result instanceof Error) {
            return result;
        }
    } else {
        const result = await postgresDatabaseManager.execute(
            `
                UPDATE
                    livguard.dealer_form_leads
                SET
                    form_response = $2,
                    updated_timestamp = $3
                WHERE
                    id = $1
            `,
            [leadId, formResponse, getCurrentIsoTimestamp()],
        );

        if (result instanceof Error) {
            return result;
        }
    }
}

export async function insertOrUpdateContactLeads(
    leadId: string,
    formResponse: {
        phoneNumber: string;
        name: string;
        emailId: string;
        otpVerified: boolean;
        utmParameters: {
            [searchParameter: string]: string;
        };
    },
): Promise<void | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(null, null);
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

    const lead = await postgresDatabaseManager.execute(
        `SELECT
            *
        FROM
            livguard.contact_us_leads
        WHERE
            id = $1
        `,
        [leadId],
    );

    if (lead instanceof Error) {
        return lead;
    }
    if (lead.rowCount == 0) {
        const result = await postgresDatabaseManager.execute(
            `
                INSERT INTO
                    livguard.contact_us_leads
                VALUES(
                    $1,
                    $2,
                    $3,
                    $4
                )
            `,
            [leadId, getCurrentIsoTimestamp(), formResponse, getCurrentIsoTimestamp()],
        );

        if (result instanceof Error) {
            return result;
        }
    } else {
        const result = await postgresDatabaseManager.execute(
            `
                UPDATE
                    livguard.contact_us_leads
                SET
                    form_response = $2,
                    updated_timestamp = $3
                WHERE
                    id = $1
            `,
            [leadId, formResponse, getCurrentIsoTimestamp()],
        );

        if (result instanceof Error) {
            return result;
        }
    }
}

export async function insertSubscriptionLeads(formResponse: {
    phoneNumber: string;
    name: string;
    emailId: string;
    utmParameters: {
        [searchParameter: string]: string;
    };
}): Promise<void | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(null, null);
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

    const result = await postgresDatabaseManager.execute(
        `
            INSERT INTO
                livguard.subscribe_leads
            VALUES(
                $1,
                $2,
                $3
            )
        `,
        [generateUuid(), getCurrentIsoTimestamp(), formResponse],
    );

    if (result instanceof Error) {
        return result;
    }
}

export async function insertQueryLeads(query: string): Promise<void | Error>{
    const postgresDatabaseManager = await getPostgresDatabaseManager(null, null);
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

    console.log("query : ", query);

    const result = await postgresDatabaseManager.execute(
        `
            INSERT INTO
                livguard.dealer_query_leads
            VALUES(
                $1,
                $2,
                $3,
                $4,
                $5
            )
        `,
        [generateUuid(), getCurrentIsoTimestamp(), query, 1, null],
    );

    if (result instanceof Error) {
        return result;
    }
}


export async function insertSearchQuery(searchTerm: string): Promise<void | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(null, null);
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

    const result = await postgresDatabaseManager.execute(
        `
            INSERT INTO
                livguard.search_query_leads
            VALUES(
                $1,
                $2,
                $3,
                $4,
                $5
            )
        `,
        [generateUuid(), getCurrentIsoTimestamp(), searchTerm, 1, null],
    );

    if (result instanceof Error) {
        return result;
    }
}