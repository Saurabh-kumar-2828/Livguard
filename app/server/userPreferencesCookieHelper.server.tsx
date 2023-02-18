import {NonEmptyString} from "~/global-common-typescript/typeDefinitions";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {getUserPreferencesCookie} from "~/server/userPreferencesCookie.server";
import {Language, UserPreferences} from "~/typeDefinitions";

export async function getUserPreferencesFromCookies(request: Request): Promise<UserPreferences | Error> {
    const cookie = await getUserPreferencesCookie(request.headers.get("Cookie"));

    const language = safeParse<NonEmptyString>(getNonEmptyStringFromUnknown, cookie.get("language"));
    const theme = safeParse<NonEmptyString>(getNonEmptyStringFromUnknown, cookie.get("theme"));

    // TODO: Ensure the values are correct

    return {
        language: language != null ? language : Language.English,
        theme: theme,
    };
}
