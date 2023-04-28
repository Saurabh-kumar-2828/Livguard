import {CheckCircleIcon, ChevronDoubleDownIcon, XCircleIcon} from "@heroicons/react/20/solid";
import {LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import {FetcherWithComponents, Link, useFetcher} from "@remix-run/react";
import {useEffect, useState} from "react";
import {useLoaderData} from "react-router";
import {toast} from "react-toastify";
import {Accordion} from "~/components/accordian";
import {ContactForm} from "~/components/contactUsForm";
import {ContactFormSuccess} from "~/components/contactUsFormSuccess";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {JodiCarousel} from "~/components/jodiCarousel";
import {StickyLandingPageBottomBar} from "~/components/landingPageBottomBar";
import {OtpVerificationForm} from "~/components/otpVerificationForm";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {Uuid} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {EnergySolutions, TransformingLives} from "~/routes";
import {CampaignPageScaffold} from "~/routes/campaigns/campaignPageScaffold.component";
import {QualityMeetsExpertise} from "~/routes/campaigns/energy-storage-solution";
import {PowerPlannerTeaser} from "~/routes/load-calculator";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {FormType, Language, UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = data.userPreferences;
    if (userPreferences.language == Language.English) {
        return {
            title: "Buy best in class livgurd home inverters and batteries",
            description: "Power up your home with long-lasting Livguard smart inverters and inverter batteries. Explore our wide range of energy storage solutions",
        };
    } else if (userPreferences.language == Language.Hindi) {
        return {
            title: "श्रेणी में सर्वश्रेष्ठ लिवगर्ड होम इनवर्टर और बैटरी खरीदें",
            description: "लंबे समय तक चलने वाले लिवगार्ड स्मार्ट इनवर्टर और इनवर्टर बैटरी से अपने घर को ऊर्जा दें। ऊर्जा संग्रहण समाधानों की हमारी विस्तृत श्रृंखला का अन्वेषण करें",
        };
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/campaigns/inverter-and-battery/"}];
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
                            "name": "Inverter and Battery Jodi",
                            "url": "https://www.livguard.com/campaigns/inverter-and-battery-jodi/",
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
    const [inputData, setInputData] = useState<{name: string; phoneNumber: string; emailId: string}>({name: "", phoneNumber: "", emailId: ""});
    const [step, setStep] = useState(1);
    const leadId = generateUuid();

    useEffect(() => {
        if (fetcher.data == null) {
            return;
        }

        if (fetcher.data.error != null) {
            toast.error(fetcher.data.error);
            return;
        }

        if (fetcher.data.type == FormType.otpVerification) {
            setStep(2);
        }

        if (fetcher.data.type == FormType.contactUsSubmission) {
            setStep(3);
        }

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({event: "submit"});
    }, [fetcher.data]);

    const utmSearchParameters = useUtmSearchParameters();

    return (
        <div className="tw-grid tw-grid-rows-1 tw-grid-cols-1 lg:tw-grid-rows-1 lg:tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-gap-x-1 tw-align-stretch">
            <HeroSection
                userPreferences={userPreferences}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                fetcher={fetcher}
                utmParameters={utmSearchParameters}
                inputData={inputData}
                setInputData={setInputData}
                step={step}
                leadId={leadId}
            />

            <VerticalSpacer className="tw-row-start-2 tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <div
                className="tw-row-start-3 tw-col-start-1 lg:tw-hidden"
                id="contact-us-form-mobile"
            >
                {step == 2 ? (
                    <ContactForm
                        userPreferences={userPreferences}
                        fetcher={fetcher}
                        utmParameters={utmSearchParameters}
                        inputData={inputData}
                        setInputData={setInputData}
                        leadId={leadId}
                    />
                ) : step == 1 ? (
                    <OtpVerificationForm
                        userPreferences={userPreferences}
                        inputData={inputData}
                        fetcher={fetcher}
                        utmParameters={utmSearchParameters}
                        leadId={leadId}
                        formType={FormType.contactUsSubmission}
                    />
                ) : (
                    <ContactFormSuccess userPreferences={userPreferences} />
                )}
            </div>

            <VerticalSpacer className="tw-row-start-4 tw-col-start-1 tw-h-10 lg:tw-hidden" />

            <EnergySolutions
                userPreferences={userPreferences}
                className="tw-row-start-5 tw-col-start-1 lg:tw-row-start-3 lg:tw-col-start-1 lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-6 lg:tw-row-start-[4] lg:tw-col-span-full lg:tw-h-20 tw-h-10" />

            <div className="tw-grid tw-grid-rows-[auto,auto,auto] tw-grid-cols-1 lg:tw-grid-rows-1 lg:tw-grid-cols-[minmax(0,4fr),minmax(0,3fr)] tw-row-start-7 tw-col-start-1 lg:tw-row-start-5 lg:tw-col-span-full">
                <JodiSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-pl-[72px] xl:tw-pl-[120px]"
                />

                <VerticalSpacer className="tw-h-10 tw-row-start-2 lg:tw-hidden" />

                <WhyLivguardJodi
                    userPreferences={userPreferences}
                    className="tw-row-start-3 lg:tw-row-start-1 lg:tw-col-start-2 lg:tw-pr-[72px] xl:tw-pr-[120px]"
                />
            </div>

            <VerticalSpacer className="tw-row-start-[8] tw-h-10 lg:tw-row-start-[6] lg:tw-col-span-full lg:tw-h-20" />

            <PowerPlannerTeaser
                userPreferences={userPreferences}
                className="tw-row-start-9 tw-col-start-1 lg:tw-row-start-7 lg:tw-col-span-full lg:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[10] tw-col-start-1 tw-h-10 lg:tw-row-start-[8] lg:tw-col-span-full lg:tw-h-20" />

            <QualityMeetsExpertise
                userPreferences={userPreferences}
                className="tw-row-start-[11] tw-col-start-1 lg:tw-col-span-full lg:tw-row-start-3 lg:tw-col-start-2 lg:tw-pr-[72px] xl:tw-pr-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[12] tw-col-start-1 tw-h-10 lg:tw-row-start-[10] lg:tw-col-span-full lg:tw-h-20" />

            <ExploreStarProducts
                userPreferences={userPreferences}
                className="tw-row-start-[13] tw-col-start-1 lg:tw-row-start-[9] lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[14] tw-col-start-1 tw-h-10 lg:tw-row-start-[10] lg:tw-col-span-full lg:tw-h-20" />

            <TransformingLives
                userPreferences={userPreferences}
                className="tw-row-start-[15] tw-col-start-1 lg:tw-row-start-[11] lg:tw-col-span-full lg:tw-pl-[72px] xl:tw-pl-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[16] tw-col-start-1 tw-h-10 lg:tw-row-start-[12] lg:tw-col-span-full lg:tw-h-20" />

            <FaqSection
                userPreferences={userPreferences}
                className="tw-row-start-[17] tw-col-start-1 lg:tw-row-start-[13] lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[18] tw-col-start-1 tw-h-10 lg:tw-row-start-[14] lg:tw-col-span-full lg:tw-h-20" />
        </div>
    );
}

function HeroSection({
    userPreferences,
    className,
    fetcher,
    utmParameters,
    inputData,
    setInputData,
    step,
    leadId,
}: {
    userPreferences: UserPreferences;
    className: string;
    fetcher: FetcherWithComponents<any>;
    utmParameters: {
        [searchParameter: string]: string;
    };
    inputData: {name: string; phoneNumber: string; emailId: string};
    setInputData: React.Dispatch<React.SetStateAction<{name: string; phoneNumber: string; emailId: string}>>;
    step: number;
    leadId: Uuid;
}) {
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem)] lg:tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height))] tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center tw-text-center lg:tw-text-left tw-relative lg:tw-grid-cols-2",
                className,
            )}
        >
            <CoverImage
                relativePath="/livguard/landingPages/2/hero_image.jpg"
                className="tw-row-[1/span_12] tw-col-start-1 lg:tw-col-span-full -tw-z-10"
            />

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1 lg:tw-place-self-start lg:tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S1T1", userPreferences.language)}}
                    className="lg-text-banner lg-px-screen-edge tw-text-white lg:tw-pl-[120px]"
                />
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1 lg:tw-place-self-start lg:tw-max-w-[620px] lg:tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S1T2", userPreferences.language)}}
                    className="lg-text-title1 lg-px-screen-edge tw-text-white lg:tw-pl-[120px]"
                />
            </DefaultTextAnimation>

            <DefaultElementAnimation className="tw-row-[8] tw-col-start-1 lg:tw-place-self-start lg:tw-pl-[120px] lg:tw-col-start-1 lg:tw-hidden">
                <Link
                    to="#contact-us-form-mobile"
                    className="lg-cta-button lg-px-screen-edge lg:tw-pl-[60px]"
                >
                    {getVernacularString("landingPage2S1T3", userPreferences.language)}
                </Link>
            </DefaultElementAnimation>

            <div className="tw-row-[11] tw-col-start-1 tw-col-span-full">
                <Link
                    to="#contact-us-form-mobile"
                    className="tw-block lg:tw-hidden"
                >
                    <ChevronDoubleDownIcon className="tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
                </Link>

                <Link
                    to="#energy-solutions"
                    className="tw-hidden lg:tw-block"
                >
                    <ChevronDoubleDownIcon className="tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
                </Link>
            </div>

            <div className="tw-hidden lg:tw-flex lg:tw-items-center lg:tw-justify-center lg:tw-col-start-2 lg:tw-row-start-1 lg:tw-row-span-full">
                {step == 2 ? (
                    <ContactForm
                        userPreferences={userPreferences}
                        fetcher={fetcher}
                        utmParameters={utmParameters}
                        inputData={inputData}
                        setInputData={setInputData}
                        leadId={leadId}
                    />
                ) : step == 1 ? (
                    <OtpVerificationForm
                        userPreferences={userPreferences}
                        inputData={inputData}
                        fetcher={fetcher}
                        utmParameters={utmParameters}
                        leadId={leadId}
                        formType={FormType.contactUsSubmission}
                    />
                ) : (
                    <ContactFormSuccess userPreferences={userPreferences} />
                )}
            </div>
        </div>
    );
}

