import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DefaultTextAnimation } from "~/components/defaultTextAnimation";
import { PageScaffold } from "~/components/pageScaffold";
import { ItemBuilder } from "~/global-common-typescript/components/itemBuilder";
import { useUtmSearchParameters } from "~/global-common-typescript/utilities/utmSearchParameters";
import { FormSelectComponent } from "~/livguard-common-typescript/scratchpad";
import { getUserPreferencesFromCookiesAndUrlSearchParameters } from "~/server/utilities.server";
import {Language, type UserPreferences} from "~/typeDefinitions";
import { getRedirectToUrlFromRequest, getUrlFromRequest } from "~/utilities";
import { getVernacularString } from "~/vernacularProvider";
import { useState } from 'react'
import { FullWidthImage } from "~/components/images/fullWidthImage";
import { concatenateNonNullStringsWithSpaces } from "~/global-common-typescript/utilities/utilities";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
// import { VerticalSpacer } from "~/global-common-typescript/components/verticalSpacer";

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    pageUrl: string;
};

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if(userPreferences.language === Language.English) {
        return [
            {
                title: "Download | Brochure" 
            }
        ]
    } else if(userPreferences.language === Language.Hindi) {
        return [
            {
                title: "Download | Brochure"
            }
        ]
    }
    return [
        {title: "download | Brochure"}
    ]

}
export const loader: LoaderFunction = async ({ request }) => {

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
}

const DownloadBrochures = () => {
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
                    {contentId: "563b22d2-8286-47a4-8ad0-1782496a3c98", link: "#"},
                ]}
            >
                <DownloadBrochure userPreferences = {userPreferences}  />
            </PageScaffold>
        </>
    )
}
export default DownloadBrochures;

const DownloadBrochure = ({userPreferences}: {userPreferences: UserPreferences}) => {

    return (
        <div className="tw-grid tw-grid-cols-1 tw-gap-10 tw-mb-4">
            <HeroSection
                userPreferences={userPreferences}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
            />
            <DownloadGallery
                userPreferences={userPreferences}
            />
        </div>
    )
}
const DownloadGallery = ({userPreferences}: {userPreferences: UserPreferences}) => {

    const productItems = ["All", "Home", "Automotive", "Solar"]
    const [selectedSolution, setSelectedSolution] = useState<string | null>(null)
    const brochureItems = (selectedSolution === null || selectedSolution === "All")? galleryCardsData: galleryCardsData.filter((item) => item.type === selectedSolution)
    return (
        <div>
            <div className="tw-grid tw-grid-cols-1 tw-max-w-[65rem] tw-px-6 tw-mx-auto tw-gap-4">
                <DefaultTextAnimation>
                    <div className="tw-flex tw-flex-col lg-text-headline tw-text-center">
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("64538664-71d0-4080-900a-8b54176456bc", userPreferences.language)}} />
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("d170b1e3-9ac0-40f7-8ba4-ad1884dda08c", userPreferences.language)}} />

                    </div> 
                </DefaultTextAnimation>
                <div className="tw-w-[16.6875rem] max-md:tw-m-auto">
                    <FormSelectComponent
                    items={[null, ...productItems]}
                    itemBuilder={(item) =>
                        item == null ? `${getVernacularString("6b8f84b8-2fc2-4dcc-a031-e4dbcfa2f635", userPreferences.language)}` : `<div class="tw-py-0">${item}</div>`
                    }
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
                            <div key={itemIndex} className="tw-grid tw-grid-cols-1 tw-grid-rows-[auto_auto_minmax(0,1fr)_auto] tw-rounded-2xl tw-shadow-xl tw-p-4 tw-gap-2">
                                <div className="tw-rounded-lg tw-row-start-1">
                                    <FullWidthImage relativePath={item.imageRelativeUrl} />
                                </div>

                                <h1 className="lg-text-title2 tw-row-start-2">{item.title}</h1>
                                <a
                                 href={item.buttonLink}
                                 download
                                 target="_blank"
                                 className="lg-cta-button tw-p-2 tw-row-start-4 tw-text-center tw-cursor-pointer"
                                >
                                    {getVernacularString("563b22d2-8286-47a4-8ad0-1782496a3c98", userPreferences.language)}
                                </a>
                            </div>
                        )
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    // const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    // const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    // useEffect(() => {
    //     secondaryNavigationController.setSections((previousSections) => ({
    //         ...previousSections,
    //         top: {
    //             humanReadableName: getVernacularString("9fc64723-0e15-4211-983a-ba03cf9a4d41", userPreferences.language),
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
                            relativePath={isScreenSizeBelow ? "/livguard/download-brochures/2/mobile-banner.png" : "/livguard/download-brochures/2/desktop-banner.png"}
                            key={isScreenSizeBelow ? "/livguard/download-brochures/2/mobile-banner.png" : "/livguard/download-brochures/2/desktop-banner.png"}
                        />
                    </>
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("35274dfd-803e-424c-9a95-04c1bcea7a5d", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("f6ef02af-f66d-4564-9dca-cd8e1592afcb", userPreferences.language)}
                </div>
            </DefaultTextAnimation>
        </div>
    );
}
const galleryCardsData = [
    {
        imageRelativeUrl: "/livguard/download-brochures/2/(1).png",
        title: "Home Inverter",
        buttonLink: "https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf",
        type: "Home"
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/Rectangle.png",
        title: "High Capacity Inverter",
        buttonLink: "https://www.livguard.com/static-assets/leaflet-hkva.pdf",
        type: "Home"
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/(3).png",
        title: "Inverter Battery",
        buttonLink: "https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf",
        type: "Home"
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/(4).png",
        title: "Inverter Trolley",
        buttonLink: "https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf",
        type: "Home"
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/(5).png",
        title: "Two Wheeler",
        buttonLink: "https://www.livguard.com/static-assets/leaflet-two-wheeler.pdf",
        type: "Automotive"
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/(6).png",
        title: "Passenger Vehicle",
        buttonLink: "https://www.livguard.com/static-assets/leaflet-car-n-suv.pdf",
        type: "Automotive"
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/(7).png",
        title: "Commercial",
        buttonLink: "https://www.livguard.com/static-assets/leaflet-commercial-vehicles.pdf",
        type: "Automotive"
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/(8).png",
        title: "Farm Vehicle",
        buttonLink: "https://www.livguard.com/static-assets/leaflet-tractor.pdf",
        type: "Automotive"
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/(9).png",
        title: "E-Rickshaw Solution",
        buttonLink: "https://www.livguard.com/static-assets/leaflet-e-rickshaw.pdf",
        type: "Automotive"
    },
    {
        imageRelativeUrl: "/livguard/download-brochures/2/(10).png",
        title: "Solar Solution",
        buttonLink: "",
        type: "Solar"
    },
]