import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import {LoaderFunction} from "@remix-run/node";
import {useState} from "react";
import {useLoaderData} from "react-router";
import {PageScaffold} from "~/components/pageScaffold";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {Facebook, Google, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {EnergySolutions, FAQs, PowerPlanner, TransformingLives} from "~/routes";
import {getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {HeaderComponent} from "~/components/headerComponent";
import {FooterSocialLogosAndCopywrite} from "~/components/footerComponent";

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

            <EnergySolutions userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <QualityMeetsExpertise userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <PowerPlanner userPreferences={userPreferences} />

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

            <div className="tw-row-start-4 tw-col-start-1 lg-text-banner lg-px-screen-edge">{getVernacularString("landingPage1S1T1", userPreferences.language)}</div>

            <div className="tw-row-start-6 tw-col-start-1 lg-text-title1 lg-px-screen-edge">{getVernacularString("landingPage1S1T2", userPreferences.language)}</div>

            <div className="tw-row-[8] tw-col-start-1 lg-cta-button lg-px-screen-edge">{getVernacularString("landingPage1S1T3", userPreferences.language)}</div>

            <ChevronDoubleDownIcon className="tw-row-[11] tw-col-start-1 tw-w-12 tw-h-12 lg-text-primary-500" />
        </div>
    );
}

function StickyBottomBar({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-sticky tw-bottom-0 lg-bg-secondary-300 tw-rounded-t-lg tw-grid tw-grid-cols-[2fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_2fr] tw-py-[0.8125rem]">
            <div className="tw-row-start-1 tw-col-start-2 tw-flex tw-flex-col tw-items-center tw-text-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-primary-500" />
                <div className="lg-text-icon">Something</div>
            </div>

            <div className="tw-row-start-1 tw-col-start-4 tw-flex tw-flex-col tw-items-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-primary-500" />
                <div className="lg-text-icon">Something</div>
            </div>

            <div className="tw-row-start-1 tw-col-start-6 tw-flex tw-flex-col tw-items-center">
                {/* <div className="tw-w-16 tw-h-16 tw-rounded-full lg-bg-primary-500" /> */}
                <div className="lg-text-icon">Something</div>
            </div>

            <div className="tw-row-start-1 tw-col-start-8 tw-flex tw-flex-col tw-items-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-primary-500" />
                <div className="lg-text-icon">Something</div>
            </div>

            <div className="tw-row-start-1 tw-col-start-10 tw-flex tw-flex-col tw-items-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-primary-500" />
                <div className="lg-text-icon">Something</div>
            </div>
        </div>
    );
}

export function QualityMeetsExpertise({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPageS3HT1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPageS3HT2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] tw-gap-2 tw-text-center">
                    <div className="tw-col-start-1 tw-row-start-1 lg-bg-secondary-100 tw-rounded-lg tw-py-8">
                        <div className="lg-text-banner">{getVernacularString("landingPageS3Box1T1", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-2" />
                        <div className="lg-text-titile2">{getVernacularString("landingPageS3Box1T2", userPreferences.language)}</div>
                    </div>
                    <div className="tw-col-start-2 tw-row-start-1 lg-bg-secondary-100 tw-rounded-lg tw-py-8">
                        <div className="lg-text-banner">{getVernacularString("landingPageS3Box2T1", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-2" />
                        <div className="lg-text-titile2">{getVernacularString("landingPageS3Box2T2", userPreferences.language)}</div>
                    </div>
                    <div className="tw-col-start-1 tw-row-start-2 lg-bg-secondary-100 tw-rounded-lg tw-py-8">
                        <div className="lg-text-banner">{getVernacularString("landingPageS3Box3T1", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-2" />
                        <div className="lg-text-titile2">{getVernacularString("landingPageS3Box3T2", userPreferences.language)}</div>
                    </div>
                    <div className="tw-col-start-2 tw-row-start-2 lg-bg-secondary-100 tw-rounded-lg tw-py-8">
                        <div className="lg-text-banner">{getVernacularString("landingPageS3Box4T1", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-2" />
                        <div className="lg-text-titile2">{getVernacularString("landingPageS3Box4T2", userPreferences.language)}</div>
                    </div>
                </div>
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
