import {Dialog, Listbox, Popover, Transition} from "@headlessui/react";
import {ChevronDoubleDownIcon, InformationCircleIcon} from "@heroicons/react/20/solid";
import type {ActionFunction, LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {Form, Link, useActionData, useSearchParams} from "@remix-run/react";
import React, {useEffect, useReducer, useState} from "react";
import {Check2, PlusCircleFill, Search} from "react-bootstrap-icons";
import {useLoaderData} from "react-router";
import {toast} from "react-toastify";
import {insertLoadCalculatorEntry} from "~/backend/loadCalculator.server";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FindTheThiefDialog} from "~/components/find-the-thief/findTheThiefDialog";
import {LoadCalculatorDialogComponent} from "~/components/find-the-thief/loadCalculatorDialogComponent";
import {Thief} from "~/components/find-the-thief/thiefComponent";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {EmptyFlexFiller} from "~/global-common-typescript/components/emptyFlexFiller";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/common--type-definitions/typeDefinitions";
import {getIntegerFromUnknown, getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, distinct, getIntegerArrayOfLength} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import {FaqSection} from "~/routes";
import type {LoadCalculatorInputsAction} from "~/routes/load-calculator/index.state";
import {LoadCalculatorInputsActionType, createInitialState, createInitialStateNewUi, loadCalculatorInputsReducer} from "~/routes/load-calculator/index.state";
import type {Device, LoadCalculatorInputs, Room} from "~/routes/load-calculator/index.types";
import {PropertyType, deviceTypeLibrary, getDeviceTypeDetails, getRoomTypeDetails, propertyTemplates, propertyTemplatesNewUi, roomTypeLibrary} from "~/routes/load-calculator/index.types";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {createGroupByReducer, enumFromStringValue, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/load-calculator/",
            },
            {
                title: "Plan Your Power Needs with Livguard Load Calculator",
            },
            {
                name: "description",
                content: "Livguard Power Planner is the ultimate tool to plan your power needs. Use our load calculator to find the perfect inverter and inverter battery options",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/load-calculator",
            },
            {
                property: "og:title",
                content: "Plan Your Power Needs with Livguard Load Calculator",
            },
            {
                property: "og:description",
                content: "Livguard Power Planner is the ultimate tool to plan your power needs. Use our load calculator to find the perfect inverter and inverter battery options",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/home/5/1.png").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
            {
                "script:ld+json": {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        {
                            "@type": "ListItem",
                            position: 1,
                            name: "LivGuard",
                            item: "https://www.livguard.com/",
                            description:
                                " We Are One of A Kind With Livguard, you are always in trusted hands. In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
                            image: [" https://files.growthjockey.com/livguard/icons/logo-dark.svg"],
                        },
                        {
                            "@type": "ListItem",
                            position: 2,
                            name: "Load Calculator",
                            item: "https://www.livguard.com/load-calculator",
                            description:
                                "Take charge of your power needs with Livguard's load calculator- Power Planner. Your key to personalised power solutions. It helps you find the perfect inverter and inverter battery options for your home, ensuring uninterrupted power supply at all times.",
                        },
                        {
                            "@type": "SiteNavigationElement",
                            name: "Livguard",
                            url: "https://www.livguard.com/",
                            description:
                                " We Are One of A Kind With Livguard, you are always in trusted hands. In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
                            image: ["https://files.growthjockey.com/livguard/icons/logo-dark.svg"],
                        },
                        {
                            "@type": "SiteNavigationElement",
                            name: "Load Calculator",
                            url: "https://www.livguard.com/load-calculator",
                            description:
                                "Take charge of your power needs with Livguard's load calculator- Power Planner. Your key to personalised power solutions. It helps you find the perfect inverter and inverter battery options for your home, ensuring uninterrupted power supply at all times.",
                        },
                    ],
                },
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/load-calculator/",
            },
            {
                title: "लिवगार्ड लोड कैलकुलेटर के साथ अपनी बिजली की जरूरतों की योजना बनाएं",
            },
            {
                name: "description",
                content: "लिवगार्ड पावर प्लानर आपकी बिजली आवश्यकताओं की योजना बनाने का सर्वोत्तम उपकरण है। सही इन्वर्टर और इन्वर्टर बैटरी विकल्प खोजने के लिए हमारे लोड कैलकुलेटर का उपयोग करें",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/load-calculator",
            },
            {
                property: "og:title",
                content: "लिवगार्ड लोड कैलकुलेटर के साथ अपनी बिजली की जरूरतों की योजना बनाएं",
            },
            {
                property: "og:description",
                content: "लिवगार्ड पावर प्लानर आपकी बिजली आवश्यकताओं की योजना बनाने का सर्वोत्तम उपकरण है। सही इन्वर्टर और इन्वर्टर बैटरी विकल्प खोजने के लिए हमारे लोड कैलकुलेटर का उपयोग करें",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "website",
            },
            {
                property: "og:image",
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/home/5/1.png").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
        ];
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

type ActionData = {
    error: string;
};

export const action: ActionFunction = async ({request}) => {
    const body = await request.formData();

    const loadCalculatorInputs = safeParse(getNonEmptyStringFromUnknown, body.get("loadCalculatorInputs"));

    if (loadCalculatorInputs == null) {
        const actionData: ActionData = {
            error: "Something went wrong! Error code: 500ee940-bd98-45e7-af9a-b88af2f31439",
        };
        return actionData;
    }

    const id = await insertLoadCalculatorEntry(loadCalculatorInputs);
    if (id instanceof Error) {
        const actionData: ActionData = {
            error: "Something went wrong! Error code: c4dc40c5-2e63-407a-b404-8c0f7d94a6c3",
        };
        return actionData;
    }

    return redirect(`/load-calculator/recommendations/${id}`);
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

    // TODO: Load property_type as well

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, pageUrl} = useLoaderData() as LoaderData;

    const actionData: ActionData = useActionData() as ActionData;

    const utmSearchParameters = useUtmSearchParameters();

    useEffect(() => {
        if (actionData != null) {
            toast.error(actionData.error);
        }
    }, [actionData]);

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
                    {contentId: "cea6d04c-15b9-4c11-8d83-2e51af979f54", link: "#"},
                ]}
            >
                <LoadCalculator userPreferences={userPreferences} />
            </PageScaffold>
        </>
    );
}

