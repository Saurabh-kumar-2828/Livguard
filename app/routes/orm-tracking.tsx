import type {ActionFunction, LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {Form, useActionData, useLoaderData} from "@remix-run/react";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {sendDataToFreshsalesForOrmTracking} from "~/backend/freshsales.server";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {emailIdValidationPattern, phoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {CampaignPageScaffold} from "~/routes/campaigns/campaignPageScaffold.component";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export type OrmActionData = {
    error: string | null;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const product = safeParse(getStringFromUnknown, body.get("product"));
    const name = safeParse(getStringFromUnknown, body.get("name"));
    const phoneNumber = safeParse(getStringFromUnknown, body.get("phoneNumber"));
    const emailId = safeParse(getStringFromUnknown, body.get("emailId"));
    const queryDetails = safeParse(getStringFromUnknown, body.get("queryDetails"));

    if (product == null || name == null || phoneNumber == null || emailId == null || queryDetails == null) {
        const actionData: OrmActionData = {
            error: "Error in submitting form! Error code: e4f2d4a9-5d01-43b9-8ba7-6b0c6fae739c",
        };
        return json(actionData);
    }

    const contactData = {
        product: product,
        name: name,
        phoneNumber: phoneNumber,
        emailId: emailId,
        queryDetails: queryDetails,
    };

    const freshsalesResult = await sendDataToFreshsalesForOrmTracking(contactData);
    if (freshsalesResult instanceof Error) {
        const actionData: OrmActionData = {
            error: "Error in submitting form! Error code: 5469eb34-11d4-4b71-8055-d576beb78bdf",
        };
        return json(actionData);
    }

    const actionData: OrmActionData = {
        error: null,
    };
    return json(actionData);
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
        redirectTo: "/orm-tracking",
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo} = useLoaderData() as LoaderData;
    const actionData = useActionData() as OrmActionData;

    const utmSearchParameters = useUtmSearchParameters();

    useEffect(() => {
        if (actionData != null) {
            if (actionData.error != null) {
                toast.error(actionData.error);
                return;
            }
            toast.success("Data sent to fresh sales successfully");
        }
    }, [actionData]);

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
                <ContactForm userPreferences={userPreferences} />
            </CampaignPageScaffold>
        </>
    );
}

export function ContactForm({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-flex tw-flex-col tw-justify-center tw-w-full")}
            id="contactUs"
        >
            <VerticalSpacer className="tw-h-10" />

            <div className="lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("ormTrackingH1", userPreferences.language)}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-10" />

            <DefaultElementAnimation className="tw-flex tw-justify-center tw-w-full">
                <Form
                    className="tw-w-full tw-max-w-[60rem] lg-bg-secondary-100 lg-text-secondary-900 tw-rounded-lg lg-px-screen-edge tw-grid tw-grid-flow-row tw-gap-6 tw-py-10"
                    method="post"
                >
                    <div className="tw-w-full tw-grid tw-grid-flow-row lg:tw-grid-flow-col lg:tw-grid-cols-2 tw-gap-6">
                        <div className="tw-w-full tw-flex tw-flex-col">
                            <div className="lg-text-body-bold tw-pl-3">{getVernacularString("ormTrackingFormT1", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <select
                                className="lg-text-input"
                                name="product"
                            >
                                <option
                                    value="Inverter"
                                    selected
                                >
                                    {getVernacularString("ormTrackingFormProduct1", userPreferences.language)}
                                </option>
                                <option value="Battery">{getVernacularString("ormTrackingFormProduct2", userPreferences.language)}</option>
                                <option value="Inverter & Battery">{getVernacularString("ormTrackingFormProduct3", userPreferences.language)}</option>
                                <option value="Solar">{getVernacularString("ormTrackingFormProduct4", userPreferences.language)}</option>
                            </select>
                        </div>
                        <div className="">
                            <div className="lg-text-body-bold tw-pl-3">{getVernacularString("ormTrackingFormT4", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <input
                                type="text"
                                name="name"
                                className="lg-text-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="tw-w-full tw-grid tw-grid-flow-row lg:tw-grid-flow-col tw-gap-6">
                        <div className="tw-w-full tw-flex tw-flex-col">
                            <div className="lg-text-body-bold tw-pl-3">{getVernacularString("ormTrackingFormT5", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <input
                                type="text"
                                name="phoneNumber"
                                className="lg-text-input"
                                pattern={phoneNumberValidationPattern}
                                required
                            />
                        </div>
                        <div className="">
                            <div className="lg-text-body-bold tw-pl-3">{getVernacularString("ormTrackingFormT6", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <input
                                type="text"
                                name="emailId"
                                className="lg-text-input"
                                pattern={emailIdValidationPattern}
                                required
                            />
                        </div>
                    </div>

                    <div className="tw-w-full tw-grid tw-grid-flow-row lg:tw-grid-flow-col tw-gap-6">
                        <div className="tw-w-full tw-flex tw-flex-col">
                            <div className="lg-text-body-bold tw-pl-3">{getVernacularString("ormTrackingFormT13", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <textarea
                                name="queryDetails"
                                className="lg-text-input !tw-rounded-lg"
                                rows={3}
                                required
                            />
                        </div>
                    </div>

                    <div className="tw-w-full tw-flex tw-justify-center">
                        <button
                            type="submit"
                            className="lg-cta-button tw-px-4 tw-self-center tw-w-60"
                        >
                            {getVernacularString("ormTrackingFormSubmit", userPreferences.language)}
                        </button>
                    </div>
                </Form>
            </DefaultElementAnimation>
        </div>
    );
}
