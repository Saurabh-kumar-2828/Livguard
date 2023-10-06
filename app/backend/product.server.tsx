import {Language} from "aws-sdk/clients/support";
import type {ProductDetails} from "~/productData.types";
import productData from "~/backend/productData.server.json";
import {AutomotiveSubType} from "~/productData";
import {batteryFinderData} from "~/backend/battery-finder-data.server";

function isProductDataValid(): boolean {
    if (productData == null) {
        throw new Error("Product data not found");
    }

    return true;
}

export function getProductFromSlugAndLanguage(slug: string, language: Language): ProductDetails {
    if (!isProductDataValid()) {
        throw new Error("Product data not valid");
    }
    // TODO: Validate each product is of type ProductDetails
    const productDetails = productData as {[productSlug: string]: {[language: string]: ProductDetails}};
    return productDetails[slug][language];
}

export function getProductFromSlug(slug: string): {[language: string]: ProductDetails} {
    if (!isProductDataValid()) {
        throw new Error("Product data not valid");
    }

    // TODO: Validate each product is of type ProductDetails
    const productDetails = productData as {[productSlug: string]: {[language: string]: ProductDetails}};
    return productDetails[slug];
}

export const allProductDetails = productData;
