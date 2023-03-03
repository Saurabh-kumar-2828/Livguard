import {execute} from "~/global-common-typescript/server/postgresDatabaseManager.server";
import {Uuid} from "~/global-common-typescript/typeDefinitions";
import {generateUuid, getCurrentIsoTimestamp, getSingletonValue} from "~/global-common-typescript/utilities/utilities";
import {deviceTypeLibrary, LoadCalculatorInputs} from "~/routes/load-calculator/index.types";

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

export type LoadCalculatorOutputs = {
    totalWatts: number;
    averageWatts: number;
    ah: number;
    recommendedInverters: Array<{model: string; score: number}> | null;
    recommendedBatteries: Array<{model: string; score: number}> | null;
};

export async function getLoadCalculatorOutputs(loadCalculatorInputs: LoadCalculatorInputs): Promise<LoadCalculatorOutputs> {
    const totalWatts = loadCalculatorInputs.property.rooms
        .flatMap((room) => room.devices)
        .map((device) => deviceTypeLibrary[device.deviceType])
        .reduce((totalWatts_, device) => (totalWatts_ += device.wattage), 0);

    const efficiencyFactor = 0.7;
    const safetyFactor = 0.8;

    const voltage = 12;

    const averageWatts = (totalWatts * loadCalculatorInputs.averageConsumption) / 100;
    const ah = (averageWatts * loadCalculatorInputs.backupHours) / (voltage * efficiencyFactor * safetyFactor);

    const loadCalculatorOutputs: LoadCalculatorOutputs = {
        totalWatts: totalWatts,
        averageWatts: averageWatts,
        ah: ah,
        recommendedInverters: null,
        recommendedBatteries: null,
    };

    if (totalWatts <= 525 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
            {
                model: "LGS900i",
                score: 9,
            },
            {
                model: "LGS1000i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LGS1000i",
                score: 9,
            },
            {
                model: "LG950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
            {
                model: "LGS1100i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG950i",
                score: 10,
            },
            {
                model: "LGS1100i",
                score: 9,
            },
            {
                model: "LG1150i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1100i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LG1450i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1150i",
                score: 10,
            },
            {
                model: "LG1450i",
                score: 9,
            },
            {
                model: "LG1550i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LGS1600",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
            {
                model: "LGS1700",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1600",
                score: 10,
            },
            {
                model: "LGS1700",
                score: 9,
            },
            {
                model: "LG1950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
            {
                model: "IT 1048ST",
                score: 9,
            },
            {
                model: "IT 1160STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
            {
                model: "LGS900i",
                score: 9,
            },
            {
                model: "LGS1000i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LGS1000i",
                score: 9,
            },
            {
                model: "LG950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
            {
                model: "LGS1100i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG950i",
                score: 10,
            },
            {
                model: "LGS1100i",
                score: 9,
            },
            {
                model: "LG1150i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1100i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LG1450i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1150i",
                score: 10,
            },
            {
                model: "LG1450i",
                score: 9,
            },
            {
                model: "LG1550i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LGS1600",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
            {
                model: "LGS1700",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1600",
                score: 10,
            },
            {
                model: "LGS1700",
                score: 9,
            },
            {
                model: "LG1950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
            {
                model: "IT 1160STT",
                score: 9,
            },
            {
                model: "IT 1584TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
            {
                model: "LGS900i",
                score: 9,
            },
            {
                model: "LGS1000i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LGS1000i",
                score: 9,
            },
            {
                model: "LG950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
            {
                model: "LGS1100i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG950i",
                score: 10,
            },
            {
                model: "LGS1100i",
                score: 9,
            },
            {
                model: "LG1150i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1100i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LG1450i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1150i",
                score: 10,
            },
            {
                model: "LG1450i",
                score: 9,
            },
            {
                model: "LG1550i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LGS1600",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
            {
                model: "LGS1700",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1600",
                score: 10,
            },
            {
                model: "LGS1700",
                score: 9,
            },
            {
                model: "LG1950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160SST",
                score: 10,
            },
            {
                model: "IT 1584TT",
                score: 9,
            },
            {
                model: "IT 1554STJ",
                score: 8,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
            {
                model: "LGS900i",
                score: 9,
            },
            {
                model: "LGS1000i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LGS1000i",
                score: 9,
            },
            {
                model: "LG950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
            {
                model: "LGS1100i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG950i",
                score: 10,
            },
            {
                model: "LGS1100i",
                score: 9,
            },
            {
                model: "LG1150i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1100i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LG1450i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1150i",
                score: 10,
            },
            {
                model: "LG1450i",
                score: 9,
            },
            {
                model: "LG1550i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LGS1600",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
            {
                model: "LGS1700",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1600",
                score: 10,
            },
            {
                model: "LGS1700",
                score: 9,
            },
            {
                model: "LG1950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
            {
                model: "LGS900i",
                score: 9,
            },
            {
                model: "LGS1000i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LGS1000i",
                score: 9,
            },
            {
                model: "LG950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
            {
                model: "LGS1100i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG950i",
                score: 10,
            },
            {
                model: "LGS1100i",
                score: 9,
            },
            {
                model: "LG1150i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1100i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LG1450i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1150i",
                score: 10,
            },
            {
                model: "LG1450i",
                score: 9,
            },
            {
                model: "LG1550i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LGS1600",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
            {
                model: "LGS1700",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1600",
                score: 10,
            },
            {
                model: "LGS1700",
                score: 9,
            },
            {
                model: "LG1950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
            {
                model: "LGS900i",
                score: 9,
            },
            {
                model: "LGS1000i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LGS1000i",
                score: 9,
            },
            {
                model: "LG950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
            {
                model: "LGS1100i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG950i",
                score: 10,
            },
            {
                model: "LGS1100i",
                score: 9,
            },
            {
                model: "LG1150i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1100i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LG1450i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1150i",
                score: 10,
            },
            {
                model: "LG1450i",
                score: 9,
            },
            {
                model: "LG1550i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LGS1600",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
            {
                model: "LGS1700",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1600",
                score: 10,
            },
            {
                model: "LGS1700",
                score: 9,
            },
            {
                model: "LG1950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
            {
                model: "LGS900i",
                score: 9,
            },
            {
                model: "LGS1000i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LGS1000i",
                score: 9,
            },
            {
                model: "LG950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
            {
                model: "LGS1100i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG950i",
                score: 10,
            },
            {
                model: "LGS1100i",
                score: 9,
            },
            {
                model: "LG1150i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1100i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LG1450i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1150i",
                score: 10,
            },
            {
                model: "LG1450i",
                score: 9,
            },
            {
                model: "LG1550i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LGS1600",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
            {
                model: "LGS1700",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1600",
                score: 10,
            },
            {
                model: "LGS1700",
                score: 9,
            },
            {
                model: "LG1950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
            {
                model: "LGS900i",
                score: 9,
            },
            {
                model: "LGS1000i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LGS1000i",
                score: 9,
            },
            {
                model: "LG950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
            {
                model: "LGS1100i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG950i",
                score: 10,
            },
            {
                model: "LGS1100i",
                score: 9,
            },
            {
                model: "LG1150i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1100i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LG1450i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1150i",
                score: 10,
            },
            {
                model: "LG1450i",
                score: 9,
            },
            {
                model: "LG1550i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LGS1600",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
            {
                model: "LGS1700",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1600",
                score: 10,
            },
            {
                model: "LGS1700",
                score: 9,
            },
            {
                model: "LG1950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
            {
                model: "LGS900i",
                score: 9,
            },
            {
                model: "LGS1000i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LGS1000i",
                score: 9,
            },
            {
                model: "LG950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
            {
                model: "LGS1100i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG950i",
                score: 10,
            },
            {
                model: "LGS1100i",
                score: 9,
            },
            {
                model: "LG1150i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1100i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LG1450i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1150i",
                score: 10,
            },
            {
                model: "LG1450i",
                score: 9,
            },
            {
                model: "LG1550i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LGS1600",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
            {
                model: "LGS1700",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1600",
                score: 10,
            },
            {
                model: "LGS1700",
                score: 9,
            },
            {
                model: "LG1950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
            {
                model: "LGS900i",
                score: 9,
            },
            {
                model: "LGS1000i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LGS1000i",
                score: 9,
            },
            {
                model: "LG950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
            {
                model: "LGS1100i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG950i",
                score: 10,
            },
            {
                model: "LGS1100i",
                score: 9,
            },
            {
                model: "LG1150i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1100i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LG1450i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1150i",
                score: 10,
            },
            {
                model: "LG1450i",
                score: 9,
            },
            {
                model: "LG1550i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LGS1600",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
            {
                model: "LGS1700",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1600",
                score: 10,
            },
            {
                model: "LGS1700",
                score: 9,
            },
            {
                model: "LG1950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
            {
                model: "LGS900i",
                score: 9,
            },
            {
                model: "LGS1000i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LGS1000i",
                score: 9,
            },
            {
                model: "LG950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
            {
                model: "LGS1100i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG950i",
                score: 10,
            },
            {
                model: "LGS1100i",
                score: 9,
            },
            {
                model: "LG1150i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1100i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LG1450i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1150i",
                score: 10,
            },
            {
                model: "LG1450i",
                score: 9,
            },
            {
                model: "LG1550i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LGS1600",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
            {
                model: "LGS1700",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1600",
                score: 10,
            },
            {
                model: "LGS1700",
                score: 9,
            },
            {
                model: "LG1950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
            {
                model: "LGS900i",
                score: 9,
            },
            {
                model: "LGS1000i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LGS1000i",
                score: 9,
            },
            {
                model: "LG950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
            {
                model: "LGS1100i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG950i",
                score: 10,
            },
            {
                model: "LGS1100i",
                score: 9,
            },
            {
                model: "LG1150i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1100i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LG1450i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1150i",
                score: 10,
            },
            {
                model: "LG1450i",
                score: 9,
            },
            {
                model: "LG1550i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
            {
                model: "LG1550i",
                score: 9,
            },
            {
                model: "LGS1600",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
            {
                model: "LGS1700",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1600",
                score: 10,
            },
            {
                model: "LGS1700",
                score: 9,
            },
            {
                model: "LG1950i",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 300) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LG1950i",
                score: 9,
            },
            {
                model: "LG2300",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 300) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 300) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 300) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 300) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 300) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 300) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 300) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 300) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 10,
            },
            {
                model: "IT 1560TT",
                score: 9,
            },
            {
                model: "IT 1560STT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 320) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LG1950i",
                score: 9,
            },
            {
                model: "LG2300",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 320) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 320) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 320) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 320) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 320) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 320) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 320) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 320) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 16645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 360) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LG1950i",
                score: 9,
            },
            {
                model: "LG2300",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 360) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 360) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 360) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 360) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 360) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 360) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 360) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 360) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 18605TT",
                score: 9,
            },
            {
                model: "IT 1666TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LG1950i",
                score: 9,
            },
            {
                model: "LG2300",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LG1950i",
                score: 9,
            },
            {
                model: "LG2300",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 440) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LG1950i",
                score: 9,
            },
            {
                model: "LG2300",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 440) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 440) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 440) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 440) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 440) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 440) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LG1950i",
                score: 9,
            },
            {
                model: "LG2300",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 520) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LG1950i",
                score: 9,
            },
            {
                model: "LG2300",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 520) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 520) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 520) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 520) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 520) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 520) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 520) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 520) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 550) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LG1950i",
                score: 9,
            },
            {
                model: "LG2300",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 550) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
            {
                model: "LGS2500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 1600 && ah <= 550) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG2300",
                score: 10,
            },
            {
                model: "LGS2500",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 550) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LGS3000",
                score: 9,
            },
            {
                model: "LG3500",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 550) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 550) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 550) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 550) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 550) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 600) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 600) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 600) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 600) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 660) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 660) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 660) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 660) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 690) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 690) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 690) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 690) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 780) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 780) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 780) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 780) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 870) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS4000",
                score: 9,
            },
            {
                model: "LGS5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 870) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 870) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 870) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LGS4000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 880) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 880) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 880) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
            {
                model: "IT 2066TT",
                score: 9,
            },
            {
                model: "IT 2060TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 920) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 920) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 920) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
            {
                model: "IT 2266TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 1040) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 1040) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 1040) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
            {
                model: "IT 2360TT",
                score: 9,
            },
            {
                model: "IT 2266TT",
                score: 8,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 1080) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG3500",
                score: 10,
            },
            {
                model: "LGS5000",
                score: 9,
            },
            {
                model: "LG5000",
                score: 8,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 1080) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
            {
                model: "LG5000",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (totalWatts <= 4000 && ah <= 1080) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG5000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    }

    return loadCalculatorOutputs;
}
