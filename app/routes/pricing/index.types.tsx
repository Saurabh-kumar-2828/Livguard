import type {ProductCardTwoDetailsType} from "~/components/reusable-components/productCardTwoDetails";
import type {ProductDetails} from "~/productData.types";
import {AutomotiveSubType, ProductType} from "~/productData.types";
import {getCapacityFromProduct, getWarrantyFromProduct} from "~/routes/pricing/index.state";

export type PricingPageState = {
    selectedPricingPageProductType: PricingPageProductType;
    minPrice: number;
    maxPrice: number;
    appliedFilters: Array<PricingPageFilter>;
    filteredProducts: Array<ProductCardTwoDetailsType>;
    activePageNumber: number;
    resultsPerPage: number;
    totalPages: number;
};

export enum PricingPageProductType {
    all = "00b3925b-f76c-4e9c-af7a-3f576c40495f",
    inverter = "23b3d10a-0b8b-4548-bc62-45a1a8d904b7",
    inverterBattery = "36637a65-77fc-4ac5-b2bf-becde2c644b9",
    automotiveBatteries = "c47a38b3-1db8-46b9-99ec-bfd0bdb3bf03",
    solar = "92d367ab-37e5-4127-aefa-b6098c835c07",
    accessoriesAndOtherBatteries = "5756948e-5b22-4ea5-958c-b7f78b8a223d",
}

export enum PricingPageFilterAttribute {
    capacity = "capacity",
    warranty = "warranty",
    automotiveSubType = "automotiveSubType",
}

export type PricingPageFilter = {
    filterAttribute: PricingPageFilterAttribute;
    displayContentId: string;
    predicate: (product: ProductDetails) => boolean;
};

// TODO: Remove `filterAttribute` from `PricingPageFilter` and add it as a key here instead
export const allPricingPageFilters: Array<PricingPageFilter> = [
    {
        filterAttribute: PricingPageFilterAttribute.capacity,
        displayContentId: "dad4f195-43c3-4844-b78a-e122b1bfba21",
        predicate: (product) => {
            const capacity = getCapacityFromProduct(product);
            return capacity == null ? false : capacity < 100;
        },
    },
    {
        filterAttribute: PricingPageFilterAttribute.capacity,
        displayContentId: "e52128b7-a320-4a31-8ecc-2ef0278fed9b",
        predicate: (product) => {
            const capacity = getCapacityFromProduct(product);
            return capacity == null ? false : capacity >= 100 && capacity < 200;
        },
    },
    {
        filterAttribute: PricingPageFilterAttribute.capacity,
        displayContentId: "61527bcb-9b8d-42a3-b0e2-0864f5c801e2",
        predicate: (product) => {
            const capacity = getCapacityFromProduct(product);
            return capacity == null ? false : capacity >= 200 && capacity < 300;
        },
    },
    {
        filterAttribute: PricingPageFilterAttribute.capacity,
        displayContentId: "b8afb060-115b-47db-a2ab-1d49ffe2aebd",
        predicate: (product) => {
            const capacity = getCapacityFromProduct(product);
            return capacity == null ? false : capacity >= 300;
        },
    },
    {
        filterAttribute: PricingPageFilterAttribute.warranty,
        displayContentId: "3078ed43-6580-4fbf-a6d9-773638087e13",
        predicate: (product) => {
            const warranty = getWarrantyFromProduct(product, "months");
            return warranty == null ? false : warranty < 18;
        },
    },
    {
        filterAttribute: PricingPageFilterAttribute.warranty,
        displayContentId: "be9cbbd6-b37d-479d-af08-433917c1be45",
        predicate: (product) => {
            const warranty = getWarrantyFromProduct(product, "months");
            return warranty == null ? false : warranty >= 18 && warranty < 36;
        },
    },
    {
        filterAttribute: PricingPageFilterAttribute.warranty,
        displayContentId: "a79c530a-6bc9-4e8a-ba62-1add8f44b43b",
        predicate: (product) => {
            const warranty = getWarrantyFromProduct(product, "months");
            return warranty == null ? false : warranty >= 36 && warranty < 48;
        },
    },
    {
        filterAttribute: PricingPageFilterAttribute.warranty,
        displayContentId: "9a6339ee-db8e-4c8b-9e2b-228d049ef726",
        predicate: (product) => {
            const warranty = getWarrantyFromProduct(product, "months");
            return warranty == null ? false : warranty >= 48;
        },
    },
    {
        filterAttribute: PricingPageFilterAttribute.automotiveSubType,
        displayContentId: "79ca88c3-d0b9-480e-b3fb-e4c3c9e173cb",
        predicate: (product) => {
            return product.type === ProductType.automotiveBattery && product.subType === AutomotiveSubType.carNSuv;
        },
    },
    {
        filterAttribute: PricingPageFilterAttribute.automotiveSubType,
        displayContentId: "559bff04-3f2e-441b-a600-bae6ecea7215",
        predicate: (product) => {
            return product.type === ProductType.automotiveBattery && product.subType === AutomotiveSubType.twoWheeler;
        },
    },
    {
        filterAttribute: PricingPageFilterAttribute.automotiveSubType,
        displayContentId: "d739952a-bc92-4908-a7bb-fe5142e5af1a",
        predicate: (product) => {
            return product.type === ProductType.automotiveBattery && product.subType === AutomotiveSubType.threeWheeler;
        },
    },
    {
        filterAttribute: PricingPageFilterAttribute.automotiveSubType,
        displayContentId: "57d6fed3-4516-477b-820b-308281f873ff",
        predicate: (product) => {
            return product.type === ProductType.automotiveBattery && product.subType === AutomotiveSubType.commercial;
        },
    },
    {
        filterAttribute: PricingPageFilterAttribute.automotiveSubType,
        displayContentId: "04f5292b-9d2c-49aa-a358-f6c108c4b381",
        predicate: (product) => {
            return product.type === ProductType.automotiveBattery && product.subType === AutomotiveSubType.tractor;
        },
    },
    {
        filterAttribute: PricingPageFilterAttribute.automotiveSubType,
        displayContentId: "6789787b-6622-4016-832b-86c0180bcc67",
        predicate: (product) => {
            return product.type === ProductType.automotiveBattery && product.subType === AutomotiveSubType.eRickshaw;
        },
    },
];
