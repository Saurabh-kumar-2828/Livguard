import {Language} from "aws-sdk/clients/support";
import {distinct} from "~/global-common-typescript/utilities/utilities";
import {ProductType, allProductDetails} from "~/productData";
import {batteryFinderData} from "~/routes/battery-finder/index.state";
import {BatteryFinderState} from "~/routes/car-and-suv/index.types";
import {UserPreferences} from "~/typeDefinitions";

export enum BatteryFinderActionType {
    setSelectedBrand,
    setSelectedSegment,
    setSelectedModel,
    setSelectedFuelType,
    findBatteries,
}

export type BatteryFinderAction = {
    actionType: BatteryFinderActionType;
    payload: any;
};

const carAndSuvBatteries = batteryFinderData
    .filter((item) => item.vtype === "carnsuv")
    .filter((item) => {
        const slug = item.bmodel;
        return slug != null && slug in allProductDetails;
    });

export function batteryFinderReducer(state: BatteryFinderState, action: BatteryFinderAction): BatteryFinderState {
    switch (action.actionType) {
        case BatteryFinderActionType.setSelectedBrand: {
            // TODO: Validate that these exist?
            const selectedBrand = action.payload;

            const newState: BatteryFinderState = structuredClone(state);

            newState.selectedBrand = selectedBrand;
            newState.segments = distinct(
                carAndSuvBatteries
                    .filter((item) => newState.selectedBrand == null || item.manufacturer === newState.selectedBrand)
                    .filter((item) => {
                        const slug = item.bmodel;
                        return slug != null && slug in allProductDetails;
                    })
                    .map((item) => item.segment),
            );
            newState.selectedSegment = null;
            newState.selectedModel = null;
            newState.selectedFuelType = null;

            return newState;
        }
        case BatteryFinderActionType.setSelectedSegment: {
            // TODO: Validate that these exist?
            const selectedSegment = action.payload;

            const newState: BatteryFinderState = structuredClone(state);

            newState.selectedSegment = selectedSegment;
            newState.models = distinct(
                carAndSuvBatteries
                    .filter((item) => newState.selectedBrand == null || item.manufacturer === newState.selectedBrand)
                    .filter((item) => newState.selectedSegment == null || item.segment === newState.selectedSegment)
                    .filter((item) => {
                        const slug = item.bmodel;
                        return slug != null && slug in allProductDetails;
                    })
                    .map((item) => item.vmodel),
            );
            newState.selectedModel = null;
            newState.selectedFuelType = null;

            return newState;
        }
        case BatteryFinderActionType.setSelectedModel: {
            // TODO: Validate that these exist?
            const selectedModel = action.payload;

            const newState: BatteryFinderState = structuredClone(state);

            newState.selectedModel = selectedModel;

            newState.fuelTypes = distinct(
                carAndSuvBatteries
                    .filter((item) => newState.selectedBrand == null || item.manufacturer === newState.selectedBrand)
                    .filter((item) => newState.selectedSegment == null || item.segment === newState.selectedSegment)
                    .filter((item) => newState.selectedModel == null || item.vmodel === newState.selectedModel)
                    .filter((item) => {
                        const slug = item.bmodel;
                        return slug != null && slug in allProductDetails;
                    })
                    .map((item) => item.fuel),
            );
            newState.selectedFuelType = null;

            return newState;
        }
        case BatteryFinderActionType.setSelectedFuelType: {
            // TODO: Validate that these exist?
            const selectedFuelType = action.payload;

            const newState: BatteryFinderState = structuredClone(state);

            newState.selectedFuelType = selectedFuelType;

            return newState;
        }
        case BatteryFinderActionType.findBatteries: {
            const newState: BatteryFinderState = structuredClone(state);

            const language = action.payload;
            newState.recommendedBatteries = distinct(
                carAndSuvBatteries
                    .filter((item) => newState.selectedBrand == null || item.manufacturer === newState.selectedBrand)
                    .filter((item) => newState.selectedSegment == null || item.segment === newState.selectedSegment)
                    .filter((item) => newState.selectedModel == null || item.vmodel === newState.selectedModel)
                    .filter((item) => newState.selectedFuelType == null || item.fuel === newState.selectedFuelType)
                    .map((item) => {
                        // HACK: Battery data from old site has product name, converting it to slug using a risky method
                        // Come back and fix this properlywhen more bandwidth is available
                        const slug = item.bmodel.toLowerCase().replace(/\s/g, "");
                        if (slug != null && slug in allProductDetails) {
                            return {
                                batterySlug: `/product/${slug}`,
                                capacity: allProductDetails[slug][language].specifications[2].value,
                                description: allProductDetails[slug][language].productDescription.description,
                                dimensions: allProductDetails[slug][language].specifications[4].value,
                                imageRelativeUrl: `/livguard/products/${slug}/thumbnail.png`,
                                name: allProductDetails[slug][language].humanReadableModelNumber,
                                polarity: allProductDetails[slug][language].specifications[3].value,
                                productType: ProductType.automotiveBattery,
                                warranty: allProductDetails[slug][language].specifications[1].value,
                                isBestSeller: false,
                            };
                        }

                        return null;
                    })
                    .filter((item) => item != null),
            );

            return newState;
        }
        default: {
            const exhaustiveCheck: never = action.actionType;
            throw new Error(`Encountered unexpected LoadCalculatorInputsActionType: ${action.actionType}`);
        }
    }
}

export function batteryFinderInitialState(language: Language): BatteryFinderState {
    return {
        brands: distinct(carAndSuvBatteries.map((item) => item.manufacturer)),
        selectedBrand: null,
        segments: distinct(carAndSuvBatteries.map((item) => item.segment)),
        selectedSegment: null,
        models: distinct(carAndSuvBatteries.map((item) => item.vmodel)),
        selectedModel: null,
        fuelTypes: distinct(carAndSuvBatteries.map((item) => item.fuel)),
        selectedFuelType: null,
        recommendedBatteries: [
            {
                batterySlug: "/product/zp38b20r",
                capacity: allProductDetails["zp38b20r"][language].specifications[2].value,
                description: allProductDetails["zp38b20r"][language].productDescription.description,
                dimensions: allProductDetails["zp38b20r"][language].specifications[4].value,
                imageRelativeUrl: "/livguard/products/zp38b20r/thumbnail.png",
                name: allProductDetails["zp38b20r"][language].humanReadableModelNumber,
                polarity: allProductDetails["zp38b20r"][language].specifications[3].value,
                productType: ProductType.automotiveBattery,
                warranty: allProductDetails["zp38b20r"][language].specifications[1].value,
                isBestSeller: false,
            },
            {
                batterySlug: "/product/zudin50l",
                capacity: allProductDetails["zudin50l"][language].specifications[2].value,
                description: allProductDetails["zudin50l"][language].productDescription.description,
                dimensions: allProductDetails["zudin50l"][language].specifications[4].value,
                imageRelativeUrl: "/livguard/products/zudin50l/thumbnail.png",
                name: allProductDetails["zudin50l"][language].humanReadableModelNumber,
                polarity: allProductDetails["zudin50l"][language].specifications[3].value,
                productType: ProductType.automotiveBattery,
                warranty: allProductDetails["zudin50l"][language].specifications[1].value,
                isBestSeller: false,
            },
        ],
    };
}
