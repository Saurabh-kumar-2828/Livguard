import {ActionFunction, LoaderFunction, json} from "@remix-run/node";
import {Link, useActionData, useLoaderData} from "@remix-run/react";
import {useResizeDetector} from "react-resize-detector";
import {Facebook, Instagram, Linkedin, Twitter, X, Youtube} from "react-bootstrap-icons";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {insertServiceRequests} from "~/backend/dealer.server";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/components/images/coverImage";
import {PageScaffold} from "~/components/pageScaffold";
import {FaqSectionInternal} from "~/components/faqs";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Theme, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {appendSpaceToString, convertProductInternalNameToPublicName, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {WhatsBestForYouComponent} from "~/components/category/common";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {ProductType} from "~/productData";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {CarouselStyle6} from "~/components/carouselStyle6";
import {FixedHeightImage} from "~/components/images/fixedHeightImage";

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    pageUrl: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
    };

    return loaderData;
};

export type ActionData = {
    error: string | null;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~ inside action data ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    const issueDetails = safeParse(getStringFromUnknown, body.get("issueDetails"));
    const contactNumber = safeParse(getStringFromUnknown, body.get("contactNumber"));
    const emailId = safeParse(getStringFromUnknown, body.get("emailId"));
    const name = safeParse(getStringFromUnknown, body.get("name"));
    const pinCode = safeParse(getStringFromUnknown, body.get("pinCode"));
    const city = safeParse(getStringFromUnknown, body.get("city"));
    const state = safeParse(getStringFromUnknown, body.get("state"));
    const serviceNumber = safeParse(getStringFromUnknown, body.get("serviceNumber"));
    const termsAndConditionsChecked = safeParse(getStringFromUnknown, body.get("termsAndConditionsChecked"));
    const utmParameters = safeParse(getStringFromUnknown, body.get("utmParameters"));
    const product = safeParse(getStringFromUnknown, body.get("product"));

    if (
        utmParameters === null ||
        termsAndConditionsChecked === null ||
        issueDetails === null ||
        contactNumber === null ||
        emailId === null ||
        name === null ||
        pinCode === null ||
        city === null ||
        state === null ||
        product === null
    ) {
        const actionData: ActionData = {
            error: "Inputs cannot be null! Error code: af16f518-6eef-4b8c-9ccf-34f86cee43c7",
        };
        return json(actionData);
    }

    const utmParametersDecoded = JSON.parse(utmParameters);

    const insertResult = await insertServiceRequests(generateUuid(), {
        issueDetails: issueDetails,
        product: product,
        contactNumber: contactNumber,
        emailId: emailId,
        name: name,
        pinCode: pinCode,
        city: city,
        state: state,
        serviceNumber: serviceNumber,
        utmParameters: utmParametersDecoded,
        termsAndConditionsChecked: termsAndConditionsChecked,
    });

    if (insertResult instanceof Error) {
        const actionData: ActionData = {
            error: "Error in submiting form! Error code: 7b84af66-174a-4b89-bbfa-3a51d9aa8862",
        };
        return json(actionData);
    }

    const actionData: ActionData = {
        error: null,
    };

    return json(actionData);
};

export default () => {
    const {userPreferences, redirectTo} = useLoaderData() as LoaderData;
    const actionData = useActionData() as ActionData;

    const utmSearchParameters = useUtmSearchParameters();

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
                breadcrumbs={[]}
            >
                <StabilizerPage
                    userPreferences={userPreferences}
                    actionData={actionData}
                />
            </PageScaffold>
        </>
    );
};

