import {Uuid} from "~/global-common-typescript/typeDefinitions";

export type UserDetails = {
    id: Uuid;
};

export type WebsiteConfiguration = {
    websiteBaseUrl: string;
    debugMode: boolean;
    imageCdnProvider: ImageCdnProvider;
};

// export const zodAccessToken = zod.object();
export type UserPreferences = {
    language: Language;
    theme: Theme;
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

export function languageToShortHumanFriendlyFormat(language: Language) {
    switch (language) {
        case Language.English:
            return "EN";
        case Language.Hindi:
            return "हि";
        case Language.Marathi:
            return "मराठी";
        default:
            const exhaustiveCheck: never = language;
            throw new Error(`Unexpected value for Language: ${language}`);
    }
}

export enum BatteryType {
    TT = "Tall Tubular",
    ST = "Short Tubular",
    STT = "Short Tall Tubular",
    STJ = "Short Tubular Jumbo",
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

export function getLanguageFromUnknown(input: unknown): Language {
    // TODO: Replace with zod
    if (typeof(input) != "string") {
        throw new Error(`${input} of type ${typeof(input)} is not a valid Language!`);
    }

    return (input == Language.Hindi ? Language.Hindi : input == Language.Marathi ? Language.Marathi : Language.English);
}

export function getThemeFromUnknown(input: unknown): Theme {
    // TODO: Replace with zod
    if (typeof(input) != "string") {
        throw new Error(`${input} of type ${typeof(input)} is not a valid Theme!`);
    }

    return (input == Theme.Dark ? Theme.Dark : Theme.Light);
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

export enum FormType {
    otpVerification = "otp-verification",
    contactUsSubmission = "contact-us-submission",
    applyForDealership = "apply-for-dealership",
    offerContactUsSubmission = "offer-contact-us-submission"
}