function LoadCalculator({userPreferences}: {userPreferences: UserPreferences}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const propertyType = searchParams.get("property_type");

    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true});

    const [loadCalculatorInputs, dispatch] = useReducer(
        loadCalculatorInputsReducer,
        {propertyType: propertyType == null ? PropertyType.ThreeBhk : enumFromStringValue(PropertyType, propertyType) ?? PropertyType.ThreeBhk},
        createInitialState,
    );

    const [loadCalculatorInputsNewUi, dispatchNewUi] = useReducer(
        loadCalculatorInputsReducer,
        {propertyType: propertyType == null ? PropertyType.ThreeBhk : enumFromStringValue(PropertyType, propertyType) ?? PropertyType.ThreeBhk},
        createInitialStateNewUi,
    );

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [thiefLocation, setThiefLocation] = useState<number | null>(null);
    const [couponCode, setCouponCode] = useState<string | null>(null);

    useEffect(() => {
        if (localStorage.getItem("couponCode") == null) {
            localStorage.setItem("treasureHuntStep", "0");
            return;
        }
        setCouponCode(localStorage.getItem("couponCode"));

        const treasureHuntStep = localStorage.getItem("treasureHuntStep");

        switch (treasureHuntStep) {
            case "3": {
                // setIsDialogOpen(true);
                setThiefLocation(0);
                break;
            }
        }
    }, []);

    return (
        <>
            <HeroSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            {/* <PowerPlannerIntroduction userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-8" /> */}

            <div className="lg-text-headline tw-text-center">{getVernacularString("homeS5T5P1", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-8" />

            <PropertySelection
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                dispatch={dispatch}
                loadCalculatorInputsNewUi={loadCalculatorInputsNewUi}
                dispatchNewUi={dispatchNewUi}
            />

            <VerticalSpacer className="tw-h-8" />

            <div className="tw-w-full tw-flex tw-flex-row tw-gap-x-4 tw-justify-center">
                <button
                    className={concatenateNonNullStringsWithSpaces("tw-p-4 tw-rounded-lg", selectedIndex == 0 ? "lg-bg-primary-500 tw-text-secondary-100-light" : "lg-card")}
                    onClick={() => emblaApi?.scrollTo(0)}
                >
                    {getVernacularString("homeS5T5P4", userPreferences.language)}
                </button>

                <button
                    className={concatenateNonNullStringsWithSpaces("tw-p-4 tw-rounded-lg", selectedIndex == 1 ? "lg-bg-primary-500 tw-text-secondary-100-light" : "lg-card")}
                    onClick={() => emblaApi?.scrollTo(1)}
                >
                    {getVernacularString("homeS5T5P5", userPreferences.language)}
                </button>
            </div>

            <VerticalSpacer className="tw-h-8" />

            <div className="lg-text-body tw-text-center lg-text-secondary-900">{getVernacularString("homeS5T5P3", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4" />

            <div
                className="tw-overflow-hidden tw-w-full tw-relative"
                ref={emblaRef}
            >
                {/* TODO: Convert all tw-auto-cols-[100%] to tw-auto-cols-[minmax(0,100%)]? */}
                <Thief
                    currentThiefLocation={thiefLocation}
                    direction="left"
                    thiefShowLocation={0}
                    onClick={() => setThiefLocation(1)}
                    thiefClassName="tw-top-[6%] -tw-left-1 lg:-tw-left-[0.5625rem]"
                />

                <Thief
                    currentThiefLocation={thiefLocation}
                    direction="right"
                    thiefShowLocation={1}
                    onClick={() => {
                        setThiefLocation(2);
                        setIsDialogOpen(true);
                    }}
                    thiefClassName="tw-top-[49%] -tw-right-1 lg:-tw-right-[0.5625rem]"
                />

                {/* {currentThiefLocation === 2 && (
                <Thief
                    currentThiefLocation={currentThiefLocation}
                    direction="left"
                    thiefShowLocation={2}
                    onClick={() => {
                        setCurrentThiefLocation(3);
                        setIsDialogOpen(true);
                    }}
                    thiefClassName="tw-top-[64%] -tw-left-1 lg:-tw-left-[0.5625rem]"
                />
            )} */}
                <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%] tw-items-start">
                    <DeviceSelectionNewUi
                        userPreferences={userPreferences}
                        loadCalculatorInputs={loadCalculatorInputsNewUi}
                        dispatch={dispatchNewUi}
                        currentThiefLocation={thiefLocation}
                        setCurrentThiefLocation={setThiefLocation}
                        setIsDialogOpen={setIsDialogOpen}
                    />

                    <RoomSelection
                        userPreferences={userPreferences}
                        loadCalculatorInputs={loadCalculatorInputs}
                        dispatch={dispatch}
                    />
                </div>
            </div>

            <VerticalSpacer className="tw-h-8" />

            <AdditionalInputsSection
                userPreferences={userPreferences}
                loadCalculatorInputs={selectedIndex == 0 ? loadCalculatorInputsNewUi : loadCalculatorInputs}
                dispatch={selectedIndex == 0 ? dispatchNewUi : dispatch}
            />

            <VerticalSpacer className="tw-h-8" />

            <Form
                method="post"
                className="lg-px-screen-edge tw-flex tw-flex-col tw-items-center"
            >
                <input
                    type="text"
                    name="loadCalculatorInputs"
                    value={JSON.stringify(selectedIndex == 0 ? loadCalculatorInputsNewUi : loadCalculatorInputs)}
                    readOnly
                    className="tw-hidden"
                />

                {/* TODO: Handle things like UTM here */}
                <button
                    type="submit"
                    className=" lg-cta-button"
                >
                    {getVernacularString("loadCalculatorAdditionalInputsT4", userPreferences.language)}
                </button>
            </Form>

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <FaqSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <FindTheThiefDialog
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                userPreferences={userPreferences}
                showSunraysPattern={true}
            >
                <LoadCalculatorDialogComponent
                    userPreferences={userPreferences}
                    setIsDialogOpen={setIsDialogOpen}
                    couponCode={couponCode == null ? "" : couponCode}
                    setCouponCode={setCouponCode}
                />
            </FindTheThiefDialog>
        </>
    );
}

function HeroSection({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        // screen = 48px + 56px + ? + 32px + 56px + 32px + 90px
        <div className="tw-min-h-[calc(100vh-19.625rem-var(--lg-mobile-ui-height))] tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_2rem_auto_2rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center tw-text-secondary-900-dark">
            {/* <CoverImage
                relativePath="/livguard/home/1/1.jpg"
                className="tw-row-[1/span_12] tw-col-start-1"
            /> */}

            <div className="tw-row-[1/span_12] tw-col-start-1 tw-w-full tw-h-full tw-bg-gradient-to-b tw-from-primary-500-dark tw-to-secondary-100-dark" />

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1 tw-z-10">
                <h1 className="lg-text-banner lg-px-screen-edge tw-z-10 tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("loadCalculatorS1T1", userPreferences.language)}} />
                </h1>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1 tw-z-10 tw-max-w-2xl">
                <div className="lg-text-body tw-text-secondary-700-dark lg-px-screen-edge tw-z-10 tw-text-center">{getVernacularString("loadCalculatorS1T2", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <div className="tw-w-full tw-row-start-[8] tw-col-start-1">
                <div className="tw-w-3/5 tw-max-w-xl tw-mx-auto">
                    <FullWidthImage relativePath="/livguard/products/super-life-combo/thumbnail.png" />
                </div>
            </div>

            <ChevronDoubleDownIcon className="tw-row-[11] tw-col-start-1 tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce tw-z-10" />
        </div>
    );
}

// TODO: Rename to something sensible
export function PowerPlannerTeaser({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const [loadCalculatorInputs, dispatch] = useReducer(loadCalculatorInputsReducer, {propertyType: PropertyType.ThreeBhk}, createInitialState);

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full tw-max-w-7xl tw-mx-auto", className)}>
            <div
                className={`tw-grid tw-grid-rows-[repeat(4,auto)] tw-grid-cols-1 lg:tw-grid-rows-[repeat(5,auto)] lg:tw-grid-cols-2 tw-justify-items-center
                    lg:tw-rounded-lg lg:tw-pb-[50px] lg:tw-pt-[25px] lg-card`}
            >
                <PowerPlannerIntroduction
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-1 lg:tw-row-span-full"
                />

                <DefaultImageAnimation className="tw-hidden lg:tw-block">
                    <FixedWidthImage
                        relativePath="/livguard/products/super-life-combo/thumbnail.png"
                        width="20rem"
                    />
                </DefaultImageAnimation>

                <VerticalSpacer className="tw-hidden lg:tw-block lg:tw-row-start-2 lg:tw-col-start-2" />

                <PropertySelectionForTeaser
                    userPreferences={userPreferences}
                    loadCalculatorInputs={loadCalculatorInputs}
                    dispatch={dispatch}
                    className="tw-row-start-2 tw-col-start-1 lg:tw-row-start-3 lg:tw-col-start-2"
                />

                <VerticalSpacer className="tw-row-start-3 tw-col-start-1 tw-h-4 lg:tw-row-start-4 lg:tw-col-start-2" />

                <div className="tw-row-start-4 tw-col-start-1 lg:tw-row-start-5 lg:tw-col-start-2 lg-px-screen-edge tw-flex tw-flex-col tw-items-center">
                    <Link
                        to={`/load-calculator?property_type=${loadCalculatorInputs.property.propertyType}`}
                        className=" lg-cta-button"
                    >
                        {getVernacularString("homeS5T6", userPreferences.language)}
                    </Link>
                </div>
            </div>
        </div>
    );
}

// TODO: Rename to something sensible
export function MiniPowerPlannerTeaser({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={className}>
            <div className="tw-h-full lg:lg-card tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-p-6 tw-rounded-lg">
                <h2 className="tw-flex tw-flex-col [@media(max-width:1024px)]:lg-text-headline lg:lg-text-title2 tw-text-center tw-whitespace-nowrap">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("c4c839c0-582d-4f53-be91-6730977f87aa", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("aab3e140-baaf-46ce-a405-be90c45ef157", userPreferences.language)}} />
                </h2>

                <VerticalSpacer className="tw-h-4" />

                <div>{getVernacularString("5591c0ca-fe8b-42ae-8154-d7bab6ce721e", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <DefaultImageAnimation className="">
                    <FixedWidthImage
                        relativePath="/livguard/products/super-life-combo/thumbnail.png"
                        width="10rem"
                    />
                </DefaultImageAnimation>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-row-start-4 tw-col-start-1 lg:tw-row-start-5 lg:tw-col-start-2 lg-px-screen-edge tw-flex tw-flex-col tw-items-center">
                    <Link
                        to="/load-calculator"
                        className=" lg-cta-button"
                    >
                        {getVernacularString("homeS5T6", userPreferences.language)}
                    </Link>
                </div>
            </div>
        </div>
    );
}

function PropertySelectionForTeaser({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
    className,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
    className?: string;
}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center", className)}>
            <VerticalSpacer className="tw-h-4" />

            <div className="lg-text-title2 tw-text-center">{getVernacularString("homeS5T5P1", userPreferences.language)}</div>
            <div className="lg-text-body tw-text-center lg-text-secondary-900">{getVernacularString("homeS5T5P2", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-w-full tw-grid tw-grid-cols-3 tw-gap-2">
                <ItemBuilder
                    // TODO: Get this data from enum
                    items={[
                        {
                            svgIcon: "/livguard/icons/home/5/1-bhk.svg",
                            content: "1 BHK",
                            value: "1-bhk",
                        },
                        {
                            svgIcon: "/livguard/icons/home/5/2-bhk.svg",
                            content: "2 BHK",
                            value: "2-bhk",
                        },
                        {
                            svgIcon: "/livguard/icons/home/5/3-bhk.svg",
                            content: "3 BHK",
                            value: "3-bhk",
                        },
                        {
                            svgIcon: "/livguard/icons/home/5/4-bhk.svg",
                            content: "4 BHK",
                            value: "4-bhk",
                        },
                        {
                            svgIcon: "/livguard/icons/home/5/villa.svg",
                            content: "Villa",
                            value: "villa",
                        },
                        {
                            svgIcon: "/livguard/icons/home/5/custom.svg",
                            content: "Custom",
                            value: "custom",
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <button
                            type="button"
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-rounded-lg tw-flex tw-items-center tw-gap-2 tw-py-3 tw-px-2 tw-group tw-duration-200",
                                item.value == loadCalculatorInputs.property.propertyType ? "lg-bg-primary-500" : "lg-card",
                            )}
                            key={itemIndex}
                            onClick={() => {
                                const loadCalculatorInputsAction: LoadCalculatorInputsAction = {
                                    actionType: LoadCalculatorInputsActionType.SetPropertyType,
                                    payload: item.value,
                                };

                                dispatch(loadCalculatorInputsAction);
                            }}
                        >
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-rounded-full tw-w-8 tw-h-8 tw-p-1.5",
                                    item.value == loadCalculatorInputs.property.propertyType ? "tw-bg-secondary-900-dark" : "lg-bg-secondary-300",
                                )}
                            >
                                {/* <FullWidthImage
                                    relativePath={item.icon}
                                /> */}
                                <img
                                    src={`https://files.growthjockey.com${item.svgIcon}`}
                                    className={concatenateNonNullStringsWithSpaces(
                                        "tw-w-full tw-h-full dark:tw-invert",
                                        item.value == loadCalculatorInputs.property.propertyType ? "!tw-invert-0" : null,
                                    )}
                                />
                            </div>
                            <div className={concatenateNonNullStringsWithSpaces(item.value == loadCalculatorInputs.property.propertyType ? "tw-text-secondary-900-dark" : null)}>{item.content}</div>
                        </button>
                    )}
                />
            </div>
        </div>
    );
}

function PowerPlannerIntroduction({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center", className)}>
            <h2 className="tw-flex tw-flex-col lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS5H1T1", userPreferences.language)}} />
                <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS5H1T2", userPreferences.language)}} />
            </h2>

            <VerticalSpacer className="tw-h-4" />

            <div>{getVernacularString("homeS5T2", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4" />

            <DefaultImageAnimation className="tw-block lg:tw-hidden">
                <FixedWidthImage
                    relativePath="/livguard/products/super-life-combo/thumbnail.png"
                    width="10rem"
                />
            </DefaultImageAnimation>

            <VerticalSpacer className="tw-block lg:tw-hidden tw-h-4" />

            <div className="lg-text-title2">{getVernacularString("homeS5T3", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-flex tw-flex-col tw-gap-4">
                <ItemBuilder
                    items={[
                        {
                            icon: "/livguard/home/5/step-1.png",
                            stepIndex: getVernacularString("homeS5Step1T1", userPreferences.language),
                            stepContent: getVernacularString("homeS5Step1T2", userPreferences.language),
                        },
                        {
                            icon: "/livguard/home/5/step-2.png",
                            stepIndex: getVernacularString("homeS5Step2T1", userPreferences.language),
                            stepContent: getVernacularString("homeS5Step2T2", userPreferences.language),
                        },
                        {
                            icon: "/livguard/home/5/step-3.png",
                            stepIndex: getVernacularString("homeS5Step3T1", userPreferences.language),
                            stepContent: getVernacularString("homeS5Step3T2", userPreferences.language),
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <div
                            className="lg-card tw-rounded-lg tw-px-4 tw-py-2 tw-grid tw-grid-cols-[auto,minmax(0,1fr)] tw-grid-rows-[auto,auto] tw-gap-x-4"
                            key={itemIndex}
                        >
                            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-2">
                                <div className="lg-bg-primary-500 tw-h-12 tw-w-12 tw-rounded-full tw-p-2 tw-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                                    <FullWidthImage relativePath={item.icon} />
                                </div>
                            </div>

                            <div className="tw-row-start-1 tw-col-start-2">
                                <div className="lg-text-body-bold tw-text-left">{item.stepIndex}</div>
                            </div>

                            <div className="tw-row-start-2 tw-col-start-2">
                                <div className="lg-text-body tw-text-left">{item.stepContent}</div>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

function PropertySelection({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
    loadCalculatorInputsNewUi,
    dispatchNewUi,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
    loadCalculatorInputsNewUi: LoadCalculatorInputs;
    dispatchNewUi: React.Dispatch<LoadCalculatorInputsAction>;
}) {
    const [isChangePropertyTypeDialogOpen, setIsChangePropertyTypeDialogOpen] = useState(false);
    const [currentlyChangingPropertyType, setCurrentlyChangingPropertyType] = useState<string | null>(null);

    function tryToOpenChangePropertyTypeDialog() {
        setIsChangePropertyTypeDialogOpen(true);
    }

    return (
        <div className="lg-px-screen-edge-2 tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
            <div className="lg-text-title2 tw-text-center lg-text-secondary-900">{getVernacularString("homeS5T5P2", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-w-full tw-grid tw-grid-cols-3 tw-gap-2 lg:tw-max-w-[500px]">
                <ItemBuilder
                    items={[
                        {
                            icon: "/livguard/load-calculator/1-bhk.svg",
                            content: `${getVernacularString("propertyType-1-bhk", userPreferences.language)}`,
                            value: "1-bhk",
                        },
                        {
                            icon: "/livguard/load-calculator/2-bhk.svg",
                            content: `${getVernacularString("propertyType-2-bhk", userPreferences.language)}`,
                            value: "2-bhk",
                        },
                        {
                            icon: "/livguard/load-calculator/3-bhk.svg",
                            content: `${getVernacularString("propertyType-3-bhk", userPreferences.language)}`,
                            value: "3-bhk",
                        },
                        {
                            icon: "/livguard/load-calculator/4-bhk.svg",
                            content: `${getVernacularString("propertyType-4-bhk", userPreferences.language)}`,
                            value: "4-bhk",
                        },
                        {
                            icon: "/livguard/load-calculator/villa.svg",
                            content: `${getVernacularString("propertyType-villa", userPreferences.language)}`,
                            value: "villa",
                        },
                        {
                            icon: "/livguard/load-calculator/custom.svg",
                            content: `${getVernacularString("propertyType-custom", userPreferences.language)}`,
                            value: "custom",
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <button
                            type="button"
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-rounded-lg tw-flex tw-items-center tw-gap-2 tw-py-3 tw-px-2 tw-group tw-duration-200 lg:tw-max-w-[10rem]",
                                item.value == loadCalculatorInputs.property.propertyType ? "lg-bg-primary-500" : "lg-card",
                            )}
                            key={itemIndex}
                            onClick={() => {
                                // TODO: Remove this condition to enable user to reset things?
                                if (item.value == loadCalculatorInputs.property.propertyType) {
                                    return;
                                }

                                // TODO: This gets triggered even if user changed some other variable like consumption percentage,
                                // because that action causes a deep copy of property. Fix logic.
                                if (
                                    loadCalculatorInputs.property == propertyTemplates[loadCalculatorInputs.property.propertyType] &&
                                    loadCalculatorInputsNewUi.property == propertyTemplatesNewUi[loadCalculatorInputs.property.propertyType]
                                ) {
                                    const action: LoadCalculatorInputsAction = {
                                        actionType: LoadCalculatorInputsActionType.SetPropertyType,
                                        payload: item.value,
                                    };

                                    dispatch(action);

                                    const actionNewUi: LoadCalculatorInputsAction = {
                                        actionType: LoadCalculatorInputsActionType.SetPropertyTypeNewUi,
                                        payload: item.value,
                                    };

                                    dispatchNewUi(actionNewUi);
                                } else {
                                    setCurrentlyChangingPropertyType(item.value);
                                    tryToOpenChangePropertyTypeDialog();
                                }
                            }}
                        >
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-rounded-full tw-w-8 tw-h-8 tw-p-1.5",
                                    item.value == loadCalculatorInputs.property.propertyType ? "tw-bg-secondary-900-dark" : "lg-bg-secondary-700",
                                )}
                            >
                                <FullWidthImage
                                    relativePath={item.icon}
                                    className={concatenateNonNullStringsWithSpaces("dark:tw-invert-0", item.value == loadCalculatorInputs.property.propertyType ? "tw-invert-0" : "tw-invert")}
                                />
                            </div>
                            <div className={concatenateNonNullStringsWithSpaces(item.value == loadCalculatorInputs.property.propertyType ? "tw-text-secondary-900-dark" : "")}>{item.content}</div>
                        </button>
                    )}
                />
            </div>

            <ChangePropertyTypeDialog
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                dispatch={dispatch}
                loadCalculatorInputsNewUi={loadCalculatorInputsNewUi}
                dispatchNewUi={dispatchNewUi}
                currentlyChangingPropertyType={currentlyChangingPropertyType}
                setCurrentlyChangingPropertyType={setCurrentlyChangingPropertyType}
                isChangePropertyTypeDialogOpen={isChangePropertyTypeDialogOpen}
                setIsChangePropertyTypeDialogOpen={setIsChangePropertyTypeDialogOpen}
            />
        </div>
    );
}

function RoomSelection({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
}) {
    const [isNewRoomDialogOpen, setIsNewRoomDialogOpen] = useState(false);
    const [isEditRoomDialogOpen, setIsEditRoomDialogOpen] = useState(false);
    const [currentlyEditingRoomIndex, setCurrentlyEditingRoomIndex] = useState<number | null>(null);

    function tryToOpenNewRoomDialog() {
        setIsNewRoomDialogOpen(true);
    }

    function tryToOpenEditRoomDialog() {
        setIsEditRoomDialogOpen(true);
    }

    return (
        <div className="lg-px-screen-edge-2 tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
            <div className="tw-w-full tw-grid tw-grid-cols-2 tw-gap-2 lg:tw-grid-cols-3 lg:tw-max-w-4xl">
                <ItemBuilder
                    items={loadCalculatorInputs.property.rooms}
                    itemBuilder={(room, roomIndex) => (
                        <button
                            type="button"
                            className="tw-w-full lg-card tw-rounded-lg tw-grid tw-grid-rows-[auto_0.25rem_auto_0.75rem_auto] tw-grid-cols-[minmax(0,1fr)_0.5rem_auto] tw-justify-items-start tw-p-4 tw-group tw-duration-200"
                            key={roomIndex}
                            // onClick={() => {
                            //     const loadCalculatorInputsAction: LoadCalculatorInputsAction = {
                            //         actionType: LoadCalculatorInputsActionType.SetPropertyType,
                            //         payload: item.value,
                            //     };

                            //     dispatch(loadCalculatorInputsAction);
                            // }}
                            onClick={() => {
                                setCurrentlyEditingRoomIndex(roomIndex);
                                tryToOpenEditRoomDialog();
                            }}
                        >
                            <div className="tw-row-start-1 tw-col-start-1 tw-col-span-3">{room.roomName}</div>

                            <div className="tw-row-start-3 tw-col-start-1 tw-col-span-3">{`${room.devices.length} Devices`}</div>

                            <div className="tw-row-start-5 tw-col-start-1 tw-flex tw-flex-row">
                                {room.devices.length == 0 ? (
                                    <PlusCircleFill className="tw-w-8 tw-h-8 lg-text-secondary-700" />
                                ) : (
                                    <>
                                        <ItemBuilder
                                            items={Object.keys(room.devices.reduce(createGroupByReducer<Device, string>("deviceType"), {})).slice(0, 3)}
                                            itemBuilder={(deviceType, deviceTypeIndex) =>
                                                deviceTypeIndex < 2 || room.devices.length == 3 ? (
                                                    <div
                                                        className="tw-w-6 tw-h-8"
                                                        key={deviceTypeIndex}
                                                    >
                                                        <div className="tw-w-8 tw-h-8 lg-bg-secondary-900 tw-rounded-full tw-outline-3 tw-outline tw-outline-secondary-100-light dark:tw-outline-secondary-100-dark tw-flex tw-flex-col tw-justify-center tw-items-center">
                                                            <img
                                                                src={`https://files.growthjockey.com/livguard/icons/load-calculator/devices/${deviceType}.svg`}
                                                                className="tw-w-5 tw-h-5 tw-invert dark:tw-invert-0"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="tw-w-6 tw-h-8"
                                                        key={deviceTypeIndex}
                                                    >
                                                        <div className="tw-w-8 tw-h-8 lg-bg-secondary-300 tw-rounded-full tw-outline-3 tw-outline tw-outline-secondary-100-light dark:tw-outline-secondary-100-dark tw-flex tw-flex-col tw-justify-center tw-items-center">
                                                            +{room.devices.length - 2}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        />
                                    </>
                                )}
                            </div>

                            <div className="tw-row-start-5 tw-col-start-3 lg-text-primary-500 tw-self-center">Edit</div>
                        </button>
                    )}
                />

                <button
                    type="button"
                    className="tw-w-full tw-h-[8rem] tw-rounded-lg tw-flex tw-opacity-60 tw-border tw-border-dashed tw-flex-col tw-justify-center tw-items-center tw-gap-y-2 tw-group tw-duration-200 lg-card"
                    onClick={tryToOpenNewRoomDialog}
                >
                    <PlusCircleFill className="tw-w-8 tw-h-8 lg-text-secondary-700 tw-opacity-100" />
                    <div className="tw-opacity-100">Add Room</div>
                </button>
            </div>

            <NewRoomDialog
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                dispatch={dispatch}
                isNewRoomDialogOpen={isNewRoomDialogOpen}
                setIsNewRoomDialogOpen={setIsNewRoomDialogOpen}
            />

            <EditRoomDialog
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                dispatch={dispatch}
                currentlyEditingRoomIndex={currentlyEditingRoomIndex}
                setCurrentlyEditingRoomIndex={setCurrentlyEditingRoomIndex}
                isEditRoomDialogOpen={isEditRoomDialogOpen}
                setIsEditRoomDialogOpen={setIsEditRoomDialogOpen}
            />
        </div>
    );
}

function DeviceSelectionNewUi({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
    currentThiefLocation,
    setCurrentThiefLocation,
    setIsDialogOpen,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
    currentThiefLocation: number | null;
    setCurrentThiefLocation: React.Dispatch<number>;
    setIsDialogOpen: React.Dispatch<boolean>;
}) {
    const [isNewDeviceDialogOpen, setIsNewDeviceDialogOpen] = useState(false);

    function tryToOpenNewDeviceDialog() {
        setIsNewDeviceDialogOpen(true);
    }

    const groupedDevices = loadCalculatorInputs.property.rooms[0].devices.reduce(createGroupByReducer<Device, string>("deviceType"), {});
    const deviceTypeToDeviceCounts = Object.entries(groupedDevices)
        .map((kvp) => ({deviceType: kvp[0], deviceCount: kvp[1].length}))
        .sort((a, b) => deviceTypeLibrary[a.deviceType].humanReadableString.localeCompare(deviceTypeLibrary[b.deviceType].humanReadableString));

    const totalWattage = deviceTypeToDeviceCounts.reduce((totalWattage, item) => totalWattage + deviceTypeLibrary[item.deviceType].wattage * item.deviceCount, 0);

    return (
        <div className="lg-px-screen-edge-2 tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
            <div className="tw-flex tw-flex-row tw-gap-x-2 lg-text-title2">
                <div className="">{getVernacularString("loadCalculatorAdditionalInputsT6", userPreferences.language)}:</div>

                <div className="lg-text-secondary-900">{totalWattage} Watts</div>
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-w-full tw-max-w-3xl tw-grid tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] tw-items-center tw-justify-center tw-gap-x-4 lg:tw-gap-x-8 tw-gap-y-4">
                <div className="lg-text-body tw-text-left tw-place-self-start">{getVernacularString("loadCalculatorNewUIHeader1", userPreferences.language)}</div>
                <div className="lg-text-body tw-place-self-start tw-text-center tw-w-full">{getVernacularString("loadCalculatorNewUIHeader2", userPreferences.language)}</div>
                <div className="lg-text-body tw-place-self-start tw-text-center tw-w-full">{getVernacularString("loadCalculatorNewUIHeader3", userPreferences.language)}</div>
                <div className="lg-text-body tw-place-self-start tw-text-center tw-w-full">{getVernacularString("loadCalculatorNewUIHeader4", userPreferences.language)}</div>
                <div className="tw-col-span-4 tw-border-b tw-border-solid tw-border-secondary-300-light dark:tw-border-secondary-300-dark" />

                <ItemBuilder
                    items={deviceTypeToDeviceCounts}
                    itemBuilder={(item, itemIndex) => (
                        <React.Fragment key={itemIndex}>
                            <div className="tw-text-left">{deviceTypeLibrary[item.deviceType].humanReadableString}</div>

                            <div>{deviceTypeLibrary[item.deviceType].wattage} Watts</div>

                            <div className="tw-flex tw-flex-row tw-gap-x-4 tw-items-center">
                                <button
                                    type="button"
                                    className="tw-w-8 tw-h-8 lg-card tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-justify-center"
                                    onClick={() => {
                                        const action: LoadCalculatorInputsAction = {
                                            actionType: LoadCalculatorInputsActionType.RemoveSingleDevice,
                                            payload: {
                                                roomIndex: 0,
                                                deviceType: item.deviceType,
                                            },
                                        };

                                        dispatch(action);
                                    }}
                                >
                                    -
                                </button>

                                <div>{item.deviceCount}</div>

                                <button
                                    type="button"
                                    className="tw-w-8 tw-h-8 lg-card tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-justify-center"
                                    onClick={() => {
                                        const device: Device = {
                                            deviceType: item.deviceType,
                                            deviceDetails: {},
                                        };

                                        const action: LoadCalculatorInputsAction = {
                                            actionType: LoadCalculatorInputsActionType.AddDevices,
                                            payload: {
                                                roomIndex: 0,
                                                devices: [device],
                                            },
                                        };

                                        dispatch(action);
                                    }}
                                >
                                    +
                                </button>
                            </div>

                            <div>{deviceTypeLibrary[item.deviceType].wattage * item.deviceCount} Watts</div>

                            <div className="tw-col-span-4 tw-border-b tw-border-solid tw-border-secondary-300-light dark:tw-border-secondary-300-dark" />
                        </React.Fragment>
                    )}
                />
            </div>

            <div className="tw-h-4" />

            <div className="tw-w-full tw-max-w-3xl">
                <button
                    type="button"
                    onClick={tryToOpenNewDeviceDialog}
                    className="lg-cta-button"
                >
                    {getVernacularString("loadCalculatorAdditionalInputsT5", userPreferences.language)}
                </button>
            </div>

            <div className="tw-h-4" />

            <NewDeviceDialogNewUi
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                dispatch={dispatch}
                isAddDeviceDialogOpen={isNewDeviceDialogOpen}
                setIsAddDeviceDialogOpen={setIsNewDeviceDialogOpen}
            />
        </div>
    );
}

function ChangePropertyTypeDialog({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
    loadCalculatorInputsNewUi,
    dispatchNewUi,
    currentlyChangingPropertyType,
    setCurrentlyChangingPropertyType,
    isChangePropertyTypeDialogOpen,
    setIsChangePropertyTypeDialogOpen,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
    loadCalculatorInputsNewUi: LoadCalculatorInputs;
    dispatchNewUi: React.Dispatch<LoadCalculatorInputsAction>;
    currentlyChangingPropertyType: string | null;
    setCurrentlyChangingPropertyType: React.Dispatch<string | null>;
    isChangePropertyTypeDialogOpen: boolean;
    setIsChangePropertyTypeDialogOpen: React.Dispatch<boolean>;
}) {
    // const [selectedDevices, setSelectedDevices] = useState<Array<Device>>([]);

    function tryToCloseChangePropertyTypeDialog() {
        setIsChangePropertyTypeDialogOpen(false);
        setCurrentlyChangingPropertyType(null);
    }

    if (currentlyChangingPropertyType == null) {
        return <></>;
    }

    // function recalculateNewRoomName() {
    //     // TODO: Only change the name if it has not been modified by user?
    //     const countOfExistingRoomsWithSameType = loadCalculatorInputs.property.rooms.filter(room => room.roomType == selectedRoomType).length;

    //     setSelectedRoomName(`${getRoomTypeDetails(selectedRoomType).humanReadableString} ${countOfExistingRoomsWithSameType + 1}`);
    // }

    // useEffect(() => {
    //     recalculateNewRoomName();
    // }, [selectedRoomType]);

    return (
        <Transition
            show={isChangePropertyTypeDialogOpen}
            as={React.Fragment}
            beforeEnter={() => {
                // setSelectedDevices(room.devices);
                // setSelectedRoomName(loadCalculatorInputs.property.propertyName);
                // useEffect is not called if type is already set to the same value, so recalculate name manually
                // recalculateNewRoomName();
            }}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseChangePropertyTypeDialog}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter="tw-ease-out tw-transition-all tw-duration-200"
                    enterFrom="tw-opacity-0"
                    enterTo="tw-opacity-100"
                    leave="tw-ease-in tw-transition-all tw-duration-200"
                    leaveFrom="tw-opacity-100"
                    leaveTo="tw-opacity-0"
                >
                    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur" />
                </Transition.Child>

                <Dialog.Panel className="lg-px-screen-edge tw-fixed tw-inset-0 tw-grid tw-grid-rows-[1fr_auto_1fr] tw-grid-cols-1 tw-justify-center tw-items-center">
                    <div />

                    <Transition.Child
                        as={React.Fragment}
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-full"
                        leave="tw-ease-in tw-transition-all tw-duration-200"
                        leaveFrom="tw-opacity-full"
                        leaveTo="tw-opacity-0"
                    >
                        <div className="tw-w-full lg-card tw-px-6 tw-py-6 tw-rounded-lg tw-max-w-lg tw-mx-auto">
                            <div className="lg-text-title1">Are you sure you want to leave this section?</div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-body">If you leave now, all your progress will be lost.</div>

                            <VerticalSpacer className="tw-h-8" />

                            <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                <button
                                    type="button"
                                    className=""
                                    onClick={tryToCloseChangePropertyTypeDialog}
                                >
                                    Go Back
                                </button>

                                <button
                                    type="button"
                                    className="lg-cta-button"
                                    onClick={() => {
                                        const action: LoadCalculatorInputsAction = {
                                            actionType: LoadCalculatorInputsActionType.SetPropertyType,
                                            payload: currentlyChangingPropertyType,
                                        };

                                        dispatch(action);

                                        const actionNewUi: LoadCalculatorInputsAction = {
                                            actionType: LoadCalculatorInputsActionType.SetPropertyTypeNewUi,
                                            payload: currentlyChangingPropertyType,
                                        };

                                        dispatchNewUi(actionNewUi);

                                        tryToCloseChangePropertyTypeDialog();
                                    }}
                                >
                                    Proceed
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </Dialog.Panel>

                <div />
            </Dialog>
        </Transition>
    );
}

function NewRoomDialog({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
    isNewRoomDialogOpen,
    setIsNewRoomDialogOpen,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
    isNewRoomDialogOpen: boolean;
    setIsNewRoomDialogOpen: React.Dispatch<boolean>;
}) {
    const [selectedRoomName, setSelectedRoomName] = useState("");
    const [selectedRoomType, setSelectedRoomType] = useState("dda75244-60f2-40e8-8936-d4ea2ae25f34");

    function tryToCloseNewRoomDialog() {
        setIsNewRoomDialogOpen(false);
    }

    function recalculateNewRoomName() {
        // TODO: Only change the name if it has not been modified by user?
        const countOfExistingRoomsWithSameType = loadCalculatorInputs.property.rooms.filter((room) => room.roomType == selectedRoomType).length;

        setSelectedRoomName(`${getRoomTypeDetails(selectedRoomType).humanReadableString} ${countOfExistingRoomsWithSameType + 1}`);
    }

    useEffect(() => {
        recalculateNewRoomName();
    }, [selectedRoomType]);

    return (
        <Transition
            show={isNewRoomDialogOpen}
            as={React.Fragment}
            beforeEnter={() => {
                setSelectedRoomType("dda75244-60f2-40e8-8936-d4ea2ae25f34");
                // useEffect is not called if type is already set to the same value, so recalculate name manually
                recalculateNewRoomName();
            }}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseNewRoomDialog}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter="tw-ease-out tw-transition-all tw-duration-200"
                    enterFrom="tw-opacity-0"
                    enterTo="tw-opacity-100"
                    leave="tw-ease-in tw-transition-all tw-duration-200"
                    leaveFrom="tw-opacity-100"
                    leaveTo="tw-opacity-0"
                >
                    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur" />
                </Transition.Child>

                <Dialog.Panel className="lg-px-screen-edge tw-fixed tw-inset-0 tw-grid tw-grid-rows-[1fr_auto_1fr] tw-grid-cols-1 tw-justify-center tw-items-center">
                    <div
                        className="tw-w-full tw-h-full"
                        // onClick={tryToCloseNewRoomDialog}
                    />

                    <Transition.Child
                        as={React.Fragment}
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-full"
                        leave="tw-ease-in tw-transition-all tw-duration-200"
                        leaveFrom="tw-opacity-full"
                        leaveTo="tw-opacity-0"
                    >
                        <div className="tw-w-full lg-card tw-px-6 tw-py-6 tw-rounded-lg tw-max-w-lg tw-mx-auto">
                            <div className="lg-text-title1">Add Room</div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-body-bold lg-text-secondary-900">Select Room Type</div>

                            <VerticalSpacer className="tw-h-2" />

                            <Listbox
                                value={selectedRoomType}
                                onChange={setSelectedRoomType}
                            >
                                <Listbox.Button className="tw-w-full lg-bg-secondary-300 tw-py-4 tw-px-4 tw-rounded-full tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark tw-text-left">
                                    {getRoomTypeDetails(selectedRoomType).humanReadableString}
                                </Listbox.Button>

                                <Listbox.Options className="tw-absolute tw-z-50 tw-left-12 tw-right-12 tw-h-60 lg-text-secondary-900 tw-rounded-lg tw-overflow-auto">
                                    <ItemBuilder
                                        items={Object.entries(roomTypeLibrary)}
                                        itemBuilder={(roomTypeKvp, roomTypeKvpIndex) => (
                                            <Listbox.Option
                                                value={roomTypeKvp[0]}
                                                key={roomTypeKvpIndex}
                                                as={React.Fragment}
                                            >
                                                {({active, selected}) => (
                                                    <li className={concatenateNonNullStringsWithSpaces("tw-p-4", selected ? "lg-bg-secondary-300" : "lg-card")}>
                                                        {roomTypeKvp[1].humanReadableString}
                                                    </li>
                                                )}
                                            </Listbox.Option>
                                        )}
                                        spaceBuilder={(spaceIndex) => (
                                            <div
                                                className="tw-mx-2 tw-h-px lg-bg-secondary-700"
                                                key={spaceIndex}
                                            />
                                        )}
                                    />
                                </Listbox.Options>
                            </Listbox>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-body-bold lg-text-secondary-900">Room Name</div>

                            <VerticalSpacer className="tw-h-2" />

                            <input
                                type="text"
                                className="tw-w-full lg-bg-secondary-300 tw-py-4 tw-px-4 tw-rounded-full tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                                value={selectedRoomName}
                                onChange={(e) => setSelectedRoomName(e.target.value)}
                            />

                            <VerticalSpacer className="tw-h-8" />

                            <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                <button
                                    type="button"
                                    className=""
                                    onClick={tryToCloseNewRoomDialog}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="lg-cta-button"
                                    disabled={selectedRoomName.length == 0}
                                    onClick={() => {
                                        const room: Room = {
                                            roomType: selectedRoomType,
                                            roomName: selectedRoomName,
                                            devices: [],
                                        };

                                        const action: LoadCalculatorInputsAction = {
                                            actionType: LoadCalculatorInputsActionType.AddRoom,
                                            payload: room,
                                        };

                                        dispatch(action);

                                        tryToCloseNewRoomDialog();
                                    }}
                                >
                                    Add Room
                                </button>
                            </div>
                        </div>
                    </Transition.Child>

                    <div
                        className="tw-w-full tw-h-full"
                        // onClick={tryToCloseNewRoomDialog}
                    />
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
}

function EditRoomDialog({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
    currentlyEditingRoomIndex,
    setCurrentlyEditingRoomIndex,
    isEditRoomDialogOpen,
    setIsEditRoomDialogOpen,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
    currentlyEditingRoomIndex: number | null;
    setCurrentlyEditingRoomIndex: React.Dispatch<number | null>;
    isEditRoomDialogOpen: boolean;
    setIsEditRoomDialogOpen: React.Dispatch<boolean>;
}) {
    const [selectedRoomName, setSelectedRoomName] = useState("");
    const [isNewDeviceDialogOpen, setIsNewDeviceDialogOpen] = useState(false);
    const [currentlyAddingDeviceType, setCurrentlyAddingDeviceType] = useState<string | null>(null);
    const [isEditDeviceDialogOpen, setIsEditDeviceDialogOpen] = useState(false);
    const [currentlyEditingDeviceType, setCurrentlyEditingDeviceType] = useState<string | null>(null);

    function tryToCloseEditRoomDialog() {
        setIsEditRoomDialogOpen(false);
        setCurrentlyEditingRoomIndex(null);
    }

    function tryToOpenNewDeviceDialog() {
        setIsNewDeviceDialogOpen(true);
    }

    function tryToOpenEditDeviceDialog() {
        setIsEditDeviceDialogOpen(true);
    }

    if (currentlyEditingRoomIndex == null) {
        return <></>;
    }

    const room = loadCalculatorInputs.property.rooms[currentlyEditingRoomIndex];
    const groupedDevices = room.devices.reduce(createGroupByReducer<Device, string>("deviceType"), {});
    const deviceTypeToDeviceCounts = Object.entries(groupedDevices)
        .map((kvp) => ({deviceType: kvp[0], deviceCount: kvp[1].length}))
        .sort((a, b) => deviceTypeLibrary[a.deviceType].humanReadableString.localeCompare(deviceTypeLibrary[b.deviceType].humanReadableString));

    return (
        <Transition
            show={isEditRoomDialogOpen}
            as={React.Fragment}
            beforeEnter={() => {
                setSelectedRoomName(loadCalculatorInputs.property.propertyName);
            }}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseEditRoomDialog}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter="tw-ease-out tw-transition-all tw-duration-200"
                    enterFrom="tw-opacity-0"
                    enterTo="tw-opacity-100"
                    leave="tw-ease-in tw-transition-all tw-duration-200"
                    leaveFrom="tw-opacity-100"
                    leaveTo="tw-opacity-0"
                >
                    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur" />
                </Transition.Child>

                <Dialog.Panel className="tw-fixed tw-inset-0 tw-grid tw-grid-rows-[1fr_auto_1fr] tw-grid-cols-1 tw-justify-center tw-items-center">
                    <div />

                    <Transition.Child
                        as={React.Fragment}
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-full"
                        leave="tw-ease-in tw-transition-all tw-duration-200"
                        leaveFrom="tw-opacity-full"
                        leaveTo="tw-opacity-0"
                    >
                        <div className="tw-w-full lg-card tw-py-6 tw-rounded-lg tw-max-w-lg tw-mx-auto">
                            <div className="lg-text-title1 lg-px-screen-edge">Edit {room.roomName}</div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-body-bold lg-px-screen-edge lg-text-secondary-900">Selected Devices</div>

                            <VerticalSpacer className="tw-h-2" />

                            {room.devices.length == 0 ? (
                                <div className="tw-w-full tw-grid tw-grid-cols-4 tw-gap-x-2 tw-gap-y-2 lg-px-screen-edge">
                                    <div className="tw-w-full tw-flex tw-flex-col tw-items-center tw-gap-y-2 tw-text-center">
                                        <PlusCircleFill className="tw-w-8 tw-h-8 lg-text-secondary-700" />
                                        <div className="lg-text-icon">No device</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="tw-w-full tw-grid tw-grid-cols-4 tw-gap-x-2 tw-gap-y-2 lg-px-screen-edge">
                                    <ItemBuilder
                                        items={deviceTypeToDeviceCounts}
                                        itemBuilder={(deviceTypeToDeviceCount, deviceTypeToDeviceCountIndex) => (
                                            <button
                                                type="button"
                                                className="tw-w-full tw-flex tw-flex-col tw-items-center tw-gap-y-2 tw-text-center"
                                                onClick={() => {
                                                    // const indexToExclude = selectedDevices.findIndex(device => device.deviceType == deviceTypeToDeviceCount.deviceType);
                                                    // setSelectedDevices([
                                                    //     ...selectedDevices.filter((device, deviceIndex) => deviceIndex != indexToExclude)
                                                    // ]);
                                                    setCurrentlyEditingDeviceType(deviceTypeToDeviceCount.deviceType);
                                                    tryToOpenEditDeviceDialog();
                                                }}
                                                key={deviceTypeToDeviceCountIndex}
                                            >
                                                <div className="tw-w-8 tw-h-8 lg-bg-secondary-900 tw-rounded-full tw-flex tw-flex-col tw-justify-center tw-items-center">
                                                    <img
                                                        src={`https://files.growthjockey.com/livguard/icons/load-calculator/devices/${deviceTypeToDeviceCount.deviceType}.svg`}
                                                        className="tw-w-5 tw-h-5 tw-invert dark:tw-invert-0"
                                                    />
                                                </div>
                                                <div className="lg-text-icon">
                                                    <div>{getDeviceTypeDetails(deviceTypeToDeviceCount.deviceType).humanReadableString}</div>
                                                    <div>({deviceTypeToDeviceCount.deviceCount}x)</div>
                                                </div>
                                            </button>
                                        )}
                                    />
                                </div>
                            )}

                            <VerticalSpacer className="tw-h-3" />

                            <div className="lg-text-body-bold lg-text-secondary-900 lg-px-screen-edge">Select Devices</div>

                            <VerticalSpacer className="tw-h-2" />

                            <div className="tw-h-96 tw-overflow-x-visible tw-overflow-y-auto lg-bg-secondary-300 tw-relative">
                                <ItemBuilder
                                    items={distinct(Object.values(deviceTypeLibrary).map((deviceDetails) => deviceDetails.category))}
                                    itemBuilder={(deviceCategory, deviceCategoryIndex) => (
                                        <div
                                            className="tw-p-4"
                                            key={deviceCategoryIndex}
                                        >
                                            <div className="lg-text-body">{deviceCategory}</div>

                                            <VerticalSpacer className="tw-h-2" />

                                            <div className="tw-w-full tw-grid tw-grid-cols-4 tw-gap-x-2 tw-gap-y-2">
                                                <ItemBuilder
                                                    items={Object.entries(deviceTypeLibrary)
                                                        .filter((kvp) => kvp[1].category == deviceCategory)
                                                        .map((kvp) => kvp[0])}
                                                    itemBuilder={(deviceType, deviceTypeIndex) => (
                                                        <button
                                                            type="button"
                                                            className="tw-w-full tw-flex tw-flex-col tw-items-center tw-gap-y-2 tw-text-center"
                                                            // onClick={() => {
                                                            //     setSelectedDevices([
                                                            //         ...selectedDevices,
                                                            //         {
                                                            //             deviceType: deviceType,
                                                            //             deviceDetails: {},
                                                            //         },
                                                            //     ]);
                                                            // }}
                                                            onClick={() => {
                                                                setCurrentlyAddingDeviceType(deviceType);
                                                                tryToOpenNewDeviceDialog();
                                                            }}
                                                            key={deviceTypeIndex}
                                                        >
                                                            <div className="tw-w-8 tw-h-8 lg-bg-secondary-900 tw-rounded-full tw-flex tw-flex-col tw-justify-center tw-items-center">
                                                                <img
                                                                    src={`https://files.growthjockey.com/livguard/icons/load-calculator/devices/${deviceType}.svg`}
                                                                    className="tw-w-5 tw-h-5 tw-invert dark:tw-invert-0"
                                                                />
                                                            </div>
                                                            <div className="lg-text-icon">{getDeviceTypeDetails(deviceType).humanReadableString}</div>
                                                        </button>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    )}
                                />
                                <div className="tw-sticky tw-w-full tw-bottom-0 tw-h-4 tw-bg-gradient-to-b tw-from-[#1f202200] tw-to-[#1f2022ff]"></div>
                            </div>

                            <VerticalSpacer className="tw-h-6" />

                            {/* <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                <button
                                    type="button"
                                    className=""
                                    onClick={tryToCloseEditRoomDialog}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="lg-cta-button"
                                    // disabled={selectedRoomName.length == 0}
                                    onClick={() => {
                                        const loadCalculatorInputsAction: LoadCalculatorInputsAction = {
                                            actionType: LoadCalculatorInputsActionType.EditRoom,
                                            payload: {
                                                roomIndex: currentlyEditingRoomIndex,
                                                roomName: selectedRoomName,
                                                devices: selectedDevices,
                                            },
                                        };

                                        dispatch(loadCalculatorInputsAction);

                                        tryToCloseEditRoomDialog();
                                    }}
                                >
                                    Update Devices
                                </button>
                            </div> */}

                            <div className="tw-flex tw-flex-row tw-justify-center tw-items-center lg-px-screen-edge">
                                <button
                                    type="button"
                                    className=""
                                    onClick={tryToCloseEditRoomDialog}
                                >
                                    Back
                                </button>
                            </div>

                            <NewDeviceDialog
                                userPreferences={userPreferences}
                                loadCalculatorInputs={loadCalculatorInputs}
                                dispatch={dispatch}
                                currentlyEditingRoomIndex={currentlyEditingRoomIndex}
                                currentlyAddingDeviceType={currentlyAddingDeviceType}
                                setCurrentlyAddingDeviceType={setCurrentlyAddingDeviceType}
                                isAddDeviceDialogOpen={isNewDeviceDialogOpen}
                                setIsAddDeviceDialogOpen={setIsNewDeviceDialogOpen}
                            />

                            <EditDeviceDialog
                                userPreferences={userPreferences}
                                loadCalculatorInputs={loadCalculatorInputs}
                                dispatch={dispatch}
                                currentlyEditingRoomIndex={currentlyEditingRoomIndex}
                                currentlyEditingDeviceType={currentlyEditingDeviceType}
                                setCurrentlyEditingDeviceType={setCurrentlyEditingDeviceType}
                                isEditDeviceDialogOpen={isEditDeviceDialogOpen}
                                setIsEditDeviceDialogOpen={setIsEditDeviceDialogOpen}
                            />
                        </div>
                    </Transition.Child>
                </Dialog.Panel>

                <div />
            </Dialog>
        </Transition>
    );
}

function NewDeviceDialog({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
    currentlyEditingRoomIndex,
    currentlyAddingDeviceType,
    setCurrentlyAddingDeviceType,
    isAddDeviceDialogOpen,
    setIsAddDeviceDialogOpen,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
    currentlyEditingRoomIndex: number | null;
    currentlyAddingDeviceType: string | null;
    setCurrentlyAddingDeviceType: React.Dispatch<string | null>;
    isAddDeviceDialogOpen: boolean;
    setIsAddDeviceDialogOpen: React.Dispatch<boolean>;
}) {
    const [quantity, setQuantity] = useState<number>(1);

    function tryToCloseAddDeviceDialog() {
        setIsAddDeviceDialogOpen(false);
        setCurrentlyAddingDeviceType(null);
    }

    if (currentlyEditingRoomIndex == null || currentlyAddingDeviceType == null) {
        return <></>;
    }

    return (
        <Transition
            show={isAddDeviceDialogOpen}
            as={React.Fragment}
            beforeEnter={() => {
                setQuantity(1);
            }}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseAddDeviceDialog}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter="tw-ease-out tw-transition-all tw-duration-200"
                    enterFrom="tw-opacity-0"
                    enterTo="tw-opacity-100"
                    leave="tw-ease-in tw-transition-all tw-duration-200"
                    leaveFrom="tw-opacity-100"
                    leaveTo="tw-opacity-0"
                >
                    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur" />
                </Transition.Child>

                <Dialog.Panel className="lg-px-screen-edge tw-fixed tw-inset-0 tw-grid tw-grid-rows-[1fr_auto_1fr] tw-grid-cols-1 tw-justify-center tw-items-center">
                    <div />

                    <Transition.Child
                        as={React.Fragment}
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-full"
                        leave="tw-ease-in tw-transition-all tw-duration-200"
                        leaveFrom="tw-opacity-full"
                        leaveTo="tw-opacity-0"
                    >
                        <div className="tw-w-full lg-card tw-px-6 tw-py-6 tw-rounded-lg tw-max-w-lg tw-mx-auto">
                            <div className="lg-text-title1">Add {getDeviceTypeDetails(currentlyAddingDeviceType).humanReadableString}</div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-body-bold">Select Quantity</div>

                            <VerticalSpacer className="tw-h-2" />

                            <div className="tw-grid tw-grid-cols-[5rem_minmax(0,1fr)_5rem] tw-items-center">
                                <div className="tw-row-start-1 tw-col-start-1 lg-bg-primary-500 tw-w-9 tw-h-9 tw-ml-2 tw-rounded-full tw-z-10" />

                                <input
                                    type="number"
                                    className="tw-row-start-1 tw-col-start-1 tw-col-span-3 lg-text-input tw-text-center"
                                    value={quantity}
                                    onChange={(e) => {
                                        const newQuantity = safeParse(getIntegerFromUnknown, e.target.value);
                                        if (newQuantity == null || newQuantity < 1 || newQuantity > 9) {
                                            return;
                                        }

                                        setQuantity(newQuantity);
                                    }}
                                />

                                <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-mr-4">
                                    <button
                                        className="tw-w-8 tw-h-8 tw-bg-secondary-700-dark tw-text-secondary-300-dark tw-flex tw-flex-col tw-items-center tw-justify-center tw-rounded-l-lg"
                                        onClick={() => {
                                            const newQuantity = quantity - 1;
                                            if (newQuantity < 1) {
                                                return;
                                            }

                                            setQuantity(newQuantity);
                                        }}
                                    >
                                        -
                                    </button>

                                    <button
                                        className="tw-w-8 tw-h-8 tw-bg-secondary-700-dark tw-text-secondary-300-dark tw-flex tw-flex-col tw-items-center tw-justify-center tw-rounded-r-lg tw-border-l tw-border-solid tw-border-secondary-300-dark"
                                        onClick={() => {
                                            const newQuantity = quantity + 1;
                                            if (newQuantity > 9) {
                                                return;
                                            }

                                            setQuantity(newQuantity);
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-x-2">
                                <div className="lg-text-title2">Power Draw: {getDeviceTypeDetails(currentlyAddingDeviceType).wattage * quantity} Watts</div>
                                <div className="lg-text-body">({getDeviceTypeDetails(currentlyAddingDeviceType).wattage} Watts per Device)</div>
                            </div>

                            <VerticalSpacer className="tw-h-8" />

                            <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                <button
                                    type="button"
                                    className=""
                                    onClick={tryToCloseAddDeviceDialog}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="lg-cta-button"
                                    // disabled={selectedRoomName.length == 0}
                                    onClick={() => {
                                        const device: Device = {
                                            deviceType: currentlyAddingDeviceType,
                                            deviceDetails: {},
                                        };

                                        const loadCalculatorInputsAction: LoadCalculatorInputsAction = {
                                            actionType: LoadCalculatorInputsActionType.AddDevices,
                                            payload: {
                                                roomIndex: currentlyEditingRoomIndex,
                                                devices: getIntegerArrayOfLength(quantity).map((index) => device),
                                            },
                                        };

                                        dispatch(loadCalculatorInputsAction);

                                        tryToCloseAddDeviceDialog();
                                    }}
                                >
                                    Add Device
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </Dialog.Panel>
                <div />
            </Dialog>
        </Transition>
    );
}

function NewDeviceDialogNewUi({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
    isAddDeviceDialogOpen,
    setIsAddDeviceDialogOpen,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
    isAddDeviceDialogOpen: boolean;
    setIsAddDeviceDialogOpen: React.Dispatch<boolean>;
}) {
    const [selectedDevices, setSelectedDevices] = useState<Array<string>>([]);
    const [query, setQuery] = useState<string>("");

    function tryToCloseAddDeviceDialog() {
        setIsAddDeviceDialogOpen(false);
    }

    const queryLowerCase = query.toLowerCase();
    const devicesGroupedByCategory = Object.entries(deviceTypeLibrary)
        .filter((kvp) => kvp[1].humanReadableString.toLowerCase().includes(queryLowerCase))
        .map((kvp) => ({deviceType: kvp[0], category: kvp[1].category, humanReadableString: kvp[1].humanReadableString}))
        .reduce(createGroupByReducer<{deviceType: string; category: string; humanReadableString: string}, string>("category"), {});

    return (
        <Transition
            show={isAddDeviceDialogOpen}
            as={React.Fragment}
            beforeEnter={() => {
                setSelectedDevices([]);
                setQuery("");
            }}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseAddDeviceDialog}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter="tw-ease-out tw-transition-all tw-duration-200"
                    enterFrom="tw-opacity-0"
                    enterTo="tw-opacity-100"
                    leave="tw-ease-in tw-transition-all tw-duration-200"
                    leaveFrom="tw-opacity-100"
                    leaveTo="tw-opacity-0"
                >
                    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur" />
                </Transition.Child>

                <Dialog.Panel className="lg-px-screen-edge tw-fixed tw-inset-0 tw-grid tw-grid-rows-[1fr_auto_1fr] tw-grid-cols-1 tw-justify-center tw-items-center">
                    <div />

                    <Transition.Child
                        as={React.Fragment}
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-full"
                        leave="tw-ease-in tw-transition-all tw-duration-200"
                        leaveFrom="tw-opacity-full"
                        leaveTo="tw-opacity-0"
                    >
                        <div className="tw-w-full lg-card tw-px-6 tw-py-6 tw-rounded-lg tw-max-w-lg tw-mx-auto">
                            <div className="lg-text-title1">{getVernacularString("loadCalculatorAdditionalInputsT5", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="tw-w-full tw-relative">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="tw-w-full tw-bg-transparent tw-py-4 tw-pr-4 tw-pl-14 tw-rounded-full tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                                    placeholder="Search device"
                                />
                                <Search className="tw-absolute tw-top-4 tw-left-4 tw-w-6 tw-h-6" />
                            </div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="tw-h-40 tw-overflow-auto">
                                <ItemBuilder
                                    items={Object.entries(devicesGroupedByCategory)}
                                    itemBuilder={(item, itemIndex) => (
                                        <React.Fragment key={itemIndex}>
                                            <div className="lg-text-secondary-700">{item[0]}</div>

                                            <VerticalSpacer className="tw-h-2" />

                                            <ItemBuilder
                                                items={item[1]}
                                                itemBuilder={(item2, itemIndex2) => (
                                                    <button
                                                        role="button"
                                                        className="tw-w-full tw-flex tw-flex-row tw-gap-x-2"
                                                        onClick={() => {
                                                            if (selectedDevices.includes(item2.deviceType)) {
                                                                setSelectedDevices(selectedDevices.filter((selectedDevices) => selectedDevices != item2.deviceType));
                                                            } else {
                                                                setSelectedDevices([...selectedDevices, item2.deviceType]);
                                                            }
                                                        }}
                                                        key={itemIndex2}
                                                    >
                                                        {selectedDevices.includes(item2.deviceType) ? (
                                                            <Check2 className="tw-w-5 tw-h-5 tw-rounded-sm tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark" />
                                                        ) : (
                                                            <div className="tw-w-5 tw-h-5 tw-rounded-sm tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark" />
                                                        )}
                                                        <div className="tw-flex-1 tw-text-left">{item2.humanReadableString}</div>
                                                    </button>
                                                )}
                                                spaceBuilder={(spaceIndex) => (
                                                    <VerticalSpacer
                                                        className="tw-h-2"
                                                        key={spaceIndex}
                                                    />
                                                )}
                                            />
                                        </React.Fragment>
                                    )}
                                    spaceBuilder={(spaceIndex) => (
                                        <VerticalSpacer
                                            className="tw-h-2"
                                            key={spaceIndex}
                                        />
                                    )}
                                />
                            </div>

                            <VerticalSpacer className="tw-h-8" />

                            <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                <button
                                    type="button"
                                    className=""
                                    onClick={tryToCloseAddDeviceDialog}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="lg-cta-button"
                                    disabled={selectedDevices.length == 0}
                                    onClick={() => {
                                        const loadCalculatorInputsAction: LoadCalculatorInputsAction = {
                                            actionType: LoadCalculatorInputsActionType.AddDevices,
                                            payload: {
                                                roomIndex: 0,
                                                devices: selectedDevices.map((selectedDevice) => ({
                                                    deviceType: selectedDevice,
                                                    deviceDetails: {},
                                                })),
                                            },
                                        };

                                        dispatch(loadCalculatorInputsAction);

                                        tryToCloseAddDeviceDialog();
                                    }}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </Dialog.Panel>
                <div />
            </Dialog>
        </Transition>
    );
}

function EditDeviceDialog({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
    currentlyEditingRoomIndex,
    currentlyEditingDeviceType,
    setCurrentlyEditingDeviceType,
    isEditDeviceDialogOpen,
    setIsEditDeviceDialogOpen,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
    currentlyEditingRoomIndex: number | null;
    currentlyEditingDeviceType: string | null;
    setCurrentlyEditingDeviceType: React.Dispatch<string | null>;
    isEditDeviceDialogOpen: boolean;
    setIsEditDeviceDialogOpen: React.Dispatch<boolean>;
}) {
    function tryToCloseEditDeviceDialog() {
        setIsEditDeviceDialogOpen(false);
        setCurrentlyEditingDeviceType(null);
    }

    if (currentlyEditingRoomIndex == null || currentlyEditingDeviceType == null) {
        return <></>;
    }

    const room = loadCalculatorInputs.property.rooms[currentlyEditingRoomIndex];
    const groupedDevices = room.devices.reduce(createGroupByReducer<Device, string>("deviceType"), {});

    const quantity = groupedDevices[currentlyEditingDeviceType].length;

    return (
        <Transition
            show={isEditDeviceDialogOpen}
            as={React.Fragment}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseEditDeviceDialog}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter="tw-ease-out tw-transition-all tw-duration-200"
                    enterFrom="tw-opacity-0"
                    enterTo="tw-opacity-100"
                    leave="tw-ease-in tw-transition-all tw-duration-200"
                    leaveFrom="tw-opacity-100"
                    leaveTo="tw-opacity-0"
                >
                    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur" />
                </Transition.Child>

                <Dialog.Panel className="lg-px-screen-edge tw-fixed tw-inset-0 tw-grid tw-grid-rows-[1fr_auto_1fr] tw-grid-cols-1 tw-justify-center tw-items-center">
                    <div />

                    <Transition.Child
                        as={React.Fragment}
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-full"
                        leave="tw-ease-in tw-transition-all tw-duration-200"
                        leaveFrom="tw-opacity-full"
                        leaveTo="tw-opacity-0"
                    >
                        <div className="tw-w-full lg-card tw-px-6 tw-py-6 tw-rounded-lg tw-max-w-lg tw-mx-auto">
                            <div className="lg-text-title1">Edit {getDeviceTypeDetails(currentlyEditingDeviceType).humanReadableString}</div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-body-bold">Quantity Selected</div>

                            <VerticalSpacer className="tw-h-2" />

                            <div className="tw-grid tw-grid-cols-[5rem_minmax(0,1fr)_5rem] tw-items-center">
                                <div className="tw-row-start-1 tw-col-start-1 lg-bg-primary-500 tw-w-9 tw-h-9 tw-ml-2 tw-rounded-full tw-z-10" />

                                <input
                                    type="number"
                                    className="tw-row-start-1 tw-col-start-1 tw-col-span-3 lg-text-input tw-text-center"
                                    value={quantity}
                                    disabled={true}
                                    // onChange={(e) => {
                                    //     const newQuantity = safeParse(getIntegerFromUnknown, e.target.value);
                                    //     if (newQuantity == null || newQuantity < 1 || newQuantity > 9) {
                                    //         return;
                                    //     }

                                    //     setQuantity(newQuantity);
                                    // }}
                                />

                                {/* <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-mr-4">
                                    <button
                                        className="tw-w-8 tw-h-8 tw-bg-secondary-700-dark tw-text-secondary-300-dark tw-flex tw-flex-col tw-items-center tw-justify-center tw-rounded-l-lg"
                                        // onClick={() => {
                                        //     const newQuantity = quantity - 1;
                                        //     if (newQuantity < 1) {
                                        //         return;
                                        //     }

                                        //     setQuantity(newQuantity);
                                        // }}
                                    >
                                        -
                                    </button>

                                    <button
                                        className="tw-w-8 tw-h-8 tw-bg-secondary-700-dark tw-text-secondary-300-dark tw-flex tw-flex-col tw-items-center tw-justify-center tw-rounded-r-lg tw-border-l tw-border-solid tw-border-secondary-300-dark"
                                        // onClick={() => {
                                        //     const newQuantity = quantity + 1;
                                        //     if (newQuantity > 9) {
                                        //         return;
                                        //     }

                                        //     setQuantity(newQuantity);
                                        // }}
                                    >
                                        +
                                    </button>
                                </div> */}
                            </div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-x-2">
                                <div className="lg-text-title2">Power Draw: {getDeviceTypeDetails(currentlyEditingDeviceType).wattage * quantity} Watts</div>
                                <div className="lg-text-body">({getDeviceTypeDetails(currentlyEditingDeviceType).wattage} Watts per Device)</div>
                            </div>

                            <VerticalSpacer className="tw-h-8" />

                            <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                <button
                                    type="button"
                                    className=""
                                    onClick={tryToCloseEditDeviceDialog}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="lg-cta-button"
                                    // disabled={selectedRoomName.length == 0}
                                    onClick={() => {
                                        const loadCalculatorInputsAction: LoadCalculatorInputsAction = {
                                            actionType: LoadCalculatorInputsActionType.RemoveDevice,
                                            payload: {
                                                roomIndex: currentlyEditingRoomIndex,
                                                deviceType: currentlyEditingDeviceType,
                                            },
                                        };

                                        dispatch(loadCalculatorInputsAction);

                                        setCurrentlyEditingDeviceType(null);
                                        tryToCloseEditDeviceDialog();
                                    }}
                                >
                                    Delete Device
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </Dialog.Panel>

                <div />
            </Dialog>
        </Transition>
    );
}

function AdditionalInputsSection({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
}) {
    return (
        <div className="lg-px-screen-edge-2">
            <div className="tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-x-2">
                <div className="tw-whitespace-nowrap">{getVernacularString("loadCalculatorAdditionalInputsT1", userPreferences.language)}</div>
                <div className="tw-flex tw-flex-row">
                    <button
                        type="button"
                        className="tw-w-6 tw-h-8 lg-card tw-rounded-l-lg tw-flex tw-flex-col tw-items-center tw-justify-center"
                        onClick={() => {
                            const newBackupHours = loadCalculatorInputs.backupHours - 1;
                            if (newBackupHours < 1) {
                                return;
                            }

                            const action: LoadCalculatorInputsAction = {
                                actionType: LoadCalculatorInputsActionType.ChangeBackupHours,
                                payload: newBackupHours,
                            };

                            dispatch(action);
                        }}
                    >
                        -
                    </button>
                    <input
                        className="tw-w-12 tw-h-8 lg-bg-secondary-300 tw-text-center"
                        value={loadCalculatorInputs.backupHours}
                        onChange={(e) => {
                            const newBackupHours = safeParse(getIntegerFromUnknown, e.target.value);
                            if (newBackupHours == null || newBackupHours < 1 || newBackupHours > 24) {
                                return;
                            }

                            const action: LoadCalculatorInputsAction = {
                                actionType: LoadCalculatorInputsActionType.ChangeBackupHours,
                                payload: newBackupHours,
                            };

                            dispatch(action);
                        }}
                    />
                    <button
                        type="button"
                        className="tw-w-6 tw-h-8 lg-card tw-rounded-r-lg tw-flex tw-flex-col tw-items-center tw-justify-center"
                        onClick={() => {
                            const newBackupHours = loadCalculatorInputs.backupHours + 1;
                            if (newBackupHours > 24) {
                                return;
                            }

                            const action: LoadCalculatorInputsAction = {
                                actionType: LoadCalculatorInputsActionType.ChangeBackupHours,
                                payload: newBackupHours,
                            };

                            dispatch(action);
                        }}
                    >
                        +
                    </button>
                </div>
                <div className="tw-whitespace-nowrap">{getVernacularString("loadCalculatorAdditionalInputsT2", userPreferences.language)}</div>
            </div>

            <VerticalSpacer className="tw-h-8" />

            <div className="tw-flex-col tw-flex tw-max-w-3xl tw-w-full tw-mx-auto tw-p-4 tw-px-8 tw-pb-8 tw-rounded-lg lg-card tw-place-self-center tw-justify-self-center">
                <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-2 tw-relative">
                    <div className="tw-flex-none">{getVernacularString("loadCalculatorAdditionalInputsT3", userPreferences.language)}</div>

                    <Popover className="tw-h-4">
                        {({open}) => (
                            <>
                                <Popover.Button>
                                    <InformationCircleIcon className="tw-w-4 tw-h-4 tw-flex-none" />
                                </Popover.Button>

                                <Transition
                                    as={React.Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                    <Popover.Panel className="tw-absolute tw-left-0 tw-right-0 tw-z-10 tw-mt-3 tw-max-w-sm tw-transform tw-px-4 tw-sm:px-0 tw-lg:max-w-3xl">
                                        <div className="lg-bg-secondary-300 tw-p-2 tw-rounded-lg">What percentage of the total load you expect to be running at any given time</div>
                                    </Popover.Panel>
                                </Transition>
                            </>
                        )}
                    </Popover>
                    {/* <Popover className="tw-absolute tw-left-8">
                    <Popover.Button>Solutions</Popover.Button>

                    <Popover.Panel>"Hello Beby"</Popover.Panel>
                </Popover> */}
                    <EmptyFlexFiller />
                    <div className="tw-flex-none lg-text-body-bold lg-text-secondary-900">{loadCalculatorInputs.averageConsumption}%</div>
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-grid tw-grid-cols-[3rem_minmax(0,1fr)_3rem] tw-items-center">
                    <input
                        type="range"
                        min="20"
                        max="100"
                        value={loadCalculatorInputs.averageConsumption}
                        onChange={(e) => {
                            const newAverageConsumption = safeParse(getIntegerFromUnknown, e.target.value);
                            if (newAverageConsumption == null || newAverageConsumption < 20 || newAverageConsumption > 100) {
                                return;
                            }

                            const action: LoadCalculatorInputsAction = {
                                actionType: LoadCalculatorInputsActionType.ChangeAverageConsumption,
                                payload: newAverageConsumption,
                            };

                            dispatch(action);
                        }}
                        className="tw-row-start-1 tw-col-start-1 tw-col-span-3 lg-range-input"
                    />

                    <div className="tw-row-start-1 tw-col-start-1 tw-relative tw-top-4 lg-text-icon">20%</div>
                    <div className="tw-row-start-1 tw-col-start-3 tw-justify-self-end tw-relative tw-top-4 lg-text-icon">100%</div>
                    {/* <div className="tw-row-start-1 tw-col-start-3 tw-justify-self-end tw-relative -tw-top-8">{loadCalculatorInputs.averageConsumption}%</div> */}
                </div>
            </div>
        </div>
    );
}
