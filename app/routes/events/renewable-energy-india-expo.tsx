import type {ActionFunction, LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {Form, Link, useActionData, useFetcher, useLoaderData} from "@remix-run/react";
import {useContext, useEffect, useRef, useState} from "react";
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {FacebookEmbed, InstagramEmbed, TwitterEmbed} from "react-social-media-embed";
import {toast} from "react-toastify";
import {verifyOtp} from "~/backend/authentication.server";
import {insertReachOutFormLeadsForRenewableEnergy} from "~/backend/dealer.server";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullHeightImage} from "~/components/images/fullHeightImage";
import {FullWidthImage} from "~/components/images/simpleFullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {CtaOutlineButtonLink} from "~/components/scratchpad";
import {TestimonialsCarousel} from "~/components/testimonialsCarousel";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider, ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {emailIdValidationPattern, indianPhoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Theme, type UserPreferences} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getImageMetadataLibraryFromBackend, getMetadataForImageServerSide} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    return [
        {
            tagName: "link",
            rel: "canonical",
            href: "https://www.livguard.com/events/renewable-energy-india-expo",
        },
        {
            title: "Catch Livguard at Renewable Energy India Expo 2023: Join Us for Substainable Energy Solutions",
        },
        {
            name: "description",
            content:
                "Discover sustainable energy solutions with Livguard at the Renewable Energy India Expo 2023. Explore our innovative offerings for a better and greener tomorrow. Join us at the expo!",
        },
        {
            property: "og:url",
            href: "https://www.livguard.com/events/renewable-energy-india-expo",
        },
        {
            property: "og:title",
            content: "Catch Livguard at Renewable Energy India Expo 2023: Join Us for Substainable Energy Solutions",
        },
        {
            property: "og:description",
            content:
                "Discover sustainable energy solutions with Livguard at the Renewable Energy India Expo 2023. Explore our innovative offerings for a better and greener tomorrow. Join us at the expo!",
        },
        {
            property: "og:site_name",
            content: "Livguard",
        },
        {
            property: "og:type",
            content: "Website",
        },
        {
            property: "og:image",
            content: loaderData.ogBanner,
        },
    ];
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    pageUrl: string;
    vernacularData: {
        [id: string]: string;
    };
    imageMetaDataLibrary: {
        [relativePath: string]: ImageMetadata | undefined;
    };
    ogBanner: string;
};

