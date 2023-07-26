import {ActionFunction, LinksFunction, LoaderFunction, MetaFunction, json} from "@remix-run/node";
import {useActionData, useLoaderData, useSearchParams} from "@remix-run/react";
import {insertServiceRequests} from "~/backend/dealer.server";
import {HeaderComponent} from "~/components/headerComponent";
import {PageScaffold} from "~/components/pageScaffold";
import {getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";
import {CoverImage} from "~/components/images/coverImage";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {useResizeDetector} from "react-resize-detector";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";

// export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
//     const userPreferences: UserPreferences = data.userPreferences;
//     if (userPreferences.language == Language.English) {
//         return {
//             title: "Livguard Services - Reliable Solutions for Your Power Needs",
//             description: "Get reliable and effective Livguard services that ensure seamless performance of your automotive, home, and industrial needs. Contact us for expert solutions.",
//             "og:title": "Livguard Services - Reliable Solutions for Your Power Needs",
//             "og:site_name": "Livguard",
//             "og:url": "https://www.livguard.com/terms-and-condition",
//             "og:description": "Get reliable and effective Livguard services that ensure seamless performance of your automotive, home, and industrial needs. Contact us for expert solutions.",
//             "og:type": "website",
//             "og:image": "",
//         };
//     } else if (userPreferences.language == Language.Hindi) {
//         return {
//             title: "?????",
//             description: "?????",
//         };
//     } else {
//         throw Error(`Undefined language ${userPreferences.language}`);
//     }
// };

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/term-and-condition"}];
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

export default () => {
    const {userPreferences, redirectTo} = useLoaderData() as LoaderData;
    const utmSearchParameters = useUtmSearchParameters();

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
                breadcrumbs={
                    [
                        // {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                        // {contentId: "15a15952-4fe9-4c9e-b07f-fb1467a3614d", link: "#"},
                    ]
                }
            >
                <HeroSection userPreferences={userPreferences} />

                <VerticalSpacer className="tw-h-10" />

                <TermsAndConditionsPage
                    className="tw-max-w-7xl tw-mx-auto"
                    userPreferences={userPreferences}
                />

                <VerticalSpacer className=" tw-h-10" />

                <Eligibility
                    className="tw-max-w-7xl tw-mx-auto"
                    userPreferences={userPreferences}
                />

                <VerticalSpacer className=" tw-h-10" />

                <EntryRequirements
                    className="tw-max-w-7xl tw-mx-auto"
                    userPreferences={userPreferences}
                />

                <VerticalSpacer className="tw-h-10" />

                <EntryDeadline
                    className="tw-max-w-7xl tw-mx-auto"
                    userPreferences={userPreferences}
                />

                <VerticalSpacer className="tw-h-10" />

                <PrizeDetails
                    className="tw-max-w-7xl tw-mx-auto"
                    userPreferences={userPreferences}
                />

                <VerticalSpacer className="tw-h-10" />

                <WinnerSelection
                    className="tw-max-w-7xl tw-mx-auto"
                    userPreferences={userPreferences}
                />

                <VerticalSpacer className="tw-h-10" />

                <WinnerNotification
                    className="tw-max-w-7xl tw-mx-auto"
                    userPreferences={userPreferences}
                />

                <VerticalSpacer className="tw-h-10" />

                <Publicity
                    className="tw-max-w-7xl tw-mx-auto"
                    userPreferences={userPreferences}
                />

                <VerticalSpacer className="tw-h-10" />

                <Compliance
                    className="tw-max-w-7xl tw-mx-auto"
                    userPreferences={userPreferences}
                />

                <VerticalSpacer className="tw-h-10" />

                <ComplianceLocalLaws
                    className="tw-max-w-7xl tw-mx-auto"
                    userPreferences={userPreferences}
                />

                <VerticalSpacer className="tw-h-10" />

                <Liability
                    className="tw-max-w-7xl tw-mx-auto"
                    userPreferences={userPreferences}
                />

                <VerticalSpacer className="tw-h-10" />

                <ModificationTermination
                    className="tw-max-w-7xl tw-mx-auto"
                    userPreferences={userPreferences}
                />

                <VerticalSpacer className="tw-h-10" />

                <ContactInformation
                    className="tw-max-w-7xl tw-mx-auto"
                    userPreferences={userPreferences}
                />

                <VerticalSpacer className="tw-h-10" />

                <VerticalSpacer className="tw-h-20" />
            </PageScaffold>
        </>
    );
};

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-9.5rem)] lg:tw-h-[70vh] tw-grid tw-grid-rows-[3.5rem_auto_1rem_auto_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_1rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left tw-items-center",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={
                        containerHeight > containerWidth || containerWidth < 640 ? "/livguard/terms-and-conditions/1/banner-mobile-tc.jpg" : "/livguard/terms-and-conditions/1/banner-desktop-tc.jpg"
                    }
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/terms-and-conditions/1/banner-mobile-tc.jpg" : "/livguard/terms-and-conditions/1/banner-desktop-tc.jpg"}
                />
            )}

            <DefaultTextAnimation className="lg:tw-row-start-2 tw-row-start-5 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("c20f3105-e059-40f5-8fbf-4f607adf08a9", userPreferences.language)}
                </div>
            </DefaultTextAnimation>
        </div>
    );
}

