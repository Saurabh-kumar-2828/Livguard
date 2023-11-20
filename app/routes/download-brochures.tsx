import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {PageScaffold} from "~/components/pageScaffold";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, type UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {useContext, useState} from "react";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getContentGenerator} from "~/vernacularProvider";
import {ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {getImageMetadataLibraryFromBackend} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";
// import { VerticalSpacer } from "~/global-common-typescript/components/verticalSpacer";

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

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language === Language.English) {
        return [
            {
                title: "Download | Brochure",
            },
        ];
    } else if (userPreferences.language === Language.Hindi) {
        return [
            {
                title: "Download | Brochure",
            },
        ];
    }
    return [{title: "download | Brochure"}];
};
export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const vernacularData = getVernacularFromBackend("downloadBrochuresPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("downloadBrochuresPage");

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        vernacularData: vernacularData,
        imageMetaDataLibrary: imageMetaDataLibrary,
    };

    return loaderData;
};

const DownloadBrochures = () => {
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
                            {contentId: "563b22d2-8286-47a4-8ad0-1782496a3c98", link: "#"},
                        ]}
                    >
                        <DownloadBrochure userPreferences={userPreferences} />
                    </PageScaffold>
                </ContentProviderContext.Provider>
            </ImageProviderContext.Provider>
        </>
    );
};
export default DownloadBrochures;

