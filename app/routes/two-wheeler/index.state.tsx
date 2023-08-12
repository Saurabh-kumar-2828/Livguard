import {Language} from "aws-sdk/clients/support";
import {distinct} from "~/global-common-typescript/utilities/utilities";
import {ProductType, allProductDetails} from "~/productData";
import {batteryFinderData} from "~/routes/battery-finder/index.state";
import {BatteryFinderState} from "~/routes/two-wheeler/index.types";

export enum BatteryFinderActionType {
    setSelectedBrand,
    setSelectedSegment,
    setSelectedModel,
    findBatteries,
}

export type BatteryFinderAction = {
    actionType: BatteryFinderActionType;
    payload: any;
};

const twoWheelerBatteries = batteryFinderData
    .filter((item) => item.vtype === "2W")
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
                twoWheelerBatteries
                    .filter((item) => newState.selectedBrand == null || item.manufacturer === newState.selectedBrand)
                    .filter((item) => {
                        const slug = item.bmodel;
                        return slug != null && slug in allProductDetails;
                    })
                    .map((item) => item.segment),
            );
            newState.selectedSegment = null;
            newState.selectedModel = null;

            return newState;
        }
        case BatteryFinderActionType.setSelectedSegment: {
            // TODO: Validate that these exist?
            const selectedSegment = action.payload;

            const newState: BatteryFinderState = structuredClone(state);

            newState.selectedSegment = selectedSegment;
            newState.models = distinct(
                twoWheelerBatteries
                    .filter((item) => newState.selectedBrand == null || item.manufacturer === newState.selectedBrand)
                    .filter((item) => newState.selectedSegment == null || item.segment === newState.selectedSegment)
                    .filter((item) => {
                        const slug = item.bmodel;
                        return slug != null && slug in allProductDetails;
                    })
                    .map((item) => item.vmodel),
            );
            newState.selectedModel = null;

            return newState;
        }
        case BatteryFinderActionType.setSelectedModel: {
            // TODO: Validate that these exist?
            const selectedModel = action.payload;

            const newState: BatteryFinderState = structuredClone(state);

            newState.selectedModel = selectedModel;

            return newState;
        }
        case BatteryFinderActionType.findBatteries: {
            const newState: BatteryFinderState = structuredClone(state);

            const language = action.payload;
            newState.recommendedBatteries = distinct(
                twoWheelerBatteries
                    .filter((item) => newState.selectedBrand == null || item.manufacturer === newState.selectedBrand)
                    .filter((item) => newState.selectedSegment == null || item.segment === newState.selectedSegment)
                    .filter((item) => newState.selectedModel == null || item.vmodel === newState.selectedModel)
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
        brands: distinct(twoWheelerBatteries.map((item) => item.manufacturer)),
        selectedBrand: null,
        segments: distinct(twoWheelerBatteries.map((item) => item.segment)),
        selectedSegment: null,
        models: distinct(twoWheelerBatteries.map((item) => item.vmodel)),
        selectedModel: null,
        recommendedBatteries: [
            {
                batterySlug: "/product/lgzhhtz4",
                capacity: allProductDetails["lgzhhtz4"][language].specifications[2].value,
                description: allProductDetails["lgzhhtz4"][language].description,
                dimensions: allProductDetails["lgzhhtz4"][language].specifications[4].value,
                imageRelativeUrl: "/livguard/products/lgzhhtz4/thumbnail.png",
                name: allProductDetails["lgzhhtz4"][language].humanReadableModelNumber,
                polarity: allProductDetails["lgzhhtz4"][language].specifications[3].value,
                productType: ProductType.automotiveBattery,
                warranty: allProductDetails["lgzhhtz4"][language].specifications[1].value,
                isBestSeller: false,
            },
            {
                batterySlug: "/product/lgzhhtx5",
                capacity: allProductDetails["lgzhhtx5"][language].specifications[2].value,
                description: allProductDetails["lgzhhtx5"][language].description,
                dimensions: allProductDetails["lgzhhtx5"][language].specifications[4].value,
                imageRelativeUrl: "/livguard/products/lgzhhtx5/thumbnail.png",
                name: allProductDetails["lgzhhtx5"][language].humanReadableModelNumber,
                polarity: allProductDetails["lgzhhtx5"][language].specifications[3].value,
                productType: ProductType.automotiveBattery,
                warranty: allProductDetails["lgzhhtx5"][language].specifications[1].value,
                isBestSeller: false,
            },
        ],
    };
}
