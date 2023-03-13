import {ActionFunction, json, LoaderFunction, redirect} from "@remix-run/node";
import {NonEmptyString} from "~/global-common-typescript/typeDefinitions";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {commitUserPreferencesCookie, getUserPreferencesCookie} from "~/server/userPreferencesCookie.server";

export const action: ActionFunction = async ({request}) => {
    const userPreferencesCookie = await getUserPreferencesCookie(request.headers.get("Cookie"));

    // TODO: Ensure the values are correct

    const body = await request.formData();

    const language = safeParse(getNonEmptyStringFromUnknown, body.get("language"));
    const redirectTo = safeParse(getNonEmptyStringFromUnknown, body.get("redirectTo"));

    if (redirectTo == null) {
        throw new Error("No redirect url specified!");
    }

    if (language != null) {
        userPreferencesCookie.set("language", language);
    } else {
        userPreferencesCookie.unset("language");
    }

    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await commitUserPreferencesCookie(userPreferencesCookie),
        },
    });
};

export const loader: LoaderFunction = async ({request}) => {
    return redirect("/");
};