function TermsAndConditionsPage({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-headline"
                    dangerouslySetInnerHTML={{__html: getVernacularString("78317eea-9cd0-482b-988e-76272191a87d", userPreferences.language)}}
                ></div>
                <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                    <div className="lg-text-body lg-text-secondary-900">{getVernacularString("2dcaf5d9-964e-408d-9348-ac2a6f5aa28d", userPreferences.language)}</div>

                    <div className="lg-text-body lg-text-secondary-900">{getVernacularString("2122f878-eff2-4af4-8510-94913a31665f", userPreferences.language)}</div>

                    <div className="lg-text-body lg-text-secondary-900">{getVernacularString("7936f9fd-37f1-462c-b128-a35148d65307", userPreferences.language)}</div>

                    <div className="lg-text-body lg-text-secondary-900">{getVernacularString("f0a60c22-e48c-49ae-bbc5-c2fbaa8a4079", userPreferences.language)}</div>
                </div>
            </div>
        </div>
    );
}

function Eligibility({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1"
                    dangerouslySetInnerHTML={{__html: getVernacularString("42beb18b-af8a-471c-bc79-4e227a144728", userPreferences.language)}}
                ></div>
                <div className="lg-text-body lg-text-secondary-900">{getVernacularString("396e58f7-ced3-4234-b823-ed5d1876acc9", userPreferences.language)}</div>
            </div>
        </div>
    );
}

function EntryRequirements({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1"
                    dangerouslySetInnerHTML={{__html: getVernacularString("03a0d75d-4a8e-4467-8920-3dcd8754d532", userPreferences.language)}}
                ></div>
                <div className="lg-text-body lg-text-secondary-900">{getVernacularString("fc7cc648-ad54-41f7-97bd-a8d9436198b7", userPreferences.language)}</div>
            </div>
        </div>
    );
}

function EntryDeadline({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1"
                    dangerouslySetInnerHTML={{__html: getVernacularString("4fd59896-0e7e-4941-9f45-533eee7d3d58", userPreferences.language)}}
                ></div>
                <div className="lg-text-body lg-text-secondary-900">{getVernacularString("a3c2f2c2-f763-4448-bde7-05df14f33b02", userPreferences.language)}</div>
            </div>
        </div>
    );
}

function PrizeDetails({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1"
                    dangerouslySetInnerHTML={{__html: getVernacularString("afbb26d7-3eab-470d-93a7-09ebcbb9241b", userPreferences.language)}}
                ></div>
                <div
                    className="lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: getVernacularString("d5128079-075b-4e7b-9c09-c99ace37c173", userPreferences.language)}}
                ></div>
            </div>
        </div>
    );
}

