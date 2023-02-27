import {execute} from "~/global-common-typescript/server/postgresDatabaseManager.server";
import {Uuid} from "~/global-common-typescript/typeDefinitions";
import {generateUuid, getCurrentIsoTimestamp, getSingletonValue} from "~/global-common-typescript/utilities/utilities";
import {LoadCalculatorInputs} from "~/routes/load-calculator";

export async function insertLoadCalculatorEntry(loadCalculatorInputs: string): Promise<Uuid | Error> {
    const id = generateUuid();

    const result = await execute(
        `
            INSERT INTO livguard.load_calculator_entries(
                id,
                created_at,
                user_id,
                data
            )
            VALUES(
                $1,
                $2,
                $3,
                $4
            )
        `,
        [id, getCurrentIsoTimestamp(), null, loadCalculatorInputs],
    );

    if (result instanceof Error) {
        return result;
    }

    return id;
}

export async function getLoadCalculatorEntry(id: Uuid): Promise<LoadCalculatorInputs | Error> {
    const result = await execute(
        `
            SELECT
                data
            FROM
                livguard.load_calculator_entries
            WHERE
                id = $1
        `,
        [id],
    );

    if (result instanceof Error) {
        return result;
    }

    return rowToLoadCalculatorInputs(getSingletonValue(result.rows));
}

function rowToLoadCalculatorInputs(row: unknown): LoadCalculatorInputs {
    return row.data;
}