function StabilizerPage({userPreferences, actionData}: {userPreferences: UserPreferences; actionData: {error: string | null}}) {
    const utmParameters = useUtmSearchParameters();

    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <StabilizersThatAreMeantToLast
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <StabilizersForHome
                    userPreferences={userPreferences}
                    className="tw-row-start-5 lg:tw-col-span-full tw-px-2 lg:tw-px-[124px]"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-7 tw-grid lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] tw-col-span-full lg:lg-px-screen-edge-2 tw-gap-x-5">
                    <WeAreEverywhere
                        userPreferences={userPreferences}
                        className="tw-row-start-5 lg:tw-col-start-1 lg:tw-h-full"
                        showCtaButton={true}
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                    <ChooseTheBestStabilizer
                        userPreferences={userPreferences}
                        className="tw-row-start-7 lg:tw-row-start-5 lg:tw-col-start-2"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-8 lg:tw-row-start-8 tw-col-start-1 lg:tw-col-span-full" />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-9 lg:tw-row-start-9 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-10 lg:tw-row-start-10 tw-col-start-1 lg:tw-col-span-full" />

                <SocialHandles
                    userPreferences={userPreferences}
                    heading={{text1: "b0a3aa40-4b00-4bdd-88e0-67085fafa92b", text2: `c0f802cc-902b-4328-b631-a3fad8fc7d18`}}
                    className="tw-row-start-11 lg:tw-row-start-11 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem]"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-12 lg:tw-row-start-12 tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-9.5rem)] lg:tw-h-[70vh] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1.5rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_3.5rem] lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] tw-text-center",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={
                        containerHeight > containerWidth || containerWidth < 640 ? "/livguard/services-page/6/service_mobile_banner.jpg" : "/livguard/services-page/6/service_desktop_banner.jpg"
                    }
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full lg:tw-col-span-full"
                    key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/services-page/6/service_mobile_banner.jpg" : "/livguard/services-page/6/service_desktop_banner.jpg"}
                />
            )}

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg:tw-col-start-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {/* {getVernacularString("1f489840-705d-44b1-a18a-73a2645594de", userPreferences.language)} */}
                    Best Voltage
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg:tw-col-start-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {/* {getVernacularString("1f489840-705d-44b1-a18a-73a2645594de", userPreferences.language)} */}
                    Stabilizers for Home
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-5 tw-col-start-1 lg:tw-col-start-2">
                <div className="lg-text-body !tw-text-secondary-900-dark">
                    {/* {getVernacularString("5a7fe2d5-9f46-4bb4-814e-7f075f8ca843", userPreferences.language)} */}
                    Livguard, aims at offering “Smart and Innovative energy solutions” to its customers. Our company is determined at delivering quality,
                </div>
            </DefaultTextAnimation>
        </div>
    );
}

function StabilizersThatAreMeantToLast({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const StabilizerCard = ({title, description, imageRelativePath}: {title: string; description: string; imageRelativePath: string}) => {
        return (
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-grid tw-grid-rows-[1rem_auto_1rem_auto_1rem_auto_minmax(1rem,1fr)] tw-cols-[auto] tw-w-full tw-h-full tw-px-4 tw-py-4 tw-bg-secondary-100-dark tw-rounded-lg",
                    className,
                )}
            >
                <div className="tw-row-start-2">
                    <FullWidthImage relativePath={imageRelativePath} />
                </div>

                <div className="tw-row-start-4 tw-text-center lg-text-title1">{title}</div>

                <div className="tw-row-start-6 tw-text-center lg-text-body">{description}</div>
            </div>
        );
    };

    const stabilizersData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "categoryBatteriesS2Slide1Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide1Description",
            imageRelativePath: "/livguard/category/batteries/2/1.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide2Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide2Description",
            imageRelativePath: "/livguard/category/batteries/2/2.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide3Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide3Description",
            imageRelativePath: "/livguard/category/batteries/2/3.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide4Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide4Description",
            imageRelativePath: "/livguard/category/batteries/2/4.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide4Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide4Description",
            imageRelativePath: "/livguard/category/batteries/2/4.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide4Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide4Description",
            imageRelativePath: "/livguard/category/batteries/2/4.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide4Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide4Description",
            imageRelativePath: "/livguard/category/batteries/2/4.jpg",
        },
    ];

    return (
        <>
            <div className={className}>
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    {/* <div>{getVernacularString("74058229-5e75-4efe-833c-18009f248c6a", userPreferences.language)}</div> */}
                    <div>Batteries That Are</div>
                    {/* <div dangerouslySetInnerHTML={{__html: getVernacularString("afe86242-a8aa-4955-8951-516c560fc956", userPreferences.language)}} /> */}
                    <div>
                        <span className="lg-text-highlighted">Meant To Last</span>
                    </div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <CarouselStyle5
                    items={stabilizersData.map((batteryData, batteryDataIndex) => (
                        <StabilizerCard
                            title={getVernacularString(batteryData.titleTextContentPiece, userPreferences.language)}
                            description={getVernacularString(batteryData.bodyTextContentPiece, userPreferences.language)}
                            imageRelativePath={batteryData.imageRelativePath}
                            key={batteryDataIndex}
                        />
                    ))}
                    className="tw-mx-auto"
                    slidesContainerClassName=""
                />
            </div>
        </>
    );
}

