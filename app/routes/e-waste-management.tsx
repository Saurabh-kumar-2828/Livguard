import {LinksFunction, LoaderFunction, MetaFunction, V2_MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {StarFill} from "react-bootstrap-icons";
import {useResizeDetector} from "react-resize-detector";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {SocialHandles} from "~/components/category/common";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FaqSectionInternal} from "~/components/faqs";
import {CoverImage} from "~/components/images/coverImage";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces, getIntegerArrayOfLength} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, UserPreferences} from "~/typeDefinitions";
import {appendSpaceToString, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";
import {ContactUsCta} from ".";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {useContext, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {SecondaryNavigation} from "~/components/secondaryNavigation";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/e-waste-management",
            },
            {
                title: "Leading the Charge in E-Waste Management | Livguard",
            },
            {
                name: "description",
                content: "Discover Livguard's innovative approach to e-waste management. Reclaiming valuable resources and creating a positive impact on the environment",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/e-waste-management",
            },
            {
                property: "og:title",
                content: "Leading the Charge in E-Waste Management | Livguard",
            },
            {
                property: "og:description",
                content: "Discover Livguard's innovative approach to e-waste management. Reclaiming valuable resources and creating a positive impact on the environment",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Website",
            },
            {
                property: "og:image",
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/e-waste-management/e-waste-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/e-waste-management",
            },
            {
                title: "ई-वेस्ट प्रबंधन में अग्रणी | लिवगार्ड",
            },
            {
                name: "description",
                content: "लिवगार्ड के ई-वेस्ट प्रबंधन के नए और अभिनवीय प्रस्तावना की खोज करें। मूल्यवान संसाधनों को पुनर्प्राप्ति करके और पर्यावरण पर सकारात्मक प्रभाव बनाकर।",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/e-waste-management",
            },
            {
                property: "og:title",
                content: "ई-वेस्ट प्रबंधन में अग्रणी | लिवगार्ड",
            },
            {
                property: "og:description",
                content: "लिवगार्ड के ई-वेस्ट प्रबंधन के नए और अभिनवीय प्रस्तावना की खोज करें। मूल्यवान संसाधनों को पुनर्प्राप्ति करके और पर्यावरण पर सकारात्मक प्रभाव बनाकर।",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Website",
            },
            {
                property: "og:image",
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/e-waste-management/e-waste-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
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

    const secondaryNavigationController = useSecondaryNavigationController();

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
                    {contentId: "873561ca-02f7-45e3-8b98-80df5f7de86d", link: "#"},
                ]}
                secondaryNavigationController={secondaryNavigationController}
            >
                <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                    <EwasteManagementPage
                        userPreferences={userPreferences}
                        utmParameters={utmSearchParameters}
                        pageUrl={pageUrl}
                        secondaryNavigationController={secondaryNavigationController}
                    />
                </SecondaryNavigationControllerContext.Provider>
            </PageScaffold>
        </>
    );
};