type ActionData = {
    error: string | null;
    isInvalidOtp?: boolean;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const vernacularData = getVernacularFromBackend("reiPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("reiPage");
    const ogBanner = getAbsolutePathForRelativePath(getMetadataForImageServerSide("/livguard-solar/renewable/1/desktop-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null);

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        vernacularData: vernacularData,
        imageMetaDataLibrary: imageMetaDataLibrary,
        ogBanner: ogBanner,
    };

    return loaderData;
};

export const action: ActionFunction = async ({request}) => {
    const body = await request.formData();
    const formData = safeParse(getStringFromUnknown, body.get("formData"));

    if (formData == null) {
        const actionData: ActionData = {
            error: "Inputs cannot be null! Error code: e6873d6d-a8b4-4be8-b5d4-44e1f6b1aaef",
        };
        return json(actionData);
    }

    const parsedFormData = JSON.parse(formData);

    const name = safeParse(getStringFromUnknown, parsedFormData.name);
    const phoneNumber = safeParse(getStringFromUnknown, parsedFormData.phoneNumber);
    const email = safeParse(getStringFromUnknown, parsedFormData.emailId);
    const organisation = safeParse(getStringFromUnknown, parsedFormData.organisation);
    const otp = safeParse(getStringFromUnknown, parsedFormData.otp);
    const isServiceRequestFormTermsAndConditionsChecked = safeParse(getStringFromUnknown, parsedFormData.isServiceRequestFormTermsAndConditionsChecked);
    const utmParameters = JSON.stringify(parsedFormData.utmParameters);

    if (
        name == null ||
        phoneNumber == null ||
        phoneNumber.match(indianPhoneNumberValidationPattern) == null ||
        email == null ||
        email.match(emailIdValidationPattern) == null ||
        organisation == null ||
        isServiceRequestFormTermsAndConditionsChecked == null ||
        otp == null ||
        utmParameters == null
    ) {
        const actionData: ActionData = {
            error: "Inputs cannot be null! Error code: d8719837-6cd0-43c9-a30e-856155af64a5",
        };
        return json(actionData);
    }

    const otpVerificationResult = await verifyOtp(phoneNumber, otp);

    if (!otpVerificationResult.success) {
        const actionData: ActionData = {
            error: "Please enter valid otp! Error code: 86f2ac2d-7c12-407e-9308-5c4d43a2b3bb",
            isInvalidOtp: true,
        };
        return json(actionData);
    }

    const insertResult = await insertReachOutFormLeadsForRenewableEnergy(generateUuid(), {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        organisation: organisation,
        isServiceRequestFormTermsAndConditionsChecked: isServiceRequestFormTermsAndConditionsChecked,
        utmParameters: utmParameters,
    });
    if (insertResult instanceof Error) {
        const actionData: ActionData = {
            error: "Error in submitting form! Error code: 21dc0971-98ad-408c-bc1a-5132aa2835b8",
        };
        return json(actionData);
    }

    const actionData: ActionData = {
        error: null,
    };
    return json(actionData);
};

export default () => {
    const {userPreferences, redirectTo, pageUrl, vernacularData, imageMetaDataLibrary} = useLoaderData() as LoaderData;
    const actionData = useActionData();

    const utmSearchParameters = useUtmSearchParameters();
    return (
        <>
            <ImageProviderContext.Provider value={imageMetaDataLibrary}>
                <ContentProviderContext.Provider
                    value={{
                        getContent: getContentGenerator(vernacularData),
                    }}
                >
                    <div>
                        <PageScaffold
                            userPreferences={userPreferences}
                            redirectTo={redirectTo}
                            showMobileMenuIcon={true}
                            utmParameters={utmSearchParameters}
                            pageUrl={pageUrl}
                            breadcrumbs={[
                                {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                                {contentId: "377e65a0-631b-4188-b63a-7ae3661bbe85", link: "#"},
                            ]}
                        >
                            <RenewableEnergyPage
                                userPreferences={userPreferences}
                                actionData={actionData}
                                utmSearchParameters={utmSearchParameters}
                            />
                        </PageScaffold>
                    </div>
                </ContentProviderContext.Provider>
            </ImageProviderContext.Provider>
        </>
    );
};

function RenewableEnergyPage({
    userPreferences,
    actionData,
    utmSearchParameters,
}: {
    userPreferences: UserPreferences;
    actionData: ActionData;
    utmSearchParameters: {
        [searchParameter: string]: string;
    };
}) {
    return (
        <div className="tw-grid tw-gap-8 lg:tw-gap-10 tw-grid-cols-1 tw-mb-10 lg:tw-mb-20">
            <HeroSection userPreferences={userPreferences} />

            <div className="tw-grid tw-gap-10 lg:tw-gap-20 tw-grid-cols-1">
                <Usps userPreferences={userPreferences} />

                <AboutLivguardSolar userPreferences={userPreferences} />

                <SuccessStories userPreferences={userPreferences} />

                <ExpoHighlights userPreferences={userPreferences} />

                <SocialMediaFeeds userPreferences={userPreferences} />

                <GallerySection userPreferences={userPreferences} />

                {/* <ProductsAndServices userPreferences={userPreferences} /> */}

                <CustomerReviews userPreferences={userPreferences} />

                <ReachOutForAnyQuery
                    userPreferences={userPreferences}
                    actionData={actionData}
                    utmSearchParameters={utmSearchParameters}
                />
            </div>
        </div>
    );
}

function HeroSection({userPreferences}: {userPreferences: UserPreferences}) {
    const contentData = useContext(ContentProviderContext);
    const isScreenSizeBelow = useIsScreenSizeBelow(640);

    return (
        <div className="tw-grid tw-gap-6 tw-grid-rows-[minmax(0,1fr)_auto] sm:tw-grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] 2xl:tw-grid-rows-[minmax(0,1fr)_5rem_auto_minmax(0,1fr)]">
            <div className="tw-row-start-1 tw-col-start-1 sm:tw-row-span-full">
                <FullWidthImage relativePath={isScreenSizeBelow ? "/livguard-solar/renewable/1/mobile-banner.png" : "/livguard-solar/renewable/1/desktop-banner.jpg"} />
            </div>
            {/* <div className="md:tw-row-start-1 md:tw-col-start-1 tw-row-start-2 tw-grid tw-grid-flow-col tw-justify-start tw-gap-4 md:tw-gap-4 lg:tw-gap-6 tw-items-center md:tw-relative tw-top-[2.5rem] lg:tw-top-[3rem] lg:tw-left-[4.5%] md:tw-left-[1%] tw-overflow-hidden"> */}
            {/* <CtaButtonLink
                    to="#reachoutForm"
                    textVernacId="d0a88af5-fba8-43cd-bda5-813e7363db53"
                    userPreferences={userPreferences}
                    linkClassName=" md:max-lg:tw-text-[12px] md:max-lg:tw-py-1 md:max-lg:tw-px-3"
                /> */}
            <div className="lg-px-screen-edge-2 tw-items-center tw-grid tw-grid-flow-col tw-gap-4 lg:tw-gap-6 tw-row-start-2  2xl:tw-row-start-3 sm:tw-col-start-1 sm:tw-justify-start sm:tw-place-self-start tw-place-self-center sm:tw-relative xl:tw-p-[60px] max-xl:tw-top-[90%]  tw-w-fit [@media(min-width:2100px)]:tw-left-[3%] [@media(min-width:1280px)]:tw-top-[30%] [@media(min-width:1535px)]:tw-top-[15%]">
                <Link
                    to="#reachoutForm"
                    className="lg-cta-button tw-grid tw-place-items-center !tw-px-4"
                >
                    {contentData.getContent("4bcb03e4-9c03-4cf1-8fd3-605340796364")}
                </Link>
                <CtaOutlineButtonLink
                    to="https://www.livguard.com/static-assets/floor-plan.pdf"
                    target={true}
                    textVernacId="578a2977-c953-42a1-9866-4a9cc7d79202"
                    userPreferences={userPreferences}
                    linkClassName="max-md:tw-w-full tw-px-4 tw-grid tw-place-items-center"
                    buttonClassName="lg:tw-text-secondary-900-light"
                />
            </div>
        </div>
    );
}

function Usps({userPreferences}: {userPreferences: UserPreferences}) {
    const contentData = useContext(ContentProviderContext);
    const tabContent = [
        {
            imgId: "/livguard-solar/home/why-us/solar-solution.svg",
            text: "8fd0b5be-f173-41dd-b9d3-3deddb5c11ba",
        },
        {
            imgId: "/livguard-solar/home/why-us/solar-panel.svg",
            text: "25fd206a-06bb-4672-a35f-1399865203d4",
        },
        {
            imgId: "/livguard-solar/home/why-us/solar-monitor.svg",
            text: "d791b39f-14fd-4c40-8433-ec925424664f",
        },
        {
            imgId: "/livguard-solar/home/why-us/service-support.svg",
            text: "e37bfec4-dc83-429c-9a67-7071555b9e59",
        },
    ];
    return (
        <div className="tw-grid tw-gap-6 lg:tw-gap-8 lg-px-screen-edge-2 tw-w-full tw-max-w-7xl tw-mx-auto tw-mb-5 md:tw-mb-0">
            <div
                className="lg-text-headline tw-text-center"
                dangerouslySetInnerHTML={{__html: contentData.getContent("ca0ebdba-61a5-4385-9013-2b8b234dc798")}}
            />
            <div className="tw-grid tw-gap-6 lg:tw-gap-16 tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
                <ItemBuilder
                    items={tabContent}
                    itemBuilder={(item, itemIndex) => {
                        return (
                            <div
                                key={itemIndex}
                                className="tw-justify-center"
                            >
                                <div className="tw-h-[5.5rem] tw-justify-self-center tw-overflow-hidden tw-mx-auto tw-w-fit">
                                    <FullHeightImage relativePath={item.imgId} />
                                </div>
                                <VerticalSpacer className="tw-h-2" />
                                <div className="lg-text-body-bold tw-text-center lg-text-secondary-900">{contentData.getContent(item.text)}</div>
                            </div>
                        );
                    }}
                />
            </div>
        </div>
    );
}

function SuccessStories({userPreferences}: {userPreferences: UserPreferences}) {
    const contentData = useContext(ContentProviderContext);
    const tabContent = ["1059a000-dbab-47e4-b0cd-93544b69bb2e", "b62c72cb-60bb-4b9f-b595-f3676d094c51"];
    const [selectedTab, setSelectedTab] = useState(0);
    const data = [
        {
            imgIdFirst: "/livguard-solar/home/delivery/solar-panel-residential-first.png",
            descriptionTextFirst: "63860595-70df-4712-9a6c-e6e33d10a914",
            locationTextFirst: "a3d089fc-43a3-43ff-a3c2-707b0f2fcaf9",
            imgIdSecond: "/livguard-solar/home/delivery/solar-panel-residential-second.png",
            descriptionTextSecond: "06ebf062-5f30-493d-b9d1-66a76e1f01a3",
            locationTextSecond: "b9e3baef-45fa-4393-96da-3f9601c9294e",
            imgIdLast: "/livguard-solar/home/delivery/solar-panel-residential-third.png",
            descriptionTextLast: "c1a8f49a-ea90-4afc-8d58-dcd44d636095",
            locationTextLast: "85586cdb-f74e-45bf-8a62-760b2ceebd27",
        },
        {
            imgIdFirst: "/livguard-solar/home/delivery/solar-panel-commercial-first.png",
            descriptionTextFirst: "2983a6e2-3c39-4c79-bc38-68eeeb9179e8",
            locationTextFirst: "5fb6dae9-e71a-4bcd-930d-f011e443edf9",
            imgIdSecond: "/livguard-solar/home/delivery/solar-panel-commercial-second.png",
            descriptionTextSecond: "a11142cf-bb40-464e-8c8f-98b61b7490ba",
            locationTextSecond: "dde60104-112a-4410-ac02-8a8cad238964",
            imgIdLast: "/livguard-solar/home/delivery/solar-panel-commercial-third.png",
            descriptionTextLast: "ef03ae52-e01e-43ce-9d96-361aa4076400",
            locationTextLast: "329095b3-25a6-469f-a8bb-4cf67670f963",
        },
    ];
    return (
        <div className="tw-grid tw-gap-6 lg:tw-gap-8 lg-px-screen-edge-2 tw-w-full tw-max-w-7xl tw-mx-auto">
            <DefaultTextAnimation className="tw-text-center">
                <div
                    dangerouslySetInnerHTML={{__html: contentData.getContent("9e8c1d8a-6814-443a-be82-9e59b278386d")}}
                    className="lg-text-headline tw-text-center"
                />
            </DefaultTextAnimation>

            <div className="tw-text-center lg-text-body">{contentData.getContent("2768e014-aad2-4622-a7e0-39cd685d5be9")}</div>

            <div className="tw-flex min-[400px]:tw-justify-center tw-gap-4 tw-overflow-auto max-[400px]:tw-pb-2 lg:lg-card-shadow-hack">
                <ItemBuilder
                    items={tabContent}
                    itemBuilder={(item, itemIndex) => {
                        return (
                            <div
                                key={itemIndex}
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-py-2 lg:tw-py-4 tw-px-4 tw-rounded-lg tw-w-fit tw-cursor-pointer lg-text-body-bold tw-whitespace-nowrap tw-duration-200 lg-card",
                                    selectedTab === itemIndex ? "tw-bg-primary-500-light tw-text-secondary-100-light" : "lg-text-secondary-900",
                                )}
                                onClick={() => setSelectedTab(itemIndex)}
                            >
                                {contentData.getContent(item)}
                            </div>
                        );
                    }}
                />
            </div>

            <div className="tw-grid tw-gap-6 tw-grid-cols-2 lg:tw-gap-8 md:tw-grid-cols-[2fr_1fr_1fr]">
                <div className="tw-grid max-md:tw-col-span-2 tw-group">
                    <div className="md:tw-row-start-1 md:tw-col-start-1 tw-rounded-lg tw-overflow-hidden">
                        <FullHeightImage relativePath={data[selectedTab].imgIdFirst} />
                    </div>
                    <div className="md:tw-bg-primary-500-light md:tw-py-4 tw-pt-2 md:tw-row-start-1 md:tw-col-start-1 md:tw-self-end tw-rounded-lg md:tw-opacity-0 md:group-hover:tw-bg-opacity-70 md:group-hover:tw-opacity-100 tw-duration-500">
                        <div className="lg-text-title1 md:tw-text-secondary-100-light tw-text-center">{contentData.getContent(data[selectedTab].descriptionTextFirst)}</div>
                        <div className="lg-text-button md:tw-text-secondary-100-light tw-text-center">{contentData.getContent(data[selectedTab].locationTextFirst)}</div>
                    </div>
                </div>
                <div className="tw-grid tw-group">
                    <div className="md:tw-row-start-1 md:tw-col-start-1 tw-rounded-lg tw-overflow-hidden">
                        <FullHeightImage relativePath={data[selectedTab].imgIdSecond} />
                    </div>
                    <div className="md:tw-bg-primary-500-light md:tw-opacity-0 md:group-hover:tw-bg-opacity-70 md:group-hover:tw-opacity-100 tw-duration-500 md:tw-py-4 tw-pt-2 md:tw-row-start-1 md:tw-col-start-1 md:tw-self-end tw-rounded-lg">
                        <div className="lg-text-title1 md:tw-text-secondary-100-light tw-text-center">{contentData.getContent(data[selectedTab].descriptionTextSecond)}</div>
                        <div className="lg-text-button md:tw-text-secondary-100-light tw-text-center">{contentData.getContent(data[selectedTab].locationTextSecond)}</div>
                    </div>
                </div>
                <div className="tw-grid tw-group">
                    <div className="md:tw-row-start-1 md:tw-col-start-1 tw-rounded-lg tw-overflow-hidden">
                        <FullHeightImage relativePath={data[selectedTab].imgIdLast} />
                    </div>
                    <div className="md:tw-bg-primary-500-light md:tw-opacity-0 md:group-hover:tw-bg-opacity-70 md:group-hover:tw-opacity-100 tw-duration-500 md:tw-py-4 tw-pt-2 md:tw-row-start-1 md:tw-col-start-1 md:tw-self-end tw-rounded-lg">
                        <div className="lg-text-title1 md:tw-text-secondary-100-light tw-text-center">{contentData.getContent(data[selectedTab].descriptionTextLast)}</div>
                        <div className="lg-text-button md:tw-text-secondary-100-light tw-text-center">{contentData.getContent(data[selectedTab].locationTextLast)}</div>
                    </div>
                </div>
            </div>

            {/* <CtaButtonLink
                to="/"
                textVernacId="8993dcbc-2216-4dd2-954e-e8145571049f"
                userPreferences={userPreferences}
                linkContainerClassName="tw-justify-self-center"
                buttonClassName="!tw-px-6"
            /> */}
        </div>
    );
}

function AboutLivguardSolar({userPreferences}: {userPreferences: UserPreferences}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="lg-px-screen-edge-2 tw-w-full tw-max-w-7xl tw-mx-auto">
            <div className="tw-grid md:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tw-gap-2 md:tw-gap-[3vw] xl:tw-gap-20 lg-card tw-p-4 md:tw-p-6 lg:tw-p-10 tw-rounded-lg">
                <div className="tw-grid tw-auto-rows-max tw-gap-4 md:tw-gap-6 tw-row-start-2 md:tw-row-start-1">
                    <div className="tw-grid tw-gap-2">
                        <div
                            dangerouslySetInnerHTML={{__html: contentData.getContent("a4807688-807d-40e8-a710-84364086a4ed")}}
                            className="lg-text-headline tw-text-center md:tw-text-start"
                        />

                        <div className="lg-text-body">{contentData.getContent("ecbb4510-50c9-41e4-89be-576378f00266")}</div>
                    </div>
                </div>
                <div className="tw-rounded-lg tw-overflow-hidden tw-w-full  tw-justify-self-center md:tw-justify-self-end tw-self-center">
                    <DefaultImageAnimation className="tw-w-full tw-rounded-lg tw-overflow-hidden tw-self-center">
                        <FullWidthImage relativePath={userPreferences.theme == Theme.Dark ? "/livguard-solar/renewable/dark-solar-logo.svg" : "/livguard-solar/renewable/light-solar-logo.svg"} />
                        {/* <img
                            src={userPreferences.theme == Theme.Dark ? "/livguard-solar/renewable/dark-solar-logo.svg" : "/livguard-solar/renewable/light-solar-logo.svg"}
                            width={385}
                            height={96}
                            className="tw-w-auto tw-h-6 lg:tw-h-[2.2rem]"
                            key={userPreferences.theme == Theme.Dark ? "/livguard-solar/renewable/dark-solar-logo.svg" : "/livguard-solar/renewable/light-solar-logo.svg"}
                            alt="livguard-logo"
                        /> */}
                    </DefaultImageAnimation>
                </div>
            </div>
        </div>
    );
}