export function JodiSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const JodiData: Array<{
        title: string;
        description: string;
        keySpecifications: Array<{keySpecificationContent: string; keySpecificationIconRelativePath: string}>;
        jodiImageRelativePath: string;
    }> = [
        {
            title: `${getVernacularString("landingPage2S4J1Title", userPreferences.language)}`,
            description: `${getVernacularString("landingPage2S4J1Description", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J1Specification1Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J1Specification2Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/battery_capacity.png",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J1Specification3Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/inverter_capacity.png",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J1Specification4Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/technology.png",
                },
            ],
            jodiImageRelativePath: "/livguard/category/jodi/urban_jodi.png",
        },
        {
            title: `${getVernacularString("landingPage2S4J2Title", userPreferences.language)}`,
            description: `${getVernacularString("landingPage2S4J2Description", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J2Specification1Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J2Specification2Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/battery_capacity.png",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J2Specification3Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/inverter_capacity.png",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J2Specification4Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/technology.png",
                },
            ],
            jodiImageRelativePath: "/livguard/category/jodi/rural_jodi.png",
        },
        {
            title: `${getVernacularString("landingPage2S4J3Title", userPreferences.language)}`,
            description: `${getVernacularString("landingPage2S4J3Description", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J3Specification1Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J3Specification2Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/battery_capacity.png",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J3Specification3Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/inverter_capacity.png",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J3Specification4Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/technology.png",
                },
            ],
            jodiImageRelativePath: "/livguard/category/jodi/super_life_jodi.png",
        },
        {
            title: `${getVernacularString("landingPage2S4J4Title", userPreferences.language)}`,
            description: `${getVernacularString("landingPage2S4J4Description", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J4Specification1Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J4Specification2Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/battery_capacity.png",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J4Specification3Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/inverter_capacity.png",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J4Specification4Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/technology.png",
                },
            ],
            jodiImageRelativePath: "/livguard/category/jodi/urban_jodi.png",
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center", className)}>
            <div className="tw-block lg:tw-hidden">
                <div className="lg-text-headline lg-px-screen-edge">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S4HT1", userPreferences.language)}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S4HT2", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </div>

                <VerticalSpacer className="tw-h-6" />
            </div>

            <JodiCarousel
                userPreferences={userPreferences}
                items={JodiData}
            />
        </div>
    );
}

