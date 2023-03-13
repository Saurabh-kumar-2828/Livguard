import {getPostgresDatabaseManager, getSystemPostgresDatabaseCredentials} from "~/global-common-typescript/server/postgresDatabaseManager.server";
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

export async function insertDealerLeads(formResponse: {phoneNumber: string; name: string; emailId: string; city: string}): Promise<void | Error> {
    const postgresDatabaseManager = await getPostgresDatabaseManager(null, null);
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

    const result = await postgresDatabaseManager.execute(
        `
            INSERT INTO
                livguard.dealer_form_leads
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

export async function insertContactLeads(formResponse: {
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
                livguard.contact_us_leads
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
