import {LinksFunction, LoaderFunction, MetaFunction, V2_MetaFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {useResizeDetector} from "react-resize-detector";
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/components/images/coverImage";
import {PageScaffold} from "~/components/pageScaffold";
import {FaqSectionInternal} from "~/components/faqs";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, Theme, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {convertProductInternalNameToPublicName, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {FullWidthImage} from "~/components/images/simpleFullWidthImage";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {ProductType, allProductDetails} from "~/productData";
import React, {useEffect, useState} from "react";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import LivguardDialog from "~/components/livguardDialog";
import {StickyBottomBar} from "~/components/bottomBar";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {DealerLocator} from "~/routes";

// export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
//     const userPreferences: UserPreferences = data.userPreferences;
//     if (userPreferences.language == Language.English) {
//         return {
//             title: "Power on Wheels with Livguard's Three Wheeler Batteries",
//             description: "Experience the reliability of Livguard Three Wheeler batteries, delivering better cranking power, easy maintenance, long battery life, and high performance ",
//             "og:title": "Power on Wheels with Livguard's Three Wheeler Batteries",
//             "og:site_name": "Livguard",
//             "og:url": "https://www.livguard.com/three-wheeler-batteries",
//             "og:description": "Experience the reliability of Livguard Three Wheeler batteries, delivering better cranking power, easy maintenance, long battery life, and high performance ",
//             "og:type": "Product",
//             "og:image": "",
//         };
//     } else if (userPreferences.language == Language.Hindi) {
//         return {
//             title: "लिवगार्ड के तीन पहिया बैटरी के साथ सशक्त यात्रा",
//             description: "बेहतर क्रैंकिंग पावर, आसान रखरखाव, लंबी बैटरी लाइफ और उच्च प्रदर्शन प्रदान करने वाली लिवगार्ड थ्री व्हीलर बैटरियों की विश्वसनीयता का अनुभव करें",
//             "og:title": "लिवगार्ड के तीन पहिया बैटरी के साथ सशक्त यात्रा",
//             "og:site_name": "Livguard",
//             "og:url": "https://www.livguard.com/three-wheeler-batteries",
//             "og:description": "बेहतर क्रैंकिंग पावर, आसान रखरखाव, लंबी बैटरी लाइफ और उच्च प्रदर्शन प्रदान करने वाली लिवगार्ड थ्री व्हीलर बैटरियों की विश्वसनीयता का अनुभव करें",
//             "og:type": "Product",
//             "og:image": "",
//         };
//     } else {
//         throw Error(`Undefined language ${userPreferences.language}`);
//     }
// };

// export const links: LinksFunction = () => {
//     return [{rel: "canonical", href: "https://www.livguard.com/three-wheeler-batteries"}];
// };

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/three-wheeler-batteries",
            },
            {
                title: "Power on Wheels with Livguard's Three Wheeler Batteries",
            },
            {
                name: "description",
                content: "Experience the reliability of Livguard Three Wheeler batteries, delivering better cranking power, easy maintenance, long battery life, and high performance",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/three-wheeler-batteries",
            },
            {
                property: "og:title",
                content: "Power on Wheels with Livguard's Three Wheeler Batteries",
            },
            {
                property: "og:description",
                content: "Experience the reliability of Livguard Three Wheeler batteries, delivering better cranking power, easy maintenance, long battery life, and high performance",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Product",
            },
            {
                property: "og:image",
                content: "https://growthjockey.imgix.net/livguard/home/3/2.jpg?w=764.140625",
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/three-wheeler-batteries",
            },
            {
                title: "लिवगार्ड के तीन पहिया बैटरी के साथ सशक्त यात्रा",
            },
            {
                name: "description",
                content: "बेहतर क्रैंकिंग पावर, आसान रखरखाव, लंबी बैटरी लाइफ और उच्च प्रदर्शन प्रदान करने वाली लिवगार्ड थ्री व्हीलर बैटरियों की विश्वसनीयता का अनुभव करें",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/three-wheeler-batteries",
            },
            {
                property: "og:title",
                content: "लिवगार्ड के तीन पहिया बैटरी के साथ सशक्त यात्रा",
            },
            {
                property: "og:description",
                content: "बेहतर क्रैंकिंग पावर, आसान रखरखाव, लंबी बैटरी लाइफ और उच्च प्रदर्शन प्रदान करने वाली लिवगार्ड थ्री व्हीलर बैटरियों की विश्वसनीयता का अनुभव करें",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Product",
            },
            {
                property: "og:image",
                content: "https://growthjockey.imgix.net/livguard/home/3/2.jpg?w=764.140625",
            },
        ];
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

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

