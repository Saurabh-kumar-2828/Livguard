import {Link} from "@remix-run/react";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {FullWidthImage} from "~/components/images/simpleFullWidthImage";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import type {ProductType} from "~/productData.types";
import type {UserPreferences} from "~/typeDefinitions";
import {getMetadataForImage} from "~/utilities";

import {useContext} from "react";
import {ContentProviderContext} from "~/contexts/contentProviderContext";

export function SubCategoryProductsInternal({
    userPreferences,
    featuredProducts,
    refs,
    navigatorsContainerClassName,
    categoriesGridContainerClassName,
    vehicleImageClassName,
    vehicleImageLeftClassName,
    vehicleImageRightClassName,
    productImageClassName,
    productImageLeftClassName,
    productImageRightClassName,
}: {
    userPreferences: UserPreferences;
    featuredProducts: {
        [key: string]: {
            title: string;
            vehicleImageRelativeUrl: string;
            productImageRelativeUrl: string;
            products: Array<{
                productType: ProductType;
                name: string;
                slug: string;
                capacity: string;
                warranty: string;
                price: string | number | null;
            }>;
        };
    };
    refs: Array<React.Ref<HTMLDivElement | null>>;
    navigatorsContainerClassName?: string;
    categoriesGridContainerClassName?: string;
    vehicleImageClassName?: string;
    vehicleImageLeftClassName?: string;
    vehicleImageRightClassName?: string;
    productImageClassName?: string;
    productImageLeftClassName?: string;
    productImageRightClassName?: string;
}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <>
            <div className="lg:tw-grid lg:tw-justify-center">
                <div className={navigatorsContainerClassName}>
                    {refs.map((ref, refIndex) => {
                        return (
                            <div
                                className="lg:tw-w-fit lg-card tw-py-2 tw-px-4 lg:tw-px-8 tw-text-center tw-rounded-lg tw-cursor-pointer"
                                onClick={() => {
                                    ref.current?.scrollIntoView();
                                }}
                                key={refIndex}
                            >
                                {contentData.getContent(featuredProducts[Object.keys(featuredProducts)[refIndex]].title)}
                            </div>
                        );
                    })}
                </div>
            </div>

            <VerticalSpacer className="tw-h-10" />

            <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row tw-gap-y-10", categoriesGridContainerClassName)}>
                {Object.values(featuredProducts).map((category, categoryIndex) => {
                    const orientation = categoryIndex % 2 === 0 ? "left" : "right";
                    return (
                        <div
                            key={categoryIndex}
                            className="tw-relative"
                        >
                            <div
                                className="tw-invisible tw-absolute tw-top-[-6.5rem] tw-z-[-10] tw-h-[10.5rem] lg:tw-h-[6.5rem]"
                                ref={refs[categoryIndex]}
                            ></div>

                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-grid tw-grid-flow-row lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:tw-p-4 tw-rounded-lg",
                                    orientation === "left"
                                        ? "lg-automotive-bg-gradient-left-to-right-vertical-light dark:lg-automotive-bg-gradient-left-to-right-vertical-dark lg:lg-automotive-bg-gradient-left-to-right-light lg:dark:lg-automotive-bg-gradient-left-to-right-dark"
                                        : "lg-automotive-bg-gradient-right-to-left-vertical-light dark:lg-automotive-bg-gradient-right-to-left-vertical-dark lg:lg-automotive-bg-gradient-right-to-left-light lg:dark:lg-automotive-bg-gradient-right-to-left-dark",
                                )}
                            >
                                <div
                                    className={concatenateNonNullStringsWithSpaces(
                                        "lg:tw-row-start-1 tw-w-full tw-h-full tw-relative tw-isolate lg:tw-p-4",
                                        orientation === "left" ? "lg:tw-col-start-1" : "lg:tw-col-start-2",
                                    )}
                                >
                                    <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
                                    <div
                                        className={concatenateNonNullStringsWithSpaces(
                                            "lg:tw-row-start-1 lg:tw-col-start-1 tw-text-center lg-text-title1",
                                            orientation === "left" ? "lg:tw-text-left" : "lg:tw-text-right",
                                        )}
                                    >
                                        {contentData.getContent(category.title)} ({category.products.length})
                                    </div>
                                    <VerticalSpacer className="tw-h-4" />
                                    <div className={concatenateNonNullStringsWithSpaces(vehicleImageClassName, orientation === "left" ? vehicleImageLeftClassName : vehicleImageRightClassName)}>
                                        <FullWidthImage
                                            className="tw-z-[2]"
                                            relativePath={category.vehicleImageRelativeUrl}
                                        />
                                    </div>
                                    <img
                                        className={concatenateNonNullStringsWithSpaces(productImageClassName, orientation === "left" ? productImageLeftClassName : productImageRightClassName)}
                                        src={getAbsolutePathForRelativePath(getMetadataForImage(category.productImageRelativeUrl).finalUrl, ImageCdnProvider.Bunny, null, null)}
                                    />
                                </div>

                                <VerticalSpacer className="tw-h-6 lg:tw-hidden" />

                                {category.products.length > 1 ? (
                                    <CarouselStyle4
                                        items={(category.products.length == 2 ? [...category.products, ...category.products] : category.products).map((product, productIndex) => {
                                            return (
                                                <BatteryCard
                                                    userPreferences={userPreferences}
                                                    productName={product.name}
                                                    productPrice={product.price}
                                                    slug={product.slug}
                                                    capacity={`${product.capacity} ${contentData.getContent("c4c53678-fb9a-41c2-8782-de0690cffdd4")}`}
                                                    warranty={`${product.warranty} ${contentData.getContent("95a938d7-dd71-46de-80b0-a417845dfb4d")}`}
                                                    productType={product.productType}
                                                    // isBestSeller={product.isBestSeller}
                                                    imageRelativeUrl={category.productImageRelativeUrl}
                                                    key={productIndex}
                                                />
                                            );
                                        })}
                                        itemContainerClassName=""
                                        slidesContainerClassName="!tw-auto-cols-[min(100%,15rem)] lg:!tw-auto-cols-[50%]"
                                        controlsContainerClassName="tw-p-4"
                                        className={concatenateNonNullStringsWithSpaces(
                                            "lg:tw-row-start-1 lg:tw-row-span-full lg:tw-py-4",
                                            orientation === "left" ? "lg:tw-col-start-2" : "lg:tw-col-start-1",
                                        )}
                                        emblaAlignProp="start"
                                        chevronButtonsDivisionFactor={category.products.length == 2 ? 2 : 1}
                                    />
                                ) : category.products.length == 2 ? (
                                    <div
                                        className={concatenateNonNullStringsWithSpaces(
                                            "lg:tw-row-start-1 lg:tw-row-span-full lg:tw-py-4 tw-grid tw-justify-center !tw-auto-cols-[min(100%,15rem)] lg:!tw-auto-cols-[50%]",
                                            orientation === "left" ? "lg:tw-col-start-2" : "lg:tw-col-start-1",
                                        )}
                                    >
                                        {category.products.map((product, productIndex) => {
                                            return (
                                                <div
                                                    className="tw-px-3"
                                                    key={productIndex}
                                                >
                                                    <BatteryCard
                                                        userPreferences={userPreferences}
                                                        productName={product.name}
                                                        productPrice={product.price}
                                                        slug={product.slug}
                                                        capacity={`${product.capacity} ${contentData.getContent("c4c53678-fb9a-41c2-8782-de0690cffdd4")}`}
                                                        warranty={`${product.warranty} ${contentData.getContent("95a938d7-dd71-46de-80b0-a417845dfb4d")}`}
                                                        productType={product.productType}
                                                        // isBestSeller={product.isBestSeller}
                                                        imageRelativeUrl={category.productImageRelativeUrl}
                                                    />
                                                </div>
                                            );
                                        })}

                                        <VerticalSpacer className="tw-h-4" />
                                    </div>
                                ) : (
                                    <div
                                        className={concatenateNonNullStringsWithSpaces(
                                            "lg:tw-row-start-1 lg:tw-row-span-full lg:tw-py-4 tw-grid tw-justify-center !tw-auto-cols-[min(100%,15rem)] lg:!tw-auto-cols-[50%]",
                                            orientation === "left" ? "lg:tw-col-start-2" : "lg:tw-col-start-1",
                                        )}
                                    >
                                        {category.products.map((product, productIndex) => {
                                            return (
                                                <div
                                                    className="tw-px-3"
                                                    key={productIndex}
                                                >
                                                    <BatteryCard
                                                        userPreferences={userPreferences}
                                                        productName={product.name}
                                                        productPrice={product.price}
                                                        slug={product.slug}
                                                        capacity={`${product.capacity} ${contentData.getContent("c4c53678-fb9a-41c2-8782-de0690cffdd4")}`}
                                                        warranty={`${product.warranty} ${contentData.getContent("95a938d7-dd71-46de-80b0-a417845dfb4d")}`}
                                                        productType={product.productType}
                                                        // isBestSeller={product.isBestSeller}
                                                        imageRelativeUrl={category.productImageRelativeUrl}
                                                    />
                                                </div>
                                            );
                                        })}

                                        <VerticalSpacer className="tw-h-4" />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

function BatteryCard({
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
    productPrice: string | number | null;
    capacity: string;
    warranty: string;
}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <Link
            to={`/product/${slug}`}
            className="tw-w-full tw-h-full tw-grid tw-grid-cols-1 lg-card lg-bg-secondary-100 tw-rounded-lg"
        >
            {isBestSeller != null && isBestSeller === true ? (
                <div className="tw-row-start-1 tw-h-1rem lg-stabilizers-best-seller-gradient tw-rounded-tr-lg tw-place-self-end tw-text-xs tw-px-3 tw-py-1 lg:tw-px-4 tw-flex tw-flex-row tw-items-center !tw-text-secondary-900-dark">
                    <span>{contentData.getContent("14e0e286-5fd7-43aa-a6f3-5b3b9a0ec71f")}</span>
                </div>
            ) : (
                <VerticalSpacer className="tw-h-[1.5rem]" />
            )}

            <div className="tw-p-4 tw-grid tw-grid-flow-row">
                <FullWidthImage relativePath={`/livguard/products/${slug}/thumbnail.png`} />

                <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900">{productName}</div>

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
                    {productPrice == null
                        ? contentData.getContent("ccfce5e6-08ac-44b9-84ad-ef7891d7661b")
                        : `${contentData.getContent("abce92ec-fd9a-4578-ab56-ddfd9fdafe72")}${productPrice}${contentData.getContent("0044b486-6eca-4e3a-abf0-102eede6e10c", userPreferences.language)}`}
                </div>

                <VerticalSpacer className="tw-h-4" />

                <button className="lg-cta-outline-button lg-cta-outline-button-transition tw-text-primary-500-light dark:tw-text-secondary-100-light tw-w-full tw-text-center tw-px-1">
                    {contentData.getContent("063dc56b-910e-4a48-acb8-8f52668a4c72")}
                </button>
            </div>
        </Link>
    );
}