function ExpoHighlights({userPreferences}: {userPreferences: UserPreferences}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="tw-grid tw-gap-6 lg-px-screen-edge-2 tw-w-full tw-max-w-7xl tw-mx-auto">
            <div className="tw-grid sm:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tw-gap-10 lg-card tw-py-6 md:tw-py-10">
                <div className="sm:tw-col-start-2 sm:tw-row-start-1 tw-grid tw-gap-6">
                    <div
                        dangerouslySetInnerHTML={{__html: contentData.getContent("70e5d67b-ad2d-4ac8-96ad-3e384d7d299a")}}
                        className="lg-text-headline max-sm:tw-text-center"
                    />

                    <div className="tw-grid tw-gap-4 lg:tw-gap-6 max-sm:tw-justify-self-center">
                        <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-4">
                            <div>
                                <FullWidthImage relativePath="/livguard-solar/renewable/5/1.svg" />
                            </div>
                            <div className="tw-self-center lg-text-title2">{contentData.getContent("0877ced7-a85d-4005-8c7c-4300c5ac19da")}</div>
                        </div>

                        <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-4">
                            <div>
                                <FullWidthImage relativePath="/livguard-solar/renewable/5/2.svg" />
                            </div>
                            <div className="tw-self-center lg-text-title2">{contentData.getContent("78a4d9e3-73bb-4730-baeb-f919d8142cdc")}</div>
                        </div>

                        <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-4">
                            <div>
                                <FullWidthImage relativePath="/livguard-solar/renewable/5/3.svg" />
                            </div>
                            <div className="tw-self-center lg-text-title2">{contentData.getContent("38028f16-3ded-4d92-8374-ed03005ba2d9")}</div>
                        </div>

                        <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-4">
                            <div>
                                <FullWidthImage relativePath="/livguard-solar/renewable/5/4.svg" />
                            </div>
                            <div className="tw-self-center lg-text-title2">{contentData.getContent("82986ede-25e4-4dfc-b17e-08b4bf792ab7")}</div>
                        </div>

                        <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-4">
                            <div>
                                {/* <FullWidthImage relativePath={userPreferences.theme == Theme.Dark ? "/livguard-solar/renewable/5/hand-solar.svg" : "/livguard-solar/renewable/5/5.svg"} /> */}
                                <FullWidthImage relativePath="/livguard-solar/renewable/5/hand-solar.svg" />
                            </div>
                            <div className="tw-self-center lg-text-title2">{contentData.getContent("8f25eea9-7b97-42d2-8152-1ebf67c2e849")}</div>
                        </div>
                    </div>

                    {/* <CtaButtonLink
                        to="/"
                        textVernacId="3a4ebae0-bd7e-4c9c-8cf1-9575437fa8a4"
                        userPreferences={userPreferences}
                        linkContainerClassName="tw-justify-self-center sm:tw-hidden"
                        linkClassName="tw-w-[9.68rem]"
                    /> */}
                </div>
                <div className="sm:tw-col-start-1 sm:tw-row-start-1 sm:tw-self-center">
                    <FullWidthImage relativePath="/livguard-solar/renewable/4/product-set.png" />
                </div>
            </div>
            {/* <CtaButtonLink
                to="/"
                textVernacId="3a4ebae0-bd7e-4c9c-8cf1-9575437fa8a4"
                userPreferences={userPreferences}
                linkContainerClassName="tw-justify-self-center tw-hidden sm:tw-block"
                linkClassName="tw-w-[9.68rem]"
            /> */}
        </div>
    );
}

