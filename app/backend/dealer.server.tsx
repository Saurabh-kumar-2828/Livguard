import {execute} from "~/backend/databaseManager.server";
import {generateUuid, getCurrentIsoTimestamp, getCurrentTimestamp} from "~/global-common-typescript/utilities/utilities";
import {Dealer} from "~/typeDefinitions";


export async function getDealerForCity(city: string){
    const result = await execute(
        `
            SELECT
                *
            FROM
                dealer
            WHERE
                city = $1
            ORDER BY
                dealer_name DESC
        `,
        [city],
    );

    return result.rows.map((row) => rowToDealerInformation(row));

}

function rowToDealerInformation(row: any): Dealer{
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
        stateCode: row.state_code
    }

    return dealer;
}


export async function insertDealerLeads(formResponse: {phoneNumber:string, name: string, city: string}){
    await execute(
        `
            INSERT INTO
                dealer_form_leads
                values($1,$2,$3)
        `,
        [generateUuid(), getCurrentIsoTimestamp(), formResponse],
    );
}

export async function insertContactLeads(formResponse: {phoneNumber: string; name: string; emailId: string}) {
    await execute(
        `
            INSERT INTO
                contact_us_leads
                values($1,$2,$3)
        `,
        [generateUuid(), getCurrentIsoTimestamp(), formResponse],
    );
}