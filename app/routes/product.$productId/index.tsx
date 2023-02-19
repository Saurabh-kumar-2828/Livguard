import {CheckCircleIcon, ChevronDoubleDownIcon, XCircleIcon} from "@heroicons/react/20/solid";
import {LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "react-router";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {DealerLocator, EnergySolutions, FaqSection, ShowerSomeLoveOnSocialHandles, TransformingLives} from "~/routes";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {PageScaffold} from "~/components/pageScaffold";
import {getNonEmptyStringFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useState} from "react";

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    productId: string;
};

export const loader: LoaderFunction = async ({request, params}) => {
    const userPreferences = await getUserPreferencesFromCookies(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const productId = getNonEmptyStringFromUnknown(params.productId as string);

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        productId: productId,
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, productId} = useLoaderData() as LoaderData;

    console.log("url in page", redirectTo);

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
            >
                <ProductPage
                    userPreferences={userPreferences}
                    productId={productId}
                />
            </PageScaffold>

            {/* <StickyBottomBar userPreferences={userPreferences} /> */}
        </>
    );
}

type ProductInfo = {
    images: Array<{image: string}>;
    name: string;
    description: string;
    productIcons: Array<{icon: string; text: string}>;
    specifications: Array<{title: string; value: string}>;
    features: Array<{title: string; value: string}>;
    additionalInfo: Array<{title: string; value: string}>;
    productDescription: {description: string; images: Array<{image: string}>};
    reviews: Array<any>;
};

