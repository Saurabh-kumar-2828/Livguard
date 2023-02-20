import {Uuid} from "~/global-common-typescript/typeDefinitions";

export type UserDetails = {
    id: Uuid;
};

// export const zodAccessToken = zod.object();
export type UserPreferences = {
    language: Language;
    theme: Theme | null;
};

export enum Language {
    English = "en-in",
    Hindi = "hi-in",
    Marathi = "mr-in",
}

export enum Theme {
    Dark = "dark",
    Light = "light",
}

export function languageToHumanFriendlyString(language: Language) {
    switch (language) {
        case Language.English:
            return "English";
        case Language.Hindi:
            return "हिंदी";
        case Language.Marathi:
            return "मराठी";
        default:
            const exhaustiveCheck: never = language;
            throw new Error(`Unexpected value for Language: ${language}`);
    }
}

export enum BatteryType {
    flat = "Flat Plate Battery",
    tubular = "Tubular Battery",
}

export enum InverterType {
    sine = "Sine Wave",
    square = "Square Wave"
}

// TODO: Not done properly
export function themeToHumanFriendlyString(userPreferences: UserPreferences, theme: Theme | null) {
    switch (userPreferences.language) {
        case Language.English:
            switch (theme) {
                case Theme.Dark:
                    return "Dark Theme";
                case Theme.Light:
                    return "Light Theme";
                case null:
                    return "System Theme";
                default:
                    const exhaustiveCheck: never = theme;
                    throw new Error(`Unexpected value for Theme: ${theme}`);
            }
        case Language.Hindi:
            switch (theme) {
                case Theme.Dark:
                    return "Dark Theme";
                case Theme.Light:
                    return "Light Theme";
                case null:
                    return "System Theme";
                default:
                    const exhaustiveCheck: never = theme;
                    throw new Error(`Unexpected value for Theme: ${theme}`);
            }
        default:
            const exhaustiveCheck: never = theme;
            throw new Error(`Unexpected value for Theme: ${theme}`);
    }
}
