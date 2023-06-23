import {useState} from "react";
import {LoaderFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {useResizeDetector} from "react-resize-detector";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/components/images/coverImage";
import {PageScaffold} from "~/components/pageScaffold";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Theme, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {appendSpaceToString, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {FixedHeightImage} from "~/components/images/fixedHeightImage";
import {CarouselStyle7} from "~/components/carouselStyle7";
import {InfiniteHorizontalScroller, HorizontalScrollDirection} from "~/livguard-common-typescript/infiniteHorizontalScroller";

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
    const {userPreferences, redirectTo} = useLoaderData() as LoaderData;

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
                <AboutUsPage userPreferences={userPreferences} />
            </PageScaffold>
        </>
    );
};

function AboutUsPage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <WhoWeAre
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <MeetOurLeaders
                    userPreferences={userPreferences}
                    className="tw-row-start-5 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-row-start-6 tw-h-10 lg:tw-h-20" />

                <OurPresence
                    userPreferences={userPreferences}
                    className="tw-row-start-7 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-8 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-9 tw-grid lg:tw-grid-cols-[minmax(0,3fr)_minmax(0,2fr)] tw-col-span-full lg-px-screen-edge-2 tw-gap-x-5 tw-w-full tw-max-w-7xl tw-mx-auto">
                    <OurValues
                        userPreferences={userPreferences}
                        className="tw-row-start-1 lg:tw-col-start-1"
                    />

                    <VerticalSpacer className="tw-h-10 tw-row-start-2 lg:tw-col-start-1 lg:tw-hidden" />

                    <WeAreEverywhere
                        userPreferences={userPreferences}
                        className="tw-row-start-3 lg:tw-row-start-1 lg:tw-col-start-2 lg:tw-h-full"
                        showCtaButton={true}
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-10 tw-col-start-1 lg:tw-col-span-full" />

                <ExploreCareers
                    userPreferences={userPreferences}
                    className="lg:lg-pl-screen-edge-2 lg:lg-pr-screen-edge-2 tw-row-start-11 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-12 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-13 tw-col-start-1 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto lg-px-screen-edge-2">
                    <EmpoweredBySAR
                        userPreferences={userPreferences}
                        className="tw-w-full"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-14 tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-9.5rem)] lg:tw-h-[70vh] tw-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={
                        containerHeight > containerWidth || containerWidth < 640 ? "/livguard/services-page/6/service_mobile_banner.jpg" : "/livguard/services-page/6/service_desktop_banner.jpg"
                    }
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/services-page/6/service_mobile_banner.jpg" : "/livguard/services-page/6/service_desktop_banner.jpg"}
                />
            )}

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 tw-place-self-center lg-px-screen-edge-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center tw-self-center tw-text-center tw-max-w-[31rem]">
                    {getVernacularString("b38f6ec8-1c38-44ef-b016-93da7ed7bf19", userPreferences.language)}
                </div>
            </DefaultTextAnimation>
        </div>
    );
}

