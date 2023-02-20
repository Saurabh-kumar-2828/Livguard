import {execute} from "~/backend/databaseManager.server";
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