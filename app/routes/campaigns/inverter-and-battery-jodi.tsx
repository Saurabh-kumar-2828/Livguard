import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import {LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import {Link} from "@remix-run/react";
import {useState} from "react";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FAQSection} from "~/components/faqs";
import {LandingPage3Carousel} from "~/components/landingPage3Carousel";
import {StickyLandingPageBottomBar} from "~/components/landingPageBottomBar";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {ContactUsCta, ContactUsDialog, TransformingLives} from "~/routes";
import {CampaignPageScaffold} from "~/routes/campaigns/campaignPageScaffold.component";
import {ExploreStarProducts, JodiSection} from "~/routes/campaigns/inverter-and-battery";
import {PowerPlannerTeaser} from "~/routes/load-calculator";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = data.userPreferences;
    if (userPreferences.language == Language.English) {
        return {
            title: "Buy livguard Smart & Strong Inverter and Battery Jodis",
            description: "Empower your home with Livguard smart inverter and battery jodis to compliment your home's energy needs.",
        };
    } else if (userPreferences.language == Language.Hindi) {
        return {
            title: "लिवगार्ड स्मार्ट और मजबूत इनवर्टर और बैटरी जोड़ी खरीदें",
            description: "अपने घर की ऊर्जा जरूरतों को पूरा करने के लिए लिवगार्ड स्मार्ट इनवर्टर और बैटरी जोड़ी के साथ अपने घर को सशक्त बनाएं।",
        };
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.Livguard.com/campaigns/inverter-and-battery-jodi/"}];
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
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

    const utmSearchParameters = useUtmSearchParameters();

    return (
        <>
            <CampaignPageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={false}
                utmParameters={utmSearchParameters}
                showContactCtaButton={false}
                showSearchOption={true}
            >
                <LandingPage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                />
            </CampaignPageScaffold>

            <StickyLandingPageBottomBar userPreferences={userPreferences} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `
                        {
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Inverter and Battery",
                            "url": "https://www.livguard.com/campaigns/inverter-and-battery/",
                            "logo": "",
                            "sameAs": ""
                        }
                    `
                }}
            />
        </>
    );
}

function LandingPage({
    userPreferences,
    utmParameters,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
}) {
    return (
        <div className="tw-grid tw-grid-rows-1 tw-grid-cols-1 lg:tw-grid-rows-1 lg:tw-grid-cols-[minmax(0,3fr),minmax(0,2fr)] tw-gap-x-1 tw-align-stretch">
            <HeroSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
            />

            <VerticalSpacer className="tw-row-start-2 tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <JodiSection
                userPreferences={userPreferences}
                className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-3 lg:tw-col-start-1 lg:tw-pl-[72px] xl:tw-pl-[120px]"
            />

            <VerticalSpacer className="tw-row-start-4 tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <DealerLocator
                userPreferences={userPreferences}
                showCtaButton={true}
                className="tw-row-start-5 tw-col-start-1 lg:tw-row-start-3 lg:tw-col-start-2 lg:tw-pr-[72px] xl:tw-pr-[120px] tw-h-full"
            />

            <VerticalSpacer className="tw-row-start-6 tw-col-start-1 lg:tw-row-start-[6] lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <PowerPlannerTeaser
                userPreferences={userPreferences}
                className="tw-row-start-7 tw-col-start-1 lg:tw-row-start-[5] lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[8] tw-col-start-1 lg:tw-row-start-[8] lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <ExploreStarProducts
                userPreferences={userPreferences}
                className="tw-row-start-9 tw-col-start-1 lg:tw-row-start-[7] lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[10] tw-col-start-1 lg:tw-row-start-[10] lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <TapIntoEfficiency
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                className="tw-row-start-11 tw-col-start-1 lg:tw-row-start-[9] lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[12] tw-col-start-1 lg:tw-row-start-[10] lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <TransformingLives
                userPreferences={userPreferences}
                className="tw-row-start-13 tw-col-start-1 lg:tw-row-start-[11] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-pl-[72px] xl:tw-pl-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[14] tw-col-start-1 lg:tw-row-start-[12] tw-h-10 lg:tw-h-20" />

            <FaqSection
                userPreferences={userPreferences}
                className="tw-row-start-15 tw-col-start-1 lg:tw-row-start-[13] lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-14 tw-col-start-1 lg:tw-row-start-[14] lg:tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />
        </div>
    );
}

