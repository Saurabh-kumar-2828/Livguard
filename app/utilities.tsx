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

export function appendSpaceToString(input: string): string {
    return input + " ";
}

export function enumFromStringValue<T>(enum_: {[s: string]: T}, input: string): T | null {
    return (Object.values(enum_) as unknown as string[]).includes(input) ? (input as unknown as T) : null;
}

// export function pollyfilledStructuredClone(obj: any) {
//     if (structuredClone != null) {
//         return structuredClone(obj);
//     }
//     return JSON.parse(JSON.stringify(obj));
// }