export function WhyLivguardJodi({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const sectionData = [
        {
            image: "/livguard/category/jodi/urban_jodi.png",
            title: `${getVernacularString("landingPage2S5LivH", userPreferences.language)}`,
            content1: `${getVernacularString("landingPage2S5T1", userPreferences.language)}`,
            content2: `${getVernacularString("landingPage2S5T2", userPreferences.language)}`,
            content3: `${getVernacularString("landingPage2S5T3", userPreferences.language)}`,
            content4: `${getVernacularString("landingPage2S5T4", userPreferences.language)}`,
            highlighted: true,
        },
        {
            image: "/livguard/landingPages/2/other_brands.png",
            title: `${getVernacularString("landingPage2S5OBH", userPreferences.language)}`,
            content1: `${getVernacularString("landingPage2S5T1", userPreferences.language)}`,
            content2: `${getVernacularString("landingPage2S5T2", userPreferences.language)}`,
            content3: `${getVernacularString("landingPage2S5T3", userPreferences.language)}`,
            content4: `${getVernacularString("landingPage2S5T4", userPreferences.language)}`,
            highlighted: false,
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-h-full", className)}>
            <div className="tw-flex tw-flex-col lg:tw-h-[89%]">
                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S5HT1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S5HT2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-10" />

                <div>
                    <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-gap-3 tw-flex-1">
                        <ItemBuilder
                            items={sectionData}
                            itemBuilder={(item, itemIndex) => (
                                <div className={`tw-col-start-${itemIndex + 1} lg-bg-secondary-100 tw-rounded-lg tw-p-3 lg:tw-px-6 tw-flex tw-flex-col tw-justify-center`}>
                                    <div className="tw-flex tw-items-center tw-justify-center">
                                        <FixedWidthImage
                                            relativePath={item.image}
                                            width="150px"
                                        />
                                    </div>

                                    <VerticalSpacer className="tw-h-4" />

                                    <div className="lg-text-title1 tw-text-left lg:tw-place-self-left">{item.title}</div>

                                    <VerticalSpacer className="tw-h-4" />

                                    <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                        <div className="tw-text-body">{item.content1}</div>
                                        <div className="tw-w-5">
                                            {item.highlighted ? (
                                                <CheckCircleIcon className="tw-h-5 tw-w-5 lg-text-primary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                            ) : (
                                                <XCircleIcon className="tw-h-5 tw-w-5 lg-text-secondary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="tw-border tw-border-secondary-700 tw-mb-2 tw-mt-1" />

                                    <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                        <div className="tw-text-body">{item.content2}</div>
                                        <div className="tw-w-5">
                                            {item.highlighted ? (
                                                <CheckCircleIcon className="tw-h-5 tw-w-5 lg-text-primary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                            ) : (
                                                <XCircleIcon className="tw-h-5 tw-w-5 lg-text-secondary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="tw-border tw-border-secondary-700 tw-mb-2 tw-mt-1" />

                                    <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                        <div className="tw-text-body">{item.content3}</div>
                                        <div className="tw-w-5">
                                            {item.highlighted ? (
                                                <CheckCircleIcon className="tw-h-5 tw-w-5 lg-text-primary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                            ) : (
                                                <XCircleIcon className="tw-h-5 tw-w-5 lg-text-secondary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="tw-border tw-border-secondary-700 tw-mb-2 tw-mt-1" />

                                    <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                        <div className="tw-text-body">{item.content4}</div>
                                        <div className="tw-w-5">
                                            {item.highlighted ? (
                                                <CheckCircleIcon className="tw-h-5 tw-w-5 lg-text-primary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                            ) : (
                                                <XCircleIcon className="tw-h-5 tw-w-5 lg-text-secondary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ExploreStarProducts({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const sectionData = [
        {
            title: "LG700E",
            image: "/livguard/inverter images/LG700E.png",
            bestSeller: true,
        },
        {
            title: "LGS1100i",
            image: "/livguard/inverter images/LGS1100i.png",
            bestSeller: false,
        },
        {
            title: "IT1550TT",
            image: "/livguard/battery images/IT 1550TT.png",
            bestSeller: false,
        },
        {
            title: "IT2060TT",
            image: "/livguard/battery images/IT 2060TT.png",
            bestSeller: true,
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S7HT1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S7HT2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] lg:tw-grid-rows-1 lg:tw-grid-cols-4 tw-gap-x-2 lg:tw-gap-x-4 tw-gap-y-10">
                    <ItemBuilder
                        items={sectionData}
                        itemBuilder={(product, productIndex) => (
                            <DefaultElementAnimation>
                                <div
                                    className={`tw-row-start-${productIndex / 2 + 1} tw-col-start-${(productIndex % 2) + 1} lg-bg-secondary-100 tw-rounded-lg`}
                                    key={productIndex}
                                >
                                    <div className="tw-flex tw-flex-col tw-justify-between tw-relative tw-px-3">
                                        {product.bestSeller && <div className="tw-absolute tw-right-0 tw-top-0 lg-text-icon tw-px-2 tw-rounded-tr-lg lg-bg-primary-500 tw-pt-[2px]"> Best Seller </div>}

                                        <VerticalSpacer className="tw-h-8" />

                                        <div className="tw-text-body tw-text-center">{product.title}</div>

                                        <VerticalSpacer className="tw-h-4" />

                                        <FullWidthImage
                                            relativePath={product.image}
                                        />

                                        <VerticalSpacer className="tw-h-4" />

                                        <div className="lg-cta-button tw-translate-y-4 tw-px-4 tw-text-center tw-items-center">
                                            <Link to={`/product/${product.title}`}>{getVernacularString("landingPage2S7CTABT", userPreferences.language)}</Link>
                                        </div>
                                    </div>
                                </div>
                            </DefaultElementAnimation>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-grid tw-grid-rows-[auto,minmax(0,1fr),auto] lg:tw-grid-rows-[auto,minmax(0,1fr)] lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] tw-gap-y-4">
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
                                question: "landingPage2Q1Q",
                                answer: "landingPage2Q1A",
                            },
                            {
                                question: "landingPage2Q2Q",
                                answer: "landingPage2Q2A",
                            },
                            {
                                question: "landingPage2Q3Q",
                                answer: "landingPage2Q3A",
                            },
                            {
                                question: "landingPage2Q4Q",
                                answer: "landingPage2Q4A",
                            },
                            {
                                question: "landingPage2Q5Q",
                                answer: "landingPage2Q5A",
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
