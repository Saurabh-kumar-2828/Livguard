import {ActionFunction, LoaderFunction, redirect} from "@remix-run/node";
import {NonEmptyString} from "~/global-common-typescript/typeDefinitions";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {commitUserPreferencesCookie, getUserPreferencesCookie} from "~/server/userPreferencesCookie.server";

export const action: ActionFunction = async ({request}) => {
    const userPreferencesCookie = await getUserPreferencesCookie(request.headers.get("Cookie"));

    // TODO: Ensure the values are correct

    const body = await request.formData();

    const theme = safeParse(getNonEmptyStringFromUnknown, body.get("theme"));
    const redirectTo = safeParse(getNonEmptyStringFromUnknown, body.get("redirectTo"));

    if (redirectTo == null) {
        throw new Error("No redirect url specified!");
    }

    if (theme != null) {
        userPreferencesCookie.set("theme", theme);
    } else {
        userPreferencesCookie.unset("theme");
    }

    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await commitUserPreferencesCookie(userPreferencesCookie),
        },
    });
};
