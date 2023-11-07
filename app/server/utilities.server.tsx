import {getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {getLanguageFromUnknown, getThemeFromUnknown, UserPreferences} from "~/typeDefinitions";

// TODO: If we are using this hack, then ensure that we pass this around as well (maybe use localStorage?)
export async function getUserPreferencesFromCookiesAndUrlSearchParameters(request: Request): Promise<UserPreferences> {
    const userPreferences = await getUserPreferencesFromCookies(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const urlSearchParams = new URL(request.url).searchParams;

    const urlSearchParamsLanguage = safeParse(getStringFromUnknown, urlSearchParams.get("language"));
    if (urlSearchParamsLanguage != null) {
        userPreferences.language = getLanguageFromUnknown(urlSearchParamsLanguage);
    }

    const urlSearchParamsTheme = safeParse(getStringFromUnknown, urlSearchParams.get("theme"));
    if (urlSearchParamsTheme != null) {
        userPreferences.theme = getThemeFromUnknown(urlSearchParamsTheme);
    }

    return userPreferences;
}

export function getRequiredEnvironmentVariable(variable: string): string {
    const value = process.env[variable];

    if (value == null) {
        throw Error(`Required environment variable ${variable} not found!`);
    }

    return value;
}

