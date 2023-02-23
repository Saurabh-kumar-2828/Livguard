import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import {LoaderFunction} from "@remix-run/node";
import {Link, useFetcher} from "@remix-run/react";
import {useLoaderData} from "react-router";
import {Accordion} from "~/components/accordian";
import {CarouselStyle2} from "~/components/carouselStyle2";
import {ContactForm} from "~/components/contactUsForm";
import {ContactFormSuccess} from "~/components/contactUsFormSuccess";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FooterSocialLogosAndCopywrite} from "~/components/footerComponent";
import {HeaderComponent} from "~/components/headerComponent";
import {StickyLandingPageBottomBar} from "~/components/landingPageBottomBar";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {EnergySolutions, TransformingLives} from "~/routes";
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

    return (
        <>
            <HeaderComponent
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={false}
            />
            <LandingPage userPreferences={userPreferences} />
            <FooterSocialLogosAndCopywrite userPreferences={userPreferences} />
            <StickyLandingPageBottomBar userPreferences={userPreferences} />
        </>
    );
}

function LandingPage({userPreferences}: {userPreferences: UserPreferences}) {
    const fetcher = useFetcher();

    const isContactUsSubmissionSuccess = fetcher.data != null && fetcher.data.error == null;

    const utmSearchParameters = useUtmSearchParameters();
    console.log(utmSearchParameters);

    return (
        <>
            <HeroSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            {
                isContactUsSubmissionSuccess
                ? <ContactFormSuccess userPreferences={userPreferences} />
                : <ContactForm userPreferences={userPreferences} fetcher={fetcher} />
            }

            <VerticalSpacer className="tw-h-10" />

            <div className="tw-grid tw-grid-cols-1 tw-gap-y-10 [@media(min-width:1080px)]:tw-grid-cols-2 [@media(min-width:1080px)]:tw-gap-x-10">
                <EnergySolutions userPreferences={userPreferences} />

                <QualityMeetsExpertise userPreferences={userPreferences} />
            </div>

            <VerticalSpacer className="tw-h-10" />

            <LimitlessEnergy userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <PowerPlannerTeaser userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <TransformingLives userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <FaqSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />
        </>
    );
}

function HeroSection({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div
            className="tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem)] tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center tw-text-center">
            <CoverImage
                relativePath="/livguard/landingPages/1/hero_image.jpg"
                className="tw-row-[1/span_12] tw-col-start-1"
                imageCdnProvider={ImageCdnProvider.Imgix}
            />

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("landingPage1S1T1", userPreferences.language)}}
                    className="lg-text-banner lg-px-screen-edge tw-text-white"
                />
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("landingPage1S1T2", userPreferences.language)}}
                    className="lg-text-title1 lg-px-screen-edge tw-text-white"
                />
            </DefaultTextAnimation>

            <DefaultElementAnimation className="tw-row-[8] tw-col-start-1">
                <a
                    href="#contactUs"
                    className="lg-cta-button lg-px-screen-edge"
                >
                    {getVernacularString("landingPage1S1T3", userPreferences.language)}
                </a>
            </DefaultElementAnimation>

            <a
                href="#contactUs"
                className="tw-row-[11] tw-col-start-1"
            >
                <ChevronDoubleDownIcon className=" tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
            </a>


        </div>
    );
}

export function LimitlessEnergy({userPreferences}: {userPreferences: UserPreferences}) {
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
        <div className="tw-flex tw-flex-col tw-justify-center tw-text-center tw-py-6">
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
                                <DefaultImageAnimation className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full -tw-z-10">
                                    <FullWidthImage
                                        relativePath={item.imageRelativePath}
                                        className="tw-rounded-lg"
                                        imageCdnProvider={ImageCdnProvider.Imgix}
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

export function QualityMeetsExpertise({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
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

                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] [@media(min-width:1080px)]:tw-grid-rows-2 tw-gap-2 tw-text-center">
                    <div className="tw-col-start-1 tw-row-start-1 lg-bg-secondary-100 tw-rounded-lg tw-py-8">
                        <DefaultElementAnimation>
                            <div className="lg-text-banner">{getVernacularString("landingPageS4Box1T1", userPreferences.language)}</div>
                            <VerticalSpacer className="tw-h-2" />
                            <div className="lg-text-titile2">{getVernacularString("landingPageS4Box1T2", userPreferences.language)}</div>
                        </DefaultElementAnimation>
                    </div>
                    <div className="tw-col-start-2 tw-row-start-1 lg-bg-secondary-100 tw-rounded-lg tw-py-8">
                        <DefaultElementAnimation>
                            <div className="lg-text-banner">{getVernacularString("landingPageS4Box2T1", userPreferences.language)}</div>
                            <VerticalSpacer className="tw-h-2" />
                            <div className="lg-text-titile2">{getVernacularString("landingPageS4Box2T2", userPreferences.language)}</div>
                        </DefaultElementAnimation>
                    </div>
                    <div className="tw-col-start-1 tw-row-start-2 lg-bg-secondary-100 tw-rounded-lg tw-py-8">
                        <DefaultElementAnimation>
                            <div className="lg-text-banner">{getVernacularString("landingPageS4Box3T1", userPreferences.language)}</div>
                            <VerticalSpacer className="tw-h-2" />
                            <div className="lg-text-titile2">{getVernacularString("landingPageS4Box3T2", userPreferences.language)}</div>
                        </DefaultElementAnimation>
                    </div>
                    <div className="tw-col-start-2 tw-row-start-2 lg-bg-secondary-100 tw-rounded-lg tw-py-8">
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

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body tw-text-center">
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
