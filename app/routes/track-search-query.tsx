import {ActionFunction, json} from "@remix-run/node";
import {insertSearchQuery} from "~/backend/dealer.server";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {GenericActionData} from "~/routes/contact-us-submission";

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const searchTerm = safeParse(getNonEmptyStringFromUnknown, body.get("searchTerm"));

    if (searchTerm == null) {
        const actionData: GenericActionData = {
            error: "Error in submitting search query! Error code: 794bf9c0-b5ba-40fe-9f61-8cf8adbbd76d",
        };
        return json(actionData);
    }

    const insertResult = await insertSearchQuery(searchTerm);
    if (insertResult instanceof Error) {
        const actionData: GenericActionData = {
            error: "Error in submitting search query! Error code: 7e51c660-1db0-4cbf-b518-aa8ce342ad93",
        };
        return json(actionData);
    }

    const actionData: GenericActionData = {
        error: null,
    };

    return json(actionData);
};
