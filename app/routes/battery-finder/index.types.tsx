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

export const indexToVehicleTypeMap = {
    0: "2W",
    1: "3W",
    2: "CV",
    3: "tractor",
    4: "carnsuv",
    5: "erickshaw",
};

export const categoryNames = {
    0: "e4a95b5e-9495-4bce-b698-423e7fccb03b",
    1: "b569ea15-be7b-422b-a6ef-3c09a1b8328d",
    2: "a7498cb8-76c9-412c-9b22-9688dbc22a9f",
    3: "8ced0bb9-9332-424e-9936-02cf3c70c5d5",
    4: "63f6e470-37b2-4e2f-b3e7-6a790ca81f2f",
    5: "ff60ee99-085d-40f1-b9bd-3c8e3ee185ea",
};

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
        iconRelativePath: "/livguard/battery-finder/2/two-wheeler.svg",
        titleContentId: "4ca84917-22f8-40be-acfe-4b3fca449539",
        bodyContentId: "f4ee26db-08ea-4ba9-bc13-2521db5f77f3",
        brands: ["Two Wheeler Brand 1", "Two Wheeler Brand 2", "Two Wheeler Brand 3", "Two Wheeler Brand 4", "Two Wheeler Brand 5"],
        models: ["Two Wheeler Model 1", "Two Wheeler Model 2", "Two Wheeler Model 3", "Two Wheeler Model 4", "Two Wheeler Model 5"],
        fuelTypes: ["Petrol", "Diesel"],
        link: "/two-wheeler-batteries",
    },
    {
        category: VehicleCategory.threeWheeler,
        iconRelativePath: "/livguard/battery-finder/2/three-wheeler.svg",
        titleContentId: "418de152-95ee-488d-b491-a86293219636",
        bodyContentId: "036a7530-0494-482b-ac33-a573aac2f709",
        brands: ["threeWheeler Brand 1", "threeWheeler Brand 2", "threeWheeler Brand 3", "threeWheeler Brand 4", "threeWheeler Brand 5"],
        models: ["threeWheeler Model 1", "threeWheeler Model 2", "threeWheeler Model 3", "threeWheeler Model 4", "threeWheeler Model 5"],
        fuelTypes: ["Petrol", "Diesel"],
        link: "/three-wheeler-batteries",
    },
    {
        category: VehicleCategory.busAndTruck,
        iconRelativePath: "/livguard/battery-finder/2/bus-and-truck.svg",
        titleContentId: "9f009968-050d-4d5b-84bd-6396fb16b925",
        bodyContentId: "d2c179b9-349f-49b8-b470-4f3b706390da",
        brands: ["busAndTruck Brand 1", "busAndTruck Brand 2", "busAndTruck Brand 3", "busAndTruck Brand 4", "busAndTruck Brand 5"],
        models: ["busAndTruck Model 1", "busAndTruck Model 2", "busAndTruck Model 3", "busAndTruck Model 4", "busAndTruck Model 5"],
        fuelTypes: ["Petrol", "Diesel"],
        link: "/bus-and-truck-batteries",
    },
    {
        category: VehicleCategory.tractor,
        iconRelativePath: "/livguard/battery-finder/2/tractor.svg",
        titleContentId: "669014e9-bd1e-4e30-ab8a-64c3900b7d51",
        bodyContentId: "cab68356-f58b-4622-9c94-780ca35b59dd",
        brands: ["tractor Brand 1", "tractor Brand 2", "tractor Brand 3", "tractor Brand 4", "tractor Brand 5"],
        models: ["tractor Model 1", "tractor Model 2", "tractor Model 3", "tractor Model 4", "tractor Model 5"],
        fuelTypes: ["Petrol", "Diesel"],
        link: "/tractor-batteries",
    },
    {
        category: VehicleCategory.carAndSuv,
        iconRelativePath: "/livguard/battery-finder/2/car-and-suv.svg",
        titleContentId: "ea72fad1-6f0f-48bd-ba19-65be3fae44f1",
        bodyContentId: "c470557b-4e08-431f-ba57-dcddf29e94b1",
        brands: ["carAndSuv Brand 1", "carAndSuv Brand 2", "carAndSuv Brand 3", "carAndSuv Brand 4", "carAndSuv Brand 5"],
        models: ["carAndSuv Model 1", "carAndSuv Model 2", "carAndSuv Model 3", "carAndSuv Model 4", "carAndSuv Model 5"],
        fuelTypes: ["Petrol", "Diesel"],
        link: "/car-and-suv-batteries",
    },
    // {
    //     category: VehicleCategory.eRickshaw,
    //     iconRelativePath: "/livguard/battery-finder/2/e-rickshaw.svg",
    //     titleContentId: "dc5a454d-ec59-48fd-a3e9-f834038d7cdb",
    //     bodyContentId: "7aa2ee99-5add-44a3-b1dd-3568e718af37",
    //     brands: ["eRikshaw Brand 1", "eRikshaw Brand 2", "eRikshaw Brand 3", "eRikshaw Brand 4", "eRikshaw Brand 5"],
    //     models: ["eRikshaw Model 1", "eRikshaw Model 2", "eRikshaw Model 3", "eRikshaw Model 4", "eRikshaw Model 5"],
    //     fuelTypes: ["Petrol", "Diesel"],
    //     link: "/e-rickshaw-batteries",
    // },
];
