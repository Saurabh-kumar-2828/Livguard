import {CheckCircleIcon, ChevronDoubleDownIcon, XCircleIcon} from "@heroicons/react/20/solid";
import {LoaderFunction} from "@remix-run/node";
import {Link, useFetcher} from "@remix-run/react";
import {useLoaderData} from "react-router";
import {Accordion} from "~/components/accordian";
import {ContactForm} from "~/components/contactUsForm";
import {ContactFormSuccess} from "~/components/contactUsFormSuccess";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FooterSocialLogosAndCopywrite} from "~/components/footerComponent";
import {HeaderComponent} from "~/components/headerComponent";
import {JodiCarousel} from "~/components/jodiCarousel";
import {StickyLandingPageBottomBar} from "~/components/landingPageBottomBar";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {EnergySolutions, TransformingLives} from "~/routes";
import {QualityMeetsExpertise} from "~/routes/campaigns/landingPage1";
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

            {isContactUsSubmissionSuccess ? (
                <ContactFormSuccess userPreferences={userPreferences} />
            ) : (
                <ContactForm
                    userPreferences={userPreferences}
                    fetcher={fetcher}
                    utmParameters={utmSearchParameters}
                />
            )}

            <VerticalSpacer className="tw-h-10" />

            <EnergySolutions userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <JodiSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <WhyLivguardJodi userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <PowerPlannerTeaser userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <QualityMeetsExpertise userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <ExploreStarProducts userPreferences={userPreferences} />

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
                relativePath="/livguard/landingPages/2/hero_image.jpg"
                className="tw-row-[1/span_12] tw-col-start-1"
                imageCdnProvider={ImageCdnProvider.Imgix}
            />

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S1T1", userPreferences.language)}}
                    className="lg-text-banner lg-px-screen-edge tw-text-white"
                />
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S1T2", userPreferences.language)}}
                    className="lg-text-title1 lg-px-screen-edge tw-text-white"
                />
            </DefaultTextAnimation>

            <DefaultElementAnimation className="tw-row-[8] tw-col-start-1">
                <a
                    className="lg-cta-button lg-px-screen-edge"
                    href="#contactUs"
                >
                    {getVernacularString("landingPage2S1T3", userPreferences.language)}
                </a>
            </DefaultElementAnimation>

            <a
                href="#contactUs"
                className="tw-row-[11] tw-col-start-1"
            >
                <ChevronDoubleDownIcon className="tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
            </a>
        </div>
    );
}

export function JodiSection({userPreferences}: {userPreferences: UserPreferences}) {
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
        <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
            <div className="lg-text-headline lg-px-screen-edge">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S4HT1", userPreferences.language)}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S4HT2", userPreferences.language)}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-6" />

            <JodiCarousel
                userPreferences={userPreferences}
                items={JodiData}
            />
        </div>
    );
}

export function WhyLivguardJodi({userPreferences}: {userPreferences: UserPreferences}) {
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
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S5HT1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S5HT2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-10" />

                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-gap-3">
                    <ItemBuilder
                        items={sectionData}
                        itemBuilder={(item, itemIndex) => (
                            <div className={`tw-col-start-${itemIndex + 1} lg-bg-secondary-100 tw-rounded-lg tw-p-3 lg:tw-p-6`}>

                                <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-justify-between lg:tw-items-center">
                                    <FixedWidthImage
                                        relativePath={item.image}
                                        imageCdnProvider={ImageCdnProvider.Imgix}
                                        width="150px"
                                    />

                                    <VerticalSpacer className="tw-h-4" />

                                    <div className="lg-text-title1">{item.title}</div>

                                </div>

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
    );
}

export function ExploreStarProducts({userPreferences}: {userPreferences: UserPreferences}) {
    const sectionData = [
        {
            title: "LG1150i",
            image: "/livguard/inverter images/Livguard-LGS1100iPV_power-verter-Inverter-Front.png",
            bestSeller: true,
        },
        {
            title: "LGS1100i",
            image: "/livguard/inverter images/LGS1700PV-SW-L.png",
            bestSeller: false,
        },
        {
            title: "IT1550TT",
            image: "/livguard/battery images/IT 1248ST.png",
            bestSeller: false,
        },
        {
            title: "IT2060TT",
            image: "/livguard/battery images/IT 1584TT.png",
            bestSeller: true,
        },
    ];

    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S7HT1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S7HT2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] lg:tw-grid-rows-1 lg:tw-grid-cols-4 tw-gap-x-10 tw-gap-y-10 lg:tw-px-40">
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
                                            imageCdnProvider={ImageCdnProvider.Imgix}
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