export function SocialMediaFeeds({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    enum SocialMediaPosts {
        facebook,
        instagram,
        twitter,
    }
    const posts = [
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/Cx4b9zjoXx8",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CyFq1euI-yP",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/Cx-WNodIr98",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CxaX4L1I4VK",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CwpqRMGo5Qv",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CwxeHprOZq-",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CxIWFnHo9_y",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CxSI51Gozku",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CxhgXmZIMXM",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CxFuBO6o0qZ",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CxPNg3IIVNk",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CxLIpnVoFmw",
        },
    ];

    const [documentState, setDocumentState] = useState<Document | undefined>(undefined);
    const [windowState, setWindowState] = useState<Window | undefined>(undefined);

    useEffect(() => {
        setDocumentState(document);
        setWindowState(window);
    }, []);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "lg-px-screen-edge-2 lg:tw-px-[72px] xl:tw-px-[120px] tw-py-6 md:tw-py-10 tw-w-full tw-grid tw-grid-flow-row lg-bg-new-background-border-500 tw-overflow-hidden",
                className,
            )}
        >
            <div
                className="lg-text-headline tw-text-center"
                dangerouslySetInnerHTML={{__html: contentData.getContent("f5a76b54-fbf2-4ae1-91a2-e61a0cf06541")}}
            />
            <VerticalSpacer className="tw-h-6 lg:tw-h-8" />
            <div className="tw-w-full tw-max-w-7xl tw-mx-auto tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-py-4 tw-max-h-[20rem] md:tw-max-h-[30rem] tw-gap-x-4 tw-gap-y-4 tw-h-fit tw-overflow-y-scroll">
                {documentState != undefined && windowState != undefined && (
                    <ItemBuilder
                        items={posts}
                        itemBuilder={(post, postIndex) => (
                            <div
                                className="tw-w-full tw-aspect-auto tw-overflow-x-hidden"
                                key={postIndex}
                            >
                                {post.type === SocialMediaPosts.facebook && (
                                    <FacebookEmbed
                                        url={post.url}
                                        height={"100%"}
                                        width={"100%"}
                                        frame={{
                                            window: windowState,
                                            document: documentState,
                                        }}
                                    />
                                )}
                                {post.type === SocialMediaPosts.instagram && (
                                    <>
                                        {/* Please do not remove this comment */}
                                        {/* className="instagram-media" */}
                                        <InstagramEmbed
                                            url={post.url}
                                            height={"100%"}
                                            width={"100%"}
                                            frame={{
                                                window: windowState,
                                                document: documentState,
                                            }}
                                        />
                                        {/* <iframe
                                            src={`${post.url}/embed/captioned`}
                                            title="instagram"
                                            id={`instagramEmbed${postIndex}`}
                                            allowTransparency={true}
                                            allowFullScreen={true}
                                            style={{
                                                width: "calc(100% - 2px)",
                                                backgroundColor: "white",
                                                borderRadius: "3px",
                                                minWidth: "326px",
                                                padding: "0px",
                                            }}
                                        /> */}
                                    </>
                                )}
                                {post.type === SocialMediaPosts.twitter && (
                                    <TwitterEmbed
                                        url={post.url}
                                        height={"100%"}
                                        width={"100%"}
                                    />
                                )}
                            </div>
                        )}
                    />
                )}
            </div>
        </div>
    );
}

