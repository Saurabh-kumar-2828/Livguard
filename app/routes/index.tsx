import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import {LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "react-router";
import {PageScaffold} from "~/components/pageScaffold";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
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
        <PageScaffold userPreferences={userPreferences}>
            <HomePage userPreferences={userPreferences} />
        </PageScaffold>
    );
}

function HomePage({userPreferences}: {userPreferences: UserPreferences}) {
    return <HeroSection userPreferences={userPreferences} />;
}

function HeroSection({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-h-[calc(100vh-var(--lg-header-height)-10rem)] lg-bg-secondary-500 tw-grid tw-grid-rows-[minmax(0,1fr)_auto]">
            <div className="tw-row-start-1 tw-col-start-1 lg-px-screen-edge tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
                <div className="lg-text-banner">
                    {getVernacularString("homeS1T1", userPreferences.language)}
                </div>

                <VerticalSpacer className="tw-h-2" />

                <div className="lg-text-title1">
                    {getVernacularString("homeS1T2", userPreferences.language)}
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-cta-button">
                    {getVernacularString("homeS1T3", userPreferences.language)}
                </div>

                <VerticalSpacer className="tw-h-4" />
            </div>

            <div className="tw-row-start-1 tw-col-start-1 tw-flex tw-flex-col tw-justify-end tw-items-center">
                <ChevronDoubleDownIcon className="tw-w-12 tw-h-12 lg-text-primary-500" />
                <VerticalSpacer className="tw-h-6" />
            </div>


        </div>
    );
}
