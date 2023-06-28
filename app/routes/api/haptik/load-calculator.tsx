import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import type {LoadCalculatorOutputs} from "~/backend/loadCalculator.server";
import {getLoadCalculatorOutputs} from "~/backend/loadCalculator.server";
import {getRequiredEnvironmentVariableNew} from "~/global-common-typescript/server/utilities.server";
import {getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {propertyTemplatesNewUi} from "~/routes/load-calculator/index.types";

type LoaderData = LoadCalculatorOutputs;

export const loader: LoaderFunction = async ({request, params}) => {
    const authorization = safeParse(getStringFromUnknown, request.headers.get("Authorization"));
    if (authorization != `Bearer ${getRequiredEnvironmentVariableNew("HAPTIK_API_TOKEN")}`) {
        return new Response("Authorization error: 1f293705-48ee-4da6-b3c5-7f6c84d027fc", {
            status: 401,
        });
    }

    const urlSearchParams = new URL(request.url).searchParams;

    const propertyType = safeParse(getStringFromUnknown, urlSearchParams.get("propertyType"));

    if (propertyType == null || !(propertyType in propertyTemplatesNewUi)) {
        return new Response("Invalid input: 8bb618c0-7f75-4ac0-bdb9-c690b629fbe3", {
            status: 400,
        });
    }

    const loadCalculatorOutputs = await getLoadCalculatorOutputs({
        property: propertyTemplatesNewUi[propertyType],
        averageConsumption: 0.5,
        backupHours: 4,
    });

    const loaderData: LoaderData = {
        ...loadCalculatorOutputs,
    };

    return json(loaderData);
};
