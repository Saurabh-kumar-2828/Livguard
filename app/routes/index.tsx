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
    return (
        <>
            <HeroSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-6" />

            <WeAreOneOfAKind />

            <VerticalSpacer className="tw-h-6" />

            <PowerPlanner />
        </>
    );
}

function HeroSection({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-h-[calc(100vh-var(--lg-header-height)-10rem)] lg-bg-secondary-500 tw-grid tw-grid-rows-[minmax(0,1fr)_auto]">
            <div className="tw-row-start-1 tw-col-start-1 lg-px-screen-edge tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
                <div className="lg-text-banner">{getVernacularString("homeS1T1", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="lg-text-title1">{getVernacularString("homeS1T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-cta-button">{getVernacularString("homeS1T3", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />
            </div>

            <div className="tw-row-start-1 tw-col-start-1 tw-flex tw-flex-col tw-justify-end tw-items-center">
                <ChevronDoubleDownIcon className="tw-w-12 tw-h-12 lg-text-primary-500" />
                <VerticalSpacer className="tw-h-6" />
            </div>
        </div>
    );
}

export function WeAreOneOfAKind() {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col tw-bg-gradient-to-b tw-from-[#3A3A3A] tw-to-[#000000] tw-px-4 tw-py-6 tw-rounded-lg">
                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-heading-style">
                    <span>We Are</span>
                    <span className="lg-heading-text-background-primary-500">One of A Kind</span>
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="lg-text-title2 tw-text-center">With Livguard, you are always in trusted hands</div>

                <VerticalSpacer className="tw-h-6" />

                <div className="lg-text-bodyText tw-text-center">
                    In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed
                    partners, & the best quality every time has made us the choice of people nationwide.
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-w-full tw-h-[300px] lg-bg-secondary-500"></div>
            </div>
        </div>
    );
}

export function PowerPlanner() {
    const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);

    return (
        <div className="tw-flex tw-flex-col lg-px-screen-edge">
            <div className="lg-text-heading-style">
                <>Take Charge of Your Energy </>
                <span>
                    With Our <span className="lg-heading-text-background-primary-500">Power Planner</span>
                </span>
            </div>

            <VerticalSpacer className="tw-h-6" />

            <div className="lg-text-bodyText tw-text-center">Get tailored power solutions, use our Power Planner to find the right inverter and inverter battery options for your home.</div>

            <VerticalSpacer className="tw-h-6" />

            <div className="lg-text-title2 tw-text-center lg-bg-secondary-500 tw-w-full tw-h-[150px]"></div>

            <VerticalSpacer className="tw-h-6" />

            <div className="lg-text-title2 tw-text-center">Maximize your Power Potential in 3 easy steps!</div>

            <VerticalSpacer className="tw-h-6" />

            <div className="tw-flex tw-flex-col tw-gap-4">
                <ItemBuilder
                    items={[
                        {
                            icon: "",
                            stepIndex: "Step 1 :",
                            stepContent: "Choose your property type",
                        },
                        {
                            icon: "",
                            stepIndex: "Step 2 :",
                            stepContent: "Add your preferred devices",
                        },
                        {
                            icon: "",
                            stepIndex: "Step 3 :",
                            stepContent: "Set your required backup hours and average load consumption",
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <div className="lg-bg-secondary-100 tw-rounded-lg tw-p-2 tw-grid tw-grid-cols-[auto,minmax(0,1fr)] tw-grid-rows-[auto,auto] tw-gap-x-2" key={itemIndex}>
                            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-2">
                                <div className="lg-bg-secondary-300 tw-h-10 tw-w-10 tw-rounded-full"></div>
                            </div>
                            <div className="tw-row-start-1 tw-col-start-2">
                                <div className="lg-text-title2">{item.stepIndex}</div>
                            </div>
                            <div className="tw-row-start-2 tw-col-start-2">
                                <div className="lg-text-title2">{item.stepContent}</div>
                            </div>
                        </div>
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-6" />

            <div className="lg-text-title2 tw-text-center">Let’s start your power planning</div>
            <div className="lg-text-bodyText tw-text-center">Choose your property type</div>

            <VerticalSpacer className="tw-h-6" />

            <div className="tw-grid tw-grid-cols-[auto,auto,auto] tw-grid-roes-[auto,auto] tw-gap-2">
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
        </div>
    );
}
