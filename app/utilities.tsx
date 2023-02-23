import {Theme, UserPreferences} from "~/typeDefinitions";

//TODO: replace this with production url correctly
export function getUrlFromRequest(request: Request) {
    if (process.env.NODE_ENV == "production") {
        return request.url.replace(`http://localhost:${process.env.PORT}`, `${process.env.WEBSITE_BASE_URL}`);
    } else {
        return request.url;
    }
}

export function getRedirectToUrlFromRequest(request: Request) {
    return request.url.replace(`http://localhost:${process.env.PORT}`, "");
}

// export function getCalculatedTheme(userPreferences: UserPreferences): Theme | null {
//     if (userPreferences.theme == Theme.Dark) {
//         return Theme.Dark;
//     } else if (userPreferences.theme == Theme.Light) {
//         return Theme.Light;
//     }

//     if (typeof window === "undefined") {
//         console.log("asd");
//         return null;
//     }

//     if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//         return Theme.Dark;
//     } else {
//         return Theme.Light;
//     }
// }
