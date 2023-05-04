import {LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {useState} from "react";
import {useResizeDetector} from "react-resize-detector";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {CampaignPageScaffold} from "~/routes/campaigns/campaignPageScaffold.component";
import {OfferContactUsDialog, StepsToAvailCashback, TermsAndConditions} from "~/routes/offers/inverter-and-battery-jodi";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest} from "~/utilities";

export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = data.userPreferences;
    if (userPreferences.language == Language.English) {
        return {
            title: "Buy Inverter & Inverter Battery Combo from Livguard and get Cashback",
            description: "Experience an uninterrupted summer with Livguard Inverter and Battery combo and get cashback of up to Rs. 1500 with some easy steps. Limited Period Offer!!",
        };
    } else if (userPreferences.language == Language.Hindi) {
        return {
            title: "लिवगार्ड से इन्वर्टर और इन्वर्टर बैटरी कॉम्बो खरीदें और कैशबैक प्राप्त करें",
            description: "लिवगार्ड इन्वर्टर और बैटरी कॉम्बो के साथ गर्मी के मौसम को परेशानी मुक्त बनाएँ और रुपये 1500 तक का कैशबैक प्राप्त करें कुछ आसान चरणों के साथ। सीमित अवधि का ऑफर!!",
        };
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/offers/inverter-battery-combo-cashback"}];
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
                showSearchOption={false}
            >
                <LandingPage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                />
            </CampaignPageScaffold>

            {/* <StickyBottomBar userPreferences={userPreferences} /> */}

            {/* <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `

                    `,
                }}
            /> */}
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
    const [isOfferContactUsDialogOpen, setIsOfferContactUsDialogOpen] = useState(true);

    return (
        <div className="tw-grid tw-grid-rows-1 tw-grid-cols-1 lg:tw-grid-rows-1 lg:tw-grid-cols-6 tw-gap-x-8 tw-align-stretch">
            <HeroSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
            />
            <VerticalSpacer className="tw-row-start-2 tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />
            <StepsToAvailCashback
                userPreferences={userPreferences}
                className="lg-px-screen-edge tw-row-start-3 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />
            <VerticalSpacer className="tw-row-start-4 tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />
            <TermsAndConditions
                userPreferences={userPreferences}
                className="lg-px-screen-edge tw-row-start-5 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <OfferContactUsDialog
                userPreferences={userPreferences}
                isOfferContactUsDialogOpen={isOfferContactUsDialogOpen}
                setIsOfferContactUsDialogOpen={setIsOfferContactUsDialogOpen}
                utmParameters={utmParameters}
            />
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

    return (
        // screen = 48px + 56px + ? + 32px + 56px + 32px + 90px
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-19.625rem-var(--lg-mobile-ui-height))] lg:tw-h-[calc(100vh-9rem)] tw-overflow-hidden tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_1rem_auto_1rem_minmax(0,1fr)_auto_3rem] tw-justify-items-center tw-text-secondary-900-dark",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={containerHeight > containerWidth ? "/livguard/home/1/1-mobile.jpg" : "/livguard/home/1/1-desktop.jpg"}
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={containerHeight > containerWidth ? "/livguard/home/1/1-mobile.jpg" : "/livguard/home/1/1-desktop.jpg"}
                />
            )}
        </div>
    );
}




