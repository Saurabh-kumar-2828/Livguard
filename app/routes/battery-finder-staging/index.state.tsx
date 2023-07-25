import {ProductType} from "~/productData";
import {BatteryFinderState, categories} from "~/routes/battery-finder-staging/index.types";

export enum BatteryFinderActionType {
    setSelectedCategory,
    setSelectedBrand,
    setSelectedModel,
    setSelectedFuelType,
    findBatteries,
}

export type BatteryFinderAction = {
    actionType: BatteryFinderActionType;
    payload: any;
};

export function batteryFinderReducer(state: BatteryFinderState, action: BatteryFinderAction): BatteryFinderState {
    switch (action.actionType) {
        case BatteryFinderActionType.setSelectedCategory: {
            // TODO: Validate that these exist?
            const categoryIndex = action.payload;

            const newState: BatteryFinderState = structuredClone(state);

            newState.selectedCategoryIndex = categoryIndex;
            newState.brands = categories[categoryIndex].brands;
            newState.selectedBrand = null;
            newState.models = categories[categoryIndex].models;
            newState.selectedModel = null;
            newState.fuelTypes = categories[categoryIndex].fuelTypes;
            newState.selectedFuelType = null;

            return newState;
        }
        case BatteryFinderActionType.setSelectedBrand: {
            // TODO: Validate that these exist?
            const selectedBrand = action.payload;

            const newState: BatteryFinderState = structuredClone(state);

            newState.selectedBrand = selectedBrand;

            return newState;
        }
        case BatteryFinderActionType.setSelectedModel: {
            // TODO: Validate that these exist?
            const selectedModel = action.payload;

            const newState: BatteryFinderState = structuredClone(state);

            newState.selectedModel = selectedModel;

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

            // newState.selectedFuelType = selectedFuelType;
            newState.recommendedBatteries = [
                {
                    batterySlug: "lgbtx2.5l",
                    capacity: "2.5 Ah Capacity",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                    dimensions: "80 X 70 X 105 mm",
                    imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                    name: "LGBTX 2.5L",
                    polarity: "L",
                    productType: ProductType.automotiveBattery,
                    warranty: "24 + 24* Months",
                    isBestSeller: false,
                },
            ];
            newState.isApplied = true;

            return newState;
        }
        default: {
            const exhaustiveCheck: never = action.actionType;
            throw new Error(`Encountered unexpected LoadCalculatorInputsActionType: ${action.actionType}`);
        }
    }
}

export const batteryFinderInitialState: BatteryFinderState = {
    selectedCategoryIndex: 0,
    brands: categories[0].brands,
    selectedBrand: null,
    models: categories[0].models,
    selectedModel: null,
    fuelTypes: categories[0].fuelTypes,
    selectedFuelType: null,
    recommendedBatteries: [
        {
            batterySlug: "lgbtx2.5l",
            capacity: "2.5 Ah Capacity",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            dimensions: "80 X 70 X 105 mm",
            imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
            name: "LGBTX 2.5L",
            polarity: "L",
            productType: ProductType.automotiveBattery,
            warranty: "24 + 24* Months",
            isBestSeller: false,
        },
    ],
    isApplied: true,
};
