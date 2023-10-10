import {LoaderFunction, json} from "@remix-run/node";
import {batteryFinderData} from "~/backend/battery-finder-data.server";
import productData from "~/backend/productData.server.json";
import {distinct} from "~/global-common-typescript/utilities/utilities";

export const loader: LoaderFunction = async ({request, params}) => {
    const urlSearchParams = new URL(request.url).searchParams;

    const selectedBrand = urlSearchParams.get("selectedBrand");
    const selectedSegment = urlSearchParams.get("selectedSegment");
    const selectedModel = urlSearchParams.get("selectedModel");

    if (selectedBrand == null || selectedModel == null) {
        return new Response("Invalid input: fb598d25-20bc-4857-b03e-ee7857690794", {status: 400});
    }

    let recommendedBatteries = batteryFinderData.filter((item) => item.manufacturer === selectedBrand);

    if (selectedSegment != null) {
        recommendedBatteries = recommendedBatteries.filter((item) => item.segment === selectedSegment);
    }

    recommendedBatteries = recommendedBatteries.filter((item) => item.vmodel);

    return json({
        fuels: distinct(recommendedBatteries.map((item) => item.fuel)),
    });
};