function GallerySection({userPreferences}: {userPreferences: UserPreferences}) {
    const contentData = useContext(ContentProviderContext);
    const [selectedYear, setSelectedYear] = useState(0);
    const years = [
        [
            "/livguard-solar/renewable/6/image1.png",
            "/livguard-solar/renewable/6/2.JPG",
            "/livguard-solar/renewable/6/3.JPG",
            "/livguard-solar/renewable/6/image2.png",
            "/livguard-solar/renewable/6/5.JPG",
        ],
        [
            "/livguard-solar/renewable/gallery/1.JPG",
            "/livguard-solar/renewable/gallery/2.JPG",
            "/livguard-solar/renewable/gallery/3.JPG",
            "/livguard-solar/renewable/gallery/4.JPG",
            "/livguard-solar/renewable/gallery/5.JPG",
        ],
    ];
    return (
        <div className="tw-grid tw-gap-6 lg-px-screen-edge-2 tw-w-full tw-max-w-7xl tw-mx-auto">
            <div className="lg-text-headline tw-text-center">{contentData.getContent("28b1f0d5-c206-45ad-9673-5b2d93e1e1b5")}</div>
            <div className="tw-flex tw-place-self-center tw-gap-4">
                <button
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-max-w-fit tw-p-4 tw-rounded-md tw-grid tw-items-center tw-justify-center tw-col-start-1 hover:tw-cursor-pointer lg-text-body-bold lg-text-secondary-900",
                        `${selectedYear == 0 ? "tw-bg-primary-500-light !tw-text-secondary-900-dark" : "lg-card"}`,
                    )}
                    onClick={() => setSelectedYear(0)}
                    dangerouslySetInnerHTML={{__html: contentData.getContent("03954a87-ce9d-4852-92d0-97aa7fa0379f")}}
                />
                <button
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-max-w-fit tw-p-4 tw-rounded-md tw-grid tw-items-center tw-justify-center tw-col-start-1 hover:tw-cursor-pointer lg-text-body-bold lg-text-secondary-900",
                        `${selectedYear == 1 ? "tw-bg-primary-500-light !tw-text-secondary-900-dark" : "lg-card"}`,
                    )}
                    onClick={() => setSelectedYear(1)}
                    dangerouslySetInnerHTML={{__html: contentData.getContent("0057d3d3-9147-4975-b299-fefc8a50f91a")}}
                />
            </div>
            <div className="tw-grid tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:tw-grid-cols-[repeat(3,minmax(0,1fr))] tw-gap-3 lg:tw-gap-6">
                {/* <div className="sm:tw-row-span-2 sm:tw-col-span-1 tw-row-span-1 tw-col-span-2 tw-overflow-hidden tw-rounded-lg">
                    <FullHeightImage relativePath="/livguard-solar/renewable/6/image1.png" />
                </div>
                <div className="tw-overflow-hidden tw-rounded-lg">
                    <FullHeightImage relativePath="/livguard-solar/renewable/6/2.JPG" />
                </div>
                <div className="tw-overflow-hidden tw-rounded-lg">
                    <FullHeightImage relativePath="/livguard-solar/renewable/6/3.JPG" />
                </div>
                <div className="tw-overflow-hidden tw-rounded-lg">
                    <FullHeightImage relativePath="/livguard-solar/renewable/6/image2.png" />
                </div>
                <div className="tw-overflow-hidden tw-rounded-lg">
                    <FullHeightImage relativePath="/livguard-solar/renewable/6/5.JPG" />
                </div> */}
                <ItemBuilder
                    items={years[selectedYear]}
                    itemBuilder={(item, itemIndex) => {
                        return (
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    itemIndex === 0 ? "sm:tw-row-span-2 sm:tw-col-span-1 tw-row-span-1 tw-col-span-2 tw-overflow-hidden tw-rounded-lg" : "tw-overflow-hidden tw-rounded-lg",
                                )}
                                key={itemIndex}
                            >
                                <FullHeightImage
                                    relativePath={item}
                                    key={item}
                                />
                            </div>
                        );
                    }}
                />
            </div>
        </div>
    );
}

// function ProductsAndServices({userPreferences}: {userPreferences: UserPreferences}) {
//     const [viewMore, setViewMore] = useState(false);
//     const cardItems = [
//         {
//             imgId: "/livguard-solar/partner-with-us/2/solar_panel.png",
//             name: "c4965a0f-b4e4-4afd-9e5f-fda80734f3b4",
//         },
//         {
//             imgId: "/livguard-solar/partner-with-us/2/off_grid_inverter.png",
//             name: "fe5908ec-3337-4b25-814d-1324313fa03d",
//         },
//         {
//             imgId: "/livguard-solar/renewable/8/solculator.png",
//             name: "03ccdaa3-1eaf-4ffa-8851-aab6ab979092",
//         },
//         {
//             imgId: "/livguard-solar/partner-with-us/2/off_grid_inverter.png",
//             name: "9cafbfcc-4dc4-4a85-a168-bebb2bebcb84",
//         },
//         {
//             imgId: "/livguard-solar/partner-with-us/2/smu.png",
//             name: "feb2e012-474a-4ad1-a166-335db53d222f",
//         },
//         {
//             imgId: "/livguard-solar/partner-with-us/2/solar_battery.png",
//             name: "036fe73d-7d0c-4221-ae1d-3101139338c6",
//         },
//         {
//             imgId: "/livguard-solar/partner-with-us/2/solar_street_light.png",
//             name: "64794c5f-21b8-49a8-9ad8-4bd9ed02c221",
//         },
//         {
//             imgId: "/livguard-solar/partner-with-us/2/other_accessories.png",
//             name: "homeS3Tab5HC2",
//         },
//     ];

//     return (
//         <div className="tw-grid tw-gap-6 lg:tw-gap-8 lg-px-screen-edge-2 tw-max-w-7xl tw-w-full tw-mx-auto">
//             <DefaultTextAnimation className="tw-row-start-1 lg-text-headline tw-text-center">
//                 <div dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent("d1a5c759-8829-414c-81f9-49983b2ec16e"))}} />
//             </DefaultTextAnimation>

//             <div className="tw-grid tw-gap-4 lg:tw-gap-8 tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr) min-[877px]:tw-grid-cols-[repeat(4,minmax(0,1fr))] sm:tw-grid-cols-[repeat(3,minmax(0,1fr))] tw-grid-cols-[repeat(2,minmax(0,1fr))]">
//                 <ItemBuilder
//                     items={cardItems}
//                     itemBuilder={(item, itemIndex) => {
//                         return (
//                             <div
//                                 className={viewMore || itemIndex < 4 ? "" : "tw-hidden"}
//                                 key={itemIndex}
//                             >
//                                 <ImageAndContentCard
//                                     key={itemIndex}
//                                     userPreferences={userPreferences}
//                                     cardItem={item}
//                                     largeFont={true}
//                                     bestSeller={true}
//                                 />
//                             </div>
//                         );
//                     }}
//                 />
//             </div>

//             <CtaButton
//                 userPreferences={userPreferences}
//                 textVernacId={viewMore ? "05dd627c-2d81-4390-a8ec-4543cb8b8cd7" : "10a749b0-d7b2-4c29-add5-a4afb989249d"}
//                 onClick={() => setViewMore(!viewMore)}
//                 mainContainerClassName="tw-justify-self-center"
//                 buttonClassName=""
//             />
//         </div>
//     );
// }

