import {getNonEmptyStringOrNull} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {getUserPreferencesCookie} from "~/server/userPreferencesCookie.server";
import {Language, UserPreferences} from "~/typeDefinitions";

export async function getUserPreferencesFromCookies(request: Request): Promise<UserPreferences | Error> {
    const cookie = await getUserPreferencesCookie(request.headers.get("Cookie"));

    const language = getNonEmptyStringOrNull(cookie.get("language"));
    const theme = getNonEmptyStringOrNull(cookie.get("theme"));

    // TODO: Ensure the values are correct

    return {
        language: language != null ? language : Language.English,
        theme: theme,
    };
}
