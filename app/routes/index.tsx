import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import {LoaderFunction} from "@remix-run/node";
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {useLoaderData} from "react-router";
import {Accordion} from "~/components/accordian";
import {StickyBottomBar} from "~/components/bottomBar";
import {CarouselStyle1} from "~/components/carouselStyle1";
import {CarouselStyle2} from "~/components/carouselStyle2";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {LeadersCarousel} from "~/components/leadersCarousel";
import {PageScaffold} from "~/components/pageScaffold";
import {TestimonialsCarousel} from "~/components/testimonialsCarousel";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useEmlbaCarouselWithIndex} from "~/hooks/useEmlbaCarouselWithIndex";
import {PowerPlannerTeaser} from "~/routes/load-calculator";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookies(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo} = useLoaderData() as LoaderData;

    // TODO: Scroll to top if required

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
            >
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

            <EnergyStorageSolutions userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <EnergySolutions userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <WeAreOneOfAKind userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <PowerPlannerTeaser userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <TransformingLives userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <SolarSolutions userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <MeetOurLeadership userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <FaqSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <DealerLocator
                userPreferences={userPreferences}
                showCTAButton={true}
            />

            <VerticalSpacer className="tw-h-10" />

            <ShowerSomeLoveOnSocialHandles userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <PowerfulPurposePowerfulImpact userPreferences={userPreferences} />
        </>
    );
}