function WinnerSelection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1"
                    dangerouslySetInnerHTML={{__html: getVernacularString("1dcc125e-a230-4df4-93de-7729ac296b0a", userPreferences.language)}}
                ></div>
                <div
                    className="lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: getVernacularString("344eda0b-5cba-4d61-b0b6-36f09b7b4b09", userPreferences.language)}}
                ></div>
            </div>
        </div>
    );
}

function WinnerNotification({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1"
                    dangerouslySetInnerHTML={{__html: getVernacularString("eedccb31-f56d-4745-9cf8-9d5a7596df5f", userPreferences.language)}}
                ></div>
                <div className="lg-text-body lg-text-secondary-900">{getVernacularString("f3fac268-6cf3-4e6f-b1af-69b32ed06748", userPreferences.language)}</div>
            </div>
        </div>
    );
}

function Publicity({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1"
                    dangerouslySetInnerHTML={{__html: getVernacularString("e98b6392-6416-4deb-a9d2-907d5e9085e9", userPreferences.language)}}
                ></div>
                <div className="lg-text-body lg-text-secondary-900">{getVernacularString("fbe27bfc-b4e6-415e-9da6-03f32b0fa49f", userPreferences.language)}</div>
            </div>
        </div>
    );
}

function Compliance({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1"
                    dangerouslySetInnerHTML={{__html: getVernacularString("903c88c4-6eee-42cb-85ab-d1b7e781d162", userPreferences.language)}}
                ></div>
                <div
                    className="lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: getVernacularString("c0455240-1838-4886-9320-6e41ea6c7519", userPreferences.language)}}
                ></div>
            </div>
        </div>
    );
}

function ComplianceLocalLaws({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1"
                    dangerouslySetInnerHTML={{__html: getVernacularString("f63831d0-7292-4301-8c0d-0f5dc08dcad2", userPreferences.language)}}
                ></div>
                <div className="lg-text-body lg-text-secondary-900">{getVernacularString("4e308bc4-78ed-44d6-95a0-307d4cfee4e3", userPreferences.language)}</div>
            </div>
        </div>
    );
}

function Liability({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1"
                    dangerouslySetInnerHTML={{__html: getVernacularString("fc6abbbc-ea85-41ec-99bb-486c523c034b", userPreferences.language)}}
                ></div>
                <div className="lg-text-body lg-text-secondary-900">{getVernacularString("83c6a3f5-0834-41e6-a3eb-42f2d9edffcf", userPreferences.language)}</div>
            </div>
        </div>
    );
}

function ModificationTermination({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1"
                    dangerouslySetInnerHTML={{__html: getVernacularString("264cae06-3f7f-4ad5-8739-4fc63a6cc75e", userPreferences.language)}}
                ></div>
                <div
                    className="lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: getVernacularString("e93e6803-0cca-43a1-938f-01a3532b85ca", userPreferences.language)}}
                ></div>
            </div>
        </div>
    );
}

function ContactInformation({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1"
                    dangerouslySetInnerHTML={{__html: getVernacularString("8d833cfb-bef1-4119-b0fc-7b0d7948ca89", userPreferences.language)}}
                ></div>
                <div className="lg-text-body lg-text-secondary-900">{getVernacularString("15e2d1a3-ff2c-4d82-929a-7d8044d249b1", userPreferences.language)}</div>
                <div className="lg-text-body lg-text-secondary-900">{getVernacularString("7552810b-bd7c-40ca-9136-c94ca1bedc0d", userPreferences.language)}</div>
            </div>
        </div>
    );
}

// function DisclaimerOfWarranties({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
//     return (
//         <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
//             <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
//                 <div
//                     className="lg-text-title1"
//                     dangerouslySetInnerHTML={{__html: getVernacularString("b0f9c01f-a82d-45a7-8546-685567cd7591", userPreferences.language)}}
//                 ></div>
//                 <div className="lg-text-body lg-text-secondary-900">{getVernacularString("7dba2dc9-b153-4216-bbf6-d965332c0e12", userPreferences.language)}</div>
//             </div>
//         </div>
//     );
// }