function ProductPage({userPreferences, productId}: {userPreferences: UserPreferences; productId: string}) {
    const productDetails: {[key: string]: ProductInfo} = {
        "1": {
            images: [
                {
                    image: "",
                },
            ],
            name: "Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "7 Year Warranty",
                },
                {
                    icon: "",
                    text: "260 AhBattery",
                },
                {
                    icon: "",
                    text: "",
                },
                {
                    icon: "",
                    text: "",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "XXXXXXX",
                },
                {
                    title: "abc",
                    value: "abc",
                },
                {
                    title: "Package Contents",
                    value: "Lorem Ipsum is simply dummy text",
                },
                {
                    title: "?????",
                    value: "?????",
                },
                {
                    title: "xyz",
                    value: "zyz",
                },
            ],
            features: [
                {
                    title: "abc",
                    value: "abc",
                },
                {
                    title: "Model Number",
                    value: "XXXXXXX",
                },
                {
                    title: "xyz",
                    value: "zyz",
                },
                {
                    title: "Package Contents",
                    value: "Lorem Ipsum is simply dummy text",
                },
                {
                    title: "?????",
                    value: "?????",
                },
            ],
            additionalInfo: [
                {
                    title: "Package Contents",
                    value: "Lorem Ipsum is simply dummy text",
                },
                {
                    title: "abc",
                    value: "abc",
                },
                {
                    title: "?????",
                    value: "?????",
                },
                {
                    title: "Model Number",
                    value: "XXXXXXX",
                },
                {
                    title: "xyz",
                    value: "zyz",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: [],
        },
        "2": {
            images: [
                {
                    image: "",
                },
            ],
            name: "Name 2",
            description:
                "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
            productIcons: [
                {
                    icon: "",
                    text: "",
                },
                {
                    icon: "",
                    text: "",
                },
                {
                    icon: "",
                    text: "7 Year Warranty",
                },
                {
                    icon: "",
                    text: "260 AhBattery",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "XXXXXXX",
                },
                {
                    title: "abc",
                    value: "abc",
                },
                {
                    title: "Package Contents",
                    value: "Lorem Ipsum is simply dummy text",
                },
                {
                    title: "?????",
                    value: "?????",
                },
                {
                    title: "xyz",
                    value: "zyz",
                },
            ],
            features: [
                {
                    title: "Model Number",
                    value: "XXXXXXX",
                },
                {
                    title: "abc",
                    value: "abc",
                },
                {
                    title: "Package Contents",
                    value: "Lorem Ipsum is simply dummy text",
                },
                {
                    title: "?????",
                    value: "?????",
                },
                {
                    title: "xyz",
                    value: "zyz",
                },
            ],
            additionalInfo: [
                {
                    title: "Model Number",
                    value: "XXXXXXX",
                },
                {
                    title: "abc",
                    value: "abc",
                },
                {
                    title: "Package Contents",
                    value: "Lorem Ipsum is simply dummy text",
                },
                {
                    title: "?????",
                    value: "?????",
                },
                {
                    title: "xyz",
                    value: "zyz",
                },
            ],
            productDescription: {
                description:
                    "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
                images: [
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: [],
        },
    };

    return (
        <>
            <VerticalSpacer className="tw-h-10" />

            <ProductInfo
                userPreferences={userPreferences}
                productInfo={productDetails[productId]}
            />

            <VerticalSpacer className="tw-h-10" />

            <ProductSpecifications
                userPreferences={userPreferences}
                productInfo={productDetails[productId]}
            />

            <VerticalSpacer className="tw-h-10" />

            <ProductDescription
                userPreferences={userPreferences}
                productDescription={productDetails[productId].productDescription}
            />

            <VerticalSpacer className="tw-h-10" />

            <TransformingLives userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <DealerLocator
                userPreferences={userPreferences}
                showCTAButton={true}
            />

            <VerticalSpacer className="tw-h-10" />

            <FaqSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <ShowerSomeLoveOnSocialHandles userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />
        </>
    );
}

function ProductInfo({userPreferences, productInfo}: {userPreferences: UserPreferences; productInfo : ProductInfo}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-grid tw-grid-cols-1 tw-grid-rows-[auto,auto] lg:tw-grid-cols-[minmax(0,4fr),minmax(0,3fr)] lg:tw-grid-rows-1 tw-justify-items-center tw-text-center tw-gap-2 lg:tw-gap-4">
                <div className="tw-grid tw-grid-cols-1 tw-grid-rows-[minmax(0,1fr),auto] lg:tw-grid-cols-[auto,minmax(0,1fr)] lg:tw-grid-rows-1 tw-row-start-1 lg:tw-col-start-1 tw-gap-2 tw-w-full">
                    <div className="tw-row-start-1 lg:tw-col-start-2">
                        <div className="tw-w-full tw-h-[300px] tw-rounded-lg lg-bg-secondary-500"></div>
                    </div>
                    <div className="tw-grid tw-grid-rows-1 tw-grid-cols-4 lg:tw-grid-rows-4 lg:tw-grid-cols-1 tw-row-start-2 lg:tw-col-start-1 lg:tw-row-start-1 tw-w-full tw-gap-2">
                        <ItemBuilder
                            items={["Image1", "Image2", "Image3", "Image4"]}
                            itemBuilder={(image, imageIndex) => (
                                <div
                                    className="lg-bg-secondary-500 tw-rounded-lg tw-w-full tw-h-[80px] lg:tw-w-[80px] lg:tw-h-full"
                                    key={imageIndex}
                                ></div>
                            )}
                        />
                    </div>
                </div>
                <div className="tw-flex tw-flex-col tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1">
                    <VerticalSpacer className="tw-h-4" />

                    <div className="lg-text-title1 tw-text-left">{productInfo.name}</div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-text-left">{productInfo.description}</div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-grid tw-grid-cols-[minmax(0,1fr),auto,minmax(0,1fr),auto,minmax(0,1fr),auto,minmax(0,1fr)] tw-gap-2">
                        <ItemBuilder
                            items={productInfo.productIcons}
                            itemBuilder={(icon, iconIndex) => (
                                <>
                                    <div
                                        className="tw-flex tw-flex-col tw-gap-1 tw-justify-center tw-items-center"
                                        key={iconIndex}
                                    >
                                        <div className="tw-w-4 tw-h-4 lg-bg-secondary-500 tw-rounded-full"></div>
                                        <div className="tw-text-center">{icon.text}</div>
                                    </div>

                                    {iconIndex < productInfo.productIcons.length - 1 && <div className="tw-w-full tw-border"></div>}
                                </>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProductSpecifications({userPreferences, productInfo}: {userPreferences: UserPreferences; productInfo: ProductInfo}) {
    const [selectedTab, setSelectedTab] = useState("specifications");

    const getDataFromProductInfo = (tab: string) => {
        if(tab == "specifications"){
            return productInfo.specifications;
        }else if(tab == "features"){
            return productInfo.features;
        }else if(tab == "additionalInfo"){
            return productInfo.additionalInfo;
        }else{
            throw Error("value not found");
        }
    }

    return (
        <div className="tw-flex tw-flex-col tw-gap-4">
            <div className="lg-px-screen-edge">
                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),auto,minmax(0,1fr),auto,minmax(0,1fr)] tw-gap-2 tw-border-b tw-py-2">
                    <ItemBuilder
                        items={[
                            {
                                title: "Specifications",
                                value: "specifications",
                            },
                            {
                                title: "Features",
                                value: "features",
                            },
                            {
                                title: "Additional Info",
                                value: "additionalInfo",
                            },
                        ]}
                        itemBuilder={(item, itemIndex) => (
                            <>
                                <div
                                    className="tw-flex tw-flex-col tw-gap-1 tw-justify-center tw-items-center"
                                    key={itemIndex}
                                    onClick={() => setSelectedTab(item.value)}
                                >
                                    <div className={`${item.value == selectedTab ? "tw-underline" : "lg-text-secondary-700"}`}>{item.title}</div>
                                </div>

                                {itemIndex < 3 - 1 && <div className="tw-w-full tw-border"></div>}
                            </>
                        )}
                    />
                </div>
            </div>

            <div className="tw-flex tw-flex-col">
                <ItemBuilder
                    items={getDataFromProductInfo(selectedTab)}
                    itemBuilder={(item, itemIndex) => (
                        <div className={`tw-grid tw-grid-cols-2 lg-px-screen-edge tw-py-2 tw-items-center tw-text-left ${itemIndex % 2 == 0 ? "lg-bg-secondary-500" : ""}`}>
                            <div className="tw-col-start-1 tw-font-bold">{item.title}</div>
                            <div className="tw-col-start-2">{item.value}</div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

function ProductDescription({userPreferences, productDescription}: {userPreferences: UserPreferences; productDescription: {description: string; images: Array<{image: string}>}}) {
    return (
        <div className="lg-px-screen-edge tw-flex-tw-flex-col">
            <div className="lg-text-headline tw-text-center">Product Description</div>

            <VerticalSpacer className="tw-h-6" />

            <div className="tw-text-center">{productDescription.description}</div>

            <VerticalSpacer className="tw-h-6" />

            <ItemBuilder
                items={productDescription.images}
                itemBuilder={(image, imageIndex) => (
                    <>
                        <div className="tw-rounded-lg lg-bg-secondary-500 tw-w-full tw-h-[250px]"></div>

                        <VerticalSpacer className="tw-h-4" />
                    </>
                )}
            />
        </div>
    );
}

function ProductRatings({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div>
            <div></div>
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

export function JodiSection({userPreferences}: {userPreferences: UserPreferences}) {
    const JodiData = [
        {
            title: `${getVernacularString("landingPage2S4J1Title", userPreferences.language)}`,
            description: `${getVernacularString("landingPage2S4J1Description", userPreferences.language)}`,
            specificationsTitle: `${getVernacularString("landingPage2S4KeySpecificationTitle", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationIcon: "",
                    keySpecificationTitle: `${getVernacularString("landingPage2S4J1Specification1Title", userPreferences.language)}`,
                    keySpecificationContent: `${getVernacularString("landingPage2S4J1Specification1Content", userPreferences.language)}`,
                },
                {
                    keySpecificationIcon: "",
                    keySpecificationTitle: `${getVernacularString("landingPage2S4J1Specification2Title", userPreferences.language)}`,
                    keySpecificationContent: `${getVernacularString("landingPage2S4J1Specification2Content", userPreferences.language)}`,
                },
                {
                    keySpecificationIcon: "",
                    keySpecificationTitle: `${getVernacularString("landingPage2S4J1Specification3Title", userPreferences.language)}`,
                    keySpecificationContent: `${getVernacularString("landingPage2S4J1Specification3Content", userPreferences.language)}`,
                },
                {
                    keySpecificationIcon: "",
                    keySpecificationTitle: `${getVernacularString("landingPage2S4J1Specification4Title", userPreferences.language)}`,
                    keySpecificationContent: `${getVernacularString("landingPage2S4J1Specification4Content", userPreferences.language)}`,
                },
            ],
            jodiImage: "",
        },
        {
            title: `${getVernacularString("landingPage2S4J2Title", userPreferences.language)}`,
            description: `${getVernacularString("landingPage2S4J2Description", userPreferences.language)}`,
            specificationsTitle: `${getVernacularString("landingPage2S4KeySpecificationTitle", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationIcon: "",
                    keySpecificationTitle: `${getVernacularString("landingPage2S4J2Specification1Title", userPreferences.language)}`,
                    keySpecificationContent: `${getVernacularString("landingPage2S4J2Specification1Content", userPreferences.language)}`,
                },
                {
                    keySpecificationIcon: "",
                    keySpecificationTitle: `${getVernacularString("landingPage2S4J2Specification2Title", userPreferences.language)}`,
                    keySpecificationContent: `${getVernacularString("landingPage2S4J2Specification2Content", userPreferences.language)}`,
                },
                {
                    keySpecificationIcon: "",
                    keySpecificationTitle: `${getVernacularString("landingPage2S4J2Specification3Title", userPreferences.language)}`,
                    keySpecificationContent: `${getVernacularString("landingPage2S4J2Specification3Content", userPreferences.language)}`,
                },
                {
                    keySpecificationIcon: "",
                    keySpecificationTitle: `${getVernacularString("landingPage2S4J2Specification4Title", userPreferences.language)}`,
                    keySpecificationContent: `${getVernacularString("landingPage2S4J2Specification4Content", userPreferences.language)}`,
                },
            ],
            jodiImage: "",
        },
        {
            title: `${getVernacularString("landingPage2S4J3Title", userPreferences.language)}`,
            description: `${getVernacularString("landingPage2S4J3Description", userPreferences.language)}`,
            specificationsTitle: `${getVernacularString("landingPage2S4KeySpecificationTitle", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationIcon: "",
                    keySpecificationTitle: `${getVernacularString("landingPage2S4J3Specification1Title", userPreferences.language)}`,
                    keySpecificationContent: `${getVernacularString("landingPage2S4J3Specification1Content", userPreferences.language)}`,
                },
                {
                    keySpecificationIcon: "",
                    keySpecificationTitle: `${getVernacularString("landingPage2S4J3Specification2Title", userPreferences.language)}`,
                    keySpecificationContent: `${getVernacularString("landingPage2S4J3Specification2Content", userPreferences.language)}`,
                },
                {
                    keySpecificationIcon: "",
                    keySpecificationTitle: `${getVernacularString("landingPage2S4J3Specification3Title", userPreferences.language)}`,
                    keySpecificationContent: `${getVernacularString("landingPage2S4J3Specification3Content", userPreferences.language)}`,
                },
                {
                    keySpecificationIcon: "",
                    keySpecificationTitle: `${getVernacularString("landingPage2S4J3Specification4Title", userPreferences.language)}`,
                    keySpecificationContent: `${getVernacularString("landingPage2S4J3Specification4Content", userPreferences.language)}`,
                },
            ],
            jodiImage: "",
        },
        {
            title: `${getVernacularString("landingPage2S4J4Title", userPreferences.language)}`,
            description: `${getVernacularString("landingPage2S4J4Description", userPreferences.language)}`,
            specificationsTitle: `${getVernacularString("landingPage2S4KeySpecificationTitle", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationIcon: "",
                    keySpecificationTitle: `${getVernacularString("landingPage2S4J4Specification1Title", userPreferences.language)}`,
                    keySpecificationContent: `${getVernacularString("landingPage2S4J4Specification1Content", userPreferences.language)}`,
                },
                {
                    keySpecificationIcon: "",
                    keySpecificationTitle: `${getVernacularString("landingPage2S4J4Specification2Title", userPreferences.language)}`,
                    keySpecificationContent: `${getVernacularString("landingPage2S4J4Specification2Content", userPreferences.language)}`,
                },
                {
                    keySpecificationIcon: "",
                    keySpecificationTitle: `${getVernacularString("landingPage2S4J4Specification3Title", userPreferences.language)}`,
                    keySpecificationContent: `${getVernacularString("landingPage2S4J4Specification3Content", userPreferences.language)}`,
                },
                {
                    keySpecificationIcon: "",
                    keySpecificationTitle: `${getVernacularString("landingPage2S4J4Specification4Title", userPreferences.language)}`,
                    keySpecificationContent: `${getVernacularString("landingPage2S4J4Specification4Content", userPreferences.language)}`,
                },
            ],
            jodiImage: "",
        },
    ];

    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
                <div className="lg-text-headline ">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S4HT1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S4HT2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="lg-bg-secondary-100 tw-rounded-lg tw-w-full tw-px-4">
                    <VerticalSpacer className="tw-h-5" />

                    <div className="lg-text-title1">{JodiData[0].title}</div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="lg-text-body">{JodiData[0].description}</div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="lg-text-title2">{JodiData[0].specificationsTitle}</div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] tw-gap-x-3 tw-gap-y-10">
                        <ItemBuilder
                            items={JodiData[0].keySpecifications}
                            itemBuilder={(keySpecification, keySpecificationIndex) => (
                                <div
                                    className={`tw-row-start-${keySpecificationIndex / 2 + 1} tw-col-start-${(keySpecificationIndex % 2) + 1} tw-flex tw-flex-row tw-items-between tw-gap-3 tw-mx-auto`}
                                >
                                    <div className="tw-w-6 tw-h-6 lg-bg-secondary-500 tw-rounded-full"></div>

                                    <div className="tw-flex tw-flex-col tw-gap-1">
                                        <div className="lg-text-body tw-font-bold">{keySpecification.keySpecificationTitle}</div>
                                        <div className="lg-text-body">{keySpecification.keySpecificationContent}</div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-h-[100px] lg-bg-secondary-500"></div>

                    <VerticalSpacer className="tw-h-6" />
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="lg-cta-button">{getVernacularString("landingPage2S4CTABT", userPreferences.language)}</div>
            </div>
        </div>
    );
}

export function WhyLivguardJodi({userPreferences}: {userPreferences: UserPreferences}) {
    const sectionData = [
        {
            title: `${getVernacularString("landingPage2S5LivH", userPreferences.language)}`,
            content1: `${getVernacularString("landingPage2S5T1", userPreferences.language)}`,
            content2: `${getVernacularString("landingPage2S5T2", userPreferences.language)}`,
            content3: `${getVernacularString("landingPage2S5T3", userPreferences.language)}`,
            content4: `${getVernacularString("landingPage2S5T4", userPreferences.language)}`,
            highlighted: true,
        },
        {
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
                            <div className={`tw-col-start-${itemIndex + 1} lg-bg-secondary-100 tw-rounded-lg tw-p-3 `}>
                                <div className="tw-w-[100px] tw-h-[100px] lg-bg-secondary-500 tw-rounded-lg"></div>

                                <VerticalSpacer className="tw-h-4" />

                                <div className="lg-text-title1">{item.highlighted}</div>

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
            title: "i-Verter LGS 1100",
            image: "",
            bestSeller: false,
        },
        {
            title: "LGS1700PV SW L",
            image: "",
            bestSeller: true,
        },
        {
            title: "Invertuff IT 1545TT",
            image: "",
            bestSeller: true,
        },
        {
            title: "Invertuff IT 1545TT",
            image: "",
            bestSeller: false,
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

                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] tw-gap-x-3 tw-gap-y-10">
                    <ItemBuilder
                        items={sectionData}
                        itemBuilder={(product, productIndex) => (
                            <div className={`tw-row-start-${productIndex / 2 + 1} tw-col-start-${(productIndex % 2) + 1} lg-bg-secondary-100 tw-rounded-lg`}>
                                <div className="tw-flex tw-flex-col tw-justify-between tw-relative tw-px-3">
                                    {product.bestSeller && <div className="tw-absolute tw-right-0 tw-top-0 lg-text-icon tw-px-2 tw-rounded-tr-lg lg-bg-secondary-300 tw-pt-[2px]"> Best Seller </div>}

                                    <VerticalSpacer className="tw-h-8" />

                                    <div className="tw-text-body tw-text-center">{product.title}</div>

                                    <VerticalSpacer className="tw-h-4" />

                                    <div className="tw-w-full tw-h-[100px] lg-bg-secondary-500 tw-rounded-lg"></div>

                                    <VerticalSpacer className="tw-h-4" />

                                    <div className="lg-cta-button tw-translate-y-4 tw-px-4 tw-text-center tw-items-center">{getVernacularString("landingPage2S7CTABT", userPreferences.language)}</div>
                                </div>
                            </div>
                        )}
                    />
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

                <VerticalSpacer className="tw-h-6" />
            </div>
        </div>
    );
}
