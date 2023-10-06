import {Language} from "aws-sdk/clients/support";
import {distinct} from "~/global-common-typescript/utilities/utilities";
import {ProductDetails, ProductType, allProductDetails} from "~/productData.types";
import {BatteryFinderState} from "~/routes/car-and-suv/index.types";

export enum BatteryFinderActionType {
    setSelectedBrand,
    setBrands,
    setSelectedSegment,
    setSegments,
    setSelectedModel,
    setModels,
    setSelectedFuelType,
    setFuelTypes,
    setRecommendedBatteries,
    // findBatteries,
}

export type BatteryFinderAction = {
    actionType: BatteryFinderActionType;
    payload: any;
};

export function batteryFinderReducer(state: BatteryFinderState, action: BatteryFinderAction): BatteryFinderState {
    switch (action.actionType) {
        case BatteryFinderActionType.setBrands: {
            const brands = action.payload;

            const newState: BatteryFinderState = structuredClone(state);

            newState.brands = brands;
            return newState;
        }
        case BatteryFinderActionType.setSelectedBrand: {
            // TODO: Validate that these exist?
            const selectedBrand = action.payload;

            const newState: BatteryFinderState = structuredClone(state);

            newState.selectedBrand = selectedBrand;
            newState.selectedSegment = null;
            newState.selectedModel = null;
            newState.selectedFuelType = null;

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
            newState.selectedModel = null;
            newState.selectedFuelType = null;

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
            newState.selectedFuelType = null;

            return newState;
        }
        case BatteryFinderActionType.setFuelTypes: {
            const fuels = action.payload;

            const newState: BatteryFinderState = structuredClone(state);
            newState.fuelTypes = fuels;
            return newState;
        }
        case BatteryFinderActionType.setSelectedFuelType: {
            // TODO: Validate that these exist?
            const selectedFuelType = action.payload;

            const newState: BatteryFinderState = structuredClone(state);

            newState.selectedFuelType = selectedFuelType;

            return newState;
        }
        case BatteryFinderActionType.setRecommendedBatteries: {
            const recommendedBatteries = action.payload;

            const newState: BatteryFinderState = structuredClone(state);
            newState.recommendedBatteries = recommendedBatteries;

            return newState;
        }
        // case BatteryFinderActionType.findBatteries: {
        //     const newState: BatteryFinderState = structuredClone(state);

        //     const language = action.payload;
        //     newState.recommendedBatteries = distinct(
        //         carAndSuvBatteries
        //             .filter((item) => newState.selectedBrand == null || item.manufacturer === newState.selectedBrand)
        //             .filter((item) => newState.selectedSegment == null || item.segment === newState.selectedSegment)
        //             .filter((item) => newState.selectedModel == null || item.vmodel === newState.selectedModel)
        //             .filter((item) => newState.selectedFuelType == null || item.fuel === newState.selectedFuelType)
        //             .map((item) => {
        //                 // HACK: Battery data from old site has product name, converting it to slug using a risky method
        //                 // Come back and fix this properlywhen more bandwidth is available
        //                 const slug = item.bmodel.toLowerCase().replace(/\s/g, "");
        //                 if (slug != null && slug in allProductDetails) {
        //                     // return {
        //                     //     batterySlug: `/product/${slug}`,
        //                     //     capacity: getProductFromSlugAndLanguage(slug, language).specifications[2].value,
        //                     //     description: getProductFromSlugAndLanguage(slug, language).productDescription.description,
        //                     //     dimensions: getProductFromSlugAndLanguage(slug, language).specifications[4].value,
        //                     //     imageRelativeUrl: `/livguard/products/${slug}/thumbnail.png`,
        //                     //     name: getProductFromSlugAndLanguage(slug, language).humanReadableModelNumber,
        //                     //     polarity: getProductFromSlugAndLanguage(slug, language).specifications[3].value,
        //                     //     productType: ProductType.automotiveBattery,
        //                     //     warranty: getProductFromSlugAndLanguage(slug, language).specifications[1].value,
        //                     //     isBestSeller: false,
        //                     // };
        //                 }

        //                 return null;
        //             })
        //             .filter((item) => item != null),
        //     );

        //     return newState;
        // }
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
        fuelTypes: [],
        selectedFuelType: null,
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
