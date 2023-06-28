import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {getDealersForHaptik, getSearchTermFrequencies, getSearchTermFrequenciesCount} from "~/backend/dealer.server";
import {getRequiredEnvironmentVariableNew} from "~/global-common-typescript/server/utilities.server";
import {getIntegerFromUnknown, getNumberFromUnknown, getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import type {Dealer, TermFrequency} from "~/typeDefinitions";

export type DealerForHaptik = {
    dealerName: string;
    address: string;
    phoneNumber: string
};

type LoaderData = {
    dealers: Array<DealerForHaptik>;
};

export const loader: LoaderFunction = async ({request, params}) => {
    const authorization = safeParse(getStringFromUnknown, request.headers.get("Authorization"));
    if (authorization != `Bearer ${getRequiredEnvironmentVariableNew("HAPTIK_API_TOKEN")}`) {
        return new Response("Authorization error: c9c1f9cc-2643-41c4-b5b8-15cb1ae76eba", {
            status: 401,
        });
    }

    const urlSearchParams = new URL(request.url).searchParams;

    const latitude = safeParse(getNumberFromUnknown, urlSearchParams.get("latitude"));
    const longitude = safeParse(getNumberFromUnknown, urlSearchParams.get("longitude"));

    if (latitude == null || longitude == null) {
        return new Response("Invalid input: 9e692b78-ca87-4c03-877f-1e53a6510523", {
            status: 400,
        });
    }

    const dealers = await getDealersForHaptik(latitude, longitude);
    if (dealers instanceof Error) {
        return new Response(dealers.message, {
            status: 400,
        });
    }

    const loaderData: LoaderData = {
        dealers: dealers,
    };

    return json(loaderData);
};