function HeroSection({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        // screen = 48px + 56px + ? + 32px + 56px + 32px + 90px
        <div className="tw-h-[calc(100vh-19.625rem-var(--lg-mobile-ui-height))] tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center">
            <CoverImage
                relativePath="/livguard/home/1/1.jpg"
                className="tw-row-[1/span_12] tw-col-start-1"
                imageCdnProvider={ImageCdnProvider.GrowthJockey}
            />

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge">{getVernacularString("homeS1T1", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1">
                <div className="lg-text-title1 lg-px-screen-edge">{getVernacularString("homeS1T2", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <DefaultElementAnimation className="tw-row-[8] tw-col-start-1">
                <button
                    type="button"
                    className="lg-cta-button lg-px-screen-edge"
                >
                    {getVernacularString("homeS1T3", userPreferences.language)}
                </button>
            </DefaultElementAnimation>

            <ChevronDoubleDownIcon className="tw-row-[11] tw-col-start-1 tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
        </div>
    );
}

function EnergyStorageSolutions({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div>
            <div className="tw-flex tw-flex-col tw-items-center lg-text-headline">
                <DefaultTextAnimation>
                    <div className="lg-text-highlighted">{getVernacularString("homeS2T1", userPreferences.language)}</div>
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div>{getVernacularString("homeS2T2", userPreferences.language)}</div>
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-8" />

            <CarouselStyle1
                userPreferences={userPreferences}
                items={[
                    {
                        imageRelativePath: "/livguard/home/2/1.jpg",
                        titleTextContentPiece: "homeS2C1T1",
                        bodyTextContentPiece: "homeS2C1T2",
                    },
                    {
                        imageRelativePath: "/livguard/home/2/2.jpg",
                        titleTextContentPiece: "homeS2C2T1",
                        bodyTextContentPiece: "homeS2C2T2",
                    },
                ]}
            />
        </div>
    );
}

export function EnergySolutions({userPreferences}: {userPreferences: UserPreferences}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmlbaCarouselWithIndex({loop: true});

    return (
        <div className="tw-flex tw-flex-col">
            <div className="lg-px-screen-edge lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS3H1T1", userPreferences.language)}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS3H1T2", userPreferences.language)}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-6" />

            <div className="lg-px-screen-edge tw-grid tw-grid-cols-5 tw-gap-x-4">
                <ItemBuilder
                    items={[
                        {
                            icon: "/livguard/home/3/1-icon.png",
                            title: "homeS3Tab1H",
                        },
                        {
                            icon: "/livguard/home/3/2-icon.png",
                            title: "homeS3Tab2H",
                        },
                        {
                            icon: "/livguard/home/3/3-icon.png",
                            title: "homeS3Tab3H",
                        },
                        {
                            icon: "/livguard/home/3/4-icon.png",
                            title: "homeS3Tab4H",
                        },
                        {
                            icon: "/livguard/home/3/5-icon.png",
                            title: "homeS3Tab5H",
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <div
                            className="group tw-flex tw-flex-col tw-items-center hover:tw-cursor-pointer"
                            onClick={(e) => emblaApi?.scrollTo(itemIndex)}
                            key={itemIndex}
                        >
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-duration-200",
                                    `${itemIndex == selectedIndex ? "lg-bg-primary-500 tw-scale-110" : "lg-bg-secondary-300"}`,
                                )}
                            >
                                <FixedWidthImage
                                    relativePath={item.icon}
                                    width="1.5rem"
                                    className={`${itemIndex == selectedIndex ? "tw-scale-125" : "tw-opacity-50"}`}
                                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                />
                            </div>

                            <VerticalSpacer className="tw-h-2" />

                            <div className="lg-text-icon tw-text-center">{`${getVernacularString(item.title, userPreferences.language)}`}</div>
                        </div>
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-6" />

            <div
                className="tw-overflow-hidden"
                ref={emblaRef}
            >
                <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%]">
                    <ItemBuilder
                        items={[
                            {
                                image: "/livguard/home/3/1.jpg",
                                headingContent1: `${getVernacularString("homeS3Tab1HC1", userPreferences.language)}`,
                                headingContent2: `${getVernacularString("homeS3Tab1HC2", userPreferences.language)}`,
                                content: `${getVernacularString("homeS3Tab1C", userPreferences.language)}`,
                                buttontext: `${getVernacularString("homeS3Tab1BT", userPreferences.language)}`,
                            },
                            {
                                image: "/livguard/home/3/2.jpg",
                                headingContent1: `${getVernacularString("homeS3Tab2HC1", userPreferences.language)}`,
                                headingContent2: `${getVernacularString("homeS3Tab2HC2", userPreferences.language)}`,
                                content: `${getVernacularString("homeS3Tab2C", userPreferences.language)}`,
                                buttontext: `${getVernacularString("homeS3Tab2BT", userPreferences.language)}`,
                            },
                            {
                                image: "/livguard/home/3/3.jpg",
                                headingContent1: `${getVernacularString("homeS3Tab3HC1", userPreferences.language)}`,
                                headingContent2: `${getVernacularString("homeS3Tab3HC2", userPreferences.language)}`,
                                content: `${getVernacularString("homeS3Tab3C", userPreferences.language)}`,
                                buttontext: `${getVernacularString("homeS3Tab3BT", userPreferences.language)}`,
                            },
                            {
                                image: "/livguard/home/3/4.jpg",
                                headingContent1: `${getVernacularString("homeS3Tab4HC1", userPreferences.language)}`,
                                headingContent2: `${getVernacularString("homeS3Tab4HC2", userPreferences.language)}`,
                                content: `${getVernacularString("homeS3Tab4C", userPreferences.language)}`,
                                buttontext: `${getVernacularString("homeS3Tab4BT", userPreferences.language)}`,
                            },
                            {
                                image: "/livguard/home/3/5.jpg",
                                headingContent1: `${getVernacularString("homeS3Tab5HC1", userPreferences.language)}`,
                                headingContent2: `${getVernacularString("homeS3Tab5HC2", userPreferences.language)}`,
                                content: `${getVernacularString("homeS3Tab5C", userPreferences.language)}`,
                                buttontext: `${getVernacularString("homeS3Tab5BT", userPreferences.language)}`,
                            },
                        ]}
                        itemBuilder={(item, itemIndex) => (
                            <div
                                className="lg-px-screen-edge tw-flex tw-flex-col tw-justify-center tw-text-center tw-items-center"
                                key={itemIndex}
                            >
                                <DefaultImageAnimation>
                                    <FullWidthImage
                                        relativePath={item.image}
                                        imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                    />
                                </DefaultImageAnimation>

                                <VerticalSpacer className="tw-h-4" />

                                <DefaultTextAnimation>
                                    <div className="lg-text-body">{item.headingContent1}</div>
                                </DefaultTextAnimation>

                                <VerticalSpacer className="tw-h-1" />

                                <DefaultTextAnimation>
                                    <div className="lg-text-title1">{item.headingContent2}</div>
                                </DefaultTextAnimation>

                                <VerticalSpacer className="tw-h-4" />

                                <DefaultTextAnimation className="tw-flex-1">
                                    <div className="lg-text-body">{item.content}</div>
                                </DefaultTextAnimation>

                                <VerticalSpacer className="tw-h-4" />

                                <DefaultElementAnimation>
                                    <div className="lg-cta-button">{item.buttontext}</div>
                                </DefaultElementAnimation>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export function WeAreOneOfAKind({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col tw-bg-gradient-to-b tw-from-secondary-100-light tw-to-background-500-light dark:tw-from-secondary-100-dark dark:tw-to-background-500-dark tw-px-4 tw-pt-6 tw-rounded-lg">
                <VerticalSpacer className="tw-h-4" />

                <DefaultTextAnimation>
                    <div className="tw-flex tw-flex-col lg-text-headline tw-text-center">
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS4H1T1", userPreferences.language)}} />
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS4H1T2", userPreferences.language)}} />

                        {/* <div>{getVernacularString("homeS5H1T2", userPreferences.language)}</div> */}
                    </div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6" />

                <DefaultTextAnimation>
                    <div className="lg-text-title2 tw-text-center">{getVernacularString("homeS4T2", userPreferences.language)}</div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6" />

                <DefaultTextAnimation>
                    <div className="lg-text-body tw-text-center">{getVernacularString("homeS4T3", userPreferences.language)}</div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6" />

                <DefaultImageAnimation>
                    <FullWidthImage
                        relativePath="/livguard/home/4/1-mobile.jpg"
                        imageCdnProvider={ImageCdnProvider.GrowthJockey}
                    />
                </DefaultImageAnimation>
            </div>
        </div>
    );
}

export function TransformingLives({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div>
            <div className="lg-px-screen-edge lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS6H1T1", userPreferences.language)}} />
                <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS6H1T2", userPreferences.language)}} />
            </div>

            <VerticalSpacer className="tw-h-6" />

            <TestimonialsCarousel
                userPreferences={userPreferences}
                testimonials={[
                    {
                        image: "/livguard/home/6/1.jpg",
                        name: `${getVernacularString("review1Name", userPreferences.language)}`,
                        rating: 5,
                        state: `${getVernacularString("review1State", userPreferences.language)}`,
                        message: `${getVernacularString("review1Message", userPreferences.language)}`,
                        productImage: "",
                        productName: `${getVernacularString("review1ProductName", userPreferences.language)}`,
                    },
                    {
                        image: "/livguard/home/6/2.jpg",
                        name: `${getVernacularString("review2Name", userPreferences.language)}`,
                        rating: 5,
                        state: `${getVernacularString("review2State", userPreferences.language)}`,
                        message: `${getVernacularString("review2Message", userPreferences.language)}`,
                        productImage: "",
                        productName: `${getVernacularString("review2ProductN2me", userPreferences.language)}`,
                    },
                    {
                        image: "/livguard/home/6/3.jpg",
                        name: `${getVernacularString("review3Name", userPreferences.language)}`,
                        rating: 5,
                        state: `${getVernacularString("review3State", userPreferences.language)}`,
                        message: `${getVernacularString("review3Message", userPreferences.language)}`,
                        productImage: "",
                        productName: `${getVernacularString("review3ProductName", userPreferences.language)}`,
                    },
                    {
                        image: "/livguard/home/6/4.jpg",
                        name: `${getVernacularString("review4Name", userPreferences.language)}`,
                        rating: 5,
                        state: `${getVernacularString("review4State", userPreferences.language)}`,
                        message: `${getVernacularString("review4Message", userPreferences.language)}`,
                        productImage: "",
                        productName: `${getVernacularString("review4ProductName", userPreferences.language)}`,
                    },
                ]}
            />
        </div>
    );
}

export function SolarSolutions({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col lg-bg-secondary-100 tw-rounded-lg tw-justify-center tw-text-center tw-py-6">
                <div className="tw-px-6 lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS7H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS7H1T2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-px-6 lg-text-body">{getVernacularString("homeS7T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-px-6 lg-text-title2">{getVernacularString("homeS7T3", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <CarouselStyle2
                    userPreferences={userPreferences}
                    items={[
                        {
                            imageRelativePath: "/livguard/home/7/1.jpg",
                            titleTextContentPiece: "homeS7S1T1",
                            bodyTextContentPiece: "homeS7S1T2",
                        },
                        {
                            imageRelativePath: "/livguard/home/7/2.jpg",
                            titleTextContentPiece: "homeS7S2T1",
                            bodyTextContentPiece: "homeS7S2T2",
                        },
                        {
                            imageRelativePath: "/livguard/home/7/3.jpg",
                            titleTextContentPiece: "homeS7S3T1",
                            bodyTextContentPiece: "homeS7S3T2",
                        },
                    ]}
                />

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-self-center tw-px-6">
                    <div className="lg-cta-button">{getVernacularString("homeS7T4", userPreferences.language)}</div>
                </div>
            </div>
        </div>
    );
}

export function MeetOurLeadership({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-flex tw-flex-col">
            <div className="lg-px-screen-edge lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS8H1T1", userPreferences.language)}} />
                <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS8H1T2", userPreferences.language)}} />
            </div>

            <VerticalSpacer className="tw-h-8" />

            <LeadersCarousel
                userPreferences={userPreferences}
                leaders={[
                    {
                        image: "/livguard/home/8/1.jpg",
                        name: "homeS8Slide1T1",
                        designation: "homeS8Slide1T2",
                        bio: "homeS8Slide1T3",
                    },
                    {
                        image: "/livguard/home/8/2.jpg",
                        name: "homeS8Slide2T1",
                        designation: "homeS8Slide2T2",
                        bio: "homeS8Slide2T3",
                    },
                    {
                        image: "/livguard/home/8/3.jpg",
                        name: "homeS8Slide3T1",
                        designation: "homeS8Slide3T2",
                        bio: "homeS8Slide3T3",
                    },
                ]}
            />
        </div>
    );
}

export function FaqSection({userPreferences}: {userPreferences: UserPreferences}) {
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

                <div className="tw-flex tw-flex-col tw-gap-y-3">
                    <ItemBuilder
                        items={[
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
                        ]}
                        itemBuilder={(item, itemIndex) => (
                            <Accordion
                                title={getVernacularString(item.question, userPreferences.language)}
                                panelItem={
                                    <div
                                        className="lg-text-secondary-900"
                                        key={itemIndex}
                                    >
                                        <div className="lg-text-secondary-900">{getVernacularString(item.answer, userPreferences.language)}</div>
                                    </div>
                                }
                                key={itemIndex}
                            />
                        )}
                    />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body tw-text-center">
                    <div>{getVernacularString("homeS9T3P1", userPreferences.language)}</div>
                    <div>{getVernacularString("homeS9T3P2", userPreferences.language)}</div>
                </div>
            </div>
        </div>
    );
}

export function DealerLocator({userPreferences, showCTAButton}: {userPreferences: UserPreferences; showCTAButton: boolean}) {
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

                    {showCTAButton && (
                        <>
                            <VerticalSpacer className="tw-h-6" />

                            <div className="lg-cta-button">{getVernacularString("homeS10T3", userPreferences.language)}</div>
                        </>
                    )}
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
                    <a href="https://www.facebook.com/LivguardEnergy/">
                        <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a href="https://twitter.com/LivguardEnergy">
                        <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a href="https://www.instagram.com/livguardenergy/">
                        <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a href="https://www.linkedin.com/company/livguard-energy/">
                        <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a href="youtube.com/@LivguardEnergy">
                        <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
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
