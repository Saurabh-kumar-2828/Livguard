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

export type Dealer = {
    state: string;
    dealerCode: string;
    name: string;
    address: string;
    phoneNumber: string;
    pinCode: string;
    city: string;
    latitude: number;
    longitude: number;
    stateCode: string;
}

export const salutations: {[key: string]: {[Language.English]: string; [Language.Hindi]: string}} = {
    AN: {[Language.English]: "	Namaste", [Language.Hindi]: "	नमस्ते!"},
    AD: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!"},
    AP: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!"},
    AS: {[Language.English]: "	Namaskar!", [Language.Hindi]: "नमस्कार!"},
    BR: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!!"},
    CG: {[Language.English]: "	Sat sri akal!", [Language.Hindi]: "सत् श्री अकाल!"},
    CH: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!!"},
    DNHDD: {[Language.English]: "Kem Chho!", [Language.Hindi]: "केम छो!"},
    DL: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!!"},
    GA: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!!"},
    GJ: {[Language.English]: "	Kem Chho!", [Language.Hindi]: "केम छो!"},
    HR: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!!"},
    HP: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!"},
    JK: {[Language.English]: "	Namaskar!", [Language.Hindi]: "नमस्कार!"},
    JH: {[Language.English]: "	Pranaam!", [Language.Hindi]: "प्रणाम!"},
    KA: {[Language.English]: "	Namaskara!", [Language.Hindi]: "नमस्कारा!"},
    KL: {[Language.English]: "	Namaskaram!", [Language.Hindi]: "नमस्कराम!"},
    LD: {[Language.English]: "	Namaskaram!", [Language.Hindi]: "नमस्कराम!"},
    MP: {[Language.English]: "	Namaskar!", [Language.Hindi]: "नमस्कार!"},
    MH: {[Language.English]: "	Namaskar!", [Language.Hindi]: "नमस्कार!"},
    MN: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!"},
    ML: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!"},
    MZ: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!"},
    NL: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!"},
    OD: {[Language.English]: "	Namaskar!", [Language.Hindi]: "नमस्कार!"},
    PY: {[Language.English]: "	Namaskar!", [Language.Hindi]: "नमस्कार!"},
    PB: {[Language.English]: "	Sat sri akal!", [Language.Hindi]: "सत् श्री, अकाल"},
    RJ: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!"},
    SK: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!"},
    TN: {[Language.English]: "	Vanakkam!", [Language.Hindi]: "वनक्कम!"},
    TS: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!"},
    TR: {[Language.English]: "	Kemon acho!", [Language.Hindi]: "केमोन आछो!"},
    UP: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!"},
    UK: {[Language.English]: "	Namaste!", [Language.Hindi]: "नमस्ते!"},
    WB: {[Language.English]: "	Kemon acho!", [Language.Hindi]: "केमोन आछो!"},
};