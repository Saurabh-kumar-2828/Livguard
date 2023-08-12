import {Language} from "aws-sdk/clients/support";
import {ProductDetails, allProductDetails} from "~/productData";

export function getProductFromSlugAndLanguage(slug: string, language: Language): ProductDetails | void {
    if (slug in allProductDetails) {
        return allProductDetails[slug][language];
    }
}
