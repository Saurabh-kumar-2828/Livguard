import {UserPreferences} from "~/typeDefinitions";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {getMetadataForImage} from "~/utilities";
import {ImageCdnProvider} from "~/common--type-definitions/typeDefinitions";
import {ProductType} from "~/productData.types";
import {Link} from "@remix-run/react";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {useContext} from "react";
import {ContentProviderContext} from "~/contexts/contentProviderContext";

export function ProductCardFourDetails({
    userPreferences,
    isBestSeller,
    productType,
    batterySlug,
    imageRelativeUrl,
    name,
    description,
    warranty,
    capacity,
    polarity,
    dimensions,
}: {
    userPreferences: UserPreferences;
    isBestSeller?: boolean;
    productType: ProductType;
    batterySlug: string;
    imageRelativeUrl: string;
    name: string;
    description: string;
    warranty: string;
    capacity: string;
    polarity: string;
    dimensions: string;
}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 lg-card tw-border-[1px] tw-border-secondary-900-light dark:tw-border-secondary-900-dark tw-rounded-lg tw-px-4 tw-py-3 lg:tw-py-6 lg:tw-px-8">
            <div className="tw-col-start-1 tw-grid tw-grid-flow-row tw-place-items-center">
                <div className="lg:tw-hidden lg-bg-our-suggestions tw-p-2">{contentData.getContent("e2ceac17-9977-44d4-933b-1f221aed6c85")}</div>
                <div className="tw-w-full tw-aspect-square">
                    <FullWidthImage relativePath={imageRelativeUrl} />
                </div>

                <Link
                    className="tw-hidden lg:tw-block"
                    to={batterySlug}
                >
                    <button className="lg-cta-button">{contentData.getContent("30de7643-a5bc-49a0-b85f-bfa770836330")}</button>
                </Link>
            </div>

            <div className="tw-col-start-1 lg:tw-col-start-2 tw-grid tw-grid-flow-row">
                <div className="lg-text-title1 tw-text-center lg:tw-text-left">{name}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="lg-text-body tw-text-center lg:tw-text-left">{description}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-grid tw-grid-rows-[auto_auto_minmax(0,1fr)] md:max-lg:tw-grid-cols-1 md:max-lg:tw-grid-flow-row md:max-lg:tw-place-items-center md:max-lg:tw-place-self-center md:max-lg:tw-w-fit tw-grid-cols-2 tw-gap-x-4 tw-gap-y-8">
                    <div className="tw-row-start-1 tw-col-start-1 md:max-lg:tw-w-full tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2 lg:tw-place-self-start">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/3/3.warranty.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("95a938d7-dd71-46de-80b0-a417845dfb4d")}</div>
                            <div className="tw-row-start-3">{warranty}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-1 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-2 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/3/3.capacity.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("c4c53678-fb9a-41c2-8782-de0690cffdd4")}</div>
                            <div className="tw-row-start-3">{capacity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-1 md:max-lg:tw-w-full md:max-lg:tw-row-start-3 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/3/3.polarity.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("05bda873-c84c-4376-8a17-6503ac9d2820")}</div>
                            <div className="tw-row-start-3">{polarity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-4 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/3/3.dimensions.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("9c719db5-fa53-423e-9b96-a77602b3c5bc")}</div>
                            <div className="tw-row-start-3">{dimensions}</div>
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <Link
                    className="tw-place-self-center lg:tw-hidden"
                    to={batterySlug}
                >
                    <button className="lg-cta-button">{contentData.getContent("30de7643-a5bc-49a0-b85f-bfa770836330")}</button>
                </Link>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
            </div>
        </div>
    );
}