// function Indemnification({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
//     return (
//         <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
//             <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
//                 <div
//                     className="lg-text-title1"
//                     dangerouslySetInnerHTML={{__html: getVernacularString("3b74dadf-3333-4c76-acbd-5c1ecd7deb7f", userPreferences.language)}}
//                 ></div>
//                 <div className="lg-text-body lg-text-secondary-900">{getVernacularString("e3304f79-e46e-4eef-aebb-f57b637f2b14", userPreferences.language)}</div>
//             </div>
//         </div>
//     );
// }

// function Severability({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
//     return (
//         <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
//             <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
//                 <div
//                     className="lg-text-title1"
//                     dangerouslySetInnerHTML={{__html: getVernacularString("a7084225-0803-48c7-b01a-a4afbf547313", userPreferences.language)}}
//                 ></div>
//                 <div className="lg-text-body lg-text-secondary-900">{getVernacularString("e9700119-8143-4956-81dc-fa03ff519f80", userPreferences.language)}</div>
//             </div>
//         </div>
//     );
// }

// function Termination({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
//     return (
//         <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
//             <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
//                 <div
//                     className="lg-text-title1"
//                     dangerouslySetInnerHTML={{__html: getVernacularString("5f5fc2cb-35c1-4f59-8974-5fcb014eb17f", userPreferences.language)}}
//                 ></div>
//                 <div
//                     className="lg-text-body lg-text-secondary-900"
//                     dangerouslySetInnerHTML={{__html: getVernacularString("9394bd5d-8e93-41b3-ac77-993ceb0ded94", userPreferences.language)}}
//                 ></div>
//             </div>
//         </div>
//     );
// }

// function EntireAgreement({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
//     return (
//         <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
//             <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
//                 <div
//                     className="lg-text-title1"
//                     dangerouslySetInnerHTML={{__html: getVernacularString("c484926d-4b74-49b7-a48c-6de59678fdf6", userPreferences.language)}}
//                 ></div>
//                 <div
//                     className="lg-text-body lg-text-secondary-900"
//                     dangerouslySetInnerHTML={{__html: getVernacularString("4519b623-bbc3-4576-a1b9-26c6254dd47e", userPreferences.language)}}
//                 ></div>
//             </div>
//         </div>
//     );
// }

// function GoverningLaw({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
//     return (
//         <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
//             <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
//                 <div
//                     className="lg-text-title1"
//                     dangerouslySetInnerHTML={{__html: getVernacularString("1af3f0bb-75d3-4d8f-8661-a03e8d9c569d", userPreferences.language)}}
//                 ></div>
//                 <div className="lg-text-body lg-text-secondary-900">{getVernacularString("c27d7e42-b4a3-4e93-8c2d-c7d12cd6010e", userPreferences.language)}</div>
//             </div>
//         </div>
//     );
// }

// function ChangesToTerms({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
//     return (
//         <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
//             <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
//                 <div
//                     className="lg-text-title1"
//                     dangerouslySetInnerHTML={{__html: getVernacularString("3f67f49f-92ab-434c-b9eb-8d4e9d75a115", userPreferences.language)}}
//                 ></div>
//                 <div
//                     className="lg-text-body lg-text-secondary-900"
//                     dangerouslySetInnerHTML={{__html: getVernacularString("34a39f63-6f7d-430d-9c6c-7eefe5e9bf33", userPreferences.language)}}
//                 ></div>
//             </div>
//         </div>
//     );
// }

// function ContactInformaton({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
//     return (
//         <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
//             <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
//                 <div
//                     className="lg-text-title1"
//                     dangerouslySetInnerHTML={{__html: getVernacularString("508d2a70-f673-4119-8776-4405f6987780", userPreferences.language)}}
//                 ></div>
//                 <div className="lg-text-body lg-text-secondary-900">{getVernacularString("82ce1187-230a-4182-9090-a0a42cc54ef0", userPreferences.language)}</div>
//             </div>
//         </div>
//     );
// }
