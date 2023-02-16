import {ActionFunction, LoaderFunction, redirect} from "@remix-run/node";
import {getNonEmptyStringOrNull} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {commitUserPreferencesCookie, getUserPreferencesCookie} from "~/server/userPreferencesCookie.server";
import {getUrlFromRequest} from "~/utilities";

export const action: ActionFunction = async ({request}) => {
    const userPreferencesCookie = await getUserPreferencesCookie(request.headers.get("Cookie"));

    // TODO: Ensure the values are correct

    const body = await request.formData();

    const language = getNonEmptyStringOrNull(body.get("language") as string);
    const redirectTo = getNonEmptyStringOrNull(body.get("redirectTo") as string);

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