function StabilizersForHome({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const featuredProducts = [
        {
            type: ProductType.battery,
            name: "LA 410 XS",
            slug: "it1584tt",
            isBestSeller: true,
            price: "XXXXX",
        },
        {
            type: ProductType.inverter,
            name: "LA 413 DP",
            slug: "lgs1600",
            price: "XXXXX",
        },
        {
            type: ProductType.battery,
            name: "LA 413 XS",
            price: "XXXXX",
            slug: "it1584tt",
        },
        {
            type: ProductType.inverter,
            name: "LA 413 XS",
            price: "XXXXX",
            slug: "lgs1600",
        },
        {
            type: ProductType.battery,
            slug: "it1584tt",
            name: "LA 517 XA",
            price: "XXXXX",
            isBestSeller: true,
        },
        {
            type: ProductType.inverter,
            slug: "lgs1600",
            price: "XXXXX",
            name: "LA 417 VX",
        },
        {
            type: ProductType.battery,
            slug: "it1584tt",
            price: "XXXXX",
            name: "LA 415 XS",
        },
        {
            type: ProductType.inverter,
            slug: "lgs1600",
            isBestSeller: true,
            name: "LA 415 XS",
            price: "XXXXX",
        },
        {
            type: ProductType.battery,
            slug: "it1584tt",
            isBestSeller: true,
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            type: ProductType.inverter,
            slug: "lgs1600",
            price: "XXXXX",
            name: "LA 413 DP",
        },
    ];

    return (
        <div className={className}>
            <div className="tw-grid tw-grid-cols-1">
                <h2 className="lg-text-headline tw-text-center">
                    {/* <div dangerouslySetInnerHTML={{__html: getVernacularString("5ac20616-07fb-44f4-bf6f-c5e16b272eb8", userPreferences.language)}} /> */}
                    <span className="lg-text-highlighted">Stabilizers</span>
                </h2>

                <h2 className="lg-text-headline tw-text-center">For Home</h2>

                <VerticalSpacer className="tw-h-2" />

                <StabilizerTypeSelector
                    userPreferences={userPreferences}
                    className=""
                />

                <VerticalSpacer className="tw-h-8" />

                <CarouselStyle6
                    items={featuredProducts.map((featuredProduct, featuredProductIndex) => (
                        <StabilizerCard
                            slug={featuredProduct.slug}
                            productType={featuredProduct.type}
                            productName={featuredProduct.name}
                            productPrice={featuredProduct.price}
                            userPreferences={userPreferences}
                            isBestSeller={featuredProduct.isBestSeller != null ? featuredProduct.isBestSeller : false}
                            key={featuredProductIndex}
                        />
                    ))}
                    slidesContainerClassName="!tw-auto-cols-[50%] lg:!tw-auto-cols-[25%] tw-grid-rows-[auto_auto] lg:tw-grid-rows-[auto_auto] tw-gap-y-8"
                    controlsContainerClassName="lg-px-screen-edge"
                    chevronButtonIndexChangeOffset={2}
                />
            </div>
        </div>
    );
}

function StabilizerTypeSelector({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const typeSelectorButtonsContent = [
        {
            iconUrl: "",
            textContent: "For AC",
        },
        {
            iconUrl: "",
            textContent: "For Mains",
        },
        {
            iconUrl: "",
            textContent: "For TVs",
        },
        {
            iconUrl: "",
            textContent: "For Refrigerator",
        },
    ];
    return <div className={concatenateNonNullStringsWithSpaces("tw-flex flex-row", className)}></div>;
}

function StabilizerCard({
    slug,
    productType,
    productName,
    productPrice,
    userPreferences,
    isBestSeller,
}: {
    slug: string;
    productType: ProductType;
    productName: string;
    productPrice: string;
    userPreferences: UserPreferences;
    isBestSeller: boolean;
}) {
    return (
        <>
            <div className="tw-grid tw-grid-rows-[1.5rem_0.25rem_auto_1.5rem_auto_auto_0.5rem_auto_0.5rem_auto_1rem] lg:tw-grid-rows-[1.5rem_2rem_auto_1.5rem_auto_auto_0.5rem_auto_0.5rem_auto_1rem] tw-bg-secondary-100-dark tw-border-[1px] tw-border-[#4B4B4B] tw-rounded-lg">
                {isBestSeller != null && isBestSeller === true && (
                    <div className="tw-row-start-1 tw-h-full lg-stabilizers-best-seller-gradient tw-rounded-tr-lg tw-place-self-end tw-text-xs tw-px-3 lg:tw-px-4 tw-flex tw-flex-row tw-items-center">
                        <span>Best Seller</span>
                    </div>
                )}

                <div className="tw-row-start-3 tw-place-self-center">
                    <FullWidthImage
                        relativePath={`/livguard/products/${productType == ProductType.battery ? "batteries" : productType == ProductType.inverter ? "inverters" : "jodis"}/${slug}/thumbnail.png`}
                    />
                </div>

                <div className="tw-row-start-5 tw-capitalize tw-place-self-center lg-text-body-bold !tw-text-white">{`${ProductType[`${productType}`]}`}</div>
                <div className="tw-row-start-6 tw-place-self-center lg-text-body-bold !tw-text-white">{productName}</div>
                <div className="tw-row-start-8 tw-place-self-center lg-text-body">Starting from ₹ {productPrice}</div>

                <Link
                    to={`/product/${slug}`}
                    className="tw-row-start-10 tw-place-self-center tw-text-primary-500-dark"
                >
                    View Product
                </Link>
            </div>
        </>
    );
}

function WeAreEverywhere({userPreferences, showCtaButton, className}: {userPreferences: UserPreferences; showCtaButton: boolean; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge", className)}>
            <div className="tw-relative lg-bg-secondary-100 tw-rounded-lg tw-h-[350px] tw-overflow-hidden lg:tw-h-full lg:tw-px-2">
                <div className="tw-flex tw-flex-col tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-justify-center tw-items-center">
                    <div className="tw-absolute tw-inset-0">
                        <CoverImage relativePath={userPreferences.theme == Theme.Dark ? "/livguard/home/10/1-dark.jpg" : "/livguard/home/10/1-light.jpg"} />
                    </div>

                    <div className="tw-z-10 lg-text-headline tw-text-center">
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS10H1T1", userPreferences.language)}} />
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS10H1T2", userPreferences.language)}} />
                    </div>

                    <VerticalSpacer className="tw-h-1" />

                    <div className="tw-z-10 lg-text-title2">{getVernacularString("homeS10T2", userPreferences.language)}</div>

                    {showCtaButton && (
                        <>
                            <VerticalSpacer className="tw-h-6" />

                            <Link
                                to="/dealer-for-inverters-and-batteries"
                                className="tw-z-10 lg-cta-button"
                            >
                                {getVernacularString("homeS10T3", userPreferences.language)}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function ChooseTheBestStabilizer({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] ", className)}>
            <div className="tw-row-start-2 tw-text-center lg-text-headline">Choose The</div>
            <div className="tw-row-start-3 tw-text-center lg-text-headline">
                <span className="lg-text-highlighted">Right Stabilizer</span> For You
            </div>
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">
                Find the suitable pick of inverter that fulfils your requirements with efficiency. Use our Buying Guide to get to know in detail about how you can buy your inverter battery and our
                Product Catalogue for product specifications
            </div>

            <div className="tw-row-start-7 tw-w-full tw-grid tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tw-p-4 tw-gap-4">
                <a
                    href="https://www.livguard.com/static-assets/livguard-buying-guide.pdf"
                    download
                    target="_blank"
                    className="tw-bg-secondary-100-dark tw-py-4 tw-rounded-lg tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-h-full tw-p-4"
                >
                    <img
                        className="tw-row-start-1 tw-col-start-1 tw-place-self-center"
                        src="https://files.growthjockey.com/livguard/icons/stabilizer/buying-guide.svg"
                    />
                    <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body">Buying Guide</div>
                </a>
                <a
                    href="https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf"
                    download
                    target="_blank"
                    className="tw-bg-secondary-100-dark tw-py-4 tw-rounded-lg tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-h-full tw-p-4"
                >
                    <img
                        className="tw-row-start-1 tw-col-start-1 tw-place-self-center"
                        src="https://files.growthjockey.com/livguard/icons/stabilizer/download-catalogue.svg"
                    />
                    <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body">Download Catalogue</div>
                </a>
            </div>

            <VerticalSpacer className="tw-row-start-8 tw-h-6" />

            <Link
                to="/load-calculator"
                className="tw-row-start-9 tw-grid tw-place-items-center"
            >
                <div className="lg-cta-button tw-place-self-center">Plan Your Power</div>
            </Link>

            <VerticalSpacer className="lg:tw-row-start-10 tw-hidden lg:tw-block lg:tw-h-12" />
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "homeS9Q1Q",
            answer: "homeS9Q1A",
        },
        {
            question: "homeS9Q2Q",
            answer: "homeS9Q2A",
        },
        {
            question: "homeS9Q3Q",
            answer: "homeS9Q3A",
        },
        {
            question: "homeS9Q4Q",
            answer: "homeS9Q4A",
        },
        {
            question: "homeS9Q5Q",
            answer: "homeS9Q5A",
        },
    ];

    return (
        <FaqSectionInternal
            faqs={faqs}
            userPreferences={userPreferences}
            className={className}
        />
    );
}

function SocialHandles({userPreferences, heading, className}: {userPreferences: UserPreferences; heading: {text1: string; text2: string}; className?: string}) {
    const embeddedVideos = [
        <EmbeddedYoutubeVideo
            id="b6gqLXTnZnw"
            style={{aspectRatio: "560/315"}}
        />,
        <EmbeddedYoutubeVideo
            id="CRabeGp9800"
            style={{aspectRatio: "560/315"}}
        />,
        <EmbeddedYoutubeVideo
            id="tFj9GJcjq6s"
            style={{aspectRatio: "560/315"}}
        />,
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge tw-w-full tw-max-w-7xl tw-mx-auto", className)}>
            <div className="tw-flex tw-flex-col lg-bg-secondary-100 tw-rounded-lg tw-text-center lg-px-screen-edge lg:tw-hidden">
                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString(heading.text1, userPreferences.language)}} />

                    <div dangerouslySetInnerHTML={{__html: getVernacularString(heading.text2, userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <CarouselStyle3 items={embeddedVideos} />

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body">{getVernacularString("homeS11T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-flex tw-justify-evenly">
                    <a
                        href="https://www.facebook.com/LivguardEnergy/"
                        target="_blank"
                    >
                        <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://twitter.com/LivguardEnergy"
                        target="_blank"
                    >
                        <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.instagram.com/livguardenergy/"
                        target="_blank"
                    >
                        <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/livguard-energy/"
                        target="_blank"
                    >
                        <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.youtube.com/@LivguardEnergy"
                        target="_blank"
                    >
                        <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                </div>

                <VerticalSpacer className="tw-h-4" />
            </div>

            <div className="tw-hidden lg:tw-flex tw-flex-col tw-justify-center tw-text-center">
                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString(heading.text1, userPreferences.language)}} />

                    <div dangerouslySetInnerHTML={{__html: getVernacularString(heading.text2, userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-8" />

                <div className="tw-grid tw-grid-cols-3 tw-gap-4">
                    <ItemBuilder
                        items={embeddedVideos}
                        itemBuilder={(video, videoIndex) => (
                            <div
                                className="tw-flex tw-flex-col lg-bg-secondary-100 tw-rounded-lg tw-pb-4 tw-overflow-hidden"
                                key={videoIndex}
                            >
                                {video}

                                <VerticalSpacer className="tw-h-2" />

                                <div className="lg-text-body">{getVernacularString("homeS11T2", userPreferences.language)}</div>

                                <div className="tw-flex tw-justify-evenly">
                                    <a
                                        href="https://www.facebook.com/LivguardEnergy/"
                                        target="_blank"
                                    >
                                        <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://twitter.com/LivguardEnergy"
                                        target="_blank"
                                    >
                                        <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/livguardenergy/"
                                        target="_blank"
                                    >
                                        <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/livguard-energy/"
                                        target="_blank"
                                    >
                                        <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://www.youtube.com/@LivguardEnergy"
                                        target="_blank"
                                    >
                                        <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