export default () => {
    const {userPreferences, redirectTo, pageUrl} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
                breadcrumbs={[
                    {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                    {contentId: "5ec9401e-43ed-47cd-a0f9-3ef981780ca1", link: "#"},
                ]}
            >
                <ThreeWheelerBatteriesPage userPreferences={userPreferences} />
            </PageScaffold>

            <ProductAndCategoryBottomBar
                userPreferences={userPreferences}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
            />
        </>
    );
};

function ThreeWheelerBatteriesPage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <ReliabilityYouCanExperience
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0 tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <ThreeWheelerBatteriesForUnmatchedPower
                    userPreferences={userPreferences}
                    className="tw-row-start-5 tw-col-start-1 lg:tw-col-span-full tw-w-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-7 tw-grid lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] tw-col-span-full lg:lg-px-screen-edge-2 tw-gap-x-5 tw-max-w-7xl tw-mx-auto">
                    <DealerLocator
                        userPreferences={userPreferences}
                        className="tw-row-start-5 lg:tw-col-start-1 lg:tw-h-full"
                        showCtaButton={true}
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                    <FindTheRightBattery
                        userPreferences={userPreferences}
                        className="tw-row-start-7 lg:tw-row-start-5 lg:tw-col-start-2"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[8] tw-col-start-1 lg:tw-col-span-full" />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[9] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[10] tw-col-start-1 lg:tw-col-span-full" />

                <SocialHandles
                    userPreferences={userPreferences}
                    heading={{text1: "b0a3aa40-4b00-4bdd-88e0-67085fafa92b", text2: `c0f802cc-902b-4328-b631-a3fad8fc7d18`}}
                    className="tw-row-start-[11] tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[12] tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[2rem_auto_auto_1rem_auto_1.5rem_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)] lg:tw-text-left lg:tw-grid-cols-2",
                className,
            )}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-h-full tw-w-full tw-relative">
                {isScreenSizeBelow == null ? null : (
                    <>
                        <FullWidthImage
                            relativePath={isScreenSizeBelow ? "/livguard/three-wheeler/1/banner-mobile.jpg" : "/livguard/three-wheeler/1/banner-desktop.jpg"}
                            key={isScreenSizeBelow ? "/livguard/three-wheeler/1/banner-mobile.jpg" : "/livguard/three-wheeler/1/banner-desktop.jpg"}
                        />
                    </>
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg:tw-col-span-full lg-px-screen-edge-2 tw-text-center lg:tw-text-left tw-z-[2]">
                <div className="lg-text-banner tw-text-secondary-900-dark">{getVernacularString("aa7c13b1-5476-452b-aa90-6d19bf361db4", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full lg-px-screen-edge-2 tw-text-center lg:tw-text-left tw-z-[2]">
                <div className="lg-text-banner tw-text-secondary-900-dark">{getVernacularString("fc06f9c9-c5a3-4631-a62b-3884075b1aa2", userPreferences.language)}</div>
            </DefaultTextAnimation>
        </div>
    );
}

function ReliabilityYouCanExperience({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const BatteryCard = ({title, description, imageRelativePath}: {title: string; description: string; imageRelativePath: string}) => {
        return (
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-place-self-center tw-grid tw-grid-rows-[auto_1rem_auto_1rem_auto_minmax(1rem,1fr)] tw-cols-[auto] tw-w-full tw-h-full tw-px-4 tw-py-4 lg-card tw-rounded-lg",
                )}
            >
                <div className="tw-row-start-1">
                    <FullWidthImage
                        relativePath={imageRelativePath}
                        className="tw-rounded-lg"
                    />
                </div>

                <div className="tw-row-start-3 tw-text-center lg-text-title1">{title}</div>

                <div className="tw-row-start-5 tw-text-center lg-text-body">{description}</div>
            </div>
        );
    };

    const batteriesData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "c9209f83-6335-404e-ad8e-491d010741d3",
            bodyTextContentPiece: "267f262c-3030-43e4-bae7-b778518d7ee2",
            imageRelativePath: "/livguard/three-wheeler/2/cranking.jpg",
        },
        {
            titleTextContentPiece: "22d2b329-b855-4127-9e99-edb36347d88b",
            bodyTextContentPiece: "adf2ff19-2a54-4ca7-9b4d-d2881ad856fc",
            imageRelativePath: "/livguard/three-wheeler/2/maintainence-free.jpg",
        },
        {
            titleTextContentPiece: "c31a4732-aa1f-4973-b2fd-f3b0371c2895",
            bodyTextContentPiece: "3b7b22d2-54c3-4ad6-9a7d-e8fede699840",
            imageRelativePath: "/livguard/three-wheeler/2/best-in-class-warranty.jpg",
        },
        {
            titleTextContentPiece: "8575720d-0268-4a7d-8516-1edbe2d3ea83",
            bodyTextContentPiece: "a5df81a6-2f1a-4547-b08f-b5732df96e88",
            imageRelativePath: "/livguard/three-wheeler/2/long-battery-life.jpg",
        },
        {
            titleTextContentPiece: "c9209f83-6335-404e-ad8e-491d010741d3",
            bodyTextContentPiece: "267f262c-3030-43e4-bae7-b778518d7ee2",
            imageRelativePath: "/livguard/three-wheeler/2/cranking.jpg",
        },
        {
            titleTextContentPiece: "22d2b329-b855-4127-9e99-edb36347d88b",
            bodyTextContentPiece: "adf2ff19-2a54-4ca7-9b4d-d2881ad856fc",
            imageRelativePath: "/livguard/three-wheeler/2/maintainence-free.jpg",
        },
        {
            titleTextContentPiece: "c31a4732-aa1f-4973-b2fd-f3b0371c2895",
            bodyTextContentPiece: "3b7b22d2-54c3-4ad6-9a7d-e8fede699840",
            imageRelativePath: "/livguard/three-wheeler/2/best-in-class-warranty.jpg",
        },
        {
            titleTextContentPiece: "8575720d-0268-4a7d-8516-1edbe2d3ea83",
            bodyTextContentPiece: "a5df81a6-2f1a-4547-b08f-b5732df96e88",
            imageRelativePath: "/livguard/three-wheeler/2/long-battery-life.jpg",
        },
    ];

    return (
        <>
            <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg:tw-col-span-full", className)}>
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg:lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("75dfe585-c7bc-4497-a8a7-23bb1ed11625", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("942ecb94-3de6-477e-9dea-5079f62a04c3", userPreferences.language)}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <CarouselStyle5
                    snapDotsDivisionFactor={2}
                    items={batteriesData.map((batteryData, batteryDataIndex) => (
                        <BatteryCard
                            title={getVernacularString(batteryData.titleTextContentPiece, userPreferences.language)}
                            description={getVernacularString(batteryData.bodyTextContentPiece, userPreferences.language)}
                            imageRelativePath={batteryData.imageRelativePath}
                            key={batteryDataIndex}
                        />
                    ))}
                    className="tw-mx-auto"
                    deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                    selectedContainerClassName="tw-h-full"
                    itemContainerClassName="lg:tw-px-0"
                />
            </div>
        </>
    );
}

