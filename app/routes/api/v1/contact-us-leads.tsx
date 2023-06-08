import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {getContactUsLeads, getContactUsLeadsCount} from "~/backend/dealer.server";
import {getRequiredEnvironmentVariableNew} from "~/global-common-typescript/server/utilities.server";
import {getIntegerFromUnknown, getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import type {ContactUsLead} from "~/typeDefinitions";

type LoaderData =
    {
          totalRows: number;
          data: Array<ContactUsLead>;
      }
    | {
          error: string;
      };

export const loader: LoaderFunction = async ({request, params}) => {
    const authorization = safeParse(getStringFromUnknown, request.headers.get("Authorization"));
    if (authorization != `Bearer ${getRequiredEnvironmentVariableNew("INTELLSYS_TOKEN")}`) {
        const loaderData: LoaderData = {
            error: "Authorization error: 3029d69b-ab53-46e1-9f2d-93cdb0c461e8",
        };
        return json(loaderData);
    }

    const urlSearchParams = new URL(request.url).searchParams;

    const limit = safeParse(getIntegerFromUnknown, urlSearchParams.get("limit"));
    const offset = safeParse(getIntegerFromUnknown, urlSearchParams.get("offset"));

    if (limit == null || offset == null) {
        const loaderData: LoaderData = {
            error: "Invalid input: 6a05f4ed-e713-4432-bd71-f882293ce36b",
        };
        return json(loaderData);
    }

    const contactUsLeadsCount = await getContactUsLeadsCount();
    if (contactUsLeadsCount instanceof Error) {
        const loaderData: LoaderData = {
            error: contactUsLeadsCount.message,
        };
        return loaderData;
    }

    const contactUsLeads = await getContactUsLeads(limit, offset);
    if (contactUsLeads instanceof Error) {
        const loaderData: LoaderData = {
            error: contactUsLeads.message,
        };
        return loaderData;
    }

    const loaderData: LoaderData = {
        totalRows: contactUsLeadsCount,
        data: contactUsLeads,
    };

    return json(loaderData);
};
