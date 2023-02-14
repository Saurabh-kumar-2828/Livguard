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
