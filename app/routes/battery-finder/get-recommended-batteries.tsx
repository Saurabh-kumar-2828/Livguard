import {LoaderFunction, json} from "@remix-run/node";
import {batteryFinderData} from "~/backend/battery-finder-data.server";
import {getProductFromSlugAndLanguage} from "~/backend/product.server";
import productData from "~/backend/productData.server.json";
import {distinct} from "~/global-common-typescript/utilities/utilities";
import {AutomotiveSubType, ProductType} from "~/productData.types";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";

export const loader: LoaderFunction = async ({request, params}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    const urlSearchParams = new URL(request.url).searchParams;

    const selectedBrand = urlSearchParams.get("selectedBrand");
    const selectedSegment = urlSearchParams.get("selectedSegment");
    const selectedModel = urlSearchParams.get("selectedModel");
    const selectedFuel = urlSearchParams.get("selectedFuel");
    const vtype = urlSearchParams.get("vtype");

    if (selectedBrand == null || selectedModel == null || vtype == null) {
        return new Response("Invalid input: fb598d25-20bc-4857-b03e-ee7857690794", {status: 400});
    }

    const vehicleTypeBatteries = batteryFinderData
        .filter((item) => item.vtype === vtype)
        .filter((item) => {
            const slug = item.bmodel;
            return slug != null && slug in productData;
        });

    let recommendedBatteries = vehicleTypeBatteries.filter((item) => item.manufacturer === selectedBrand);

    if (selectedSegment != null) {
        recommendedBatteries = recommendedBatteries.filter((item) => item.segment === selectedSegment);
    }

    recommendedBatteries = recommendedBatteries.filter((item) => item.vmodel === selectedModel);
    // Guard clause
    if (selectedFuel != null) {
        recommendedBatteries = recommendedBatteries.filter((item) => selectedFuel == null || item.fuel === selectedFuel);
    }

    return json({
        recommendedBatteries: distinct(
            recommendedBatteries
                .map((item) => {
                    // HACK: Battery data from old site has product name, converting it to slug using a risky method
                    // Come back and fix this properlywhen more bandwidth is available
                    const slug = item.bmodel.toLowerCase().replace(/\s/g, "");
                    if (slug != null && slug in productData) {
                        const product = getProductFromSlugAndLanguage(slug, userPreferences.language);
                        return {
                            batterySlug: `/product/${slug}`,
                            capacity: product.specifications[2].value,
                            description: product.productDescription.description,
                            dimensions: product.specifications[4].value,
                            imageRelativeUrl: `/livguard/products/${slug}/thumbnail.png`,
                            name: product.humanReadableModelNumber,
                            polarity: product.specifications[3].value,
                            productType: ProductType.automotiveBattery,
                            warranty: product.specifications[1].value,
                            isBestSeller: false,
                            modelNumber: product.slug,
                        };
                    }

                    return null;
                })
                .filter((item) => item != null),
        ),
    });
};
