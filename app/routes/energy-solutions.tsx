import {LoaderFunction} from "@remix-run/node";
import React, {useContext} from "react";
import {Link, useLoaderData} from "@remix-run/react";
import {PageScaffold} from "~/components/pageScaffold";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getContentGenerator} from "~/vernacularProvider";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";
import {getImageMetadataLibraryFromBackend} from "~/backend/imageMetaDataLibrary.server";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {twMerge} from "tailwind-merge";

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    pageUrl: string;
    vernacularData: {
        [id: string]: string;
    };
    imageMetaDataLibrary: {
        [relativePath: string]: ImageMetadata | undefined;
    };
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);

    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const vernacularData = getVernacularFromBackend("allCategoriesPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("allCategoriesPage");

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        vernacularData: vernacularData,
        imageMetaDataLibrary: imageMetaDataLibrary,
    };

    return loaderData;
};
const AllCategory = () => {
    const {userPreferences, redirectTo, pageUrl, vernacularData, imageMetaDataLibrary} = useLoaderData() as LoaderData;
    const utmSearchParameters = useUtmSearchParameters();

    return (
        <>
            <ImageProviderContext.Provider value={imageMetaDataLibrary}>
                <ContentProviderContext.Provider
                    value={{
                        getContent: getContentGenerator(vernacularData),
                    }}
                >
                    <PageScaffold
                        userPreferences={userPreferences}
                        redirectTo={redirectTo}
                        showMobileMenuIcon={true}
                        utmParameters={utmSearchParameters}
                        pageUrl={pageUrl}
                        breadcrumbs={[
                            {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                            {contentId: "d9d27569-28d8-423e-ba3e-d6344b779b94", link: "#"},
                        ]}
                    >
                        <AllCategoryPage userPreferences={userPreferences} />
                    </PageScaffold>
                </ContentProviderContext.Provider>
            </ImageProviderContext.Provider>
        </>
    );
};
export default AllCategory;

const AllCategoryPage = ({userPreferences}: {userPreferences: UserPreferences}) => {
    const contentData = useContext(ContentProviderContext);
    let HomeList = HomeSolutionList;
    let AutomotiveList = AutomotiveSolutionList;
    // let SolarList = SolarSolutionList;
    const sectionHeading = {
        first: contentData.getContent("ef406184-26b6-42a4-98a1-5853097d7163"),
        second: contentData.getContent("0999c838-f6d4-4af4-b9a7-21413b3ad562"),
        // third: contentData.getContent("2f30c959-a70d-410d-be4e-3aee24145b6b"),
    };
    return (
        <>
            <div className="tw-grid tw-gap-y-10 lg:tw-gap-y-20">
                <HeroSection />
                <ContentSection
                    userPreferences={userPreferences}
                    list={HomeList}
                    title={sectionHeading.first}
                    sectionId="homeSolutions"
                />

                <ContentSection
                    userPreferences={userPreferences}
                    list={AutomotiveList}
                    title={sectionHeading.second}
                    sectionId="automotiveSolutions"
                />

                {/* <ContentSection
                    userPreferences={userPreferences}
                    list={SolarList}
                    title={sectionHeading.third}
                /> */}
            </div>
            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />
        </>
    );
};

function HeroSection() {
    const isScreenSizeBelow = useIsScreenSizeBelow(768);
    const contentData = useContext(ContentProviderContext);
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true, align: "start"});

    const items = [
        {
            desktopImagePath: "/livguard/all-category/1/desktop-banner-3.jpg",
            mobileImagePath: "/livguard/all-category/1/mobile-banner-3.jpg",
            textVernacId: "1604eb18-88d2-45d9-b39f-6a66414cb122",
        },
        // {
        //     desktopImagePath: "/livguard/all-category/1/desktop.png",
        //     mobileImagePath: "/livguard/all-category/1/mobile-banner-1.jpg",
        //     textVernacId: "2fdc65c7-2c2f-4ec0-9f80-32666da203cc",
        // },
        // {
        //     desktopImagePath: "/livguard/all-category/1/desktop-banner-2.png",
        //     mobileImagePath: "/livguard/all-category/1/mobile-banner-2.jpg",
        //     textVernacId: "01c23336-eab7-4639-8eec-9e3f78a0c5a4",
        // },
    ];
    return (
        <div>
            <div
                // key={itemIndex}
                className="tw-grid"
            >
                <div className="tw-row-start-1 tw-col-start-1">
                    <FullWidthImage relativePath={isScreenSizeBelow ? "/livguard/all-category/1/mobile-banner-3.jpg" : "/livguard/all-category/1/desktop-banner-3.jpg"} />
                </div>
                <div
                    dangerouslySetInnerHTML={{__html: contentData.getContent("1604eb18-88d2-45d9-b39f-6a66414cb122")}}
                    className="tw-row-start-1 tw-col-start-1 tw-h-fit tw-text-center md:tw-text-start tw-self-start md:tw-self-center tw-text-[28px] tw-font-bold md:lg-text-headline tw-text-secondary-100-light tw-pt-8 md:tw-pl-14 md:tw-pt-0 max-md:tw-leading-8"
                />
            </div>

            {/* <div
                className="tw-overflow-hidden tw-relative"
                ref={emblaRef}
            >
                <div className="tw-w-full tw-h-full tw-grid tw-grid-flow-col tw-auto-cols-[100%] tw-items-stretch tw-z-20">
                    <ItemBuilder
                        items={items}
                        itemBuilder={(item, itemIndex) => {
                            return (
                                <div
                                    key={itemIndex}
                                    className="tw-grid"
                                >
                                    <div className="tw-row-start-1 tw-col-start-1">
                                        <FullWidthImage relativePath={isScreenSizeBelow ? item.mobileImagePath : item.desktopImagePath} />
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{__html: contentData.getContent(item.textVernacId)}}
                                        className="tw-row-start-1 tw-col-start-1 tw-h-fit tw-text-center md:tw-text-start tw-self-start md:tw-self-center tw-text-[28px] tw-font-bold md:lg-text-headline tw-text-secondary-100-light tw-pt-8 md:tw-pl-14 md:tw-pt-0 max-md:tw-leading-8"
                                    />
                                </div>
                            );
                        }}
                    />
                </div> */}

            {/* <button
                    type="button"
                    className="tw-h-fit tw-absolute tw-top-0 tw-bottom-0 tw-my-auto tw-left-4 tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light lg-bg-secondary-300"
                    onClick={() => {
                        emblaApi?.scrollPrev();
                    }}
                >
                    <ChevronLeftIcon className="tw-w-6 tw-h-6" />
                </button>

                <button
                    type="button"
                    className="tw-h-fit tw-absolute tw-top-0 tw-bottom-0 tw-my-auto tw-right-4 tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light lg-bg-secondary-300"
                    onClick={() => {
                        emblaApi?.scrollNext();
                    }}
                >
                    <ChevronRightIcon className="tw-w-6 tw-h-6" />
                </button> */}
            {/* </div> */}
        </div>
    );
}

