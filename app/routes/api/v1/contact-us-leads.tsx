import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {getContactUsLeads, getContactUsLeadsCount} from "~/backend/dealer.server";
import {getRequiredEnvironmentVariable} from "~/common-remix--utilities/utilities.server";
import {getIntegerFromUnknown, getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import type {ContactUsLead} from "~/typeDefinitions";

type LoaderData = {
    nRows: number;
    rows: Array<ContactUsLead>;
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

    const contactUsLeadsCount = await getContactUsLeadsCount(startDate, endDate);
    if (contactUsLeadsCount instanceof Error) {
        return new Response(contactUsLeadsCount.message, {
            status: 400,
        });
    }

    const contactUsLeads = await getContactUsLeads(startDate, endDate, limit, offset);
    if (contactUsLeads instanceof Error) {
        return new Response(contactUsLeads.message, {
            status: 400,
        });
    }

    const loaderData: LoaderData = {
        nRows: contactUsLeadsCount,
        rows: contactUsLeads,
    };

    return json(loaderData);
};
