import {ActionFunction, redirect} from "@remix-run/node";
import {getNonEmptyStringOrNull} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {commitUserPreferencesCookie, getUserPreferencesCookie} from "~/server/userPreferencesCookie.server";

export const action: ActionFunction = async ({request}) => {
    const userPreferencesCookie = await getUserPreferencesCookie(request.headers.get("Cookie"));

    // TODO: Ensure the values are correct

    const body = await request.formData();

    const language = getNonEmptyStringOrNull(body.get("language") as string);
    if (language != null) {
        userPreferencesCookie.set("language", language);
    } else {
        userPreferencesCookie.unset("language");
    }

    // TODO: Redirect to redirectTo urlSearchParam
    return redirect("/", {
        headers: {
            "Set-Cookie": await commitUserPreferencesCookie(userPreferencesCookie),
        },
    });
};
