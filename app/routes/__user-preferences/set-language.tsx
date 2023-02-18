import {ActionFunction, LoaderFunction, redirect} from "@remix-run/node";
import {NonEmptyString} from "~/global-common-typescript/typeDefinitions";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {commitUserPreferencesCookie, getUserPreferencesCookie} from "~/server/userPreferencesCookie.server";

export const action: ActionFunction = async ({request}) => {
    const userPreferencesCookie = await getUserPreferencesCookie(request.headers.get("Cookie"));

    // TODO: Ensure the values are correct

    const body = await request.formData();

    const language = safeParse<NonEmptyString>(getNonEmptyStringFromUnknown, body.get("language"));
    const redirectTo = safeParse<NonEmptyString>(getNonEmptyStringFromUnknown, body.get("redirectTo"));

    if(redirectTo == null){
        throw "NO redirect URL";
    }

    console.log("current Url ====>", redirectTo);
    if (language != null) {
        userPreferencesCookie.set("language", language);
    } else {
        userPreferencesCookie.unset("language");
    }

    // TODO: Redirect to redirectTo urlSearchParam
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await commitUserPreferencesCookie(userPreferencesCookie),
        },
    });
};
