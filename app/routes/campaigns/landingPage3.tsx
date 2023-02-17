import {CheckCircleIcon, ChevronDoubleDownIcon, XCircleIcon} from "@heroicons/react/20/solid";
import {LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "react-router";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {DealerLocator, EnergySolutions, FAQs, PowerPlanner, TransformingLives} from "~/routes";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {HeaderComponent} from "~/components/headerComponent";
import {FooterSocialLogosAndCopywrite} from "~/components/footerComponent";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {ExploreStarProducts, JodiSection} from "~/routes/campaigns/landingPage2";
import {Form} from "@remix-run/react";

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

    console.log("url in page", redirectTo);

    return (
        <>
            <HeaderComponent userPreferences={userPreferences} redirectTo={redirectTo} />
            <LandingPage userPreferences={userPreferences} />
            <FooterSocialLogosAndCopywrite userPreferences={userPreferences} />
            {/* <StickyBottomBar userPreferences={userPreferences} /> */}
        </>
    );
}

function LandingPage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <>
            <HeroSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <DealerLocatorWithMap userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <DealerLocator userPreferences={userPreferences} showCTAButton={false} />

            <VerticalSpacer className="tw-h-10" />

            <PowerPlanner userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <ExploreStarProducts userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <TapIntoEfficiency userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <JodiSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <TransformingLives userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <FAQs userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />
        </>
    );
}

function HeroSection({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem-4.75rem)] tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center tw-text-center">
            <img src="https://images.growthjockey.com/livguard/home/hero.jpg" className="tw-row-[1/span_12] tw-col-start-1 tw-w-full tw-h-full lg-bg-secondary-500 tw-object-cover -tw-z-10" />

            <div className="tw-row-start-4 tw-col-start-1 lg-text-banner lg-px-screen-edge">{getVernacularString("landingPage3S1T1", userPreferences.language)}</div>

            <div className="tw-row-start-6 tw-col-start-1 lg-text-title1 lg-px-screen-edge">{getVernacularString("landingPage3S1T2", userPreferences.language)}</div>

            <div className="tw-row-[8] tw-col-start-1 lg-cta-button lg-px-screen-edge">{getVernacularString("landingPage3S1T3", userPreferences.language)}</div>

            <ChevronDoubleDownIcon className="tw-row-[11] tw-col-start-1 tw-w-12 tw-h-12 lg-text-primary-500" />
        </div>
    );
}

export function TapIntoEfficiency({userPreferences}: {userPreferences: UserPreferences}) {
    const sectionData = [
        {
            image: "",
            heading: `${getVernacularString("landingPage3S7Slide1Heading", userPreferences.language)}`,
            content: `${getVernacularString("landingPage3S7Slide1Ccontent", userPreferences.language)}`,
            buttontext: `${getVernacularString("landingPage3S7Slide1BT", userPreferences.language)}`,
        },
        {
            image: "",
            heading: `${getVernacularString("landingPage3S7Slide2Heading", userPreferences.language)}`,
            content: `${getVernacularString("landingPage3S7Slide2Ccontent", userPreferences.language)}`,
            buttontext: `${getVernacularString("landingPage3S7Slide2BT", userPreferences.language)}`,
        },
        {
            image: "",
            heading: `${getVernacularString("landingPage3S7Slide3Heading", userPreferences.language)}`,
            content: `${getVernacularString("landingPage3S7Slide4Ccontent", userPreferences.language)}`,
            buttontext: `${getVernacularString("landingPage3S7Slide3BT", userPreferences.language)}`,
        },
    ];

    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage3S7HT1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage3S7HT2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-rounded-lg lg-bg-secondary-500 tw-h-[250px] tw-w-full"></div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-title1 tw-center-center">{sectionData[0].heading}</div>

                <VerticalSpacer className="tw-h-3" />

                <div className="lg-text-body tw-text-center tw-px-6">{sectionData[0].content}</div>

                <VerticalSpacer className="tw-h-8 tw-flex-1" />

                <div className="lg-cta-button">{sectionData[0].buttontext}</div>
            </div>
        </div>
    );
}

export function DealerLocatorWithMap({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                <div className="lg-bg-secondary-500 tw-rounded-lg tw-h-[500px] tw-w-full"></div>

                <VerticalSpacer className="tw-h-6" />

                <Form className="tw-w-full tw-items-center tw-justify-center tw-flex tw-flex-col">
                    <input
                        type="text"
                        name="locationCode"
                        className="tw-w-full lg-text-title2 tw-rounded-3xl tw-text-center tw-py-2 lg-bg-secondary-500"
                        placeholder={`${getVernacularString("landingPage3S3T1", userPreferences.language)}`}
                    />

                    <VerticalSpacer className="tw-h-1" />

                    <div className="lg-text-title2 lg-text-secondary-700 tw-underline tw-text-center">{`${getVernacularString("landingPage3S3T2", userPreferences.language)}`}</div>

                    <VerticalSpacer className="tw-h-4" />

                    <button type="submit" className="lg-cta-button">{`${getVernacularString("landingPage3S3T3", userPreferences.language)}`}</button>
                </Form>
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

                <VerticalSpacer className="tw-h-6" />
            </div>
        </div>
    );
}
