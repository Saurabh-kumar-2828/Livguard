import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {getSearchTermFrequencies, getSearchTermFrequenciesCount} from "~/backend/dealer.server";
import {getRequiredEnvironmentVariable} from "~/common-remix--utilities/utilities.server";
import {getIntegerFromUnknown, getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import type {TermFrequency} from "~/typeDefinitions";

type LoaderData = {
    nRows: number;
    rows: Array<TermFrequency>;
};

export const loader: LoaderFunction = async ({request, params}) => {
    const authorization = safeParse(getStringFromUnknown, request.headers.get("Authorization"));
    if (authorization != `Bearer ${getRequiredEnvironmentVariable("INTELLSYS_TOKEN")}`) {
        return new Response("Authorization error: 3029d69b-ab53-46e1-9f2d-93cdb0c461e8", {
            status: 401,
        });
    }

    const urlSearchParams = new URL(request.url).searchParams;

    const startDate = safeParse(getStringFromUnknown, urlSearchParams.get("startDate"));
    const endDate = safeParse(getStringFromUnknown, urlSearchParams.get("endDate"));
    const limit = safeParse(getIntegerFromUnknown, urlSearchParams.get("limit"));
    const offset = safeParse(getIntegerFromUnknown, urlSearchParams.get("offset"));

    if (startDate == null || endDate == null || limit == null || offset == null) {
        return new Response("Invalid input: 6a05f4ed-e713-4432-bd71-f882293ce36b", {
            status: 400,
        });
    }

    const searchTermFrequenciesCount = await getSearchTermFrequenciesCount(startDate, endDate);
    if (searchTermFrequenciesCount instanceof Error) {
        return new Response(searchTermFrequenciesCount.message, {
            status: 400,
        });
    }

    const searchTermFrequencies = await getSearchTermFrequencies(startDate, endDate, limit, offset);
    if (searchTermFrequencies instanceof Error) {
        return new Response(searchTermFrequencies.message, {
            status: 400,
        });
    }

    const loaderData: LoaderData = {
        nRows: searchTermFrequenciesCount,
        rows: searchTermFrequencies,
    };

    return json(loaderData);
};
