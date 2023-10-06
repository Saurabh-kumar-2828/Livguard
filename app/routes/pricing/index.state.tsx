import {ProductCardTwoDetailsType} from "~/components/reusable-components/productCardTwoDetails";
import {distinct, getSingletonValue} from "~/global-common-typescript/utilities/utilities";
import {ProductDetails, ProductType, allProductDetails} from "~/productData.types";
import {PricingPageFilter, PricingPageFilterAttribute, PricingPageProductType, PricingPageState, allPricingPageFilters} from "~/routes/pricing/index.types";
import {UserPreferences} from "~/typeDefinitions";

export enum PricingPageActionType {
    setSelectedPricingPageProductType,
    setPrice,
    addFilter,
    removeFilter,
    setPageNumber,
}

export type PricingPageAction = {
    actionType: PricingPageActionType;
    payload: any;
};

export function pricingPageReducer(state: PricingPageState, action: PricingPageAction): PricingPageState {
    switch (action.actionType) {
        case PricingPageActionType.setSelectedPricingPageProductType: {
            // TODO: Validate that these exist?
            const {selectedPricingPageProductType, userPreferences} = action.payload;

            // const newState: PricingPageState = structuredClone(state);
            const newState: PricingPageState = {...state};

            newState.selectedPricingPageProductType = selectedPricingPageProductType;
            newState.activePageNumber = 0;
            newState.filteredProducts = calculateFilteredProducts(
                selectedPricingPageProductType,
                newState.minPrice,
                newState.maxPrice,
                newState.appliedFilters,
                userPreferences,
                newState.activePageNumber,
            );
            newState.totalPages = Math.ceil(newState.filteredProducts.length / newState.resultsPerPage);
            newState.filteredProducts = newState.filteredProducts.slice(0, newState.resultsPerPage);

            return newState;
        }
        case PricingPageActionType.setPrice: {
            // TODO: Validate that these exist?
            const {minPrice, maxPrice, userPreferences} = action.payload;

            // const newState: PricingPageState = structuredClone(state);
            const newState: PricingPageState = {...state};

            newState.minPrice = minPrice;
            newState.maxPrice = maxPrice;

            newState.filteredProducts = calculateFilteredProducts(
                newState.selectedPricingPageProductType,
                newState.minPrice,
                newState.maxPrice,
                newState.appliedFilters,
                userPreferences,
                newState.activePageNumber,
            );
            newState.totalPages = Math.ceil(newState.filteredProducts.length / newState.resultsPerPage);
            newState.filteredProducts = newState.filteredProducts.slice(0, newState.resultsPerPage);

            return newState;
        }
        case PricingPageActionType.addFilter: {
            // TODO: Validate that these exist?
            const {filterDisplayContentId, userPreferences} = action.payload;

            // const newState: PricingPageState = structuredClone(state);
            const newState: PricingPageState = {...state};

            const filter = getSingletonValue(allPricingPageFilters.filter((filter) => filter.displayContentId == filterDisplayContentId));
            newState.appliedFilters.push(filter);
            newState.filteredProducts = calculateFilteredProducts(
                newState.selectedPricingPageProductType,
                newState.minPrice,
                newState.maxPrice,
                newState.appliedFilters,
                userPreferences,
                newState.activePageNumber,
            );
            newState.totalPages = Math.ceil(newState.filteredProducts.length / newState.resultsPerPage);
            newState.filteredProducts = newState.filteredProducts.slice(0, newState.resultsPerPage);

            return newState;
        }
        case PricingPageActionType.removeFilter: {
            // TODO: Validate that these exist?
            const {filterDisplayContentId, userPreferences} = action.payload;

            // const newState: PricingPageState = structuredClone(state);
            const newState: PricingPageState = {...state};

            newState.appliedFilters = newState.appliedFilters.filter((appliedFilter) => appliedFilter.displayContentId != filterDisplayContentId);
            newState.filteredProducts = calculateFilteredProducts(
                newState.selectedPricingPageProductType,
                newState.minPrice,
                newState.maxPrice,
                newState.appliedFilters,
                userPreferences,
                newState.activePageNumber,
            );
            newState.totalPages = Math.ceil(newState.filteredProducts.length / newState.resultsPerPage);
            newState.filteredProducts = newState.filteredProducts.slice(0, newState.resultsPerPage);

            return newState;
        }
        case PricingPageActionType.setPageNumber: {
            const {pageNumber, userPreferences} = action.payload;

            const newState: PricingPageState = {...state};
            newState.activePageNumber = pageNumber;
            newState.filteredProducts = calculateFilteredProducts(
                newState.selectedPricingPageProductType,
                newState.minPrice,
                newState.maxPrice,
                newState.appliedFilters,
                userPreferences,
                newState.activePageNumber,
                newState.resultsPerPage,
            );

            return newState;
        }
        default: {
            const exhaustiveCheck: never = action.actionType;
            throw new Error(`Encountered unexpected LoadCalculatorInputsActionType: ${action.actionType}`);
        }
    }
}