export function CustomerReviews({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div
            id="testimonials"
            className={className}
        >
            <div className="lg-px-screen-edge-2 lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("1e937877-23fb-4cef-9f70-aba46b1491f3")}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-8" />

            <TestimonialsCarousel
                userPreferences={userPreferences}
                testimonials={[
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="63fd9kH6Kiw"
                                style={{aspectRatio: "560/315"}}
                                className="tw-rounded-lg"
                            />
                        ),
                        name: `${contentData.getContent("ecc2a101-772c-4fcb-a2c3-586d13f19ed2")}`,
                        rating: 5,
                        state: ``,
                        message: `${contentData.getContent("ce6c76b0-217b-45f7-a388-8aba61437ae0")}`,
                        productImage: null,
                    },
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="4PumI79zLos"
                                style={{aspectRatio: "560/315"}}
                                className="tw-rounded-lg"
                            />
                        ),
                        name: `${contentData.getContent("e6fc8d59-9517-4499-bfc5-857986597848")}`,
                        rating: 5,
                        state: ``,
                        message: `${contentData.getContent("1614092f-20cb-4aa8-8286-32b713e295cb")}`,
                        productImage: null,
                    },
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="CSLFp-tzPic"
                                style={{aspectRatio: "560/315"}}
                                className="tw-rounded-lg"
                            />
                        ),
                        name: `${contentData.getContent("4f13dc23-7b2e-40ff-91ce-301cd8d82096")}`,
                        rating: 5,
                        state: ``,
                        message: `${contentData.getContent("4a14b5c9-567e-4e8a-a677-395e94e53300")}`,
                        productImage: null,
                    },
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="GSD_n5vK-5s"
                                style={{aspectRatio: "560/315"}}
                                className="tw-rounded-lg"
                            />
                        ),
                        name: `${contentData.getContent("2a4ae964-e66a-4d30-a63a-31409941b4c8")}`,
                        rating: 5,
                        state: ``,
                        message: `${contentData.getContent("8a4d79a9-cafb-4d8b-8728-93635a6f77fd")}`,
                        productImage: null,
                    },
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="iIoUCBDLC6o"
                                style={{aspectRatio: "560/315"}}
                                className="tw-rounded-lg"
                            />
                        ),
                        name: `${contentData.getContent("643c1563-8e87-419b-bab3-b5aba48a287f")}`,
                        rating: 4,
                        state: ``,
                        message: `${contentData.getContent("6224275a-5742-404b-9a36-ade2c73fa3f6")}`,
                        productImage: null,
                    },
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="fOTg2jNZsaM"
                                style={{aspectRatio: "560/315"}}
                                className="tw-rounded-lg"
                            />
                        ),
                        name: `${contentData.getContent("b19e5cee-bb1f-43c3-800c-2111e3daa16b")}`,
                        rating: 5,
                        state: ``,
                        message: `${contentData.getContent("5663c56f-07d1-4b58-9321-5e0cbc26eee2")}`,
                        productImage: null,
                    },
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="C96jcwd5fCs"
                                style={{aspectRatio: "560/315"}}
                                className="tw-rounded-lg"
                            />
                        ),
                        name: `${contentData.getContent("77291687-8e86-4a62-9f58-b1b85ea18cea")}`,
                        rating: 5,
                        state: ``,
                        message: `${contentData.getContent("0fc85540-fa81-4814-86b3-1e1b6b7d5b84")}`,
                        productImage: null,
                    },
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="HOPkDca8uYs"
                                style={{aspectRatio: "560/315"}}
                                className="tw-rounded-lg"
                            />
                        ),
                        name: `${contentData.getContent("f80e57d8-a4bc-4a77-b4b7-2933b54a4d59")}`,
                        rating: 5,
                        state: ``,
                        message: `${contentData.getContent("f6a385b5-b45e-4350-9d0b-2b309e8f6c03")}`,
                        productImage: null,
                    },
                ]}
            />
        </div>
    );
}

