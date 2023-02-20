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

export enum InverterType {
    sine = "Sine Wave",
    square = "Square Wave",
}

export enum BatteryType {
    flat = "Flat Plate Battery",
    tubular = "Tubular Battery",
}