function calculateFilteredProducts(
    category: PricingPageProductType,
    minPrice: number,
    maxPrice: number,
    filters: Array<PricingPageFilter>,
    userPreferences: UserPreferences,
    activePageNumber: number,
    resultsPerPage?: number,
): Array<ProductCardTwoDetailsType> {
    const filteredProducts = Object.entries(allProductDetails)
        .filter((product) => {
            // product[1][userPreferences.language].type === getProductTypeFromCategory(category);
            const productType = product[1][userPreferences.language].type;

            switch (category) {
                case PricingPageProductType.all:
                    return true;
                case PricingPageProductType.inverter:
                    return productType == ProductType.inverter;
                case PricingPageProductType.inverterBattery:
                    return productType == ProductType.battery;
                case PricingPageProductType.automotiveBatteries:
                    return productType === ProductType.automotiveBattery;
                case PricingPageProductType.solar:
                    return false; // No solar products
                case PricingPageProductType.accessoriesAndOtherBatteries:
                    return productType === ProductType.accessories;
            }
        })
        .filter((product) => {
            if (minPrice == null && maxPrice == null) return true;
            if (minPrice === defaultMinPrice && maxPrice === defaultMaxPrice) return true;

            const productPrice = product[1][userPreferences.language].price;
            if (productPrice == null) return false;
            if (productPrice >= minPrice && productPrice <= maxPrice) return true;

            return false;
        })
        .filter((product) => {
            if (filters.length === 0) return true;
            let filterObj = {};

            filters.forEach((filter) => {
                if (filter.filterAttribute in filterObj) {
                    filterObj[filter.filterAttribute].push(filter);
                } else {
                    filterObj[filter.filterAttribute] = [filter];
                }
            });

            const filterResults = Object.entries(filterObj)
                .map((filterAttribute) => {
                    return filterAttribute[1]
                        .map((filter) => {
                            return filter.predicate(product[1][userPreferences.language]);
                        })
                        .some((item) => item === true);
                })
                .every((item) => item === true);

            return filterResults;
        })
        .map((kvp) => {
            return {
                slug: kvp[0],
                productType: kvp[1][userPreferences.language].type,
                isBestSeller: false,
                imageRelativeUrl: `/livguard/products/${kvp[0]}/thumbnail.png`,
                productName: kvp[1][userPreferences.language].humanReadableModelNumber,
                productPrice: kvp[1][userPreferences.language].price,
                specification1Icon: kvp[1][userPreferences.language].productIcons[0].icon,
                // TODO: Fix
                specification1: kvp[1][userPreferences.language].productIcons[0].text,
                specification2Icon: kvp[1][userPreferences.language].productIcons[1].icon,
                // TODO: Fix
                specification2: kvp[1][userPreferences.language].productIcons[1].text,
            };
        });

    // .slice(resultsPerPage == null ? 0 : activePageNumber * resultsPerPage, resultsPerPage == null ? -1 : activePageNumber * resultsPerPage + resultsPerPage)
    if (resultsPerPage == null) {
        return filteredProducts;
    }

    return filteredProducts.slice(activePageNumber * resultsPerPage, activePageNumber * resultsPerPage + resultsPerPage);
}

export const defaultMinPrice = 0;
export const defaultMaxPrice = 20000;

export function pricingPageInitialStateGenerator(userPreferences: UserPreferences): PricingPageState {
    return {
        selectedPricingPageProductType: PricingPageProductType.all,
        minPrice: defaultMinPrice,
        maxPrice: defaultMaxPrice,
        appliedFilters: [],
        filteredProducts: calculateFilteredProducts(PricingPageProductType.all, defaultMinPrice, defaultMaxPrice, [], userPreferences, 1, 12),
        activePageNumber: 0,
        resultsPerPage: 12,
        totalPages: Math.ceil(Object.keys(allProductDetails).length / 12),
    };
}

export function getWarrantyFromProduct(product: ProductDetails, unit: "months" | "years"): number | null {
    //Guard clause
    if (![ProductType.battery, ProductType.inverter, ProductType.automotiveBattery].includes(product.type)) {
        return null;
    }

    const warrantyObject = product.productIcons.find((item) => ["/livguard/icons/waranty.png"].includes(item.icon));

    if (warrantyObject == null || warrantyObject.text == null) return null;

    let isYear = false;

    // HACK: Checking if warranty is in years or not (hence it is in months)
    if (warrantyObject.text.toLowerCase().includes("year")) {
        isYear = true;
    }

    // Converting months warranty to years (discarding the extra conditional warranty, can add if needs to be added)
    // [ '48', '+', '24*', 'Months' ] this is what the split will give in case of months, can extract 24 from the 2nd arr element

    const warrantyNumber = parseInt(warrantyObject.text.split(" ")[0]);

    if (isNaN(warrantyNumber)) return null;

    if (unit === "months") {
        const warranty = isYear ? warrantyNumber * 12 : warrantyNumber;
        return warranty;
    }

    const warranty = isYear ? warrantyNumber : warrantyNumber / 12;
    return warranty;
}

export function getCapacityFromProduct(product: ProductDetails): number | null {
    // Guard clause
    if (![ProductType.battery, ProductType.inverter, ProductType.automotiveBattery].includes(product.type)) {
        return null;
    }

    // Had to check against icons to see if capacity was present, there were three different icons being used for capacity
    const capacityObject = product.productIcons.find((item) => ["/livguard/icons/inverter_capacity.png", "/livguard/icons/battery_capacity.png", "/livguard/icons/capacity.png"].includes(item.icon));

    if (capacityObject == null || capacityObject.text == null) return null;

    const capacity = parseInt(capacityObject.text.split(" ")[0]);

    if (isNaN(capacity)) return null;

    return capacity;
}
