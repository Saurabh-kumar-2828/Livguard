import {ProductType} from "~/productData";
import {UserPreferences} from "~/typeDefinitions";

export enum VehicleCategory {
    twoWheeler,
    threeWheeler,
    busAndTruck,
    tractor,
    carAndSuv,
    eRickshaw,
}

export type BatteryFinderState = {
    selectedCategoryIndex: number;
    brands: Array<string>;
    selectedBrand: string | null;
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
    isApplied: boolean;
};

export const categories = [
    {
        category: VehicleCategory.twoWheeler,
        iconRelativePath: "https://files.growthjockey.com/livguard/icons/stabilizer/for-AC.svg",
        titleContentId: "4ca84917-22f8-40be-acfe-4b3fca449539",
        bodyContentId: "7738908b-a43c-4ef9-8bb7-1f0d44e60899",
        brands: ["Two Wheeler Brand 1", "Two Wheeler Brand 2", "Two Wheeler Brand 3", "Two Wheeler Brand 4", "Two Wheeler Brand 5"],
        models: ["Two Wheeler Model 1", "Two Wheeler Model 2", "Two Wheeler Model 3", "Two Wheeler Model 4", "Two Wheeler Model 5"],
        fuelTypes: ["Petrol", "Diesel"],
    },
    {
        category: VehicleCategory.threeWheeler,
        iconRelativePath: "https://files.growthjockey.com/livguard/icons/stabilizer/for-AC.svg",
        titleContentId: "418de152-95ee-488d-b491-a86293219636",
        bodyContentId: "f6d0539b-16df-443a-af9c-2ae6f79765a4",
        brands: ["threeWheeler Brand 1", "threeWheeler Brand 2", "threeWheeler Brand 3", "threeWheeler Brand 4", "threeWheeler Brand 5"],
        models: ["threeWheeler Model 1", "threeWheeler Model 2", "threeWheeler Model 3", "threeWheeler Model 4", "threeWheeler Model 5"],
        fuelTypes: ["Petrol", "Diesel"],
    },
    {
        category: VehicleCategory.busAndTruck,
        iconRelativePath: "https://files.growthjockey.com/livguard/icons/stabilizer/for-AC.svg",
        titleContentId: "9f009968-050d-4d5b-84bd-6396fb16b925",
        bodyContentId: "c635c871-90ac-480c-83d3-8032728f3059",
        brands: ["busAndTruck Brand 1", "busAndTruck Brand 2", "busAndTruck Brand 3", "busAndTruck Brand 4", "busAndTruck Brand 5"],
        models: ["busAndTruck Model 1", "busAndTruck Model 2", "busAndTruck Model 3", "busAndTruck Model 4", "busAndTruck Model 5"],
        fuelTypes: ["Petrol", "Diesel"],
    },
    {
        category: VehicleCategory.tractor,
        iconRelativePath: "https://files.growthjockey.com/livguard/icons/stabilizer/for-AC.svg",
        titleContentId: "669014e9-bd1e-4e30-ab8a-64c3900b7d51",
        bodyContentId: "171cb335-6ec4-44d1-a289-b0b231024c0b",
        brands: ["tractor Brand 1", "tractor Brand 2", "tractor Brand 3", "tractor Brand 4", "tractor Brand 5"],
        models: ["tractor Model 1", "tractor Model 2", "tractor Model 3", "tractor Model 4", "tractor Model 5"],
        fuelTypes: ["Petrol", "Diesel"],
    },
    {
        category: VehicleCategory.carAndSuv,
        iconRelativePath: "https://files.growthjockey.com/livguard/icons/stabilizer/for-AC.svg",
        titleContentId: "ea72fad1-6f0f-48bd-ba19-65be3fae44f1",
        bodyContentId: "6dd9224e-2bae-425d-8687-767059c99732",
        brands: ["carAndSuv Brand 1", "carAndSuv Brand 2", "carAndSuv Brand 3", "carAndSuv Brand 4", "carAndSuv Brand 5"],
        models: ["carAndSuv Model 1", "carAndSuv Model 2", "carAndSuv Model 3", "carAndSuv Model 4", "carAndSuv Model 5"],
        fuelTypes: ["Petrol", "Diesel"],
    },
    {
        category: VehicleCategory.eRickshaw,
        iconRelativePath: "https://files.growthjockey.com/livguard/icons/stabilizer/for-AC.svg",
        titleContentId: "dc5a454d-ec59-48fd-a3e9-f834038d7cdb",
        bodyContentId: "be93e4e6-cf77-4b1a-a418-5b22214fbaf6",
        brands: ["eRikshaw Brand 1", "eRikshaw Brand 2", "eRikshaw Brand 3", "eRikshaw Brand 4", "eRikshaw Brand 5"],
        models: ["eRikshaw Model 1", "eRikshaw Model 2", "eRikshaw Model 3", "eRikshaw Model 4", "eRikshaw Model 5"],
        fuelTypes: ["Petrol", "Diesel"],
    },
];
