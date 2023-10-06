import type {ImageMetadata} from "~/global-common-typescript/typeDefinitions";
import {imageMetadataLibrary} from "~/imageMetadataLibrary";
import {AccessoriesSubType, AutomotiveSubType, BatterySubType, ComboSubType, InverterSubType, ProductType} from "~/productData.types";

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

export function scrollToElement(element: HTMLElement) {
    const topOffset = 48 + 56 + 64;

    const elementTop = element.getBoundingClientRect().top;

    window.scrollTo({top: Math.max(window.scrollY + elementTop - topOffset, 0)});
}

// export function scrollToElementByRef(ref: React.RefObject<HTMLElement>) {
//     const element = ref.current;

//     if (element == null) {
//         return;
//     }

//     scrollToElement(element);
// }

export function scrollToElementById(id: string) {
    const element = document.getElementById(id);

    if (element == null) {
        return;
    }

    scrollToElement(element);
}

export const secondaryNavThreshold = 0.3;

export function getProductNameFromProductTypeAndSubtype(productType: ProductType, productSubType: InverterSubType | BatterySubType | ComboSubType | AutomotiveSubType | AccessoriesSubType) {
    let subType;

    const typeOfProduct = ProductType[productType];
    if (typeOfProduct === "inverter") {
        subType = InverterSubType[productSubType];
    } else if (typeOfProduct === "battery") {
        subType = BatterySubType[productSubType];
    } else if (typeOfProduct === "combo") {
        subType = ComboSubType[productSubType];
    } else if (typeOfProduct === "automotiveBattery") {
        subType = AutomotiveSubType[productSubType];
    } else if (typeOfProduct === "accessories") {
        subType = AccessoriesSubType[productSubType];
    }

    const convertToTitleCase = {
        homeinverter: "7ac7ba45-39e6-44a8-88a1-9e6f74d19f9d",
        hkvainverter: "e55064a2-1958-4dbd-88c2-4174886c1164",
        homebattery: "46ede266-bd2f-44bc-b18e-05380293c4a4",
        homecombo: "a80664dd-7225-4870-9254-dc4ae03ecbc8",
        twoWheelerautomotiveBattery: "305a3a77-0276-46aa-883c-68951e32dac1",
        threeWheelerautomotiveBattery: "cba7f5de-c5ef-4fd7-a5d0-187da1bda0d9",
        carNSuvautomotiveBattery: "bc58eec8-4bcf-4539-8a63-fbb7f40b1718",
        tractorautomotiveBattery: "88365f6c-f815-461c-8dc2-7b6b51ebc61a",
        commercialautomotiveBattery: "c7c35500-944e-40b6-9dd0-8d4d8b55fdae",
        eRickshawautomotiveBattery: "afbac94d-3beb-4bee-9dbf-fb3561fabcee",
        trolleyaccessories: "12ad1435-4d7e-4208-a4a8-621772455013",
        eRickshawChargeraccessories: "ccad5a29-0772-48cd-9ef7-cf443b5a9657",
    };

    const value = subType + ProductType[productType];

    return convertToTitleCase[value];
}

export function getBreadcrumbsConditionally(
    productType: ProductType,
    productSubType: InverterSubType | BatterySubType | ComboSubType | AutomotiveSubType | AccessoriesSubType,
): {contentId: string; link: string} {
    const breadcrumb =
        productType == ProductType.inverter && productSubType == InverterSubType.home
            ? {contentId: "377e65a0-631b-4188-b63a-7ae3661bbe85", link: "/inverter-for-home"}
            : productType == ProductType.inverter && productSubType == InverterSubType.hkva
            ? {contentId: "4b6c134b-096e-49cf-9e12-d53c0e3cf059", link: "/high-capacity-inverters"}
            : productType == ProductType.battery
            ? {contentId: "09b8631b-98e0-4ae8-bafb-65bb57001872", link: "/inverter-batteries"}
            : productType == ProductType.combo
            ? {contentId: "fd6848f1-04eb-4f76-845f-e56d93835de6", link: "/campaigns/inverter-and-battery-jodi"}
            : productType == ProductType.automotiveBattery && productSubType == AutomotiveSubType.carNSuv
            ? {contentId: "968b8d68-221e-401e-9876-095dc769f912", link: "/car-and-suv-batteries"}
            : productType == ProductType.automotiveBattery && productSubType == AutomotiveSubType.twoWheeler
            ? {contentId: "f46c6878-8d56-46f7-bfa0-f01c7a604436", link: "/two-wheeler-batteries"}
            : productType == ProductType.automotiveBattery && productSubType == AutomotiveSubType.threeWheeler
            ? {contentId: "5ec9401e-43ed-47cd-a0f9-3ef981780ca1", link: "/three-wheeler-batteries"}
            : productType == ProductType.automotiveBattery && productSubType == AutomotiveSubType.tractor
            ? {contentId: "5a1d25fa-a3af-4cab-9cdf-43b6f0675973", link: "/tractor-batteries"}
            : productType == ProductType.automotiveBattery && productSubType == AutomotiveSubType.commercial
            ? {contentId: "530f4898-7fd2-474b-809b-905a2b722d83", link: "/bus-and-truck-batteries"}
            : productType == ProductType.automotiveBattery && productSubType == AutomotiveSubType.eRickshaw
            ? {contentId: "b8b98109-dcab-45bf-873e-db9da7c798eb", link: "/e-rickshaw-batteries"}
            : productType == ProductType.accessories && productSubType == AccessoriesSubType.trolley
            ? {contentId: "6596ffc6-6377-4446-92b9-4cac254af278", link: "/inverter-trolley"}
            : productType == ProductType.accessories && productSubType == AccessoriesSubType.eRickshawCharger
            ? {contentId: "9ca81248-816e-4978-90b0-34b4d0dd69e9", link: "/e-rickshaw-charger"}
            : {contentId: "377e65a0-631b-4188-b63a-7ae3661bbe85", link: "/inverter-for-home"};

    return breadcrumb;
}