function HeroSection({
    userPreferences,
    utmParameters,
    className,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className?: string;
}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();
    const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                className,
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem)] lg:tw-h-[calc(100vh-9rem)] tw-min-h-[calc(100vw*7/16)] tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center tw-text-center tw-isolate hover:tw-cursor-pointer",
            )}
            ref={ref}
            onClick={() => setIsContactUsDialogOpen(true)}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={
                        containerHeight > containerWidth || containerWidth < 640
                            ? userPreferences.language == Language.English
                                ? "/livguard/landingPages/3/top-banner-mobile-english.jpg"
                                : "/livguard/landingPages/3/top-banner-mobile-hindi.jpg"
                            : userPreferences.language == Language.English
                            ? "/livguard/landingPages/3/top-banner-desktop-english.jpg"
                            : "/livguard/landingPages/3/top-banner-desktop-hindi.jpg"
                    }
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={
                        containerHeight > containerWidth || containerWidth < 640
                            ? userPreferences.language == Language.English
                                ? "/livguard/landingPages/3/top-banner-mobile-english.jpg"
                                : "/livguard/landingPages/3/top-banner-mobile-hindi.jpg"
                            : userPreferences.language == Language.English
                            ? "/livguard/landingPages/3/top-banner-desktop-english.jpg"
                            : "/livguard/landingPages/3/top-banner-desktop-hindi.jpg"
                    }
                />
            )}

            {/* <CoverImage
                relativePath="/livguard/landingPages/3/hero_image.jpg"
                className="tw-row-[1/span_12] tw-col-start-1 -tw-z-10"
            /> */}

            {/* <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("landingPage3S1T1", userPreferences.language)}}
                    className="lg-text-banner lg-px-screen-edge tw-text-white"
                />
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("landingPage3S1T2", userPreferences.language)}}
                    className="lg-text-title1 lg-px-screen-edge tw-text-white"
                />
            </DefaultTextAnimation>

            <DefaultElementAnimation className="tw-row-[8] tw-col-start-1">
                <ContactUsCta
                    userPreferences={userPreferences}
                    textVernacId="landingPage3S1T3"
                    className="tw-z-10"
                    utmParameters={utmParameters}
                />
            </DefaultElementAnimation> */}

            {/* <ChevronDoubleDownIcon className="tw-row-[11] tw-col-start-1 tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" /> */}

            <ContactUsDialog
                userPreferences={userPreferences}
                isContactUsDialogOpen={isContactUsDialogOpen}
                setIsContactUsDialogOpen={setIsContactUsDialogOpen}
                utmParameters={utmParameters}
            />
        </div>
    );
}

export function TapIntoEfficiency({
    userPreferences,
    utmParameters,
    className,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className?: string;
}) {
    const sectionData = [
        {
            imageRelativePath: "/livguard/landingPages/3/1.jpg",
            titleTextContentPiece: "landingPage3S7Slide1Heading",
            bodyTextContentPiece: "landingPage3S7Slide1Content",
        },
        {
            imageRelativePath: "/livguard/landingPages/3/2.jpg",
            titleTextContentPiece: "landingPage3S7Slide2Heading",
            bodyTextContentPiece: "landingPage3S7Slide2Content",
        },
        {
            imageRelativePath: "/livguard/landingPages/3/3.jpg",
            titleTextContentPiece: "landingPage3S7Slide3Heading",
            bodyTextContentPiece: "landingPage3S7Slide3Content",
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-justify-center tw-items-center", className)}>
            <div className="lg-text-headline">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage3S7HT1", userPreferences.language)}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage3S7HT2", userPreferences.language)}} />4
                </DefaultTextAnimation>
            </div>
            <VerticalSpacer className="tw-h-6" />
            <div className="tw-block lg:tw-hidden tw-w-full">
                <LandingPage3Carousel
                    userPreferences={userPreferences}
                    items={sectionData}
                />
            </div>
            <div className="tw-hidden lg:tw-grid tw-grid-cols-3 tw-gap-4">
                <ItemBuilder
                    items={sectionData}
                    itemBuilder={(card, cardIndex) => (
                        <div
                            className={`tw-col-start-${cardIndex + 1} tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-text-center`}
                            key={cardIndex}
                        >
                            <div className="tw-row-start-2 lg:tw-col-start-1 tw-text-center lg:te-text-left lg:tw-h-full tw-flex-1 tw-flex tw-flex-col">
                                <DefaultTextAnimation>
                                    <div className="lg-text-title1">{getVernacularString(card.titleTextContentPiece, userPreferences.language)}</div>
                                </DefaultTextAnimation>

                                <div className="tw-h-2" />

                                <DefaultTextAnimation className="tw-flex-1">
                                    <div className="lg-text-body lg-text-secondary-700 tw-flex-1">{getVernacularString(card.bodyTextContentPiece, userPreferences.language)}</div>
                                </DefaultTextAnimation>
                            </div>
                            <VerticalSpacer className="tw-h-4 tw-flex-1" />
                            <div className="tw-row-start-1 lg:tw-col-start-2 lg:tw-row-start-1 tw-w-full">
                                <FullWidthImage
                                    relativePath={card.imageRelativePath}
                                    className="tw-rounded-lg tw-w-full"
                                />
                            </div>
                        </div>
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-8 tw-flex-1" />

            <ContactUsCta
                userPreferences={userPreferences}
                textVernacId="landingPage3S7BT"
                className="tw-z-10"
                utmParameters={utmParameters}
            />
        </div>
    );
}

