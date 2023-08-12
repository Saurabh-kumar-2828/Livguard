import type {ImageMetadata} from "~/global-common-typescript/typeDefinitions";
import {imageMetadataLibrary} from "~/imageMetadataLibrary";
import {AccessoriesSubType, AutomotiveSubType, BatterySubType, ComboSubType, InverterSubType, ProductType} from "~/productData";

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
    // TODO: Handle combos
    const capitalizedName = internalName.toUpperCase();
    if (capitalizedName.endsWith("I")) {
        return `${capitalizedName.slice(0, -1)}i`;
    } else {
        return capitalizedName;
    }
}

export function getExtensionFromFilename(filename: string): string | null {
    if (!filename.includes(".")) {
        return null;
    }

    const extension = filename.split(".").pop();
    if (extension == null || extension.length === 0) {
        return null;
    }

    return `.${extension}`;
}

export function getDownloadCatalogueLink(type: ProductType | null, subType: InverterSubType | BatterySubType | ComboSubType | AutomotiveSubType | AccessoriesSubType | null): string {
    if (type == null) {
        return "https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf";
    }

    if (type === ProductType.inverter) {
        if (subType === InverterSubType.home) {
            return "https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf";
        }
        if (subType === InverterSubType.hkva) {
            return "https://www.livguard.com/static-assets/leaflet-hkva.pdf";
        }
    }

    if (type === ProductType.battery || type === ProductType.combo) {
        return "https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf";
    }

    if (type === ProductType.automotiveBattery) {
        if (subType === AutomotiveSubType.twoWheeler) {
            return "https://www.livguard.com/static-assets/leaflet-two-wheeler.pdf";
        }

        if (subType === AutomotiveSubType.threeWheeler) {
            return "https://www.livguard.com/static-assets/leaflet-three-wheeler.pdf";
        }
        if (subType === AutomotiveSubType.carNSuv) {
            return "https://www.livguard.com/static-assets/leaflet-car-n-suv.pdf";
        }
        if (subType === AutomotiveSubType.commercial) {
            return "https://www.livguard.com/static-assets/leaflet-commercial-vehicles.pdf";
        }
        if (subType === AutomotiveSubType.tractor) {
            return "https://www.livguard.com/static-assets/leaflet-tractor.pdf";
        }
        if (subType === AutomotiveSubType.eRickshaw) {
            return "https://www.livguard.com/static-assets/leaflet-e-rickshaw.pdf";
        }
    }

    if (type === ProductType.accessories) {
        if (subType === AccessoriesSubType.trolley) {
            return "";
        }

        if (subType === AccessoriesSubType.eRickshawCharger) {
            return "https://www.livguard.com/static-assets/leaflet-e-rickshaw.pdf";
        }
    }

    // TODO: Fix this later, left it as default return for now. An edge case should never come unless our data is wrong
    return "https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf";
}
