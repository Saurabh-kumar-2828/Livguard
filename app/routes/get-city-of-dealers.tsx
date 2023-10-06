import {LoaderFunction, json} from "@remix-run/node";
import {getDistinctCity} from "~/backend/dealer.server";

export const loader: LoaderFunction = async () => {
    const cityList = await getDistinctCity();
    if (cityList instanceof Error) {
        return {
            cityList: null,
            error: cityList.message,
        };
    }

    const loaderData = {
        cityList: cityList,
        error: null,
    };

    return json(loaderData);
};