export function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "landingPage3FAQQ1Q",
            answer: "landingPage3FAQQ1A",
        },
        {
            question: "landingPage3FAQQ2Q",
            answer: "landingPage3FAQQ2A",
        },
        {
            question: "landingPage3FAQQ3Q",
            answer: "landingPage3FAQQ3A",
        },
        {
            question: "landingPage3FAQQ4Q",
            answer: "landingPage3FAQQ4A",
        },
        {
            question: "landingPage3FAQQ5Q",
            answer: "landingPage3FAQQ5A",
        },
    ];

    return (
        <FAQSection
            faqs={faqs}
            userPreferences={userPreferences}
            className={className}
        />
    );
}

function DealerLocator({userPreferences, showCtaButton, className}: {userPreferences: UserPreferences; showCtaButton: boolean; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-block lg:tw-hidden lg:tw-w-full">
                <div className="tw-relative lg-bg-secondary-100 tw-rounded-lg tw-h-[350px] lg:tw-h-full tw-overflow-hidden">
                    <div className="tw-flex tw-flex-col tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-justify-center tw-items-center">
                        <div className="tw-absolute tw-inset-0">
                            <video
                                src="https://files.growthjockey.com/livguard/videos/home/10/1-dark.mp4"
                                className="tw-row-[1/span_12] tw-col-start-1 tw-w-full tw-h-full tw-object-cover tw-hidden dark:tw-block"
                                autoPlay={true}
                                muted={true}
                                loop={true}
                                controls={false}
                            />

                            <video
                                src="https://files.growthjockey.com/livguard/videos/home/10/1-light.mp4"
                                className="tw-row-[1/span_12] tw-col-start-1 tw-w-full tw-h-full tw-object-cover dark:tw-hidden tw-block"
                                autoPlay={true}
                                muted={true}
                                loop={true}
                                controls={false}
                            />
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
            <div className="tw-hidden lg:tw-block tw-w-full tw-h-full">
                <div className="tw-w full tw-h-full lg-bg-secondary-100 tw-py-20 tw-px-30 tw-rounded-lg">
                    <div className="tw-relative lg-bg-secondary-100 tw-rounded-lg tw-overflow-hidden tw-h-full tw-m-auto">
                        <div className="tw-flex tw-flex-col tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-justify-center tw-items-center">
                            <div className="tw-absolute tw-inset-0">
                                <video
                                    src="https://files.growthjockey.com/livguard/videos/home/10/1-dark.mp4"
                                    className="tw-row-[1/span_12] tw-col-start-1 tw-w-full tw-h-full tw-hidden dark:tw-block"
                                    autoPlay={true}
                                    muted={true}
                                    loop={true}
                                    controls={false}
                                />

                                <video
                                    src="https://files.growthjockey.com/livguard/videos/home/10/1-light.mp4"
                                    className="tw-row-[1/span_12] tw-col-start-1 tw-w-full tw-h-full dark:tw-hidden tw-block"
                                    autoPlay={true}
                                    muted={true}
                                    loop={true}
                                    controls={false}
                                />
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
            </div>
        </div>
    );
}