function WhoWeAre({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    function WhoWeAreCard({iconUrl, title, description}: {iconUrl: string; title: string; description: string}) {
        return (
            <div className="tw-grid tw-grid-rows-[1.5rem_auto_0.5rem_auto_0.5rem_auto_minmax(1rem,1fr)] lg:tw-grid-rows-[4rem_auto_1rem_auto_0.75rem_auto_minmax(1rem,1fr)] tw-border-2 lg-border-secondary-900 tw-rounded-lg tw-px-6">
                <div className="tw-row-start-2 tw-h-16 tw-w-16 lg:tw-h-[6.25rem] lg:tw-w-[6.25rem] tw-rounded-full lg-bg-secondary-100 tw-place-self-center tw-grid tw-place-content-center">
                    <img
                        src={iconUrl}
                        className="tw-invert dark:tw-invert-0 tw-h-8 tw-w-8 lg:tw-h-[3.125rem] lg:tw-w-[3.125rem]"
                    />
                </div>
                <div className="tw-row-start-4 lg-text-title2 tw-text-center">{title}</div>
                <div className="tw-row-start-6 lg-text-body tw-text-center">{description}</div>
            </div>
        );
    }

    const whoWeAreCardsContent = [
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/about-us/2/our-mission.svg",
            title: getVernacularString("8a35dff2-079c-4638-a96a-8100d04a72b6", userPreferences.language),
            description: getVernacularString("4e49216b-9457-488a-860e-3fb97ba34100", userPreferences.language),
        },
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/about-us/2/our-vision.svg",
            title: getVernacularString("68b1762f-e31f-4110-bf87-3afc487d7edf", userPreferences.language),
            description: getVernacularString("373fedff-da89-4396-b215-ed4099abfcf9", userPreferences.language),
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid lg-px-screen-edge-2 lg:tw-grid-cols-[minmax(0,4fr)_minmax(0,3fr)_minmax(0,3fr)] tw-gap-6", className)}>
            <div className="lg:tw-col-start-1 tw-w-full tw-h-full tw-grid lg:lg-bg-secondary-100 lg:tw-px-8 lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_0.75rem_auto_minmax(0,1fr)] lg:tw-rounded-lg lg:lg-about-us-who-we-are-bg-gradient-light lg:dark:lg-about-us-who-we-are-bg-gradient-dark">
                <DefaultTextAnimation className="tw-row-start-1 lg:tw-row-start-2 lg-text-banner tw-text-center lg:tw-text-left">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("540952b6-a7ef-453f-a6e5-cd8953fa4222", userPreferences.language)}}></div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-row-start-2 lg:tw-hidden tw-h-2" />

                <DefaultTextAnimation className="tw-row-start-3 lg-text-title2 tw-text-center lg:tw-text-left">
                    {getVernacularString("55c526fa-c19d-4a73-a460-62c333174a1b", userPreferences.language)}
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-row-start-4 lg:tw-hidden tw-h-2" />

                <DefaultTextAnimation className="tw-row-start-5 lg-text-body tw-text-center lg:tw-text-left">
                    {getVernacularString("a95dff17-79db-4ac9-b9aa-2518f93919c5", userPreferences.language)}
                </DefaultTextAnimation>
            </div>

            {whoWeAreCardsContent.map((cardContent, cardContentIndex) => {
                return (
                    <WhoWeAreCard
                        key={cardContentIndex}
                        iconUrl={cardContent.iconUrl}
                        title={cardContent.title}
                        description={cardContent.description}
                    />
                );
            })}
        </div>
    );
}

