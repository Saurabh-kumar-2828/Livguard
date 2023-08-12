import type {ActionFunction, LoaderFunction} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {getNonEmptyStringFromUnknown, getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {commitUserPreferencesCookie, getUserPreferencesCookie} from "~/server/userPreferencesCookie.server";
import {getLanguageFromUnknown} from "~/typeDefinitions";

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
    const userPreferencesCookie = await getUserPreferencesCookie(request.headers.get("Cookie"));

    const urlSearchParams = new URL(request.url).searchParams;

    const language = safeParse(getLanguageFromUnknown, urlSearchParams.get("language"));
    const redirectTo = safeParse(getStringFromUnknown, urlSearchParams.get("redirectTo"));

    if (language == null || redirectTo == null) {
        // Ensure we don't leave the user with a broken website
        return redirect("/");
    }

    userPreferencesCookie.set("language", language);
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await commitUserPreferencesCookie(userPreferencesCookie),
        },
    });

    // http://stage.livguard.com/set-language?language=hi-in&redirectTo=/inverter-batteries?utm_source=test
    // http://localhost:3050/set-language?language=hi-in&redirectTo=/inverter-batteries?utm_source=test
};
