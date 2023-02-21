import {execute} from "~/backend/databaseManager.server";
import {Uuid} from "~/global-common-typescript/typeDefinitions";
import {generateUuid, getCurrentIsoTimestamp} from "~/global-common-typescript/utilities/utilities";

export async function insertLoadCalculatorEntry(loadCalculatorInputs: string): Promise<Uuid | Error> {
    const id = generateUuid();

    const result = await execute(
        `
            INSERT INTO load_calculator_entries(
                id,
                created_at,
                user_id,
                data
            ) VALUES(
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
