import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import {LoaderFunction} from "@remix-run/node";
import {useState} from "react";
import {Facebook, Google, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {useLoaderData} from "react-router";
import {PageScaffold} from "~/components/pageScaffold";
import {CarouselStyle1} from "~/global-common-typescript/components/carouselStyle1";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {FullHeightImage} from "~/global-common-typescript/components/fullHeightImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

type LoaderData = {
    userPreferences: UserPreferences;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookies(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
    };

    return loaderData;
};

export default function () {
    const {userPreferences} = useLoaderData() as LoaderData;

    return (
        <>
            <PageScaffold userPreferences={userPreferences} redirectTo={"/"}>
                <HomePage userPreferences={userPreferences} />
            </PageScaffold>
            <StickyBottomBar userPreferences={userPreferences} />
        </>
    );
}

function HomePage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <>
            <HeroSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-8" />

            <Section1 userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <EnergySolutions userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <WeAreOneOfAKind userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <PowerPlanner userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <TransformingLives userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <SolarSolutions userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <MeetOurLeadership userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <FAQs userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <DealerLocator userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <ShowerSomeLoveOnSocialHandles userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <PowerfulPurposePowerfulImpact userPreferences={userPreferences} />
        </>
    );
}

function HeroSection({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem-4.75rem)] tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center">
            <img src="https://images.growthjockey.com/livguard/home/hero.jpg" className="tw-row-[1/span_12] tw-col-start-1 tw-w-full tw-h-full lg-bg-secondary-500 tw-object-cover -tw-z-10" />

            <div className="tw-row-start-4 tw-col-start-1 lg-text-banner lg-px-screen-edge">{getVernacularString("homeS1T1", userPreferences.language)}</div>

            <div className="tw-row-start-6 tw-col-start-1 lg-text-title1 lg-px-screen-edge">{getVernacularString("homeS1T2", userPreferences.language)}</div>

            <div className="tw-row-[8] tw-col-start-1 lg-cta-button lg-px-screen-edge">{getVernacularString("homeS1T3", userPreferences.language)}</div>

            <ChevronDoubleDownIcon className="tw-row-[11] tw-col-start-1 tw-w-12 tw-h-12 lg-text-primary-500" />
        </div>
    );
}

function StickyBottomBar({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-sticky tw-bottom-0 lg-bg-secondary-300 tw-rounded-t-lg tw-grid tw-grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] tw-py-[0.8125rem] tw-text-center">
            <div className="tw-row-start-1 tw-col-start-2 tw-flex tw-flex-col tw-items-center tw-text-center">
                {/* <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-secondary-500" /> */}
                <FixedWidthImage relativePath="/livguard/bottom-bar/home-inverter.png" width="2rem" imageCdnProvider={ImageCdnProvider.Imgix} />
                <VerticalSpacer className="tw-h-1" />
                <div className="lg-text-icon">
                    Home
                    <br />
                    Inverters
                </div>
            </div>

            <div className="tw-row-start-1 tw-col-start-4 tw-flex tw-flex-col tw-items-center">
                <FixedWidthImage relativePath="/livguard/bottom-bar/other-products.png" width="2rem" imageCdnProvider={ImageCdnProvider.Imgix} />
                <VerticalSpacer className="tw-h-1" />
                <div className="lg-text-icon">
                    Other
                    <br />
                    Products
                </div>
            </div>

            {/* TODO: Figure out the top properly */}
            <div className="tw-row-start-1 tw-col-start-6 tw-h-[2.875rem] tw-relative tw-top-[-1.7rem] tw-flex tw-flex-col tw-items-center tw-overflow-visible">
                <img src="https://growthjockey.imgix.net/livguard/bottom-bar/load-calculator.gif" width={64} height={64} className="tw-rounded-full" />
                <VerticalSpacer className="tw-h-1" />
                <div className="lg-text-icon">
                    Plan My
                    <br />
                    Power
                </div>
            </div>

            <div className="tw-row-start-1 tw-col-start-8 tw-flex tw-flex-col tw-items-center">
                <FixedWidthImage relativePath="/livguard/bottom-bar/dealer-locator.png" width="2rem" imageCdnProvider={ImageCdnProvider.Imgix} />
                <VerticalSpacer className="tw-h-1" />
                <div className="lg-text-icon">
                    Find My
                    <br />
                    Dealer
                </div>
            </div>

            <div className="tw-row-start-1 tw-col-start-10 tw-flex tw-flex-col tw-items-center">
                <FixedWidthImage relativePath="/livguard/bottom-bar/contact-us.png" width="2rem" imageCdnProvider={ImageCdnProvider.Imgix} />
                <VerticalSpacer className="tw-h-1" />
                <div className="lg-text-icon">
                    Contact
                    <br />
                    Support
                </div>
            </div>
        </div>
    );
}

