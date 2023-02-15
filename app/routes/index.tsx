import {LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "react-router";
import {PageScaffold} from "~/components/pageScaffold";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {UserPreferences} from "~/typeDefinitions";

type LoaderData = {
    userPreferences: UserPreferences;
}

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookies(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
    };

    return loaderData;
}

export default function() {
    const {userPreferences} = useLoaderData() as LoaderData;

    return (
        <PageScaffold userPreferences={userPreferences}>
            <HomePage userPreferences={userPreferences} />
        </PageScaffold>
    );
}

function HomePage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-h-[calc(100vh-7rem)] lg-bg-secondary-500">test</div>
    );
}
