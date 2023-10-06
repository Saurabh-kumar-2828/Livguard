import {useFetcher} from "@remix-run/react";
import {Language} from "aws-sdk/clients/support";
import {distinct} from "~/global-common-typescript/utilities/utilities";
import {ProductDetails, ProductType, allProductDetails} from "~/productData.types";
import {batteryFinderData} from "~/routes/battery-finder/index.state";
import {BatteryFinderState} from "~/routes/two-wheeler/index.types";

export enum BatteryFinderActionType {
    setSelectedBrand,
    setSegments,
    setSelectedSegment,
    setModels,
    setSelectedModel,
    setRecommendedBatteries,
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
        case BatteryFinderActionType.setSegments: {
            const segments = action.payload;
            const newState: BatteryFinderState = structuredClone(state);

            newState.segments = segments;

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
        case BatteryFinderActionType.setModels: {
            const models = action.payload;

            const newState: BatteryFinderState = structuredClone(state);

            newState.models = models;
            return newState;
        }
        case BatteryFinderActionType.setSelectedModel: {
            // TODO: Validate that these exist?
            const selectedModel = action.payload;

            const newState: BatteryFinderState = structuredClone(state);

            newState.selectedModel = selectedModel;

            return newState;
        }
        case BatteryFinderActionType.setRecommendedBatteries: {
            const recommendedBatteries = action.payload;

            const newState: BatteryFinderState = structuredClone(state);
            newState.recommendedBatteries = recommendedBatteries;

            return newState;
        }
        default: {
            const exhaustiveCheck: never = action.actionType;
            throw new Error(`Encountered unexpected LoadCalculatorInputsActionType: ${action.actionType}`);
        }
    }
}

export function batteryFinderInitialState(language: Language, brands: Array<string>, initialRecommendedBatteries: Array<ProductDetails>): BatteryFinderState {
    return {
        brands: brands,
        selectedBrand: null,
        segments: [],
        selectedSegment: null,
        models: [],
        selectedModel: null,
        recommendedBatteries: initialRecommendedBatteries.map((battery) => ({
            batterySlug: `/product/${battery.slug}`,
            capacity: battery.specifications[2].value,
            description: battery.productDescription.description,
            dimensions: battery.specifications[4].value,
            imageRelativeUrl: `/livguard/products/${battery.slug}/thumbnail.png`,
            name: battery.humanReadableModelNumber,
            polarity: battery.specifications[3].value,
            productType: ProductType.automotiveBattery,
            warranty: battery.specifications[1].value,
            isBestSeller: false,
        })),
    };
}