function Section1({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div>
            <div className="tw-flex tw-flex-col tw-items-center lg-text-headline">
                <div className="lg-text-highlighted">{getVernacularString("homeS2T1", userPreferences.language)}</div>
                <div>{getVernacularString("homeS2T2", userPreferences.language)}</div>
            </div>

            <VerticalSpacer className="tw-h-8" />

            <CarouselStyle1
                userPreferences={userPreferences}
                items={[
                    {
                        imageName: "img1",
                        titleTextContentPiece: "homeS2C1T1",
                        bodyTextContentPiece: "homeS2C1T2",
                    },
                    {
                        imageName: "img2",
                        titleTextContentPiece: "homeS2C2T1",
                        bodyTextContentPiece: "homeS2C2T2",
                    },
                ]}
            />
        </div>
    );
}

export function EnergySolutions({userPreferences}: {userPreferences: UserPreferences}) {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const tabContent = [
        {
            image: "",
            headingContent1: `${getVernacularString("homeS3Tab1HC1", userPreferences.language)}`,
            headingContent2: `${getVernacularString("homeS3Tab1HC2", userPreferences.language)}`,
            content: `${getVernacularString("homeS3Tab1C", userPreferences.language)}`,
            buttontext: `${getVernacularString("homeS3Tab1BT", userPreferences.language)}`,
        },
        {
            image: "",
            headingContent1: `${getVernacularString("homeS3Tab2HC1", userPreferences.language)}`,
            headingContent2: `${getVernacularString("homeS3Tab2HC2", userPreferences.language)}`,
            content: `${getVernacularString("homeS3Tab2C", userPreferences.language)}`,
            buttontext: `${getVernacularString("homeS3Tab2BT", userPreferences.language)}`,
        },
        {
            image: "",
            headingContent1: `${getVernacularString("homeS3Tab3HC1", userPreferences.language)}`,
            headingContent2: `${getVernacularString("homeS3Tab3HC2", userPreferences.language)}`,
            content: `${getVernacularString("homeS3Tab3C", userPreferences.language)}`,
            buttontext: `${getVernacularString("homeS3Tab3BT", userPreferences.language)}`,
        },
        {
            image: "",
            headingContent1: `${getVernacularString("homeS3Tab4HC1", userPreferences.language)}`,
            headingContent2: `${getVernacularString("homeS3Tab4HC2", userPreferences.language)}`,
            content: `${getVernacularString("homeS3Tab4C", userPreferences.language)}`,
            buttontext: `${getVernacularString("homeS3Tab4BT", userPreferences.language)}`,
        },
        {
            image: "",
            headingContent1: `${getVernacularString("homeS3Tab5HC1", userPreferences.language)}`,
            headingContent2: `${getVernacularString("homeS3Tab5HC2", userPreferences.language)}`,
            content: `${getVernacularString("homeS3Tab5C", userPreferences.language)}`,
            buttontext: `${getVernacularString("homeS3Tab5BT", userPreferences.language)}`,
        },
    ];

    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <VerticalSpacer className="tw-h-6" />

                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS3H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS3H1T2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-flex tw-justify-center tw-items-center">
                    <ItemBuilder
                        items={[
                            {
                                icon: "",
                                title: `${getVernacularString("homeS3Tab1H", userPreferences.language)}`,
                            },
                            {
                                icon: "",
                                title: `${getVernacularString("homeS3Tab2H", userPreferences.language)}`,
                            },
                            {
                                icon: "",
                                title: `${getVernacularString("homeS3Tab3H", userPreferences.language)}`,
                            },
                            {
                                icon: "",
                                title: `${getVernacularString("homeS3Tab4H", userPreferences.language)}`,
                            },
                            {
                                icon: "",
                                title: `${getVernacularString("homeS3Tab5H", userPreferences.language)}`,
                            },
                        ]}
                        itemBuilder={(tab, tabIndex) => (
                            <div className="group tw-flex- tw-flex-col hover:tw-cursor-pointer" key={tabIndex} onClick={(e) => setSelectedTabIndex(tabIndex)}>
                                <div
                                    className={concatenateNonNullStringsWithSpaces(
                                        "tw-w-12 tw-h-12 tw-rounded-full tw-m-auto group-hover:lg-bg-primary-500",
                                        `${tabIndex == selectedTabIndex ? "lg-bg-primary-500 tw-scale-110" : "lg-bg-secondary-100"}`,
                                    )}
                                ></div>
                                <VerticalSpacer className="tw-h-1" />
                                <div className="lg-text-icon tw-text-center tw-px-2">{tab.title}</div>
                            </div>
                        )}
                    />
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-flex tw-flex-col tw-justify-center tw-text-center tw-items-center">
                    <div className="tw-w-full tw-h-[200px] lg-bg-secondary-500 tw-rounded-lg"></div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="lg-text-body">{tabContent[selectedTabIndex].headingContent1}</div>

                    <VerticalSpacer className="tw-h-1" />

                    <div className="lg-text-title1">{tabContent[selectedTabIndex].headingContent2}</div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="lg-text-body tw-flex-1 tw-h-[unset]">{tabContent[selectedTabIndex].content}</div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="lg-cta-button">{tabContent[selectedTabIndex].buttontext}</div>
                </div>
            </div>
        </div>
    );
}