function ThreeWheelerBatteriesForUnmatchedPower({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const products = [allProductDetails["lgmf0ar32r"][userPreferences.language], allProductDetails["lgmf0ar60l"][userPreferences.language]];
    const brandBatteries = [
        {
            batterySlug: "lgmf0ar32r",
            name: products[0].humanReadableModelNumber,
            description: products[0].description,
            warranty: products[0].specifications[1].value,
            capacity: products[0].specifications[2].value,
            polarity: products[0].specifications[3].value,
            dimensions: products[0].specifications[4].value,
        },
        {
            batterySlug: "lgmf0ar60l",
            name: products[1].humanReadableModelNumber,
            description: products[1].description,
            warranty: products[1].specifications[1].value,
            capacity: products[1].specifications[2].value,
            polarity: products[1].specifications[3].value,
            dimensions: products[1].specifications[4].value,
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full tw-grid tw-grid-flow-row lg-bg-our-suggestions tw-rounded-lg", className)}>
            <VerticalSpacer className="tw-h-6 lg:tw-h-10" />

            <div
                className="lg-text-headline tw-place-self-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("baedfb58-af7c-4126-baa3-63f5ad0ce156", userPreferences.language)}}
            />
            <div className="lg-text-headline tw-place-self-center">{getVernacularString("836d0f37-0171-4ac9-b4c8-79bd9aaf0afc", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            <CarouselStyle5
                // @ts-ignore
                items={brandBatteries.map((battery, batteryIndex) => {
                    return (
                        <BatteryCard
                            userPreferences={userPreferences}
                            batterySlug={battery.batterySlug}
                            name={battery.name}
                            description={battery.description}
                            warranty={battery.warranty}
                            capacity={battery.capacity}
                            polarity={battery.polarity}
                            dimensions={battery.dimensions}
                            key={batteryIndex}
                        />
                    );
                })}
                slidesContainerClassName="!tw-auto-cols-[100%] lg:!tw-auto-cols-max tw-place-self-center tw-items-center"
                selectedContainerClassName="tw-h-full"
                deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                disabledChevronClassName="tw-opacity-[0.3]"
                autoplayDelay={null}
            />

            <VerticalSpacer className="tw-h-4 lg:tw-h-10" />
        </div>
    );
}

function BatteryCard({
    userPreferences,
    batterySlug,
    name,
    description,
    warranty,
    capacity,
    polarity,
    dimensions,
}: {
    userPreferences: UserPreferences;
    batterySlug: string;
    name: string;
    description: string;
    warranty: string;
    capacity: string;
    polarity: string;
    dimensions: string;
}) {
    return (
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:tw-gap-x-2 lg-bg-new-background-500 lg-card tw-rounded-lg tw-px-4 tw-py-3 lg:tw-py-6 lg:tw-px-8 tw-w-full tw-max-w-3xl tw-mx-auto">
            <div className="tw-col-start-1 tw-grid tw-grid-flow-row tw-place-items-center">
                <div className="lg:tw-hidden tw-bg-[#c5c5c5] dark:tw-bg-[#3a3a3a] tw-p-2">{getVernacularString("4f1b53b9-36a8-4a0e-b693-4f92e8a1b32b", userPreferences.language)}</div>
                <div className="tw-h-full tw-w-full">
                    <FullWidthImage relativePath={`/livguard/products/${batterySlug}/thumbnail.png`} />
                </div>

                <Link
                    className="tw-hidden lg:tw-block"
                    to={`/product/${batterySlug}`}
                >
                    <button className="lg-cta-button">{getVernacularString("063dc56b-910e-4a48-acb8-8f52668a4c72", userPreferences.language)}</button>
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
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/three-wheeler/3/3.warranty-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("8ef7eb7a-a46a-46b2-9479-cb31ce29ea98", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{warranty}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-1 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-2 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/three-wheeler/3/3.capacity-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("28225ecc-5c09-4c69-a82a-0614dc248123", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{capacity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-1 md:max-lg:tw-w-full md:max-lg:tw-row-start-3 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/three-wheeler/3/3.polarity-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("d71a4882-3a3c-4e2d-a884-071523e265d1", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{polarity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-4 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/three-wheeler/3/3.dimensions-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("ff09f4be-754d-49ed-95bb-9223ab5d383e", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{dimensions}</div>
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <Link
                    className="tw-place-self-center lg:tw-hidden"
                    to={batterySlug}
                >
                    <button className="lg-cta-button">{getVernacularString("063dc56b-910e-4a48-acb8-8f52668a4c72", userPreferences.language)}</button>
                </Link>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
            </div>
        </div>
    );
}

function FindTheRightBattery({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] ", className)}>
            <div
                className="tw-row-start-2 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: getVernacularString("d06ea4a8-87f2-40b0-a235-bfae5e318be3", userPreferences.language)}}
            />
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: getVernacularString("976354a4-d9b7-414f-a717-dcffa9018f98", userPreferences.language)}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">{getVernacularString("b568d9fc-34b7-48ba-adaf-0c05c9e24168", userPreferences.language)}</div>

            <div className="tw-row-start-7 tw-grid tw-p-4 tw-justify-center tw-w-full">
                <div className="tw-w-fit tw-grid tw-grid-rows-2 lg:tw-grid-rows-1 lg:tw-grid-cols-2 tw-gap-4 tw-grid-flow-col">
                    <a
                        href="https://www.livguard.com/static-assets/leaflet-three-wheeler.pdf"
                        download
                        target="_blank"
                        className="lg-cta-outline-button lg-cta-outline-button-category-section-transition tw-py-3 tw-rounded-full tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-group tw-h-full tw-px-4"
                    >
                        <img
                            className="tw-row-start-1 tw-col-start-1 tw-h-4 tw-w-4 lg:tw-h-6 lg:tw-w-6 tw-place-self-center tw-transition-colors tw-duration-200 group-hover:tw-brightness-0 group-hover:tw-invert"
                            src="https://files.growthjockey.com/livguard/icons/stabilizer/download-catalogue.svg"
                        />
                        <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body group-hover:!tw-text-secondary-100-light tw-transition-colors tw-duration-200">
                            {getVernacularString("51ae4bbd-0f66-42bc-b031-cc3e9dc4dc26", userPreferences.language)}
                        </div>
                    </a>
                    <Link
                        to="/battery-finder"
                        className="tw-h-full tw-w-full tw-grid tw-place-items-center"
                    >
                        <div className="tw-h-full tw-w-full tw-grid tw-items-center lg-cta-button tw-place-self-center">
                            {getVernacularString("1271cac7-693c-48bc-850f-16199416dd0e", userPreferences.language)}
                        </div>
                    </Link>
                </div>
            </div>

            <VerticalSpacer className="lg:tw-row-start-8 tw-hidden lg:tw-block lg:tw-h-12" />
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "af9ad542-bdcc-4eb4-aa38-c87d36ec9bda",
            answer: "d1db1197-f5ee-4126-9fc2-a554820c24b4",
        },
        {
            question: "adddec59-1e50-4af6-a40f-a0b1144464d1",
            answer: "03ed45bf-cd92-4800-b855-c88e8b73e543",
        },
        {
            question: "87a69e85-3480-486c-babf-fb05e6936a76",
            answer: "18fced89-0dde-4bef-a1ec-7b3929eb9434",
        },
        {
            question: "c442cd80-c2c3-4c56-91a9-30530b22d5e6",
            answer: "77fa3233-d479-405c-9984-052c8fb751bc",
        },
        {
            question: "d760e95e-4074-4ec7-af0e-9c296cf4d41d",
            answer: "83afccfb-5c2b-4cd8-893c-4a9757b630f6",
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

export function FilterDialog({
    userPreferences,
    isContactUsDialogOpen,
    setIsContactUsDialogOpen,
    brandBatteries,
    selectedBrand,
    setSelectedBrand,
    appliedBrand,
    setAppliedBrand,
    selectedSegment,
    setSelectedSegment,
    appliedSegment,
    setAppliedSegment,
    selectedModel,
    setSelectedModel,
    appliedModel,
    setAppliedModel,
    setApplyChanges,
}: {
    userPreferences: UserPreferences;
    isContactUsDialogOpen: boolean;
    setIsContactUsDialogOpen: React.Dispatch<boolean>;
    brandBatteries: any;
    selectedBrand: string;
    setSelectedBrand: React.Dispatch<string>;
    appliedBrand: string;
    setAppliedBrand: React.Dispatch<string>;
    selectedSegment: string;
    setSelectedSegment: React.Dispatch<string>;
    appliedSegment: string;
    setAppliedSegment: React.Dispatch<string>;
    selectedModel: string;
    setSelectedModel: React.Dispatch<string>;
    appliedModel: string;
    setAppliedModel: React.Dispatch<string>;
    setApplyChanges: React.Dispatch<boolean>;
}) {
    function tryToCloseContactUsDialog() {
        setIsContactUsDialogOpen(false);
    }

    return (
        <>
            <LivguardDialog
                isDialogOpen={isContactUsDialogOpen}
                tryToCloseDialog={tryToCloseContactUsDialog}
                title={getVernacularString("0dc1ec96-3b51-4314-ab45-9b5b542f66c5", userPreferences.language)}
                showCloseIcon={true}
            >
                <div className="tw-place-self-center tw-w-full tw-grid tw-grid-flow-row tw-gap-y-6">
                    <div>
                        <FormSelectComponent
                            items={Object.keys(brandBatteries)}
                            itemBuilder={(item) => {
                                return item == "" ? getVernacularString("51d56374-4d1d-46c1-8ef1-f72396e12e6a", userPreferences.language) : item;
                            }}
                            value={selectedBrand}
                            setValue={(item) => {
                                setApplyChanges(false);
                                setSelectedSegment("");
                                setSelectedModel("");
                                if (item != "") {
                                    setSelectedBrand(item);
                                    return;
                                }

                                setSelectedBrand("");
                            }}
                            buttonClassName="disabled:tw-bg-[#aeaeae]"
                        />
                    </div>
                    <div>
                        <FormSelectComponent
                            items={selectedBrand == "" ? [] : Object.keys(brandBatteries[selectedBrand])}
                            itemBuilder={(item) => {
                                return item == "" ? getVernacularString("5793b8a3-16b1-4c11-bc37-ef5062160855", userPreferences.language) : item;
                            }}
                            value={selectedSegment}
                            setValue={(item) => {
                                setApplyChanges(false);
                                setSelectedModel("");
                                if (item != "") {
                                    setSelectedSegment(item);
                                    return;
                                }

                                setSelectedSegment("");
                            }}
                            disabled={selectedBrand == ""}
                            buttonClassName="disabled:tw-bg-[#aeaeae]"
                        />
                    </div>
                    <div>
                        <FormSelectComponent
                            items={selectedBrand == "" || selectedSegment == "" ? [] : Object.keys(brandBatteries[selectedBrand][selectedSegment])}
                            itemBuilder={(item) => {
                                return item == "" ? getVernacularString("97f3fc31-1116-46f6-a385-d4df5e25bde1", userPreferences.language) : item;
                            }}
                            value={selectedModel}
                            setValue={(item) => {
                                setApplyChanges(false);
                                if (item != "") {
                                    setSelectedModel(item);
                                    return;
                                }

                                setSelectedModel("");
                            }}
                            disabled={selectedBrand == "" || selectedSegment == ""}
                            buttonClassName="disabled:tw-bg-[#aeaeae]"
                        />
                    </div>

                    <div
                        onClick={() => {
                            setApplyChanges(true);
                            tryToCloseContactUsDialog();
                        }}
                    >
                        <button
                            className="lg-cta-button tw-w-full"
                            // disabled={selectedBrand == "" || selectedSegment == "" || selectedModel == ""}
                            onClick={() => {
                                setApplyChanges(true);
                                setAppliedBrand(selectedBrand);
                                setAppliedSegment(selectedSegment);
                                setAppliedModel(selectedModel);
                            }}
                        >
                            {getVernacularString("3231d38a-1950-46eb-be3b-76bd8bce6998", userPreferences.language)}
                        </button>
                    </div>
                </div>
            </LivguardDialog>
        </>
    );
}