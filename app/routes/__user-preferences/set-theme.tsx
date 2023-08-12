import {ActionFunction, LoaderFunction, redirect} from "@remix-run/node";
import {NonEmptyString} from "~/global-common-typescript/typeDefinitions";
import {getNonEmptyStringFromUnknown, getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {commitUserPreferencesCookie, getUserPreferencesCookie} from "~/server/userPreferencesCookie.server";
import {getThemeFromUnknown} from "~/typeDefinitions";

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

export const loader: LoaderFunction = async ({request}) => {
    const userPreferencesCookie = await getUserPreferencesCookie(request.headers.get("Cookie"));

    const urlSearchParams = new URL(request.url).searchParams;

    const theme = safeParse(getThemeFromUnknown, urlSearchParams.get("theme"));
    const redirectTo = safeParse(getStringFromUnknown, urlSearchParams.get("redirectTo"));

    if (theme == null || redirectTo == null) {
        // Ensure we don't leave the user with a broken website
        return redirect("/");
    }

    userPreferencesCookie.set("theme", theme);
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await commitUserPreferencesCookie(userPreferencesCookie),
        },
    });
}
