import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import {LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import {FetcherWithComponents, Link, useFetcher} from "@remix-run/react";
import {useEffect, useState} from "react";
import {useLoaderData} from "react-router";
import {toast} from "react-toastify";
import {Accordion} from "~/components/accordian";
import {CarouselStyle2} from "~/components/carouselStyle2";
import {ContactForm} from "~/components/contactUsForm";
import {ContactFormSuccess} from "~/components/contactUsFormSuccess";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FooterSocialLogosAndCopyright} from "~/components/footerComponent";
import {HeaderComponent} from "~/components/headerComponent";
import {StickyLandingPageBottomBar} from "~/components/landingPageBottomBar";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {EnergySolutions, TransformingLives} from "~/routes";
import {CampaignPageScaffold} from "~/routes/campaigns/campaignPageScaffold.component";
import {PowerPlannerTeaser} from "~/routes/load-calculator";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = data.userPreferences;
    if (userPreferences.language == Language.English) {
        return {
            title: "Take charge of your energy with livguard home inverters and inverter batteries",
            description: "Empowering India with Unlimited Energy through Livguard's wide range of energy storage solutions of inverters, inverter batteries and more.",
        };
    } else if (userPreferences.language == Language.Hindi) {
        return {
            title: "लिवगार्ड होम इनवर्टर और इनवर्टर बैटरी के साथ अपनी ऊर्जा का जिम्मेदारी लें",
            description: "लिवगार्ड के इनवर्टर, इनवर्टर बैटरी और अन्य ऊर्जा संग्रहण समाधानों की विस्तृत श्रृंखला के माध्यम से असीमित ऊर्जा से सशक्त बनें।",
        };
    }
};

