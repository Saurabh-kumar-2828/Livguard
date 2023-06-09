import {getPostgresDatabaseManager} from "~/global-common-typescript/server/postgresDatabaseManager.server";
import {getRequiredEnvironmentVariableNew} from "~/global-common-typescript/server/utilities.server";
import {getUuidFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {generateUuid, getCurrentIsoTimestamp} from "~/global-common-typescript/utilities/utilities";
import type {ContactUsLead, Dealer, TermFrequency} from "~/typeDefinitions";

export async function getDealerForCity(query: string): Promise<Array<Dealer> | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariableNew("DATABASE_CREDENTIALS_ID")));
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
                pin_code ILIKE $1 OR
                state ILIKE $1
            ORDER BY
                dealer_name DESC
        `,
        [`%${query}%`],
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

export async function insertOrUpdateDealerLeads(
    leadId: string,
    formResponse: {
        phoneNumber: string;
        name: string;
        emailId?: string;
        city: string;
        otpVerified: boolean;
        utmParameters: {
            [searchParameter: string]: string;
        };
        pageUrl: string;
        termsAndConditionsChecked: boolean;
    },
): Promise<void | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariableNew("DATABASE_CREDENTIALS_ID")));
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
    // TODO: Replace with a proper upsert query
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
        emailId?: string;
        otpVerified: boolean;
        utmParameters: {
            [searchParameter: string]: string;
        };
        pageUrl: string;
        termsAndConditionsChecked: boolean;
    },
): Promise<void | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariableNew("DATABASE_CREDENTIALS_ID")));
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
    // TODO: Replace with a proper upsert query
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

export async function getContactUsLeads(startDate: string, endDate: string, limit: number, offset: number): Promise<Array<ContactUsLead> | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariableNew("DATABASE_CREDENTIALS_ID")));
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

    const result = await postgresDatabaseManager.execute(
        `
            SELECT
                *
            FROM
                livguard.contact_us_leads
            WHERE
                timestamp >= $1 AND
                timestamp <= $2
            ORDER BY
                timestamp ASC
            LIMIT
                $3
            OFFSET
                $4
        `,
        [startDate, endDate, limit, offset],
    );

    if (result instanceof Error) {
        return result;
    }

    return result.rows.map((row) => rowToContactUsLead(row));
}

export async function getContactUsLeadsCount(startDate: string, endDate: string): Promise<number | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariableNew("DATABASE_CREDENTIALS_ID")));
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

    const result = await postgresDatabaseManager.execute(
        `
            SELECT
                COUNT(*) AS count
            FROM
                livguard.contact_us_leads
            WHERE
                timestamp >= $1 AND
                timestamp <= $2
        `,
        [startDate, endDate],
    );

    if (result instanceof Error) {
        return result;
    }

    // TODO: Type validation

    return result.rows.map((row) => row.count);
}

function rowToContactUsLead(row: unknown): ContactUsLead {
    const contactUsLead: ContactUsLead = {
        id: row.id,
        createdAt: row.timestamp,
        updatedAt: row.updated_timestamp,
        formResponse: row.form_response,
    };

    return contactUsLead;
}

export async function getSearchTermFrequencies(startDate: string, endDate: string, limit: number, offset: number): Promise<Array<TermFrequency> | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariableNew("DATABASE_CREDENTIALS_ID")));
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

    const result = await postgresDatabaseManager.execute(
        `
            SELECT
                LOWER(search_term) AS term,
                SUM(frequency) AS frequency
            FROM
                livguard.search_query_leads
            WHERE
                timestamp >= $1 AND
                timestamp <= $2
            GROUP BY
                LOWER(search_term)
            ORDER BY
                2 DESC
            LIMIT
                $3
            OFFSET
                $4
        `,
        [startDate, endDate, limit, offset],
    );

    if (result instanceof Error) {
        return result;
    }

    return result.rows.map((row) => rowToTermFrequency(row));
}

export async function getSearchTermFrequenciesCount(startDate: string, endDate: string): Promise<number | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariableNew("DATABASE_CREDENTIALS_ID")));
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

    const result = await postgresDatabaseManager.execute(
        `
            SELECT
                COUNT(DISTINCT search_term) AS count
            FROM
                livguard.search_query_leads
            WHERE
                timestamp >= $1 AND
                timestamp <= $2
        `,
        [startDate, endDate],
    );

    if (result instanceof Error) {
        return result;
    }

    // TODO: Type validation

    return result.rows.map((row) => row.count);
}

function rowToTermFrequency(row: unknown): TermFrequency {
    const termFrequency: TermFrequency = {
        term: row.term,
        frequency: row.frequency,
    };

    return termFrequency;
}

export async function insertSubscriptionLeads(formResponse: {
    phoneNumber: string;
    name: string;
    emailId: string;
    utmParameters: {
        [searchParameter: string]: string;
    };
}): Promise<void | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariableNew("DATABASE_CREDENTIALS_ID")));
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

export async function insertQueryLeads(query: string): Promise<void | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariableNew("DATABASE_CREDENTIALS_ID")));
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

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
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariableNew("DATABASE_CREDENTIALS_ID")));
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
