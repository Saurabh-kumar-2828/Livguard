import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {useState} from "react";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {CampaignPageScaffold} from "~/routes/campaigns/campaignPageScaffold.component";
import {HeroSection, OfferContactUsDialog, StepsToAvailCashback, TermsAndConditions} from "~/routes/offers/inverter-and-battery-jodi";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/offers/inverter-battery-combo-cashback",
            },
            {
                title: "Buy Inverter & Inverter Battery Combo from Livguard and get Cashback",
            },
            {
                name: "description",
                content: "Experience an uninterrupted summer with Livguard Inverter and Battery combo and get cashback of up to Rs. 1500 with some easy steps. Limited Period Offer!!",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/offers/inverter-battery-combo-cashback",
            },
            {
                property: "og:title",
                content: "Buy Inverter & Inverter Battery Combo from Livguard and get Cashback",
            },
            {
                property: "og:description",
                content: "Experience an uninterrupted summer with Livguard Inverter and Battery combo and get cashback of up to Rs. 1500 with some easy steps. Limited Period Offer!!",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Product",
            },
            {
                property: "og:image",
                content: "",
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/offers/inverter-battery-combo-cashback",
            },
            {
                title: "लिवगार्ड से इन्वर्टर और इन्वर्टर बैटरी कॉम्बो खरीदें और कैशबैक प्राप्त करें",
            },
            {
                name: "description",
                content: "लिवगार्ड इन्वर्टर और बैटरी कॉम्बो के साथ गर्मी के मौसम को परेशानी मुक्त बनाएँ और रुपये 1500 तक का कैशबैक प्राप्त करें कुछ आसान चरणों के साथ। सीमित अवधि का ऑफर!!",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/offers/inverter-battery-combo-cashback",
            },
            {
                property: "og:title",
                content: "लिवगार्ड से इन्वर्टर और इन्वर्टर बैटरी कॉम्बो खरीदें और कैशबैक प्राप्त करें",
            },
            {
                property: "og:description",
                content: "लिवगार्ड इन्वर्टर और बैटरी कॉम्बो के साथ गर्मी के मौसम को परेशानी मुक्त बनाएँ और रुपये 1500 तक का कैशबैक प्राप्त करें कुछ आसान चरणों के साथ। सीमित अवधि का ऑफर!!",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Product",
            },
            {
                property: "og:image",
                content: "",
            },
        ];
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    pageUrl: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, pageUrl} = useLoaderData() as LoaderData;

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
                pageUrl={pageUrl}
            >
                <LandingPage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                />
            </CampaignPageScaffold>

            {/* <StickyBottomBar userPreferences={userPreferences} /> */}
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
