import {Link} from "@remix-run/react";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ProductType} from "~/productData";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {getMetadataForImage} from "~/utilities";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {FullWidthImage} from "~/components/images/fullWidthImage";

export function ProductCardTwoDetails({
    slug,
    productType,
    userPreferences,
    isBestSeller,
    imageRelativeUrl,
    productName,
    productPrice,
    capacity,
    warranty,
}: {
    slug: string;
    productType: ProductType;
    userPreferences: UserPreferences;
    isBestSeller?: boolean;
    imageRelativeUrl: string;
    productName: string;
    productPrice: string;
    capacity: string;
    warranty: string;
}) {
    return (
        <Link
            to={`/product/${slug}`}
            className="tw-w-full tw-h-full tw-grid tw-grid-cols-1 lg-bg-secondary-100 tw-rounded-lg"
        >
            {isBestSeller != null && isBestSeller === true ? (
                <div className="tw-row-start-1 tw-h-1rem lg-stabilizers-best-seller-gradient tw-rounded-tr-lg tw-place-self-end tw-text-xs tw-px-3 tw-py-1 lg:tw-px-4 tw-flex tw-flex-row tw-items-center !tw-text-secondary-900-dark">
                    <span>{getVernacularString("14e0e286-5fd7-43aa-a6f3-5b3b9a0ec71f", userPreferences.language)}</span>
                </div>
            ) : (
                <VerticalSpacer className="tw-h-[1.5rem]" />
            )}

            <div className="tw-p-4 tw-grid tw-grid-flow-row">
                <FullWidthImage relativePath={imageRelativeUrl} />

                <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900 tw-whitespace-nowrap">{productName}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-items-center tw-w-full">
                    <img
                        className="tw-col-start-2 tw-invert dark:tw-invert-0"
                        src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/4/capacity.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                    />
                    <span className="tw-col-start-4 tw-text-center lg-text-icon lg:lg-text-body lg:!lg-text-secondary-900">{capacity}</span>
                </div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-items-center tw-w-full">
                    <img
                        className="tw-col-start-2 tw-invert dark:tw-invert-0"
                        src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/4/warranty.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                    />
                    <span className="tw-col-start-4 tw-text-center lg-text-icon lg:lg-text-body lg:!lg-text-secondary-900">{warranty}</span>
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-w-full tw-text-center lg-text-secondary-700">
                    {`${getVernacularString("abce92ec-fd9a-4578-ab56-ddfd9fdafe72", userPreferences.language)}${productPrice}${getVernacularString(
                        "0044b486-6eca-4e3a-abf0-102eede6e10c",
                        userPreferences.language,
                    )}`}
                </div>

                <VerticalSpacer className="tw-h-4" />

                <button className="lg-cta-outline-button lg-cta-outline-button-transition tw-w-full tw-text-center tw-px-1">
                    {getVernacularString("063dc56b-910e-4a48-acb8-8f52668a4c72", userPreferences.language)}
                </button>
            </div>
        </Link>
    );
}