export function WeAreOneOfAKind({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col tw-bg-gradient-to-b tw-from-[#3A3A3A] tw-to-[#000000] tw-px-4 tw-py-6 tw-rounded-lg">
                <VerticalSpacer className="tw-h-4" />

                <div className="tw-flex tw-flex-col lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS4H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS4H1T2", userPreferences.language)}} />

                    {/* <div>{getVernacularString("homeS5H1T2", userPreferences.language)}</div> */}
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="lg-text-title2 tw-text-center">{getVernacularString("homeS4T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-6" />

                <div className="lg-text-body tw-text-center">{getVernacularString("homeS4T3", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-w-full tw-h-[300px] lg-bg-secondary-500"></div>
            </div>
        </div>
    );
}

export function PowerPlanner({userPreferences}: {userPreferences: UserPreferences}) {
    const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);

    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
                <div className="tw-flex tw-flex-col lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS5H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS5H1T2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-bodyText">{getVernacularString("homeS5T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-title2 lg-bg-secondary-500 tw-w-full tw-h-[150px] tw-rounded-lg"></div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-title2">{getVernacularString("homeS5T3", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-flex tw-flex-col tw-gap-4">
                    <ItemBuilder
                        items={[
                            {
                                icon: "",
                                stepIndex: getVernacularString("homeS5Step1T1", userPreferences.language),
                                stepContent: getVernacularString("homeS5Step1T2", userPreferences.language),
                            },
                            {
                                icon: "",
                                stepIndex: getVernacularString("homeS5Step2T1", userPreferences.language),
                                stepContent: getVernacularString("homeS5Step2T2", userPreferences.language),
                            },
                            {
                                icon: "",
                                stepIndex: getVernacularString("homeS5Step3T1", userPreferences.language),
                                stepContent: getVernacularString("homeS5Step3T2", userPreferences.language),
                            },
                        ]}
                        itemBuilder={(item, itemIndex) => (
                            <div className="lg-bg-secondary-100 tw-rounded-lg tw-p-2 tw-grid tw-grid-cols-[auto,minmax(0,1fr)] tw-grid-rows-[auto,auto] tw-gap-x-2" key={itemIndex}>
                                <div className="tw-row-start-1 tw-col-start-1 tw-row-span-2">
                                    <div className="lg-bg-secondary-300 tw-h-10 tw-w-10 tw-rounded-full"></div>
                                </div>
                                <div className="tw-row-start-1 tw-col-start-2">
                                    <div className="lg-text-title2 tw-text-left">{item.stepIndex}</div>
                                </div>
                                <div className="tw-row-start-2 tw-col-start-2">
                                    <div className="lg-text-body tw-text-left">{item.stepContent}</div>
                                </div>
                            </div>
                        )}
                    />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-title2 tw-text-center">{getVernacularString("homeS5T5P1", userPreferences.language)}</div>
                <div className="lg-text-body tw-text-center">{getVernacularString("homeS5T5P2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr),minmax(0,1fr)] tw-grid-roes-[auto,auto] tw-gap-2">
                    <ItemBuilder
                        items={[
                            {
                                icon: "",
                                content: "1 BHK",
                                value: "1_bhk",
                            },
                            {
                                icon: "",
                                content: "2 BHK",
                                value: "2_bhk",
                            },
                            {
                                icon: "",
                                content: "3 BHK",
                                value: "3_bhk",
                            },
                            {
                                icon: "",
                                content: "4 BHK",
                                value: "4_bhk",
                            },
                            {
                                icon: "",
                                content: "Villa",
                                value: "villa",
                            },
                            {
                                icon: "",
                                content: "Custom",
                                value: "custom",
                            },
                        ]}
                        itemBuilder={(item, itemIndex) => (
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-rounded-md tw-flex tw-gap-2 tw-py-3 tw-px-2 hover:tw-cursor-pointer",
                                    `tw-row-start-${itemIndex / 3 + 1} tw-col-start-${(itemIndex % 3) + 1}`,
                                    item.value == selectedPropertyType ? "lg-bg-primary-500" : "lg-bg-secondary-500",
                                )}
                                key={itemIndex}
                                onClick={() => setSelectedPropertyType(item.value)}
                            >
                                <div className="lg-bg-secondary-700 tw-rounded-full tw-w-6 tw-h-6"></div>
                                <div className="lg-text-bodyText">{item.content}</div>
                            </div>
                        )}
                    />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-cta-button">{getVernacularString("homeS5T6", userPreferences.language)}</div>
            </div>
        </div>
    );
}

export function TransformingLives({userPreferences}: {userPreferences: UserPreferences}) {
    const reviews = [
        {
            image: "",
            name: `${getVernacularString("review1Name", userPreferences.language)}`,
            rating: 5,
            state: `${getVernacularString("review1State", userPreferences.language)}`,
            message: `${getVernacularString("review1Message", userPreferences.language)}`,
            productImage: "",
            productName: `${getVernacularString("review1ProductName", userPreferences.language)}`,
        },
        {
            image: "",
            name: `${getVernacularString("review2Name", userPreferences.language)}`,
            rating: 5,
            state: `${getVernacularString("review2State", userPreferences.language)}`,
            message: `${getVernacularString("review2Message", userPreferences.language)}`,
            productImage: "",
            productName: `${getVernacularString("review2ProductN2me", userPreferences.language)}`,
        },
        {
            image: "",
            name: `${getVernacularString("review3Name", userPreferences.language)}`,
            rating: 5,
            state: `${getVernacularString("review3State", userPreferences.language)}`,
            message: `${getVernacularString("review3Message", userPreferences.language)}`,
            productImage: "",
            productName: `${getVernacularString("review3ProductName", userPreferences.language)}`,
        },
        {
            image: "",
            name: `${getVernacularString("review4Name", userPreferences.language)}`,
            rating: 5,
            state: `${getVernacularString("review4State", userPreferences.language)}`,
            message: `${getVernacularString("review4Message", userPreferences.language)}`,
            productImage: "",
            productName: `${getVernacularString("review4ProductName", userPreferences.language)}`,
        },
    ];

    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS11H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS11H1T2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="lg-px-screen-edge tw-rounded-lg lg-bg-secondary-100 tw-flex tw-flex-col">
                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-grid tw-grid-cols-[auto,minmax(1fr,0)] tw-grid-rows-[auto,auto,auto] tw-gap-4">
                        <div className="tw-col-start-1 tw-row-start-1 tw-row-span-3">
                            <div className="tw-w-20 tw-h-20 lg-bg-secondary-500 tw-rounded-full"></div>
                        </div>
                        <div className="tw-col-start-2 tw-row-start-1">
                            <div className="lg-text-banner">{reviews[0].name}</div>
                        </div>
                        <div className="tw-col-start-2 tw-row-start-2">
                            <div className="tw-w-10 tw-h-4 lg-bg-secondary-500 tw-rounded-full"></div>
                        </div>
                        <div className="tw-col-start-2 tw-row-start-3">
                            <div className="lg-text-body tw-text-bold">{reviews[0].name}</div>
                        </div>
                    </div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="lg-text-body tw-text-center">{reviews[0].message}</div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-border tw-px-6"></div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-justify-center tw-items-center">
                        <div className="tw-col-start-1">
                            <div className="tw-w-[120px] tw-h-[120px] lg-bg-secondary-500 tw-rounded-lg">
                                <div className=""></div>
                            </div>
                        </div>
                        <div className="tw-col-start-2">{reviews[0].productName}</div>
                    </div>

                    <VerticalSpacer className="tw-h-6" />
                </div>
            </div>
        </div>
    );
}

export function SolarSolutions({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col lg-bg-secondary-100 tw-rounded-lg tw-justify-center tw-text-center lg-px-screen-edge">
                <VerticalSpacer className="tw-h-6" />

                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS7H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS7H1T2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body">{getVernacularString("homeS7T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-title2">{getVernacularString("homeS7T3", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-bg-secondary-500 tw-w-full tw-h-[400px] tw-rounded-lg"></div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-cta-button">{getVernacularString("homeS7T4", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-6" />
            </div>
        </div>
    );
}

export function MeetOurLeadership({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS8H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS8H1T2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-8" />

                <div className="tw-relative tw-bg-gradient-to-l tw-from-[#F25F60] tw-to-[#EB2A2B] lg-px-screen-edge tw-rounded-lg">
                    <div className="tw-absolute tw-left-5 -tw-top-5">
                        <div className="tw-h-32 tw-w-32 lg-bg-secondary-500 tw-rounded-full"></div>
                    </div>

                    <div className="tw-flex tw-flex-col">
                        <VerticalSpacer className="tw-h-32" />

                        <div className="lg-text-headline">{getVernacularString("homeS8Slide1T1", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-1" />

                        <div className="lg-text-title2">{getVernacularString("homeS8Slide1T2", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-4" />

                        <div className="lg-text-body">{getVernacularString("homeS8Slide1T3", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-6" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function FAQs({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS9H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS9H1T2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body tw-text-center">
                    <div>{getVernacularString("homeS9T2P1", userPreferences.language)}</div>
                    <div>{getVernacularString("homeS9T2P2", userPreferences.language)}</div>
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-w-full tw-h-[200px] lg-bg-secondary-500 tw-rounded-lg" />

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body tw-text-center">
                    <div>{getVernacularString("homeS9T3P1", userPreferences.language)}</div>
                    <div>{getVernacularString("homeS9T3P2", userPreferences.language)}</div>
                </div>
            </div>
        </div>
    );
}

export function DealerLocator({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-relative lg-bg-secondary-100 tw-rounded-lg tw-h-[350px]">
                <div className="tw-flex tw-flex-col tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-justify-center tw-items-center">
                    <div className="lg-text-headline tw-text-center">
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS10H1T1", userPreferences.language)}} />
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS10H1T2", userPreferences.language)}} />
                    </div>

                    <VerticalSpacer className="tw-h-1" />

                    <div className="lg-text-title2">{getVernacularString("homeS10T2", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="lg-cta-button">{getVernacularString("homeS10T3", userPreferences.language)}</div>
                </div>
            </div>
        </div>
    );
}

export function ShowerSomeLoveOnSocialHandles({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col lg-bg-secondary-100 tw-rounded-lg tw-text-center lg-px-screen-edge">
                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-headline ">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS11H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS11H1T2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-w-full tw-h-[200px] lg-bg-secondary-500 tw-rounded-lg" />

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body">{getVernacularString("homeS11T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-flex tw-justify-evenly">
                    <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px]" />
                    <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px]" />
                    <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px]" />
                    <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px]" />
                    <Google className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px]" />
                    <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px]" />
                </div>

                <VerticalSpacer className="tw-h-4" />
            </div>
        </div>
    );
}

export function PowerfulPurposePowerfulImpact({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col lg-bg-secondary-100 tw-px-4 tw-py-5 tw-rounded-lg">
                <VerticalSpacer className="tw-h-6" />

                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS12H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS12H1T2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body">{getVernacularString("homeS12T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <ul className="tw-list-disc tw-ml-5">
                    <li>
                        <div className="lg-text-body">{getVernacularString("homeS12T3P1", userPreferences.language)}</div>
                    </li>
                    <li>
                        <div className="lg-text-body">{getVernacularString("homeS12T3P2", userPreferences.language)}</div>
                    </li>
                    <li>
                        <div className="lg-text-body">{getVernacularString("homeS12T3P3", userPreferences.language)}</div>
                    </li>
                    <li>
                        <div className="lg-text-body">{getVernacularString("homeS12T3P4", userPreferences.language)}</div>
                    </li>
                </ul>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-bg-secondary-500 tw-w-full tw-h-[200px] tw-rounded-lg"></div>
            </div>
        </div>
    );
}

export function dummy({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS11H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS11H1T2", userPreferences.language)}} />
                </div>
            </div>
        </div>
    );
}
