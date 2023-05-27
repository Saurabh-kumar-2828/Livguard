import type {ImageMetadata} from "~/global-common-typescript/typeDefinitions";
import {imageMetadataLibrary} from "~/imageMetadataLibrary";

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

export function getMetadataForImage(relativePath: string) {
    const imageMetadata = imageMetadataLibrary[relativePath];

    if (imageMetadata != null) {
        return imageMetadata;
    }

    // throw new Error(`Image metadata not updated for image ${relativePath}`);
    console.error(`Image metadata not updated for image ${relativePath}`);
    // console.trace();

    const imageMetadata_: ImageMetadata = {
        width: 4,
        height: 3,
        finalUrl: relativePath,
    };

    return imageMetadata_;
}

export function convertProductInternalNameToPublicName(internalName: string): string {
    // TOOD: Ensure this logic is correct
    // TODO: Handle jodis
    const capitalizedName = internalName.toUpperCase();
    if (capitalizedName.endsWith("I")) {
        return `${capitalizedName.slice(0, -1)}i`;
    } else {
        return capitalizedName;
    }
}
