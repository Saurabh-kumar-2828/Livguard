import {LoaderFunction, json} from "@remix-run/node";
import {batteryFinderData} from "~/backend/battery-finder-data.server";
import productData from "~/backend/productData.server.json";
import {distinct} from "~/global-common-typescript/utilities/utilities";

export const loader: LoaderFunction = async ({request, params}) => {
    const urlSearchParams = new URL(request.url).searchParams;

    const selectedBrand = urlSearchParams.get("selectedBrand");

    if (selectedBrand == null) {
        return new Response("Invalid input: abd44a6c-6a39-4123-a9e0-6554cfaa8904", {status: 400});
    }

    return json({
        segments: distinct(batteryFinderData.filter((item) => item.manufacturer === selectedBrand).map((item) => item.segment)),
    });
};