// export const links: LinksFunction = () => {
//     return [{rel: "canonical", href: "https://www.livguard.com/campaigns/energy-storage-solution/"}];
// };

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
            >
                <LandingPage
                    userPreferences={userPreferences}
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
                            "name": "Energy Storage Solution",
                            "url": "https://www.livguard.com/campaigns/energy-storage-solution",
                            "logo": "",
                            "sameAs": ""
                        }
                    `
                }}
            />
        </>
    );
}

function LandingPage({userPreferences}: {userPreferences: UserPreferences}) {
    const fetcher = useFetcher();

    const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);

    useEffect(() => {
        if (fetcher.data == null) {
            return;
        }

        if (fetcher.data.error != null) {
            toast.error(fetcher.data.error);
            return;
        }

        setFormSubmittedSuccessfully(true);
    }, [fetcher.data]);

    const utmSearchParameters = useUtmSearchParameters();

    return (
        <div className="tw-grid tw-grid-rows-1 tw-grid-cols-1 lg:tw-grid-rows-1 lg:tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-gap-x-1 tw-align-stretch">
            <HeroSection
                userPreferences={userPreferences}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                fetcher={fetcher}
                utmParameters={utmSearchParameters}
                isContactUsSubmissionSuccess={formSubmittedSuccessfully}
            />

            <VerticalSpacer className="tw-row-start-2 tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <div
                className="tw-row-start-3 tw-col-start-1 lg:tw-hidden"
                id="contact-us-form-mobile"
            >
                {formSubmittedSuccessfully ? (
                    <ContactFormSuccess userPreferences={userPreferences} />
                ) : (
                    <ContactForm
                        userPreferences={userPreferences}
                        fetcher={fetcher}
                        utmParameters={utmSearchParameters}
                    />
                )}
            </div>

            <VerticalSpacer className="tw-row-start-4 tw-col-start-1 tw-h-10 lg:tw-hidden" />

            <EnergySolutions
                userPreferences={userPreferences}
                className="tw-row-start-5 tw-col-start-1 lg:tw-row-start-3 lg:tw-col-start-1 lg:tw-pl-[72px] xl:tw-pl-[120px]"
            />

            <VerticalSpacer className="tw-row-start-6 tw-col-start-1 tw-h-10 lg:tw-hidden lg:tw-h-20" />

            <QualityMeetsExpertise
                userPreferences={userPreferences}
                className="tw-row-start-7 tw-col-start-1 lg:tw-col-span-full lg:tw-row-start-3 lg:tw-col-start-2 lg:tw-pr-[72px] xl:tw-pr-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[8] tw-col-start-1 tw-h-10 lg:tw-row-start-4 lg:tw-col-span-full lg:tw-h-20" />

            <LimitlessEnergy
                userPreferences={userPreferences}
                className="tw-row-start-9 tw-col-start-1 lg:tw-col-span-full lg:tw-row-start-5 lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[10] tw-col-start-1 tw-h-10 lg:tw-row-start-[6] lg:tw-col-span-full lg:tw-h-20" />

            <PowerPlannerTeaser
                userPreferences={userPreferences}
                className="tw-row-start-[11] tw-col-start-1 lg:tw-col-span-full lg:tw-row-start-7 lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[12] tw-col-start-1 tw-h-10 lg:tw-row-start-[8] lg:tw-col-span-full lg:tw-h-20" />

            <TransformingLives
                userPreferences={userPreferences}
                className="tw-row-start-[13] tw-col-start-1 lg:tw-col-span-full lg:tw-row-start-[9] lg:tw-pl-[72px] xl:tw-pl-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[14] tw-col-start-1 tw-h-10 lg:tw-row-start-[10] lg:tw-col-span-full lg:tw-h-20" />

            <FaqSection
                userPreferences={userPreferences}
                className="tw-row-start-[15] tw-col-start-1 lg:tw-col-span-full lg:tw-row-start-[11] lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[16] tw-col-start-1 tw-h-10 lg:tw-row-start-[12] lg:tw-col-span-full lg:tw-h-20" />
        </div>
    );
}

function HeroSection({
    userPreferences,
    className,
    isContactUsSubmissionSuccess,
    fetcher,
    utmParameters,
}: {
    userPreferences: UserPreferences;
    className: string;
    isContactUsSubmissionSuccess: boolean;
    fetcher: FetcherWithComponents<any>;
    utmParameters: {
        [searchParameter: string]: string;
    };
}) {
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem)] lg:tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height))] tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center tw-text-center lg:tw-text-left tw-relative lg:tw-grid-cols-2",
                className,
            )}
        >
            <CoverImage
                relativePath="/livguard/hero-banners/lp-1-hero-mobile.jpg"
                className="tw-row-[1/span_12] tw-col-start-1 lg:tw-hidden -tw-z-10"
            />

            <CoverImage
                relativePath="/livguard/hero-banners/lp-1-hero-desktop.jpg"
                className="tw-row-[1/span_12] tw-col-start-1 lg:tw-col-span-full -tw-z-10"
            />

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1 lg:tw-place-self-start lg:tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("landingPage1S1T1", userPreferences.language)}}
                    className="lg-text-banner lg-px-screen-edge tw-text-white lg:tw-pl-[120px]"
                />
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1 lg:tw-place-self-start lg:tw-max-w-[620px] lg:tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("landingPage1S1T2", userPreferences.language)}}
                    className="lg-text-title1 lg-px-screen-edge tw-text-white lg:tw-pl-[120px]"
                />
            </DefaultTextAnimation>

            <DefaultElementAnimation className="tw-row-[8] tw-col-start-1 lg:tw-place-self-start lg:tw-pl-[120px] lg:tw-col-start-1 lg:tw-hidden">
                <Link
                    to="#contact-us-form-mobile"
                    className="lg-cta-button lg-px-screen-edge lg:tw-pl-[60px]"
                >
                    {getVernacularString("landingPage1S1T3", userPreferences.language)}
                </Link>
            </DefaultElementAnimation>

            <div className="tw-row-[11] tw-col-start-1 tw-col-span-full">
                <Link to="#contact-us-form-mobile" className="tw-block lg:tw-hidden">
                    <ChevronDoubleDownIcon className="tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
                </Link>

                <Link to="#energy-solutions" className="tw-hidden lg:tw-block">
                    <ChevronDoubleDownIcon className="tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
                </Link>
            </div>

            <div className="tw-hidden lg:tw-flex lg:tw-items-center lg:tw-justify-center lg:tw-col-start-2 lg:tw-row-start-1 lg:tw-row-span-full">
                <div className="lg:tw-w-[30rem]" id="contact-us-form-desktop">
                    {isContactUsSubmissionSuccess ? (
                        <ContactFormSuccess
                            userPreferences={userPreferences}
                        />
                    ) : (
                        <ContactForm
                            userPreferences={userPreferences}
                            fetcher={fetcher}
                            utmParameters={utmParameters}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export function LimitlessEnergy({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const sectionData = [
        {
            imageRelativePath: "/livguard/landingPages/1/section3/1.jpg",
            titleTextContentPiece: "landingPage1S3Slide1Title",
            bodyTextContentPiece: "landingPage1S3Slide1Body",
        },
        {
            imageRelativePath: "/livguard/landingPages/1/section3/2.jpg",
            titleTextContentPiece: "landingPage1S3Slide2Title",
            bodyTextContentPiece: "landingPage1S3Slide2Body",
        },
        {
            imageRelativePath: "/livguard/landingPages/1/section3/3.jpg",
            titleTextContentPiece: "landingPage1S3Slide3Title",
            bodyTextContentPiece: "landingPage1S3Slide3Body",
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-justify-center tw-text-center tw-py-6", className)} id="limitless-energy">
            <div className="tw-px-6 lg-text-headline">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage1S3HT1", userPreferences.language)}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage1S3HT2", userPreferences.language)}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="lg:tw-hidden">
                <CarouselStyle2
                    userPreferences={userPreferences}
                    items={sectionData}
                />
            </div>

            <div className="tw-hidden lg:tw-block">
                <div className="tw-grid tw-grid-cols-3 tw-gap-8">
                    <ItemBuilder
                        items={sectionData}
                        itemBuilder={(item, itemIndex) => (
                            <div
                                className="tw-w-full tw-h-full tw-grid tw-grid-rows-[1.5rem_auto_1fr_auto_0_auto_1fr_1.5rem] tw-grid-cols-[1.5rem_minmax(0,1fr)_1.5rem] tw-gap-2"
                                key={itemIndex}
                            >
                                <DefaultImageAnimation className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full">
                                    <FullWidthImage
                                        relativePath={item.imageRelativePath}
                                        className="tw-rounded-lg"
                                    />
                                </DefaultImageAnimation>

                                <DefaultTextAnimation className="tw-row-start-4 tw-col-start-2">
                                    <div className="lg-text-title1 tw-whitespace-pre-line tw-text-secondary-900-dark">{getVernacularString(item.titleTextContentPiece, userPreferences.language)}</div>
                                </DefaultTextAnimation>

                                <DefaultTextAnimation className="tw-row-start-6 tw-col-start-2">
                                    <div className="lg-text-body !tw-text-secondary-900-dark">{getVernacularString(item.bodyTextContentPiece, userPreferences.language)}</div>
                                </DefaultTextAnimation>
                            </div>
                        )}
                    />
                </div>
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-self-center tw-px-6">
                <Link to="/">
                    <div className="lg-cta-button">{getVernacularString("landingPage1S3BT", userPreferences.language)}</div>
                </Link>
            </div>
        </div>
    );
}

export function QualityMeetsExpertise({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPageS4HT1", userPreferences.language)}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPageS4HT2", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] [@media(min-width:1080px)]:tw-grid-rows-2 tw-gap-2 tw-text-center lg:tw-gap-8">
                    <div className="tw-col-start-1 tw-row-start-1 lg-bg-secondary-100 tw-rounded-lg tw-py-8 lg:tw-py-16">
                        <DefaultElementAnimation>
                            <div className="lg-text-banner">{getVernacularString("landingPageS4Box1T1", userPreferences.language)}</div>
                            <VerticalSpacer className="tw-h-2" />
                            <div className="lg-text-titile2">{getVernacularString("landingPageS4Box1T2", userPreferences.language)}</div>
                        </DefaultElementAnimation>
                    </div>
                    <div className="tw-col-start-2 tw-row-start-1 lg-bg-secondary-100 tw-rounded-lg tw-py-8 lg:tw-py-16">
                        <DefaultElementAnimation>
                            <div className="lg-text-banner">{getVernacularString("landingPageS4Box2T1", userPreferences.language)}</div>
                            <VerticalSpacer className="tw-h-2" />
                            <div className="lg-text-titile2">{getVernacularString("landingPageS4Box2T2", userPreferences.language)}</div>
                        </DefaultElementAnimation>
                    </div>
                    <div className="tw-col-start-1 tw-row-start-2 lg-bg-secondary-100 tw-rounded-lg tw-py-8 lg:tw-py-16">
                        <DefaultElementAnimation>
                            <div className="lg-text-banner">{getVernacularString("landingPageS4Box3T1", userPreferences.language)}</div>
                            <VerticalSpacer className="tw-h-2" />
                            <div className="lg-text-titile2">{getVernacularString("landingPageS4Box3T2", userPreferences.language)}</div>
                        </DefaultElementAnimation>
                    </div>
                    <div className="tw-col-start-2 tw-row-start-2 lg-bg-secondary-100 tw-rounded-lg tw-py-8 lg:tw-py-16">
                        <DefaultElementAnimation>
                            <div className="lg-text-banner">{getVernacularString("landingPageS4Box4T1", userPreferences.language)}</div>
                            <VerticalSpacer className="tw-h-2" />
                            <div className="lg-text-titile2">{getVernacularString("landingPageS4Box4T2", userPreferences.language)}</div>
                        </DefaultElementAnimation>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-grid tw-grid-rows-[auto,minmax(0,1fr),auto] lg:tw-grid-rows-[auto,(minmax(0,1fr)] lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] tw-gap-y-4">
                <div className="tw-row-start-1 lg:tw-row-start-1 lg:tw-col-start-1 tw-flex tw-flex-col">
                    <div className="lg-text-headline tw-text-center lg:tw-text-left">
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS9H1T1", userPreferences.language)}} />
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS9H1T2", userPreferences.language)}} />
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="lg-text-body tw-text-center lg:tw-text-left">
                        <div>{getVernacularString("homeS9T2P1", userPreferences.language)}</div>
                        <div>{getVernacularString("homeS9T2P2", userPreferences.language)}</div>
                    </div>
                </div>

                <div className="tw-row-start-2 lg:tw-row-start-1 lg:tw-col-start-2 lg:tw-row-span-full tw-flex tw-flex-col tw-gap-y-3">
                    <ItemBuilder
                        items={[
                            {
                                question: "landingPage1Q1Q",
                                answer: "landingPage1Q1A",
                            },
                            {
                                question: "landingPage1Q2Q",
                                answer: "landingPage1Q2A",
                            },
                            {
                                question: "landingPage1Q3Q",
                                answer: "landingPage1Q3A",
                            },
                            {
                                question: "landingPage1Q4Q",
                                answer: "landingPage1Q4A",
                            },
                            {
                                question: "landingPage1Q5Q",
                                answer: "landingPage1Q5A",
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
                                        <div dangerouslySetInnerHTML={{__html: getVernacularString(item.answer, userPreferences.language)}} />
                                    </div>
                                }
                                key={itemIndex}
                            />
                        )}
                    />
                </div>

                <div className="tw-row-start-3 lg:tw-row-start-2 lg:tw-col-start-1 lg-text-body tw-text-center lg:tw-text-left lg:tw-w-[25rem]">
                    <div>{getVernacularString("homeS9T3P1", userPreferences.language)}</div>
                    <div>
                        {getVernacularString("homeS9T3P2", userPreferences.language)}{" "}
                        <a
                            href="tel:18001025551"
                            className="tw-underline"
                        >
                            {getVernacularString("homeS9T3P3", userPreferences.language)}
                        </a>{" "}
                        {getVernacularString("homeS9T3P4", userPreferences.language)}
                    </div>
                </div>
            </div>
        </div>
    );
}