// 3ad88a6b-4448-4395-af28-c86a8f07f45e
const ContentSection = ({userPreferences, list, title, sectionId}: {userPreferences: UserPreferences; list: any; title: string; sectionId: string}) => {
    const contentData = useContext(ContentProviderContext);
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true, align: "start"});
    const isScreenSizeBelow = useIsScreenSizeBelow(640);
    let snapDotsDivisionFactor: any;
    return (
        <>
            <div className="tw-relative">
                <div
                    className="tw-absolute tw-top-[-5rem]"
                    id={sectionId}
                />
                <div className="tw-grid tw-grid-rows-[auto_auto_auto_auto]">
                    <div className="tw-text-center lg-text-title1 tw-grid">
                        <div>{contentData.getContent("3ad88a6b-4448-4395-af28-c86a8f07f45e")}</div>
                        <VerticalSpacer className="lg:tw-h-1" />
                        <div dangerouslySetInnerHTML={{__html: title}}></div>
                        <VerticalSpacer className="tw-h-6 lg:tw-h-8" />
                    </div>
                    <div
                        className={twMerge("tw-w-full tw-overflow-hidden", isScreenSizeBelow ? "tw-pl-6" : "lg-px-screen-edge-2")}
                        ref={isScreenSizeBelow ? emblaRef : null}
                    >
                        <div className="tw-grid tw-grid-flow-col sm:tw-grid-flow-row sm:tw-grid-cols-2 md:tw-grid-cols-3 xl:tw-grid-cols-4 lg:tw-grid-flow-row tw-gap-3 lg:tw-max-w-7xl lg:tw-mx-auto">
                            <ItemBuilder
                                items={list}
                                itemBuilder={(item, index) => (
                                    <ItemCard
                                        key={index}
                                        item={item}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    {isScreenSizeBelow && (
                        <div className="tw-grid tw-grid-cols-3 tw-place-items-center">
                            <button
                                type="button"
                                className="tw-h-fit tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark tw-bg-secondary-100-light"
                                onClick={() => {
                                    emblaApi?.scrollPrev();
                                }}
                            >
                                <ChevronLeftIcon className="tw-w-6 tw-h-6" />
                            </button>
                            <div className="tw-flex tw-flex-row tw-gap-x-2">
                                <ItemBuilder
                                    items={snapDotsDivisionFactor == undefined ? list : list.slice(0, list.length / snapDotsDivisionFactor)}
                                    itemBuilder={(_, scrollSnapIndex) => (
                                        <React.Fragment key={scrollSnapIndex}>
                                            <div
                                                className={concatenateNonNullStringsWithSpaces(
                                                    "tw-w-2 tw-h-2 tw-rounded-full",
                                                    scrollSnapIndex == selectedIndex ||
                                                        (snapDotsDivisionFactor != undefined && scrollSnapIndex === selectedIndex % (list.length / snapDotsDivisionFactor))
                                                        ? "lg-bg-secondary-900"
                                                        : "lg-bg-secondary-300",
                                                )}
                                                key={scrollSnapIndex}
                                                onClick={() => {
                                                    if (scrollSnapIndex !== selectedIndex) {
                                                        emblaApi?.scrollTo(scrollSnapIndex);
                                                    }
                                                }}
                                            />
                                        </React.Fragment>
                                    )}
                                />
                            </div>
                            <button
                                type="button"
                                className="tw-h-fit tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark tw-bg-secondary-100-light"
                                onClick={() => {
                                    emblaApi?.scrollNext();
                                }}
                            >
                                <ChevronRightIcon className="tw-w-6 tw-h-6" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

const ItemCard = ({item}: {item: any}) => {
    const contentData = useContext(ContentProviderContext);
    return (
        <>
            <Link to={item.redirectLink}>
                <div className="tw-text-center tw-min-w-[260px] tw-h-full tw-w-full tw-place-items-center tw-grid tw-gap-2 tw-grid-rows-[minmax(0,1fr)_auto]">
                    <div className="tw-row-start-1 tw-p-2 tw-grid tw-items-center tw-grid-rows-1 lg-card tw-bf tw-h-full tw-w-full">
                        <FullWidthImage relativePath={item.relativeImageUrl} />
                    </div>
                    <div
                        dangerouslySetInnerHTML={{__html: contentData.getContent(item.downTitleId)}}
                        className="tw-row-start-2 lg-text-title2 lg-text-headline lg-secondary-100 tw-text-center"
                    />
                </div>
            </Link>
        </>
    );
};

const HomeSolutionList = [
    {
        downTitle: "Home Inverter",
        downTitleId: "2257b2c1-280c-49a6-9399-8abd4847993f",
        relativeImageUrl: "/livguard/download-brochures/2/Home-inverter.png",
        redirectLink: "/inverter-for-home",
    },
    {
        downTitle: "High Capacity Inverter",
        downTitleId: "a6d509fa-dc46-498b-b363-fbf309c70449",
        relativeImageUrl: "/livguard/download-brochures/2/HKVA.png",
        redirectLink: "/high-capacity-inverters",
    },
    {
        downTitle: "Inverter Battery",
        downTitleId: "review2ProductName",
        relativeImageUrl: "/livguard/download-brochures/2/Inverter-battery.png",
        redirectLink: "/inverter-batteries",
    },
    {
        downTitle: "Inverter Trolley",
        downTitleId: "headerMenuSM5T6",
        relativeImageUrl: "/livguard/download-brochures/2/Inverter-trolley.png",
        redirectLink: "/inverter-trolley",
    },
];

const AutomotiveSolutionList = [
    {
        downTitle: "Two Wheeler",
        downTitleId: "57dfdb7b-3b26-4918-81fc-15aee33119a6",
        relativeImageUrl: "/livguard/all-category/3/3.1.png",
        redirectLink: "/two-wheeler-batteries",
    },
    {
        downTitle: "Three Wheeler",
        downTitleId: "b569ea15-be7b-422b-a6ef-3c09a1b8328d",
        relativeImageUrl: "/livguard/all-category/3/3.2.png",
        redirectLink: "/three-wheeler-batteries",
    },
    {
        downTitle: "Passenger Vehicle",
        downTitleId: "23384cb7-5097-4db3-964c-3010ed24ea63",
        relativeImageUrl: "/livguard/all-category/3/3.3.png",
        redirectLink: "/car-and-suv-batteries",
    },
    {
        downTitle: "Commercial",
        downTitleId: "8c1ffd32-d901-4cae-b508-1ac6498f84f9",
        relativeImageUrl: "/livguard/all-category/3/3.4.png",
        redirectLink: "/bus-and-truck-batteries",
    },
    {
        downTitle: "Farm Vehicle",
        downTitleId: "fbbc862d-69ec-4906-8f81-7e139dcdf047",
        relativeImageUrl: "/livguard/all-category/3/3.5.png",
        redirectLink: "/tractor-batteries",
    },
    {
        downTitle: "E-Rikshaw Battery",
        downTitleId: "162df6d1-e194-4ea4-9bc5-48e3249d857b",
        relativeImageUrl: "/livguard/all-category/3/3.6.png",
        redirectLink: "/e-rickshaw-batteries",
    },
    {
        downTitle: "E-Rikshaw Charger",
        downTitleId: "b2f6c8e0-4da7-4d9e-ba9b-f174690746c6",
        relativeImageUrl: "/livguard/all-category/3/3.7.png",
        redirectLink: "/e-rickshaw-charger",
    },
];

const SolarSolutionList = [
    {
        downTitle: "Solar Panel",
        downTitleId: "?????",
        relativeImageUrl: "/livguard/all-category/4/4.1.png",
        redirectLink: "https://www.livguardsolar.com/",
    },
    {
        downTitle: "Solar Inverter",
        downTitleId: "f996231c-b2f6-41f8-82bb-dea49b2c9a3d",
        relativeImageUrl: "/livguard/all-category/4/4.2.png",
        redirectLink: "https://www.livguardsolar.com/",
    },
    {
        downTitle: "Solar Battery",
        downTitleId: "6d5d47a4-ef2f-40c4-b364-1b4f96d47af9",
        relativeImageUrl: "/livguard/all-category/4/4.3.png",
        redirectLink: "https://www.livguardsolar.com/",
    },
    {
        downTitle: "Solar Charger Controller",
        downTitleId: "?????",
        relativeImageUrl: "/livguard/all-category/4/4.4.png",
        redirectLink: "https://www.livguardsolar.com/",
    },
    {
        downTitle: "Street Light",
        downTitleId: "93c283cc-941d-4382-aabb-67f017dd119b",
        relativeImageUrl: "/livguard/all-category/4/4.5.png",
        redirectLink: "https://www.livguardsolar.com/",
    },
    {
        downTitle: "Accessories",
        downTitleId: "b98f5c9e-16fc-4803-8494-1f54a8eb55c9",
        relativeImageUrl: "/livguard/all-category/4/4.6.png",
        redirectLink: "https://www.livguardsolar.com/",
    },
];
