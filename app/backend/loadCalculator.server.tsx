import {getPostgresDatabaseManager} from "~/common--database-manager--postgres/postgresDatabaseManager.server";
import {getRequiredEnvironmentVariable} from "~/common-remix--utilities/utilities.server";
import type {Integer, Uuid} from "~/common--type-definitions/typeDefinitions";
import {getProductFromSlugAndLanguage} from "~/backend/product.server";
import {getUuidFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {generateUuid, getCurrentIsoTimestamp, getSingletonValue} from "~/global-common-typescript/utilities/utilities";
import type {LoadCalculatorInputs} from "~/routes/load-calculator/index.types";
import {deviceTypeLibrary} from "~/routes/load-calculator/index.types";
import type {UserPreferences} from "~/typeDefinitions";

export async function insertLoadCalculatorEntry(loadCalculatorInputs: string): Promise<Uuid | Error> {
    const id = generateUuid();

    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariable("DATABASE_CREDENTIALS_ID")));
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

    const result = await postgresDatabaseManager.execute(
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
    const postgresDatabaseManager = await getPostgresDatabaseManager(getUuidFromUnknown(getRequiredEnvironmentVariable("DATABASE_CREDENTIALS_ID")));
    if (postgresDatabaseManager instanceof Error) {
        return postgresDatabaseManager;
    }

    const result = await postgresDatabaseManager.execute(
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
    recommendedInverters: Array<{model: string; score: number; humanFriendlyString: string; nBatteries: Integer; capacity: string; warranty: string}> | null;
    recommendedBatteries: Array<{model: string; score: number; humanFriendlyString: string; nBatteries: Integer; capacity: string; warranty: string}> | null;
};

export async function getLoadCalculatorOutputs(loadCalculatorInputs: LoadCalculatorInputs, userPreferences: UserPreferences): Promise<LoadCalculatorOutputs> {
    const totalWatts = loadCalculatorInputs.property.rooms
        .flatMap((room) => room.devices)
        .map((device) => deviceTypeLibrary[device.deviceType])
        .reduce((totalWatts_, device) => (totalWatts_ += device.wattage), 0);

    const efficiencyFactor = 0.7;
    const safetyFactor = 0.8;

    const voltage = 12;

    const averageWatts = (totalWatts * loadCalculatorInputs.averageConsumption) / 100;
    const ah = Math.round((averageWatts * loadCalculatorInputs.backupHours) / (voltage * efficiencyFactor * safetyFactor));

    const loadCalculatorOutputs: LoadCalculatorOutputs = {
        totalWatts: totalWatts,
        averageWatts: Math.round(averageWatts),
        ah: ah,
        recommendedInverters: null,
        recommendedBatteries: null,
    };

    // TODO: Get Ujjawal to complete this table
    // [
    //     {
    //         wattsGte: 0,
    //         wattsLt: 525,
    //         ahGte: 0,
    //         ahLt: 90,
    //         inverters: ["lg700e", "lgs900i", "lgs1000i"],
    //         batteries: ["it9048st", "it1048st", "it1172stt"],
    //         nBatteries: ah <= 290 ? 1 : ah <= 550 : 2 : ah <= 870 ? 3 : ah <= 1080 ? 4 : null,
    //     },
    // ],

    if (totalWatts <= 525 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg700e",
                score: 10,
                humanFriendlyString: "LG700E",
                nBatteries: 1,
                capacity: 600,
                warranty: 72,
            },
            {
                model: "lgs900i",
                score: 9,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 8,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it9048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 90,
                warranty: 48,
            },
            {
                model: "it1048st",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 8,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs900i",
                score: 10,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 9,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 8,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it9048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 90,
                warranty: 48,
            },
            {
                model: "it1048st",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 8,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1000i",
                score: 10,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 9,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 8,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it9048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 90,
                warranty: 48,
            },
            {
                model: "it1048st",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 8,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg900",
                score: 10,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 9,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1100",
                score: 8,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it9048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 90,
                warranty: 48,
            },
            {
                model: "it1048st",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 8,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1100i",
                score: 10,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 8,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it9048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 90,
                warranty: 48,
            },
            {
                model: "it1048st",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 8,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1100",
                score: 10,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 9,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 8,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it9048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 90,
                warranty: 48,
            },
            {
                model: "it1048st",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 8,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1450i",
                score: 10,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 8,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it9048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 90,
                warranty: 48,
            },
            {
                model: "it1048st",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 8,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1550i",
                score: 10,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 9,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 8,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it9048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 90,
                warranty: 48,
            },
            {
                model: "it1048st",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 8,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1600",
                score: 10,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 9,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 8,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it9048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 90,
                warranty: 48,
            },
            {
                model: "it1048st",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 8,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LG3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it9048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 90,
                warranty: 48,
            },
            {
                model: "it1048st",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 8,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it9048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 90,
                warranty: 48,
            },
            {
                model: "it1048st",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 8,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it9048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 90,
                warranty: 48,
            },
            {
                model: "it1048st",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 8,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it9048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 90,
                warranty: 48,
            },
            {
                model: "it1048st",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 8,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it9048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 90,
                warranty: 48,
            },
            {
                model: "it1048st",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 8,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it9048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 90,
                warranty: 48,
            },
            {
                model: "it1048st",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 8,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg700e",
                score: 10,
                humanFriendlyString: "LG700E",
                nBatteries: 1,
                capacity: 600,
                warranty: 72,
            },
            {
                model: "lgs900i",
                score: 9,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 8,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs900i",
                score: 10,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 9,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 8,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1000i",
                score: 10,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 9,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 8,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg900",
                score: 10,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 9,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1100",
                score: 8,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1100i",
                score: 10,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 8,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1100",
                score: 10,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 9,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 8,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1450i",
                score: 10,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 8,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1550i",
                score: 10,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 9,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 8,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1600",
                score: 10,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 9,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 8,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1048st",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tubular",
                nBatteries: 1,
                capacity: 100,
                warranty: 48,
            },
            {
                model: "it1172stt",
                score: 9,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg700e",
                score: 10,
                humanFriendlyString: "LG700E",
                nBatteries: 1,
                capacity: 600,
                warranty: 72,
            },
            {
                model: "lgs900i",
                score: 9,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 8,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1172stt",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs900i",
                score: 10,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 9,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 8,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1172stt",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1000i",
                score: 10,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 9,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 8,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1172stt",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg900",
                score: 10,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 9,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1100",
                score: 8,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1172stt",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1100i",
                score: 10,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 8,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1172stt",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1100",
                score: 10,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 9,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 8,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1172stt",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1450i",
                score: 10,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 8,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1172stt",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1550i",
                score: 10,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 9,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 8,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1172stt",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1600",
                score: 10,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 9,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 8,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1172stt",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1172stt",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1172stt",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1172stt",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1172stt",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1172stt",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1172stt",
                score: 10,
                humanFriendlyString: "INVERTUFF Short Tall Tubular",
                nBatteries: 1,
                capacity: 110,
                warranty: 72,
            },
            {
                model: "it1584tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg700e",
                score: 10,
                humanFriendlyString: "LG700E",
                nBatteries: 1,
                capacity: 600,
                warranty: 72,
            },
            {
                model: "lgs900i",
                score: 9,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 8,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs900i",
                score: 10,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 9,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 8,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1000i",
                score: 10,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 9,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 8,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg900",
                score: 10,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 9,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1100",
                score: 8,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1100i",
                score: 10,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 8,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1100",
                score: 10,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 9,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 8,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1450i",
                score: 10,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 8,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1550i",
                score: 10,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 9,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 8,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1600",
                score: 10,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 9,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 8,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg700e",
                score: 10,
                humanFriendlyString: "LG700E",
                nBatteries: 1,
                capacity: 600,
                warranty: 72,
            },
            {
                model: "lgs900i",
                score: 9,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 8,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs900i",
                score: 10,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 9,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 8,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1000i",
                score: 10,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 9,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 8,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg900",
                score: 10,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 9,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1100",
                score: 8,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1100i",
                score: 10,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 8,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1100",
                score: 10,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 9,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 8,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1450i",
                score: 10,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 8,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1550i",
                score: 10,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 9,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 8,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1600",
                score: 10,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 9,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 8,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg700e",
                score: 10,
                humanFriendlyString: "LG700E",
                nBatteries: 1,
                capacity: 600,
                warranty: 72,
            },
            {
                model: "lgs900i",
                score: 9,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 8,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs900i",
                score: 10,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 9,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 8,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1000i",
                score: 10,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 9,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 8,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg900",
                score: 10,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 9,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1100",
                score: 8,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1100i",
                score: 10,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 8,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1100",
                score: 10,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 9,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 8,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1450i",
                score: 10,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 8,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1550i",
                score: 10,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 9,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 8,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1600",
                score: 10,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 9,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 8,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg700e",
                score: 10,
                humanFriendlyString: "LG700E",
                nBatteries: 1,
                capacity: 600,
                warranty: 72,
            },
            {
                model: "lgs900i",
                score: 9,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 8,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs900i",
                score: 10,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 9,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 8,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1000i",
                score: 10,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 9,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 8,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg900",
                score: 10,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 9,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1100",
                score: 8,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1100i",
                score: 10,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 8,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1100",
                score: 10,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 9,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 8,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1450i",
                score: 10,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 8,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1550i",
                score: 10,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 9,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 8,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1600",
                score: 10,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 9,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 8,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg700e",
                score: 10,
                humanFriendlyString: "LG700E",
                nBatteries: 1,
                capacity: 600,
                warranty: 72,
            },
            {
                model: "lgs900i",
                score: 9,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 8,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs900i",
                score: 10,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 9,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 8,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1000i",
                score: 10,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 9,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 8,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg900",
                score: 10,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 9,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1100",
                score: 8,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1100i",
                score: 10,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 8,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1100",
                score: 10,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 9,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 8,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1450i",
                score: 10,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 8,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1550i",
                score: 10,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 9,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 8,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1600",
                score: 10,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 9,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 8,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg700e",
                score: 10,
                humanFriendlyString: "LG700E",
                nBatteries: 1,
                capacity: 600,
                warranty: 72,
            },
            {
                model: "lgs900i",
                score: 9,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 8,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs900i",
                score: 10,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 9,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 8,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1000i",
                score: 10,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 9,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 8,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg900",
                score: 10,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 9,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1100",
                score: 8,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1100i",
                score: 10,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 8,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1100",
                score: 10,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 9,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 8,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1450i",
                score: 10,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 8,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1550i",
                score: 10,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 9,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 8,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1600",
                score: 10,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 9,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 8,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg700e",
                score: 10,
                humanFriendlyString: "LG700E",
                nBatteries: 1,
                capacity: 600,
                warranty: 72,
            },
            {
                model: "lgs900i",
                score: 9,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 8,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs900i",
                score: 10,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 9,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 8,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1000i",
                score: 10,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 9,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 8,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg900",
                score: 10,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 9,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1100",
                score: 8,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1100i",
                score: 10,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 8,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1100",
                score: 10,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 9,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 8,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1450i",
                score: 10,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 8,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1550i",
                score: 10,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 9,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 8,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1600",
                score: 10,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 9,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 8,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 525 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg700e",
                score: 10,
                humanFriendlyString: "LG700E",
                nBatteries: 1,
                capacity: 600,
                warranty: 72,
            },
            {
                model: "lgs900i",
                score: 9,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 8,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 595 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs900i",
                score: 10,
                humanFriendlyString: "LGS900i",
                nBatteries: 1,
                capacity: 700,
                warranty: 72,
            },
            {
                model: "lgs1000i",
                score: 9,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 8,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 680 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1000i",
                score: 10,
                humanFriendlyString: "LGS1000i",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lg900",
                score: 9,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 8,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 704 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg900",
                score: 10,
                humanFriendlyString: "LG900",
                nBatteries: 1,
                capacity: 800,
                warranty: 72,
            },
            {
                model: "lgs1100i",
                score: 9,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1100",
                score: 8,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 765 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1100i",
                score: 10,
                humanFriendlyString: "LGS1100i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 8,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 792 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1100",
                score: 10,
                humanFriendlyString: "LG1100",
                nBatteries: 1,
                capacity: 900,
                warranty: 72,
            },
            {
                model: "lg1450i",
                score: 9,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 8,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 924 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1450i",
                score: 10,
                humanFriendlyString: "LG1450i",
                nBatteries: 1,
                capacity: 1100,
                warranty: 72,
            },
            {
                model: "lg1550i",
                score: 9,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 8,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1050 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1550i",
                score: 10,
                humanFriendlyString: "LG1550i",
                nBatteries: 1,
                capacity: 1250,
                warranty: 72,
            },
            {
                model: "lgs1600",
                score: 9,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 8,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1600",
                score: 10,
                humanFriendlyString: "LGS1600",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lgs1700",
                score: 9,
                humanFriendlyString: "LGS1700",
                nBatteries: 1,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 8,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 1,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 1,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 290) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 1,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 1,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 1,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 300) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1700",
                score: 10,
                humanFriendlyString: "LGS1700",
                nBatteries: 2,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 9,
                humanFriendlyString: "LG1950i",
                nBatteries: 2,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 8,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 300) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 2,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 300) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 2,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 300) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 2,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 300) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 300) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 300) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1584tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 84,
            },
            {
                model: "it1578tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 78,
            },
            {
                model: "it1572tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 150,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 320) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1700",
                score: 10,
                humanFriendlyString: "LGS1700",
                nBatteries: 2,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 9,
                humanFriendlyString: "LG1950i",
                nBatteries: 2,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 8,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 320) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 2,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 320) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 2,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 320) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 2,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 320) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 320) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 320) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 72,
            },
            {
                model: "it1648tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 48,
            },
            {
                model: "it1642tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 42,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 360) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1700",
                score: 10,
                humanFriendlyString: "LGS1700",
                nBatteries: 2,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 9,
                humanFriendlyString: "LG1950i",
                nBatteries: 2,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 8,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 360) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 2,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 360) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 2,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 360) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 2,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 360) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 360) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 360) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it1872tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 180,
                warranty: 72,
            },
            {
                model: "it1860tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 180,
                warranty: 60,
            },
            {
                model: "it1672tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 160,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1700",
                score: 10,
                humanFriendlyString: "LGS1700",
                nBatteries: 2,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 9,
                humanFriendlyString: "LG1950i",
                nBatteries: 2,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 8,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 2,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 2,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 2,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 1,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 400) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 440) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1700",
                score: 10,
                humanFriendlyString: "LGS1700",
                nBatteries: 2,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 9,
                humanFriendlyString: "LG1950i",
                nBatteries: 2,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 8,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 440) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 2,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 440) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 2,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 440) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 2,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 440) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 440) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 440) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1700",
                score: 10,
                humanFriendlyString: "LGS1700",
                nBatteries: 2,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 9,
                humanFriendlyString: "LG1950i",
                nBatteries: 2,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 8,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 2,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 2,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 2,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 460) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 520) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1700",
                score: 10,
                humanFriendlyString: "LGS1700",
                nBatteries: 2,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 9,
                humanFriendlyString: "LG1950i",
                nBatteries: 2,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 8,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 520) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 2,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 520) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 2,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 520) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 2,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 520) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 520) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 520) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1260 && ah <= 550) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs1700",
                score: 10,
                humanFriendlyString: "LGS1700",
                nBatteries: 2,
                capacity: 1500,
                warranty: 72,
            },
            {
                model: "lg1950i",
                score: 9,
                humanFriendlyString: "LG1950i",
                nBatteries: 2,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 8,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1386 && ah <= 550) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg1950i",
                score: 10,
                humanFriendlyString: "LG1950i",
                nBatteries: 2,
                capacity: 1650,
                warranty: 72,
            },
            {
                model: "lgs2500",
                score: 9,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 8,
                humanFriendlyString: "LGS3000",
                nBatteries: 1,
                capacity: 2500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 1680 && ah <= 550) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs2500",
                score: 10,
                humanFriendlyString: "LGS2500",
                nBatteries: 2,
                capacity: 2000,
                warranty: 72,
            },
            {
                model: "lgs3000",
                score: 9,
                humanFriendlyString: "LGS3000",
                nBatteries: 2,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2100 && ah <= 550) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs3000",
                score: 10,
                humanFriendlyString: "LGS3000",
                nBatteries: 2,
                capacity: 2500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 550) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 550) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 550) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 2,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 2,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 2,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 2,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 600) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 3,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 600) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 3,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 3,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 600) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 3,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 3,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2072tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 200,
                warranty: 72,
            },
            {
                model: "it2060tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 200,
                warranty: 60,
            },
            {
                model: "it2048tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 200,
                warranty: 48,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 660) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 3,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 660) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 3,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 3,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 660) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 3,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 3,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 690) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 3,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 690) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 3,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 3,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 690) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 3,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 3,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 780) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 3,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 780) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 3,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 3,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 780) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 3,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 8,
                humanFriendlyString: "LGS4000",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 3,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 870) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 3,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2940 && ah <= 870) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs4000",
                score: 10,
                humanFriendlyString: "LGS4000",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 9,
                humanFriendlyString: "LGS5000",
                nBatteries: 3,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 3,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 870) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 3,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lgs4000",
                score: 9,
                humanFriendlyString: "LGS4000",
                nBatteries: 3,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 3,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 3,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 880) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 4,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 4,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 8,
                humanFriendlyString: "LG3500",
                nBatteries: 4,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 880) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 4,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 4,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 920) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 4,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 4,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2272tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 920) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 4,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 4,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2360tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 220,
                warranty: 72,
            },
            {
                model: "it2072tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 200,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 1040) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 4,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 4,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 1040) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 4,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 4,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 260,
                warranty: 72,
            },
            {
                model: "it2360tt",
                score: 9,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 230,
                warranty: 60,
            },
            {
                model: "it2272tt",
                score: 8,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 220,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 2800 && ah <= 1080) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lg3500",
                score: 10,
                humanFriendlyString: "LG3500",
                nBatteries: 4,
                capacity: 3500,
                warranty: 72,
            },
            {
                model: "lgs5000",
                score: 8,
                humanFriendlyString: "LGS5000",
                nBatteries: 4,
                capacity: 4000,
                warranty: 72,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 260,
                warranty: 72,
            },
        ];
    } else if (totalWatts <= 3360 && ah <= 1080) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "lgs5000",
                score: 10,
                humanFriendlyString: "LGS5000",
                nBatteries: 4,
                capacity: 4000,
                warranty: 72,
            },
            {
                model: "lg3500",
                score: 9,
                humanFriendlyString: "LG3500",
                nBatteries: 4,
                capacity: 3500,
                warranty: 24,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "it2672tt",
                score: 10,
                humanFriendlyString: "INVERTUFF Tall Tubular",
                nBatteries: 4,
                capacity: 260,
                warranty: 72,
            },
        ];
    }

    if (loadCalculatorOutputs.recommendedInverters != undefined) {
        loadCalculatorOutputs.recommendedInverters = loadCalculatorOutputs.recommendedInverters?.map((recommendedInverter) => {
            let capacity = getProductFromSlugAndLanguage(recommendedInverter.model, userPreferences.language).productIcons[1].text.trim();
            if (capacity.toLowerCase().endsWith("va") || capacity.toLowerCase().endsWith("ah")) {
                capacity = capacity.slice(0, -2).trim();
            }
            let capacityNumeric = parseInt(capacity);

            let warranty = getProductFromSlugAndLanguage(recommendedInverter.model, userPreferences.language).productIcons[0].text.trim();
            let shouldConvertToMonths = false;
            if (warranty.toLowerCase().endsWith("months")) {
                warranty = warranty.replace("months", "");
            } else if (warranty.toLowerCase().endsWith("महीने")) {
                warranty = warranty.replace("महीने", "");
            } else if (warranty.toLowerCase().endsWith("years")) {
                warranty = warranty.replace("years", "");
                shouldConvertToMonths = true;
            } else if (warranty.toLowerCase().endsWith("वर्ष")) {
                warranty = warranty.replace("वर्ष", "");
                shouldConvertToMonths = true;
            }
            let warrantyNumeric = parseInt(warranty);
            if (shouldConvertToMonths) {
                warrantyNumeric = warrantyNumeric * 12;
            }
            return {
                ...recommendedInverter,
                capacity: capacityNumeric,
                warranty: warrantyNumeric,
            };
        });
    }

    if (loadCalculatorOutputs.recommendedBatteries != undefined) {
        loadCalculatorOutputs.recommendedBatteries = loadCalculatorOutputs.recommendedBatteries?.map((recommendedBattery) => {
            let capacity = getProductFromSlugAndLanguage(recommendedBattery.model, userPreferences.language).productIcons[1].text.trim();
            if (capacity.toLowerCase().endsWith("va") || capacity.toLowerCase().endsWith("ah")) {
                capacity = capacity.slice(0, -2).trim();
            }
            let capacityNumeric = parseInt(capacity);

            let warranty = getProductFromSlugAndLanguage(recommendedBattery.model, userPreferences.language).productIcons[0].text.trim();
            let shouldConvertToMonths = false;
            if (warranty.toLowerCase().endsWith("months")) {
                warranty = warranty.replace("months", "");
            }
            if (warranty.toLowerCase().endsWith("years")) {
                warranty = warranty.replace("years", "");
                shouldConvertToMonths = true;
            }
            let warrantyNumeric = parseInt(warranty);
            if (shouldConvertToMonths) {
                warrantyNumeric = warrantyNumeric * 12;
            }

            return {
                ...recommendedBattery,
                capacity: capacityNumeric,
                warranty: warrantyNumeric,
            };
        });
    }

    return loadCalculatorOutputs;
}