const DownloadBrochure = ({userPreferences}: {userPreferences: UserPreferences}) => {
    return (
        <div className="tw-grid tw-grid-cols-1 tw-gap-10 tw-mb-4">
            <HeroSection
                userPreferences={userPreferences}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
            />
            <DownloadGallery userPreferences={userPreferences} />
        </div>
    );
};
const DownloadGallery = ({userPreferences}: {userPreferences: UserPreferences}) => {
    const contentData = useContext(ContentProviderContext);
    const productItems = ["All", "Home", "Automotive", "Solar"];
    const [selectedSolution, setSelectedSolution] = useState<string | null>(null);
    const brochureItems = selectedSolution === null || selectedSolution === "All" ? galleryCardsData : galleryCardsData.filter((item) => item.type === selectedSolution);
    return (
        <div>
            <div className="tw-grid tw-grid-cols-1 tw-max-w-[65rem] tw-px-6 tw-mx-auto tw-gap-4">
                <DefaultTextAnimation>
                    <div className="tw-flex tw-flex-col lg-text-headline tw-text-center">
                        <div dangerouslySetInnerHTML={{__html: contentData.getContent("64538664-71d0-4080-900a-8b54176456bc")}} />
                        <div dangerouslySetInnerHTML={{__html: contentData.getContent("d170b1e3-9ac0-40f7-8ba4-ad1884dda08c")}} />
                    </div>
                </DefaultTextAnimation>
                <div className="tw-w-[16.6875rem] max-md:tw-m-auto">
                    <FormSelectComponent
                        items={[null, ...productItems]}
                        itemBuilder={(item) => (item == null ? `${contentData.getContent("6b8f84b8-2fc2-4dcc-a031-e4dbcfa2f635")}` : `<div class="tw-py-0">${item}</div>`)}
                        value={selectedSolution}
                        setValue={(item) => (item != null ? setSelectedSolution(item) : setSelectedSolution(null))}
                        // buttonClassName="!tw-rounded-full"
                    />
                </div>
                <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-x-4 tw-gap-y-6">
                    <ItemBuilder
                        items={brochureItems}
                        itemBuilder={(item, itemIndex) => {
                            return (
                                <div
                                    key={itemIndex}
                                    className="tw-grid tw-grid-cols-1 tw-grid-rows-[auto_auto_minmax(0,1fr)_auto] tw-rounded-2xl lg-card tw-p-4 tw-gap-2"
                                >
                                    <div className="tw-rounded-lg tw-row-start-1 lg-bg-new-background-border-500 tw-grid tw-justify-center tw-items-center">
                                        <FullWidthImage relativePath={item.imageRelativeUrl} />
                                    </div>

                                    <h1 className="lg-text-title2 tw-row-start-2">{contentData.getContent(item.title)}</h1>
                                    <a
                                        href={item.buttonLink}
                                        download
                                        target="_blank"
                                        className="lg-cta-button tw-p-2 tw-row-start-4 tw-text-center tw-cursor-pointer tw-grid max-sm:tw-px-6 max-sm:tw-py-[0.625rem] max-sm:tw-justify-self-start"
                                    >
                                        {contentData.getContent("563b22d2-8286-47a4-8ad0-1782496a3c98")}
                                    </a>
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    // const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    // const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    // useEffect(() => {
    //     secondaryNavigationController.setSections((previousSections) => ({
    //         ...previousSections,
    //         top: {
    //             humanReadableName: contentData.getContent("9fc64723-0e15-4211-983a-ba03cf9a4d41"),
    //             isCurrentlyVisible: sectionInView,
    //         },
    //     }));
    // }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                " lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[4rem_auto_auto_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left lg:tw-grid-cols-1",
                className,
            )}
            id="top"
            // ref={sectionRef}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full">
                {isScreenSizeBelow == null ? null : (
                    <>
                        <FullWidthImage
                            relativePath={isScreenSizeBelow ? "/livguard/download-brochures/1/mobile-banner.jpg" : "/livguard/download-brochures/1/desktop-banner.jpg"}
                            key={isScreenSizeBelow ? "/livguard/download-brochures/1/mobile-banner.jpg" : "/livguard/download-brochures/1/desktop-banner.jpg"}
                        />
                    </>
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">{contentData.getContent("35274dfd-803e-424c-9a95-04c1bcea7a5d")}</div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">{contentData.getContent("f6ef02af-f66d-4564-9dca-cd8e1592afcb")}</div>
            </DefaultTextAnimation>
        </div>
    );
}

const galleryCardsData = [
    {
        imageRelativeUrl: "/livguard/download-brochures/2/Home-inverter.png",
        title: "homeS3Tab2H",
        buttonLink: "https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf",
        type: "Home",
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/HKVA.png",
        title: "footerDisclosure2T3",
        buttonLink: "https://www.livguard.com/static-assets/leaflet-hkva.pdf",
        type: "Home",
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/Inverter-battery.png",
        title: "review2ProductName",
        buttonLink: "https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf",
        type: "Home",
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/Inverter-trolley.png",
        title: "6596ffc6-6377-4446-92b9-4cac254af278",
        buttonLink: "https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf",
        type: "Home",
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/Two-wheeler.png",
        title: "3be9fa84-b556-42a0-95d8-093c1254891a",
        buttonLink: "https://www.livguard.com/static-assets/leaflet-two-wheeler.pdf",
        type: "Automotive",
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/Passenger-vehicle.png",
        title: "23384cb7-5097-4db3-964c-3010ed24ea63",
        buttonLink: "https://www.livguard.com/static-assets/leaflet-car-n-suv.pdf",
        type: "Automotive",
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/Commercial.png",
        title: "8c1ffd32-d901-4cae-b508-1ac6498f84f9",
        buttonLink: "https://www.livguard.com/static-assets/leaflet-commercial-vehicles.pdf",
        type: "Automotive",
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/Farm-vehicle.png",
        title: "fbbc862d-69ec-4906-8f81-7e139dcdf047",
        buttonLink: "https://www.livguard.com/static-assets/leaflet-tractor.pdf",
        type: "Automotive",
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/E-rickshaw.png",
        title: "60aaf8a6-2e05-465c-9442-4354111a0433",
        buttonLink: "https://www.livguard.com/static-assets/leaflet-e-rickshaw.pdf",
        type: "Automotive",
    },
    {
        imageRelativeUrl: "/livguard/all-category/4/charge-controller.png",
        title: "46eb3f74-d78f-4ba2-b681-dd51a81bc914",
        buttonLink: "https://www.livguard.com/static-assets/categories/charge-controller.pdf",
        type: "Solar",
    },
    {
        imageRelativeUrl: "/livguard/all-category/4/solar-batteries.png",
        title: "036fe73d-7d0c-4221-ae1d-3101139338c6",
        buttonLink: "https://www.livguard.com/static-assets/categories/solar-battery.pdf",
        type: "Solar",
    },
    {
        imageRelativeUrl: "/livguard/all-category/4/hybrid-inverter.png",
        title: "ebb7642d-4c02-426e-83c0-06acd292ec33",
        buttonLink: "https://www.livguard.com/static-assets/categories/solar-hybrid.pdf",
        type: "Solar",
    },
    {
        imageRelativeUrl: "/livguard/all-category/4/solar-management-unit.png",
        title: "f12df3fc-ddaf-4809-b2dc-d34c218db76f",
        buttonLink: "https://www.livguard.com/static-assets/categories/solar-management-unit.pdf",
        type: "Solar",
    },
    {
        imageRelativeUrl: "/livguard/all-category/4/solar-off-grid-inverter.png",
        title: "f9c8836a-2d8d-4d40-916c-a6b5ae9fc0a6",
        buttonLink: "https://www.livguard.com/static-assets/categories/solar-off-grid.pdf",
        type: "Solar",
    },
    {
        imageRelativeUrl: "/livguard/all-category/4/solar-on-grid-inverter.png",
        title: "f4a2d034-5b81-4acc-9f92-5ac4f9c89809",
        buttonLink: "https://www.livguard.com/static-assets/categories/ongrid.pdf",
        type: "Solar",
    },
    {
        imageRelativeUrl: "/livguard/all-category/4/solar-panel.png",
        title: "c26206f2-c606-486f-b8bc-4072e9afbf86",
        buttonLink: "https://www.livguard.com/static-assets/categories/solar-panel.pdf",
        type: "Solar",
    },
];