function EwasteManagementPage({
    userPreferences,
    utmParameters,
    pageUrl,
    secondaryNavigationController,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
    secondaryNavigationController?: SecondaryNavigationController;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    return (
        <div>
            <HeroSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
            />
            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <Introduction
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <WhyEwaste
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            {/* <ServicesProvide
                className=""
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" /> */}

            {/* <NearestCollectionCenter
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" /> */}

            <AwarenessPrograms userPreferences={userPreferences} />

            {/* <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <HappyUser
                className=""
                userPreferences={userPreferences}
            /> */}

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <SocialHandlesSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <FaqQuestion
                className="tw-max-w-7xl tw-mx-auto lg-px-screen-edge-2"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-20" />
        </div>
    );
}

function HeroSection({
    userPreferences,
    utmParameters,
    className,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className?: string;
    pageUrl: string;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            top: {
                humanReadableName: getVernacularString("9fc64723-0e15-4211-983a-ba03cf9a4d41", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_1rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left tw-items-center md:tw-items-start tw-relative",
                className,
            )}
            id="top"
            ref={sectionRef}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full">
                {isScreenSizeBelow == null ? null : (
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/e-waste-management/1/mobile-banner.jpg" : "/livguard/e-waste-management/1/desktop-banner.jpg"}
                        key={isScreenSizeBelow ? "/livguard/e-waste-management/1/mobile-banner.jpg" : "/livguard/e-waste-management/1/desktop-banner.jpg"}
                    />
                )}
            </div>
            <h2 className="tw-row-start-2 tw-col-start-1 lg:lg-px-screen-edge-2">
                <DefaultTextAnimation>
                    <div className="lg-text-banner lg-text-secondary-100 !tw-text-secondary-100-light">
                        {appendSpaceToString(getVernacularString("bda064ee-6cc6-43f7-a7cb-8f14d9e050d9", userPreferences.language))}
                    </div>
                </DefaultTextAnimation>

                <DefaultTextAnimation>
                    <div className="lg-text-title1 lg-text-secondary-100 !tw-text-secondary-100-light">{getVernacularString("4eb87934-841c-4c9f-898e-3bfbac44f2a2", userPreferences.language)}</div>
                </DefaultTextAnimation>
                <VerticalSpacer className="tw-h-6" />
                {/* <DefaultElementAnimation className="tw-grid tw-justify-center lg:tw-justify-start tw-z-10">
                    <ContactUsCta
                        userPreferences={userPreferences}
                        textVernacId="320a319c-7aa8-4289-b46a-8d58e8542fb1"
                        className="tw-z-10 lg:tw-place-self-end"
                        utmParameters={utmParameters}
                        pageUrl={pageUrl}
                    />
                </DefaultElementAnimation> */}
            </h2>
        </div>
    );
}

function Introduction({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "understanding-e-waste-management": {
                humanReadableName: getVernacularString("3b3c4911-9f88-4c2b-a7e9-255c83f18ebd", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}
            id="understanding-e-waste-management"
            ref={sectionRef}
        >
            <div className="lg-text-headline tw-text-center">{getVernacularString("e7e9c51a-f71f-45dc-9607-93bd3236c6b5", userPreferences.language)}</div>
            <VerticalSpacer className="tw-h-[1rem]" />
            <div className="lg-text-body ">{getVernacularString("edc62a50-a3c7-4f6f-b5dc-e7fbad46a0aa", userPreferences.language)}</div>
            <VerticalSpacer className="tw-h-4" />
            <div className="lg-text-body">{getVernacularString("d86ceedf-2c18-4e72-bd6e-f680b3aa3e24", userPreferences.language)}</div>
            <VerticalSpacer className="tw-h-4" />
            <div className="lg-text-body">{getVernacularString("41446f5c-546d-4b87-b68f-09909f0ac67d", userPreferences.language)}</div>
            <VerticalSpacer className="tw-h-4" />
            <div className="lg-text-body">{getVernacularString("c26dd37a-78dc-46b8-8fd9-5a7f5b9c9e54", userPreferences.language)}</div>
        </div>
    );
}

function WhyEwaste({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "why-e-waste-management": {
                humanReadableName: getVernacularString("49f87968-94f3-4a60-8afa-830ef171f29b", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}
            id="why-e-waste-management"
            ref={sectionRef}
        >
            <div
                className="tw-w-full"
                ref={ref}
            >
                <div className=" tw-grid lg:tw-grid-rows-[1rem_minmax(0,1fr)_1rem] tw-content-center tw-grid-rows-[minmax(1rem,1fr)_auto_minmax(1rem,1fr)] tw-justify-items-center tw-relative tw-isolate">
                    <div className="tw-absolute tw-inset-0 -tw-z-10 tw-rounded-full">
                        {containerWidth == null || containerHeight == null ? null : (
                            <CoverImage
                                relativePath={
                                    containerHeight > containerWidth || containerWidth < 640 ? "/livguard/e-waste-management/4/mobile-banner.jpg" : "/livguard/e-waste-management/4/desktop-banner.jpg"
                                }
                                className="tw-rounded-lg"
                                key={
                                    containerHeight > containerWidth || containerWidth < 640 ? "/livguard/e-waste-management/4/mobile-banner.jpg" : "/livguard/e-waste-management/4/desktop-banner.jpg"
                                }
                            />
                        )}
                    </div>
                    <div className="tw-invisible tw-grid tw-col-start-1 tw-max-h-[13rem] tw-grid-cols-[auto_minmax(0,1fr)] tw-row-start-2 tw-mx-[2rem] lg:tw-py-8 tw-py-8 md:tw-py-2 tw-px-4 tw-justify-center tw-items-center tw-gap-[1.5rem] lg-e-waste-management-banner-card-bg">
                        <div className="lg:tw-h-[9rem] lg:tw-w-[9rem] tw-h-[6rem] tw-w-[6rem] lg-bg-secondary-100 tw-row-start-1 tw-col-start-1 tw-rounded-full tw-p-[2rem]">
                            <img
                                src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/e-waste-management/4/delete-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                                className={concatenateNonNullStringsWithSpaces("dark:tw-invert")}
                            />
                        </div>
                        <div>
                            <div
                                className="lg-text-title1 tw-text-secondary-900-light"
                                dangerouslySetInnerHTML={{__html: getVernacularString("6fa18bfe-40fb-42ec-b58c-654c4fc881da", userPreferences.language)}}
                            ></div>
                            <div
                                className="lg-text-body !tw-text-secondary-900-light"
                                dangerouslySetInnerHTML={{__html: getVernacularString("d2d23cef-3bfc-45bf-916c-a3299a9d163c", userPreferences.language)}}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <VerticalSpacer className="tw-h-10" />

            <div className="tw-grid tw-grid-col-1 lg:tw-grid-cols-2 tw-gap-x-[5rem] tw-gap-[1.5rem]">
                <div>
                    <div
                        className="lg-text-headline"
                        dangerouslySetInnerHTML={{__html: getVernacularString("8eb39f08-e6ac-49e8-b7cb-7b1b56a98891", userPreferences.language)}}
                    ></div>
                    <VerticalSpacer className="tw-h-4 lg:tw-h-2" />
                    <div
                        className="lg-text-body"
                        dangerouslySetInnerHTML={{__html: getVernacularString("91e2cda0-4afb-49e8-9772-8c4aa4cd246a", userPreferences.language)}}
                    ></div>
                </div>
                <div className="tw-grid tw-gap-6">
                    <div className="tw-grid tw-gap-2">
                        <div>
                            <div className="lg-text-title2 tw-grid tw-grid-cols-[3rem_minmax(0,1fr)] tw-items-center tw-gap-1">
                                <span className="lg-card tw-rounded-full tw-w-[2.625rem] tw-h-[2.625rem] tw-grid tw-justify-center tw-items-center tw-text-center">
                                    {getVernacularString("0ed9d4ea-8be2-4402-9cc9-6d9a07e96c43", userPreferences.language)}
                                </span>
                                {getVernacularString("fc71fe6d-a26c-4873-beb5-a16fe8fc7174", userPreferences.language)}
                            </div>
                        </div>
                        <div
                            className="lg-text-body"
                            dangerouslySetInnerHTML={{__html: getVernacularString("b494b200-dfd0-406c-8256-b1f655ca9066", userPreferences.language)}}
                        ></div>
                    </div>
                    <div className="tw-grid tw-gap-2">
                        <div>
                            <div className="lg-text-title2 tw-grid tw-grid-cols-[3rem_minmax(0,1fr)] tw-items-center tw-gap-1">
                                <span className="lg-card tw-rounded-full tw-w-[2.625rem] tw-h-[2.625rem] tw-grid tw-justify-center tw-items-center tw-text-center">
                                    {getVernacularString("b452610b-4e19-4d8a-a5c7-c42e7440a3e4", userPreferences.language)}
                                </span>
                                {getVernacularString("c67dd066-2f26-4073-af46-c66a4cdd21c5", userPreferences.language)}
                            </div>
                        </div>
                        <div
                            className="lg-text-body"
                            dangerouslySetInnerHTML={{__html: getVernacularString("d2f89a76-0b86-4232-bea7-4c289826a2c1", userPreferences.language)}}
                        ></div>
                    </div>
                    <div className="tw-grid tw-gap-2">
                        <div>
                            <div className="lg-text-title2 tw-grid tw-grid-cols-[3rem_minmax(0,1fr)] tw-items-center tw-gap-1">
                                <span className="lg-card tw-rounded-full tw-w-[2.625rem] tw-h-[2.625rem] tw-grid tw-justify-center tw-items-center tw-text-center">
                                    {getVernacularString("17bc8148-f2ed-4026-8074-ce2ca1013b4d", userPreferences.language)}
                                </span>
                                {getVernacularString("06e30da0-63f4-43d6-beb5-8fe3b7af9a33", userPreferences.language)}
                            </div>
                        </div>
                        <div
                            className="lg-text-body"
                            dangerouslySetInnerHTML={{__html: getVernacularString("24b72e2e-abdd-48ae-ba2b-f60489dedf5e", userPreferences.language)}}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ServicesProvide({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const items = [
        {
            svgIcon: "/livguard/e-waste-management/5/symbol-of-three-arrows1.svg",
            title: "1795f04a-f546-4230-80aa-e73f5020a68e",
            content: "ba3ccca0-b314-460f-9656-72dbbd7c069b",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/cartridge2.svg",
            title: "e133c65a-9f38-4170-b96a-8b5ee5b4260f",
            content: "eef3b063-0d53-4230-a41a-2f3e943f2312",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/computer3.svg",
            title: "51a87ae7-fadf-48b0-bc54-93000203a850",
            content: "76beb53f-bb59-4fe8-a9e2-7fd1e68c2800",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/hard-disk4.svg",
            title: "86f8e696-7719-4db9-9bc8-083b37380b39",
            content: "c8ba9381-6e76-4625-90a5-fff915a4be4c",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/data-destruction5.svg",
            title: "a023698b-d95f-4faf-abb9-9aaf92d3b1a9",
            content: "335063e8-3c69-4cb3-8753-b60b2947a6fe",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/data-cleaning.svg",
            title: "46300379-6d5d-49d3-90af-e1b6510e2f18",
            content: "5d071bd5-7d7c-4b61-9050-6b5e65f1df8c",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/symbol-of-three-arrows1.svg",
            title: "1795f04a-f546-4230-80aa-e73f5020a68e",
            content: "ba3ccca0-b314-460f-9656-72dbbd7c069b",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/cartridge2.svg",
            title: "e133c65a-9f38-4170-b96a-8b5ee5b4260f",
            content: "eef3b063-0d53-4230-a41a-2f3e943f2312",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/computer3.svg",
            title: "51a87ae7-fadf-48b0-bc54-93000203a850",
            content: "76beb53f-bb59-4fe8-a9e2-7fd1e68c2800",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/hard-disk4.svg",
            title: "86f8e696-7719-4db9-9bc8-083b37380b39",
            content: "c8ba9381-6e76-4625-90a5-fff915a4be4c",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/data-destruction5.svg",
            title: "a023698b-d95f-4faf-abb9-9aaf92d3b1a9",
            content: "335063e8-3c69-4cb3-8753-b60b2947a6fe",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/data-cleaning.svg",
            title: "46300379-6d5d-49d3-90af-e1b6510e2f18",
            content: "5d071bd5-7d7c-4b61-9050-6b5e65f1df8c",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/symbol-of-three-arrows1.svg",
            title: "1795f04a-f546-4230-80aa-e73f5020a68e",
            content: "ba3ccca0-b314-460f-9656-72dbbd7c069b",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/cartridge2.svg",
            title: "e133c65a-9f38-4170-b96a-8b5ee5b4260f",
            content: "eef3b063-0d53-4230-a41a-2f3e943f2312",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/computer3.svg",
            title: "51a87ae7-fadf-48b0-bc54-93000203a850",
            content: "76beb53f-bb59-4fe8-a9e2-7fd1e68c2800",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/hard-disk4.svg",
            title: "86f8e696-7719-4db9-9bc8-083b37380b39",
            content: "c8ba9381-6e76-4625-90a5-fff915a4be4c",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/data-destruction5.svg",
            title: "a023698b-d95f-4faf-abb9-9aaf92d3b1a9",
            content: "335063e8-3c69-4cb3-8753-b60b2947a6fe",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/data-cleaning.svg",
            title: "46300379-6d5d-49d3-90af-e1b6510e2f18",
            content: "5d071bd5-7d7c-4b61-9050-6b5e65f1df8c",
        },
    ];
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full", className)}>
            <div
                className="lg-text-banner tw-text-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("c0322003-0090-4b07-867b-e9a14cab8b06", userPreferences.language)}}
            ></div>
            <VerticalSpacer className="tw-h-[1rem]" />
            <div
                className="lg-text-body tw-text-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("afc8a4c5-877d-4137-a2b0-97c9408eaded", userPreferences.language)}}
            ></div>
            <VerticalSpacer className="tw-h-[1.5rem]" />
            <CarouselStyle4
                chevronButtonsDivisionFactor={3}
                items={items.map((item, itemIndex) => {
                    return (
                        <div
                            className="tw-h-full tw-grid tw-grid-rows-[auto_0.5rem_minmax(0,1fr)] tw-gap-2 tw-p-5 lg-card tw-justify-items-center tw-max-w-[14rem]"
                            key={itemIndex}
                        >
                            <div className="tw-row-start-1 tw-h-[4.5rem] tw-w-[4.5rem] lg-card tw-rounded-full tw-grid tw-justify-center tw-items-center">
                                <img
                                    src={getAbsolutePathForRelativePath(getMetadataForImage(item.svgIcon).finalUrl, ImageCdnProvider.Bunny, null, null)}
                                    className={concatenateNonNullStringsWithSpaces("dark:tw-invert")}
                                />
                            </div>
                            <div className="tw-row-start-3">
                                <div
                                    className="lg-text-body-bold tw-text-center"
                                    dangerouslySetInnerHTML={{__html: getVernacularString(item.title, userPreferences.language)}}
                                />
                                <div
                                    className="lg-text-body tw-text-center"
                                    dangerouslySetInnerHTML={{__html: getVernacularString(item.content, userPreferences.language)}}
                                />
                            </div>
                        </div>
                    );
                })}
                slidesContainerClassName="tw-auto-cols-max"
                controlsContainerClassName="!tw-justify-center !tw-gap-x-4"
            />
        </div>
    );
}

function NearestCollectionCenter({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div
                className="lg-text-headline"
                dangerouslySetInnerHTML={{__html: getVernacularString("9d43b4fc-3438-4cf3-8f7d-2656d486846e", userPreferences.language)}}
            ></div>
            <VerticalSpacer className="tw-h-6" />
            <div className="tw-grid lg:tw-grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)_1.5rem_auto] lg:tw-grid-rows-1 tw-grid-cols-1 tw-grid-rows-[minmax(0,1fr)_1rem_minmax(0,1fr)_minmax(0,1fr)] tw-items-end">
                <div className="tw-grid tw-col-start-1">
                    <div className="lg-text-body">{getVernacularString("acf56d00-92b0-4408-baf5-7c6c4596d0dc", userPreferences.language)}</div>
                    <input
                        type="text"
                        name="state"
                        className="lg-text-input"
                        placeholder={getVernacularString("ad6b181f-0115-4496-a9f8-4fb7d7d6e990", userPreferences.language)}
                        required
                    />
                </div>
                <div className="tw-grid lg:tw-col-start-3 lg:tw-row-start-1 tw-row-start-3">
                    <div className="lg-text-body">{getVernacularString("91cb41a5-571d-4516-91fb-fc5e67266990", userPreferences.language)}</div>
                    <input
                        type="text"
                        name="state"
                        className="lg-text-input"
                        placeholder={getVernacularString("07ac43fc-8777-4379-81d5-8c80533d5e66", userPreferences.language)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="lg:tw-row-start-1 tw-row-start-4 lg:tw-hidden tw-block lg:tw-col-start-5 lg-text-body lg-cta-button !tw-text-secondary-900-dark tw-w-full"
                >
                    {getVernacularString("3a2ac2b6-a897-4d0a-ac7e-0abf6425ba24", userPreferences.language)}
                </button>
                <button
                    type="submit"
                    className="lg:tw-block tw-hidden lg:tw-col-start-5 lg-text-body lg-cta-button !tw-text-secondary-900-dark"
                >
                    {getVernacularString("contactUsS3FormButtonText", userPreferences.language)}
                </button>
            </div>
            <VerticalSpacer className="tw-h-10" />
            <div className="tw-grid lg:tw-grid-cols-3 lg:tw-grid-rows-1 tw-grid-cols-1 tw-grid-rows-3 tw-gap-x-4 tw-gap-y-6">
                <ItemBuilder
                    items={[
                        {
                            name: "5fc70a88-5ac0-4369-991c-354a4d48deed",
                            address: "3534a1d3-4422-4446-8489-05c211592c14",
                            cta1: "65c54ed1-3464-4a31-bb9c-d0aaefb33bfe",
                            cta2: "0a6730e2-c863-4fea-8ed7-b9944641304e",
                        },
                        {
                            name: "5fc70a88-5ac0-4369-991c-354a4d48deed",
                            address: "3534a1d3-4422-4446-8489-05c211592c14",
                            cta1: "65c54ed1-3464-4a31-bb9c-d0aaefb33bfe",
                            cta2: "0a6730e2-c863-4fea-8ed7-b9944641304e",
                        },
                        {
                            name: "5fc70a88-5ac0-4369-991c-354a4d48deed",
                            address: "3534a1d3-4422-4446-8489-05c211592c14",
                            cta1: "65c54ed1-3464-4a31-bb9c-d0aaefb33bfe",
                            cta2: "0a6730e2-c863-4fea-8ed7-b9944641304e",
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <div
                            className="tw-grid tw-grid-rows-[minmax(0,2fr)_1.5rem_minmax(0,1fr)] lg-card tw-px-6 tw-pt-4 tw-pb-2"
                            key={itemIndex}
                        >
                            <div className="tw-row-start-1 tw-col-start-1 ">
                                <div className="lg-text-title2">{getVernacularString(item.name, userPreferences.language)}</div>
                                <div
                                    className="lg-text-body"
                                    dangerouslySetInnerHTML={{__html: getVernacularString(item.address, userPreferences.language)}}
                                ></div>
                            </div>
                            <div className="tw-grid tw-grid-cols-2 tw-pb-4 tw-gap-6 tw-row-start-3">
                                <div className="lg-cta-button tw-grid tw-px-0 tw-py-2 tw-max-w-[8.6rem] tw-justify-center tw-items-center">
                                    {getVernacularString(item.cta1, userPreferences.language)}
                                </div>
                                <div className="lg-cta-outline-button tw-px-0 tw-py-2 tw-max-w-[8.6rem] tw-grid tw-justify-center tw-items-center">
                                    {getVernacularString(item.cta2, userPreferences.language)}
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

function AwarenessPrograms({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const items = [
        {
            image: "/livguard/e-waste-management/7/1.png",
        },
        {
            image: "/livguard/e-waste-management/7/2.png",
        },
        {
            image: "/livguard/e-waste-management/7/3.png",
        },
        {
            image: "/livguard/e-waste-management/7/1.png",
        },
        {
            image: "/livguard/e-waste-management/7/2.png",
        },
        {
            image: "/livguard/e-waste-management/7/3.png",
        },
        {
            image: "/livguard/e-waste-management/7/1.png",
        },
        {
            image: "/livguard/e-waste-management/7/2.png",
        },
        {
            image: "/livguard/e-waste-management/7/3.png",
        },
        {
            image: "/livguard/e-waste-management/7/1.png",
        },
        {
            image: "/livguard/e-waste-management/7/2.png",
        },
        {
            image: "/livguard/e-waste-management/7/3.png",
        },
        {
            image: "/livguard/e-waste-management/7/1.png",
        },
        {
            image: "/livguard/e-waste-management/7/2.png",
        },
        {
            image: "/livguard/e-waste-management/7/3.png",
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "waves-of-impact": {
                humanReadableName: getVernacularString("789b2fd5-46ee-4b76-b2a4-a73074021f6a", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("", className)}
            id="waves-of-impact"
            ref={sectionRef}
        >
            <div className="lg-text-headline tw-text-center">{getVernacularString("6c5422c4-c98a-4035-9e9d-7977366e50f3", userPreferences.language)}</div>
            <div
                className="lg-text-body tw-text-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("1eaa68c5-42b8-497e-bf30-220999dcc61a", userPreferences.language)}}
            />{" "}
            <VerticalSpacer className="tw-h-6" />
            <CarouselStyle4
                chevronButtonsDivisionFactor={5}
                items={items.map((item, itemIndex) => {
                    return (
                        <div
                            className="tw-w-full lg:tw-max-w-[31rem] tw-max-w-[19rem]"
                            key={itemIndex}
                        >
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage(item.image).finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>
                    );
                })}
                slidesContainerClassName="!tw-auto-cols-max"
                controlsContainerClassName="!tw-justify-center !tw-gap-x-4"
            />
        </div>
    );
}

function SocialHandlesSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("", className)}>
            <SocialHandles
                userPreferences={userPreferences}
                heading={{text1: "homeS11H1T1", text2: "homeS11H1T2"}}
            />
        </div>
    );
}

export function FaqQuestion({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "0b25ac7a-871b-4b2e-931e-c1d1164b7cbd",
            answer: "1ba46bef-05f1-4822-b635-55f50b3cc38c",
        },
        {
            question: "788de904-c62e-4e0a-af30-5da5d0286361",
            answer: "ffe8fb10-e2ab-475f-8e91-efed3cc2ca8a",
        },
        {
            question: "ae97ad8d-44e1-465d-b6f1-aa2867de6a99",
            answer: "9490b60b-7dd9-4ddf-b052-105b0f267a0c",
        },
        {
            question: "040a3fb1-bc00-422c-8169-36017f5108dd",
            answer: "98756773-9cd8-47e2-973f-9dbe2bffff71",
        },
        {
            question: "d063752e-9fed-44f2-bed3-5c128b955ced",
            answer: "1dd8e8a8-f9ac-42de-bbf6-dff02440d916",
        },
    ];
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full tw-h-full", className)}>
            <FaqSectionInternal
                faqs={faqs}
                userPreferences={userPreferences}
                className=""
            />
        </div>
    );
}
