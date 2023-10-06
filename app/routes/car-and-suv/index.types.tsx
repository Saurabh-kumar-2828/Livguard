import {ProductType} from "~/productData.types";

export enum VehicleCategory {
    twoWheeler,
    threeWheeler,
    busAndTruck,
    tractor,
    carAndSuv,
    eRickshaw,
}

export type BatteryFinderState = {
    brands: Array<string>;
    selectedBrand: string | null;
    segments: Array<string>;
    selectedSegment: string | null;
    models: Array<string>;
    selectedModel: string | null;
    fuelTypes: Array<string>;
    selectedFuelType: string | null;
    recommendedBatteries: Array<{
        isBestSeller?: boolean;
        productType: ProductType;
        batterySlug: string;
        imageRelativeUrl: string;
        name: string;
        description: string;
        warranty: string;
        capacity: string;
        polarity: string;
        dimensions: string;
    }> | null;
};