function ReachOutForAnyQuery({
    userPreferences,
    actionData,
    utmSearchParameters,
}: {
    userPreferences: UserPreferences;
    actionData: ActionData;
    utmSearchParameters: {
        [searchParameter: string]: string;
    };
}) {
    const contentData = useContext(ContentProviderContext);
    const initialData = {
        name: "",
        emailId: "",
        phoneNumber: "",
        organisation: "",
        isServiceRequestFormTermsAndConditionsChecked: "True",
        otp: "",
    };

    const [showOtpField, setShowOtpField] = useState(false);
    const [showOtpButton, setShowOtpButton] = useState(false);
    const [resendTimeOut, setResendTimeOut] = useState(0);
    const [invalidOtp, setInvalidOtp] = useState(false);
    const [isOtpResent, setIsOtpResent] = useState(false);
    const phoneNumberRef = useRef<HTMLInputElement | null>(null);
    const otpFieldRef = useRef<HTMLInputElement | null>(null);

    const otpFetcher = useFetcher();
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (otpFetcher.data == null) {
            return;
        } else if (otpFetcher.data.error != null) {
            toast.error(otpFetcher.data.error);
            return;
        }
        if (isOtpResent) {
            toast.success("OTP resent successfully");
        } else {
            toast.success("OTP sent successfully");
        }
    }, [otpFetcher.data]);

    useEffect(() => {
        if (resendTimeOut > 0 && showOtpField) {
            if (timeoutId != null) {
                clearTimeout(timeoutId);
            }
            let timeout = setTimeout(() => {
                setResendTimeOut((prev) => prev - 1);
            }, 1000);
            setTimeoutId(timeout);
        }
    }, [resendTimeOut]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        if (actionData != null) {
            if (actionData.error != null) {
                if (actionData.isInvalidOtp) {
                    toast.error("Please enter valid OTP. Error code: 7729ab93-6723-468b-9510-705891533cce");
                    setInvalidOtp(true);
                    return;
                }
                setInvalidOtp(false);
                toast.error(actionData.error);
                return;
            }

            setIsFormSubmitted(true);
        }
    }, [actionData]);

    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div className="tw-grid lg-px-screen-edge-2 tw-max-w-7xl tw-w-full tw-mx-auto">
            <DefaultTextAnimation className="lg-text-headline tw-text-center tw-hidden md:tw-block">
                <div
                    id={isScreenSizeBelow ? "" : "reachoutForm"}
                    dangerouslySetInnerHTML={{__html: contentData.getContent("0e9460fa-70dc-46e6-a7e9-eb390658befe")}}
                />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-8 tw-hidden md:tw-block" />

            <div className="tw-grid md:tw-grid-cols-[minmax(0,1fr)_25rem] tw-rounded-lg tw-overflow-hidden md:tw-gap-[1rem]">
                <div
                    className="tw-grid tw-auto-rows-max tw-gap-8 lg:tw-gap-14 tw-overflow-hidden tw-py-8 tw-px-6 lg:tw-px-10 tw-pb-0 tw-rounded-l-lg lg-card tw-rounded-lg tw-shadow-none tw-bg-[#f6f0f0] dark:tw-bg-transparent"
                    // style={{backgroundColor: "#f6f0f0"}}
                >
                    {/* <div className="tw-col-start-1 tw-col-span-full tw-row-start-1 tw-row-span-full">
                        <FullWidthImage relativePath="/livguard-solar/renewable/9/grunge-background.png" />
                    </div> */}
                    {/* <FullWidthImage relativePath={isScreenSizeBelow? "/livguard-solar/renewable/9/mobile-image.png":"/livguard-solar/renewable/9/desktop-image.png"}/> */}
                    <div className="">
                        <div className="tw-w-[12.375rem]">
                            <FullWidthImage relativePath={userPreferences.theme == Theme.Dark ? "/livguard-solar/renewable/9/rei-logo.svg" : "/livguard-solar/renewable/9/renewable-energy-logo.png"} />
                        </div>
                        <div className="lg-text-body">{contentData.getContent("1daf5d8c-9c04-4345-a0f2-7ee5b05b629e")}</div>
                    </div>

                    <div>
                        <div
                            className="lg-text-headline md:max-[822px]:tw-text-[24px] lg-text-secondary-900"
                            dangerouslySetInnerHTML={{__html: contentData.getContent("b6d8dfb6-5b39-4a18-9329-14b7b5599c67")}}
                        />

                        <VerticalSpacer className="tw-h-2" />

                        <div className="lg-text-body-bold">{contentData.getContent("247863ed-0f07-4278-89f8-485c1a1d4f00")}</div>

                        <VerticalSpacer className="tw-h-8" />

                        <div className="tw-grid tw-grid-cols-[auto_auto_1fr] tw-gap-5">
                            <div className="tw-flex tw-gap-2 tw-items-center">
                                <div>
                                    <FullWidthImage
                                        relativePath={userPreferences.theme == Theme.Dark ? "/livguard-solar/renewable/9/dark-calender.svg" : "/livguard-solar/renewable/9/light-calender.svg"}
                                    />
                                </div>
                                <div>
                                    <div className="lg-text-body">{contentData.getContent("9bda580e-5bbd-4c5f-9354-1ac2b4f93913")}</div>
                                    <div className="lg-text-title2">{contentData.getContent("fb5dcae7-729f-44ac-9877-e57eb921e71c")}</div>
                                </div>
                            </div>
                            <div className="tw-flex tw-gap-2 tw-items-center">
                                <div>
                                    <FullWidthImage relativePath={userPreferences.theme == Theme.Dark ? "/livguard-solar/renewable/9/dark-home.svg" : "/livguard-solar/renewable/9/light-home.svg"} />
                                </div>
                                <div>
                                    <div className="lg-text-body">{contentData.getContent("afd8d1a0-c28e-424d-8d0f-01d30e0017e8")}</div>
                                    <div className="lg-text-title2">{contentData.getContent("86815d1a-3e79-4965-9417-bfc3705cbcde")}</div>
                                </div>
                            </div>
                        </div>

                        <div className="tw-grid tw-grid-cols-2">
                            <div className="tw-w-[5.75rem] tw-self-end">
                                <FullWidthImage relativePath="/livguard-solar/renewable/9/icon.png" />
                            </div>
                            <div className="tw-justify-self-end tw-w-[9.5rem] lg:tw-w-[12rem]">
                                <FullWidthImage relativePath="/livguard-solar/renewable/9/products.png" />
                            </div>
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-6 md:tw-hidden" />

                <DefaultTextAnimation className="lg-text-headline tw-text-center md:tw-hidden">
                    <div
                        id={isScreenSizeBelow ? "reachoutForm" : ""}
                        dangerouslySetInnerHTML={{__html: contentData.getContent("0e9460fa-70dc-46e6-a7e9-eb390658befe")}}
                    />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6 md:tw-hidden" />

                {!isFormSubmitted ? (
                    <div className="tw-px-4 tw-py-6 tw-rounded-l-lg lg-card tw-rounded-lg tw-shadow-none">
                        <div className="lg-text-title1 tw-text-center tw-mb-4">{contentData.getContent("f9a8c47e-852e-42c5-9942-9991eb7773e8")}</div>

                        <Form
                            method="post"
                            className="tw-grid"
                        >
                            <div className="tw-grid tw-gap-2">
                                <div className="lg-text-button">{contentData.getContent("6801bb72-ee1d-42ae-8f4a-a08848f267fa")}</div>
                                <input
                                    type="text"
                                    name="name"
                                    className="lg-text-input"
                                    placeholder={contentData.getContent("7ce2eaa7-4d46-4f80-80d2-b91b81085a49")}
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData((prev) => {
                                            return {...prev, name: e.target.value};
                                        })
                                    }
                                    required
                                />
                            </div>
                            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />
                            <div className="tw-grid tw-gap-2">
                                <div className="lg-text-button">{contentData.getContent("e7117c35-13c8-4282-98d3-f5c955238da8")}</div>
                                <input
                                    type="text"
                                    name="email"
                                    pattern={emailIdValidationPattern}
                                    className="lg-text-input"
                                    placeholder={contentData.getContent("29ca1701-2fb9-49ec-a4d6-3af793c194b1")}
                                    value={formData.emailId}
                                    onChange={(e) =>
                                        setFormData((prev) => {
                                            return {...prev, emailId: e.target.value};
                                        })
                                    }
                                    required
                                />
                            </div>
                            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />
                            <div className="tw-grid lg:tw-col-start-1 tw-grid-flow-row">
                                {!showOtpField ? (
                                    <>
                                        <div className="lg-text-button">{contentData.getContent("17cfa283-6fcc-4a49-9dfe-a392e0310b27")}</div>
                                        <VerticalSpacer className="tw-h-2" />
                                    </>
                                ) : (
                                    <>
                                        <div className="tw-grid tw-w-full tw-items-center tw-grid-cols-[auto_0.5rem_minmax(0,1fr)] tw-pl-3">
                                            <div
                                                className="tw-col-start-1 tw-text-primary-500-light hover:tw-cursor-pointer lg-text-body-bold"
                                                onClick={(e) => {
                                                    setShowOtpField(false);
                                                    setResendTimeOut(0);
                                                    if (phoneNumberRef.current != null) {
                                                        phoneNumberRef.current.focus();
                                                    }
                                                }}
                                            >
                                                {contentData.getContent("phoneNumberChnage")}
                                            </div>
                                            <div className="tw-col-start-3 lg-text-secondary-900 lg-text-body-bold">{formData.phoneNumber}</div>
                                        </div>
                                        <VerticalSpacer className="tw-h-2" />
                                    </>
                                )}

                                {!showOtpField ? (
                                    <div className="tw-relative tw-w-full tw-items-center tw-grid">
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            pattern={indianPhoneNumberValidationPattern}
                                            placeholder={contentData.getContent("1e90dca7-b78f-4231-b2df-644a3b0322d1")}
                                            required
                                            className="lg-text-input tw-w-full"
                                            disabled={showOtpField}
                                            defaultValue={formData.phoneNumber}
                                            ref={phoneNumberRef}
                                            onChange={(e) => {
                                                setFormData((prev) => ({...prev, phoneNumber: e.target.value}));
                                                if (e.target.value.length == 10) {
                                                    setShowOtpButton(true);
                                                } else {
                                                    setShowOtpButton(false);
                                                }
                                            }}
                                            onBlur={(e) => {
                                                if (formData.phoneNumber.length == 10) {
                                                    setShowOtpButton(true);
                                                }
                                            }}
                                            onFocus={(e) => {
                                                if (formData.phoneNumber.length == 10) {
                                                    setShowOtpButton(true);
                                                }
                                            }}
                                        />
                                        <div
                                            className={concatenateNonNullStringsWithSpaces(
                                                "tw-absolute tw-right-2 tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-full tw-px-2 tw-py-1 tw-items-center tw-text-secondary-100-light hover:tw-cursor-pointer",
                                                showOtpButton ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-10 tw-duration-100",
                                            )}
                                            onClick={(e) => {
                                                if (formData.name.length === 0) {
                                                    toast.error("Name cannot be null! Error code: 3b08d311-0e27-477e-b2dc-38eb172db2f7");
                                                    return;
                                                }
                                                setShowOtpButton(false);
                                                setShowOtpField(true);
                                                setResendTimeOut(60);

                                                if (otpFieldRef.current != null) {
                                                    otpFieldRef.current.focus();
                                                }
                                                const data = new FormData();
                                                data.append("phoneNumber", formData.phoneNumber);
                                                data.append("name", formData.name);
                                                otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                                            }}
                                        >
                                            {contentData.getContent("OfferFormGetOTP")}
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={concatenateNonNullStringsWithSpaces(
                                            "tw-w-full",
                                            showOtpField ? "tw-flex tw-flex-col tw-opacity-100 tw-duration-100 tw-z-10" : "tw-hidden tw-opacity-0 -tw-z-100",
                                        )}
                                    >
                                        <div className="tw-relative">
                                            <input
                                                type="text"
                                                name="otpSubmitted"
                                                className="lg-text-input"
                                                required
                                                placeholder={contentData.getContent("contactUsOTPT3E")}
                                                ref={otpFieldRef}
                                                onChange={(e) => {
                                                    setFormData((prev) => ({...prev, otp: e.target.value}));
                                                }}
                                            />
                                            {invalidOtp && (
                                                <div className="lg-text-primary-500 tw-absolute lg-text-icon tw-right-2 tw-top-0 tw-bottom-0 tw-pt-[18px]">
                                                    {contentData.getContent("OfferInvalidOTP")}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="tw-grid lg:tw-grid-cols-2">
                                    <div
                                        className={concatenateNonNullStringsWithSpaces(
                                            "tw-w-full tw-px-3 lg:tw-col-start-2",
                                            showOtpField ? "tw-flex tw-flex-row tw-justify-end tw-gap-x-2 tw-opacity-100 tw-duration-100 tw-z-10" : "tw-hidden tw-opacity-0 -tw-z-100",
                                        )}
                                    >
                                        <div
                                            className={concatenateNonNullStringsWithSpaces("lg-text-secondary-700 tw-text-[12px]", `${resendTimeOut > 0 ? "undefined" : "hover:tw-cursor-pointer"}`)}
                                            onClick={() => {
                                                setIsOtpResent(true);
                                                setResendTimeOut(60);

                                                const data = new FormData();
                                                data.append("phoneNumber", formData.phoneNumber);
                                                data.append("name", formData.name);
                                                otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                                            }}
                                        >
                                            {contentData.getContent("OfferResendOTP")}
                                        </div>
                                        <div className="lg-text-secondary-700 tw-text-[12px]">{`00:${resendTimeOut}`}</div>
                                    </div>
                                </div>
                            </div>
                            {/* <VerticalSpacer className="tw-h-4 lg:tw-h-6" /> */}
                            <VerticalSpacer className={concatenateNonNullStringsWithSpaces("tw-h-4 lg:tw-h-6", resendTimeOut > 0 || isOtpResent ? "tw-hidden" : "")} />
                            <div className="tw-grid tw-gap-2">
                                <div className="lg-text-button">{contentData.getContent("4af1d7d6-25cb-4bfe-b3f3-efc6fbf991e1")}</div>
                                <input
                                    type="text"
                                    name="organisation"
                                    className="lg-text-input"
                                    placeholder={contentData.getContent("2f91bf98-978c-4534-864b-b49790ab4b6f")}
                                    value={formData.organisation}
                                    onChange={(e) =>
                                        setFormData((prev) => {
                                            return {...prev, organisation: e.target.value};
                                        })
                                    }
                                    required
                                />
                            </div>
                            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />
                            <div className="tw-grid tw-grid-flow-col tw-gap-2 tw-items-start tw-justify-center tw-my-3 lg:tw-mt-0 lg:tw-mb-3 tw-col-start-1 tw-col-span-full">
                                <input
                                    type="checkbox"
                                    name="termsAndConditionsChecked"
                                    style={{accentColor: `${formData.isServiceRequestFormTermsAndConditionsChecked ? "#eb2a2b" : "white"}`}}
                                    defaultChecked={formData.isServiceRequestFormTermsAndConditionsChecked == "True" ? true : false}
                                    required
                                    onChange={(e) =>
                                        setFormData((prev) => {
                                            return {...prev, isServiceRequestFormTermsAndConditionsChecked: e.target.checked ? "True" : "False"};
                                        })
                                    }
                                />
                                <div dangerouslySetInnerHTML={{__html: contentData.getContent("contactUsTermsAndConditionsCheckboxtext")}} />
                            </div>

                            <input
                                readOnly
                                name="formData"
                                className="tw-hidden"
                                value={JSON.stringify({
                                    ...formData,
                                    utmParameters: utmSearchParameters,
                                })}
                            />

                            <div className="tw-col-start-1 tw-col-span-full tw-flex tw-flex-wrap tw-gap-x-6 tw-gap-y-4 tw-justify-center">
                                <button
                                    type="submit"
                                    className="lg-cta-button disabled:tw-bg-secondary-300-light"
                                    disabled={
                                        // otpFetcher.data == null ||
                                        // !otpSubmitted ||
                                        formData.emailId == "" || formData.name == "" || formData.organisation == "" || formData.phoneNumber == ""
                                        // formData.otp == null
                                    }
                                >
                                    {contentData.getContent("f6b3804e-752e-46bd-aef0-c5421a9110f7")}
                                </button>
                                {/* <div
                                        className="lg-outline-button tw-cursor-pointer"
                                        // onClick={() => {
                                        //     setFormData(initialData);
                                        //     resetOtpState();
                                        // }}
                                    >
                                        {contentData.getContent("7f3411a0-8709-4e25-9d34-f366fdfa766d")}
                                    </div> */}
                            </div>
                        </Form>
                    </div>
                ) : (
                    <div className="tw-grid tw-py-[4.5rem] tw-gap-[2rem] tw-w-full tw-h-full max-md:tw-rounded-lg md:tw-rounded-r-lg tw-border-2 tw-border-new-background-border-500-light tw-justify-center tw-px-16 md:tw-border-l-0">
                        <div className="tw-w-full tw-grid tw-justify-center">
                            <FixedWidthImage
                                relativePath="/livguard/icons/confirmation.png"
                                width="10rem"
                            />
                        </div>

                        <div
                            dangerouslySetInnerHTML={{__html: contentData.getContent("6d0f2700-ee1b-4215-b60c-f920ba0d0a2b")}}
                            className="lg-text-banner tw-text-center"
                        />

                        <div
                            dangerouslySetInnerHTML={{__html: contentData.getContent("d0b96a23-94c3-45c9-af3e-0722264c7ed5")}}
                            className="lg-text-body tw-text-center"
                        />

                        <div className="tw-grid tw-grid-flow-col tw-max-w-[9.5rem] tw-justify-items-center tw-justify-self-center tw-gap-2">
                            <Link
                                to="https://www.facebook.com/LivguardEnergy/"
                                target="_blank"
                                className=""
                            >
                                <Facebook className="tw-w-5 tw-h-5 hover:lg-text-primary-500 lg-text-secondary-700 tw-duration-200" />
                            </Link>
                            <Link
                                to="https://twitter.com/LivguardEnergy"
                                target="_blank"
                            >
                                <Twitter className="tw-w-5 tw-h-5 hover:lg-text-primary-500 lg-text-secondary-700 tw-duration-200" />
                            </Link>
                            <Link
                                to="https://www.instagram.com/livguardenergy/"
                                target="_blank"
                            >
                                <Instagram className="tw-w-5 tw-h-5 hover:lg-text-primary-500 lg-text-secondary-700 tw-duration-200" />
                            </Link>
                            <Link
                                to="https://www.linkedin.com/company/livguard-energy/"
                                target="_blank"
                            >
                                <Linkedin className="tw-w-5 tw-h-5 hover:lg-text-primary-500 lg-text-secondary-700 tw-duration-200" />
                            </Link>
                            <Link
                                to="https://www.youtube.com/@LivguardEnergy"
                                target="_blank"
                            >
                                <Youtube className="tw-w-5 tw-h-5 hover:lg-text-primary-500 lg-text-secondary-700 tw-duration-200" />
                            </Link>
                        </div>

                        <div
                            dangerouslySetInnerHTML={{__html: contentData.getContent("a92d2d4c-be7d-4b41-8f8f-32ad2e427a3a")}}
                            className="lg-text-body tw-text-center"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