function MeetOurLeaders({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    const leadersData: Array<{title: string; position: string; description: string; imageRelativePath: string}> = [
        {
            title: getVernacularString("d867ff63-d4bf-49ae-8ac7-7290a76caef3", userPreferences.language),
            position: getVernacularString("755f8e01-18c9-4883-956c-5851e4e3885f", userPreferences.language),
            description: getVernacularString("8ddd1acf-9b2d-41f4-b4cd-e2395c211c88", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-1.svg",
        },
        {
            title: getVernacularString("4ca82802-b39e-4844-9586-82ce4b095cff", userPreferences.language),
            position: getVernacularString("23fd4d15-8063-44e1-be03-a3aa6585d33b", userPreferences.language),
            description: getVernacularString("4f82218c-1156-4660-b634-a1231d82d457", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-2.svg",
        },
        {
            title: getVernacularString("54c7930a-aed3-4efc-b2eb-68a7b5b87ae2", userPreferences.language),
            position: getVernacularString("5267b971-9cbf-41dc-9cf8-abb2f8d7f2c5", userPreferences.language),
            description: getVernacularString("07d2f8d0-b81b-4dd3-a547-1adef20b3fea", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-3.svg",
        },
        {
            title: getVernacularString("d867ff63-d4bf-49ae-8ac7-7290a76caef3", userPreferences.language),
            position: getVernacularString("755f8e01-18c9-4883-956c-5851e4e3885f", userPreferences.language),
            description: getVernacularString("8ddd1acf-9b2d-41f4-b4cd-e2395c211c88", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-1.svg",
        },
        {
            title: getVernacularString("4ca82802-b39e-4844-9586-82ce4b095cff", userPreferences.language),
            position: getVernacularString("23fd4d15-8063-44e1-be03-a3aa6585d33b", userPreferences.language),
            description: getVernacularString("4f82218c-1156-4660-b634-a1231d82d457", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-2.svg",
        },
        {
            title: getVernacularString("54c7930a-aed3-4efc-b2eb-68a7b5b87ae2", userPreferences.language),
            position: getVernacularString("5267b971-9cbf-41dc-9cf8-abb2f8d7f2c5", userPreferences.language),
            description: getVernacularString("07d2f8d0-b81b-4dd3-a547-1adef20b3fea", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-3.svg",
        },
    ];

    return (
        <>
            <div
                className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 lg:tw-px-0", className)}
                ref={ref}
            >
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div>{getVernacularString("13f6e1c4-d97c-46cf-8ddb-52712843410b", userPreferences.language)}</div>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("cb60764f-1758-4b61-a998-8f7acc7b0b92", userPreferences.language)}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <CarouselStyle7
                    items={leadersData}
                    className="tw-mx-auto"
                    slidesContainerClassName=""
                    deselectedContainersClassName="tw-pt-6 md:tw-pt-12 tw-h-full"
                    selectedContainerClassName="tw-pt-6 tw-h-full"
                    chevronButtonsBelowCarousel={containerWidth != null && containerHeight != null && (containerHeight > containerWidth || containerWidth < 640) ? false : true}
                />
            </div>
        </>
    );
}

function OurPresence({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row tw-justify-left lg-px-screen-edge-2", className)}>
            <DefaultTextAnimation className="tw-row-start-1 lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("75b7261b-7ced-4385-891a-ecfe8123bab5", userPreferences.language))}} />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-6 tw-row-start-2" />

            <div className="tw-row-start-3 tw-grid tw-grid-cols-1 tw-grid-rows-2 lg:tw-grid-cols-2 lg:tw-grid-rows-1 tw-gap-x-16 tw-gap-y-8">
                <div className="tw-row-start-1 tw-col-start-1 tw-rounded-lg tw-border lg-border-secondary-900 tw-grid tw-grid-rows-[auto_1rem_minmax(0,1fr)] lg:tw-grid-rows-1 lg:tw-grid-cols-[auto_2rem_minmax(0,1fr)] tw-p-4 tw-items-center">
                    <div className="tw-col-start-1 tw-row-start-1 tw-rounded-full lg-bg-secondary-100 tw-h-[6.25rem] tw-w-[6.25rem] tw-grid tw-items-center tw-justify-center tw-place-self-center lg:tw-place-self-start">
                        <img
                            src="https://files.growthjockey.com/livguard/icons/contact-us/india.svg"
                            alt="india-operations"
                            className="tw-w-[3.5rem] tw-h-[3.5rem]"
                        />
                    </div>

                    <div className="tw-col-start-1 tw-row-start-3 lg:tw-col-start-3 lg:tw-row-start-1 tw-grid tw-grid-rows-[auto_.5rem_minmax(0,1fr)_.5rem_auto]">
                        <div className="lg-text-body tw-font-bold tw-row-start-1 tw-text-center lg:tw-text-left">
                            {getVernacularString("bc06ea32-4286-48ed-bde2-5a5c7250ff67", userPreferences.language)}
                        </div>

                        <div className="lg-text-body tw-row-start-3 tw-text-center lg:tw-text-left">{getVernacularString("78cd576b-2c66-4cf1-b4db-209d0543a659", userPreferences.language)}</div>

                        <Link
                            to="/"
                            className="lg-cta-outline-button tw-max-w-fit tw-row-start-5 tw-place-self-center lg:tw-place-self-start"
                        >
                            {getVernacularString("02195d6b-8516-4598-9214-d1b13866d85b", userPreferences.language)}
                        </Link>
                    </div>
                </div>

                <div className="tw-row-start-2 tw-col-start-1 lg:tw-col-start-2 lg:tw-row-start-1 tw-rounded-lg tw-border lg-border-secondary-900 tw-grid tw-grid-rows-[auto_1rem_minmax(0,1fr)] lg:tw-grid-rows-1 lg:tw-grid-cols-[auto_2rem_minmax(0,1fr)] tw-p-4 tw-items-center">
                    <div className="tw-col-start-1 tw-row-start-1 tw-rounded-full lg-bg-secondary-100 tw-h-[6.25rem] tw-w-[6.25rem] tw-grid tw-items-center tw-justify-center tw-place-self-center lg:tw-place-self-start">
                        <img
                            src="https://files.growthjockey.com/livguard/icons/contact-us/international.svg"
                            alt="international-operations"
                            className="tw-w-[3.5rem] tw-h-[3.5rem]"
                        />
                    </div>

                    <div className="tw-col-start-1 tw-row-start-3 lg:tw-col-start-3 lg:tw-row-start-1 tw-grid tw-grid-rows-[auto_.5rem_minmax(0,1fr)_.5rem_auto]">
                        <div className="lg-text-body tw-font-bold tw-row-start-1 tw-text-center lg:tw-text-left">
                            {getVernacularString("8ae1096b-408d-4d55-8005-78574a7b5815", userPreferences.language)}
                        </div>

                        <div className="lg-text-body tw-row-start-3 tw-text-center lg:tw-text-left">{getVernacularString("812b45ce-01e5-4ecb-9595-33766948660f", userPreferences.language)}</div>

                        <Link
                            to="/"
                            className="lg-cta-outline-button tw-max-w-fit tw-row-start-5 tw-place-self-center lg:tw-place-self-start"
                        >
                            {getVernacularString("02195d6b-8516-4598-9214-d1b13866d85b", userPreferences.language)}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function OurValues({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    enum Values {
        Aim = 0,
        Inspire = 1,
        Measure = 2,
        Analyze = 3,
        Communicate = 4,
        Trust = 5,
    }

    const valuesData = [
        {
            letter: "A",
            valueText: `<span class="lg-text-primary-500">A</span>im outside your comfort zone`,
            valueImage: "/livguard/about-us/5/value-aim.png",
        },
        {
            letter: "I",
            valueText: `<span class="lg-text-primary-500">I</span>nspire and energize your team`,
            valueImage: "/livguard/about-us/5/value-inspire.png",
        },
        {
            letter: "M",
            valueText: `<span class="lg-text-primary-500">M</span>easure, track and review your results.`,
            valueImage: "/livguard/about-us/5/value-measure.png",
        },
        {
            letter: "A",
            valueText: `<span class="lg-text-primary-500">A</span>nalyze customer needs and being their champion.`,
            valueImage: "/livguard/about-us/5/value-analyze.png",
        },
        {
            letter: "C",
            valueText: `<span class="lg-text-primary-500">C</span>ommunicate honestly and listen carefully.`,
            valueImage: "/livguard/about-us/5/value-communicate.png",
        },
        {
            letter: "T",
            valueText: `<span class="lg-text-primary-500">T</span>rust and create winning Teams`,
            valueImage: "/livguard/about-us/5/value-trust.png",
        },
    ];

    const [selectedValue, setSelectedValue] = useState<Values>(Values.Aim);

    const ValueSelector = ({valueSelectorClassName}: {valueSelectorClassName?: string}) => {
        return (
            <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-auto-cols-[repeat(6,1fr)] tw-gap-1", valueSelectorClassName)}>
                {valuesData.map((valueData, valueDataIndex) => {
                    const isSelected = selectedValue === valueDataIndex;
                    return (
                        <div
                            key={valueDataIndex}
                            className={`${
                                isSelected ? "lg-about-us-leaders-bg-gradient" : "lg-bg-secondary-100"
                            } tw-grid tw-place-items-center tw-place-content-center  tw-px-5 tw-py-3 tw-row-start-1 tw-rounded-sm lg-text-body-bold tw-cursor-pointer tw-transition-colors tw-duration-200`}
                            onClick={() => {
                                setSelectedValue(valueDataIndex);
                            }}
                        >
                            {valueData.letter}
                        </div>
                    );
                })}
            </div>
        );
    };

    const ValueDisplay = ({valueDisplayClassName}: {valueDisplayClassName?: string}) => {
        return (
            <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[auto_1rem_auto]", valueDisplayClassName)}>
                <div
                    dangerouslySetInnerHTML={{__html: valuesData[selectedValue].valueText}}
                    className="tw-row-start-1 tw-text-center lg:tw-text-left"
                ></div>
                <div className="tw-row-start-3 tw-flex flex-row tw-justify-center lg:tw-justify-start">
                    <FullWidthImage
                        className="tw-rounded-lg"
                        relativePath={valuesData[selectedValue].valueImage}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[auto_0.5rem_auto_1rem_auto_1rem_auto]", className)}>
            <div
                dangerouslySetInnerHTML={{__html: getVernacularString("389859cd-81c3-4b9a-95ad-b38dde856511", userPreferences.language)}}
                className="tw-row-start-1 lg-text-headline tw-text-center lg:tw-text-left"
            />

            <div className="tw-row-start-3 lg-text-title2 tw-text-center lg:tw-text-left">{getVernacularString("0840f752-7ac4-4277-8e49-5cf832119941", userPreferences.language)}</div>

            {/* <ValueSelector valueSelectorClassName="tw-row-start-5" /> */}
            <div className={concatenateNonNullStringsWithSpaces("tw-row-start-5 tw-grid tw-auto-cols-[repeat(6,1fr)] tw-gap-1")}>
                {valuesData.map((valueData, valueDataIndex) => {
                    const isSelected = selectedValue === valueDataIndex;
                    return (
                        <div
                            key={valueDataIndex}
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-grid tw-place-items-center tw-place-content-center tw-px-5 tw-py-3 tw-row-start-1 tw-rounded-sm lg-text-body-bold tw-cursor-pointer tw-transition-colors tw-duration-200",
                                isSelected ? "!tw-text-secondary-900-dark lg-bg-primary-500" : "lg-text-secondary-900 lg-bg-secondary-100",
                            )}
                            onClick={() => {
                                setSelectedValue(valueDataIndex);
                            }}
                        >
                            {valueData.letter}
                        </div>
                    );
                })}
            </div>

            <ValueDisplay valueDisplayClassName="tw-row-start-7" />
        </div>
    );
}

function WeAreEverywhere({userPreferences, showCtaButton, className}: {userPreferences: UserPreferences; showCtaButton: boolean; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("", className)}>
            <div className="tw-relative lg-bg-secondary-100 tw-rounded-lg tw-h-[350px] tw-overflow-hidden lg:tw-h-full lg:tw-px-2">
                <div className="tw-flex tw-flex-col tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-justify-center tw-items-center">
                    <div className="tw-absolute tw-inset-0">
                        <CoverImage relativePath={userPreferences.theme == Theme.Dark ? "/livguard/home/10/1-dark.jpg" : "/livguard/home/10/1-light.jpg"} />
                    </div>

                    <div className="tw-z-10 lg-text-headline tw-text-center">
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("92897a67-ff1d-4e6c-804f-4f69dd03db4d", userPreferences.language)}} />
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("53b219cb-fdee-4ea2-aff4-858f5c63aed0", userPreferences.language)}} />
                    </div>

                    <VerticalSpacer className="tw-h-1" />

                    <div className="tw-z-10 lg-text-title2">{getVernacularString("24bb85a9-42af-4302-b21b-dece9f9d0d21", userPreferences.language)}</div>

                    {showCtaButton && (
                        <>
                            <VerticalSpacer className="tw-h-6" />

                            <Link
                                to="/dealer-for-inverters-and-batteries"
                                className="tw-z-10 lg-cta-button"
                            >
                                {getVernacularString("db232019-b302-4eb7-a10c-05b17e72a800", userPreferences.language)}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function ExploreCareers({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2", className)}>
            <div className="tw-p-6 lg-contact-gradient-light dark:lg-contact-gradient-dark tw-rounded-lg tw-grid tw-grid-rows-[auto_1rem_auto_1rem_minmax(0,1fr)_1rem_auto] lg:tw-grid-rows-1 lg:tw-grid-cols-[auto_2rem_20rem_2rem_minmax(0,1fr)_2rem_auto] tw-items-center">
                <div className="tw-w-[7.75rem] tw-h-[7.75rem] tw-col-start-1 tw-row-start-1 lg-bg-secondary-100 tw-rounded-full tw-grid tw-justify-center tw-items-center tw-place-self-center lg:tw-place-self-start">
                    <img
                        src="https://files.growthjockey.com/livguard/icons/contact-us/hiring.svg"
                        alt="hiring"
                        className="tw-w-[4rem] tw-h-[4rem]"
                    />
                </div>

                <div
                    className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-3 lg-text-headline tw-text-center lg:tw-text-left"
                    dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("2adcc683-70f0-4b39-be83-73211ea28f20", userPreferences.language))}}
                />

                <div className="tw-row-start-5 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-5 tw-text-center lg:tw-text-left lg:tw-max-w-[20rem] lg:tw-place-self-center">
                    {getVernacularString("1aa2a41b-b500-43bb-b0cd-b9999f5e442b", userPreferences.language)}
                </div>

                <Link
                    className="tw-row-start-7 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-7 tw-place-self-center lg-cta-button tw-max-w-fit"
                    to="/"
                >
                    {getVernacularString("c1a8bbb2-f085-4c71-8082-7e292fcde4e7", userPreferences.language)}
                </Link>
            </div>
        </div>
    );
}

function EmpoweredBySAR({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    const sisterCompanyLogos = [
        {
            logoUrl: "/livguard/about-us/7/livgreen.png",
        },
        {
            logoUrl: "/livguard/about-us/7/livpure.png",
        },
        {
            logoUrl: "/livguard/about-us/7/livfast.png",
        },
        {
            logoUrl: "/livguard/about-us/7/livpure_smart.png",
        },
        {
            logoUrl: "/livguard/about-us/7/ncubate.png",
        },
    ];
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-grid tw-grid-rows-[auto_0.5rem_auto_1rem_auto] md:tw-grid-rows-[minmax(0,1fr)_2.5rem_auto_auto_1rem_auto_2.5rem_minmax(0,1fr)] tw-justify-center tw-place-items-center md:tw-border-2 md:lg-border-secondary-900 tw-rounded-lg md:tw-px-16",
                className,
            )}
            ref={ref}
        >
            <div className="tw-row-start-1 md:tw-row-start-3 tw-grid tw-grid-rows-[auto_0.5rem_auto_1rem_auto_0.5rem_auto] md:tw-grid-rows-[auto_auto_1rem_auto] md:tw-grid-cols-[minmax(0,11fr)_1.5rem_minmax(0,9fr)] md:tw-w-full">
                <div
                    className="tw-row-start-1 lg-text-headline tw-text-center md:tw-row-start-1 md:tw-col-start-3"
                    dangerouslySetInnerHTML={{__html: getVernacularString("310ad3b5-2e4a-409b-9622-c1389c366dbd", userPreferences.language)}}
                />
                <div className="tw-row-start-3 tw-text-center lg-text-title2 md:tw-row-start-2 md:tw-col-start-3">
                    {getVernacularString("b005d8fa-48dc-4f1a-acee-4afdeec1a1d2", userPreferences.language)}
                </div>
                <div className="tw-row-start-5 md:tw-row-start-1 md:tw-row-span-full md:tw-col-start-1 md:tw-place-self-center">
                    <FullWidthImage relativePath="/livguard/about-us/7/sar.png" />
                </div>
                <div className="tw-row-start-7 tw-text-center md:tw-row-start-4 md:tw-col-start-3 md:tw-w-full lg-text-body lg-text-secondary-900">
                    {getVernacularString("4a0ff6e2-3456-4e80-a100-dd0437e1e1a5", userPreferences.language)}
                </div>
            </div>
            <div className="tw-row-start-3 md:tw-row-start-4 tw-text-center lg-text-title2 md:lg-text-body md:lg-text-secondary-900">
                {getVernacularString("1dac654a-dcb3-48bf-9b14-2e08470548d9", userPreferences.language)}
            </div>
            <div className="tw-row-start-5 md:tw-row-start-6 tw-w-full tw-grid tw-grid-flow-col tw-overflow-hidden tw-gap-x-8">
                {containerWidth == null || containerHeight == null ? null : containerHeight > containerWidth || containerWidth < 640 ? (
                    <InfiniteHorizontalScroller
                        horizontalScrollDirection={HorizontalScrollDirection.left}
                        speed={50}
                    >
                        {sisterCompanyLogos.map((sisterCompanyLogo, sisterCompanyLogoIndex) => (
                            <div className="tw-px-4 tw-w-full">
                                <FullWidthImage
                                    // height="47px"
                                    relativePath={sisterCompanyLogo.logoUrl}
                                    key={sisterCompanyLogoIndex}
                                    className="tw-w-full"
                                />
                            </div>
                        ))}
                    </InfiniteHorizontalScroller>
                ) : (
                    sisterCompanyLogos.map((sisterCompanyLogo, sisterCompanyLogoIndex) => {
                        return (
                            <FixedHeightImage
                                height="47px"
                                relativePath={sisterCompanyLogo.logoUrl}
                                key={sisterCompanyLogoIndex}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}
