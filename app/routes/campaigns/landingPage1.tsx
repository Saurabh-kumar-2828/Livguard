import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import {LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "react-router";
import {CarouselStyle2} from "~/components/carouselStyle2";
import {ContactForm} from "~/components/contactUs";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FooterSocialLogosAndCopywrite} from "~/components/footerComponent";
import {HeaderComponent} from "~/components/headerComponent";
import {StickyLandingPageBottomBar} from "~/components/landingPageBottomBar";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {EnergySolutions, FaqSection, TransformingLives} from "~/routes";
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
    return (
        <>
            <HeroSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <ContactForm userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <EnergySolutions userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <QualityMeetsExpertise userPreferences={userPreferences} />

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
        <div className="tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem)] tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center tw-text-center">
            <CoverImage
                relativePath="/livguard/landingPages/1/hero_image.jpg"
                className="tw-row-[1/span_12] tw-col-start-1"
                imageCdnProvider={ImageCdnProvider.GrowthJockey}
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
                <button
                    type="button"
                    className="lg-cta-button lg-px-screen-edge"
                >
                    {getVernacularString("landingPage1S1T3", userPreferences.language)}
                </button>
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

            <CarouselStyle2
                userPreferences={userPreferences}
                items={[
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
                ]}
            />

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-self-center tw-px-6">
                <div className="lg-cta-button">{getVernacularString("landingPage1S3BT", userPreferences.language)}</div>
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

                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] tw-gap-2 tw-text-center">
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
