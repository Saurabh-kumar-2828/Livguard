import type {ActionFunction, LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {Form, useActionData, useLoaderData} from "@remix-run/react";
import {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {sendDataToFreshsalesForOrmTracking} from "~/backend/freshsales.server";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {emailIdValidationPattern, phoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {CampaignPageScaffold} from "~/routes/campaigns/campaignPageScaffold.component";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {getUrlFromRequest} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";

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
    pageUrl: string;
    vernacularData: {
        [id: string]: string;
    };
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const vernacularData = getVernacularFromBackend("ormTrackingPage", userPreferences.language);

    const pageUrl = getUrlFromRequest(request);
    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: "/orm-tracking",
        pageUrl: pageUrl,
        vernacularData: vernacularData,
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, pageUrl, vernacularData} = useLoaderData() as LoaderData;
    const actionData = useActionData() as OrmActionData;
    const [refreshForm, setRefreshForm] = useState(false);

    const utmSearchParameters = useUtmSearchParameters();

    useEffect(() => {
        if (actionData != null) {
            if (actionData.error != null) {
                toast.error(actionData.error);
                setRefreshForm(false);
                return;
            }
            toast.success("Data sent to fresh sales successfully");
            setRefreshForm(true);
        }
    }, [actionData]);

    return (
        <>
            <ContentProviderContext.Provider
                value={{
                    getContent: getContentGenerator(vernacularData),
                }}
            >
                <CampaignPageScaffold
                    userPreferences={userPreferences}
                    redirectTo={redirectTo}
                    showMobileMenuIcon={false}
                    utmParameters={utmSearchParameters}
                    showContactCtaButton={false}
                    showSearchOption={false}
                    pageUrl={pageUrl}
                >
                    <ContactForm
                        userPreferences={userPreferences}
                        refreshForm={refreshForm}
                    />
                </CampaignPageScaffold>
            </ContentProviderContext.Provider>
        </>
    );
}

export function ContactForm({userPreferences, refreshForm}: {userPreferences: UserPreferences; refreshForm: boolean}) {
    const contentData = useContext(ContentProviderContext);
    type FormInputs = {
        product: string;
        name: string;
        phoneNumber: string;
        email: string;
        queryDetails: string;
    };

    const [formInputs, setFormInputs] = useState<FormInputs>({
        product: "",
        name: "",
        phoneNumber: "",
        email: "",
        queryDetails: "",
    });

    useEffect(() => {
        if (refreshForm) {
            setFormInputs({product: "", name: "", phoneNumber: "", email: "", queryDetails: ""});
        }
    }, [refreshForm]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-flex tw-flex-col tw-justify-center tw-w-full")}
            id="contactUs"
        >
            <VerticalSpacer className="tw-h-10" />

            <div className="lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("ormTrackingH1")}} />
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
                            <div className="lg-text-body-bold tw-pl-3">{contentData.getContent("ormTrackingFormT1")}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <select
                                className="lg-text-input"
                                name="product"
                                onChange={(e) => {
                                    const newState: FormInputs = structuredClone(formInputs);
                                    newState.product = e.target.value;
                                    setFormInputs(newState);
                                }}
                                value={formInputs.product}
                            >
                                <option
                                    value="Inverter"
                                    selected
                                >
                                    {contentData.getContent("ormTrackingFormProduct1")}
                                </option>
                                <option value="Battery">{contentData.getContent("ormTrackingFormProduct2")}</option>
                                <option value="Inverter & Battery">{contentData.getContent("ormTrackingFormProduct3")}</option>
                                <option value="Solar">{contentData.getContent("ormTrackingFormProduct4")}</option>
                            </select>
                        </div>
                        <div className="">
                            <div className="lg-text-body-bold tw-pl-3">{contentData.getContent("ormTrackingFormT4")}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <input
                                type="text"
                                name="name"
                                className="lg-text-input"
                                onChange={(e) => {
                                    const newState: FormInputs = structuredClone(formInputs);
                                    newState.name = e.target.value;
                                    setFormInputs(newState);
                                }}
                                value={formInputs.name}
                            />
                        </div>
                    </div>

                    <div className="tw-w-full tw-grid tw-grid-flow-row lg:tw-grid-flow-col tw-gap-6">
                        <div className="tw-w-full tw-flex tw-flex-col">
                            <div className="lg-text-body-bold tw-pl-3">{contentData.getContent("ormTrackingFormT5")}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <input
                                type="text"
                                name="phoneNumber"
                                className="lg-text-input"
                                pattern={phoneNumberValidationPattern}
                                onChange={(e) => {
                                    const newState: FormInputs = structuredClone(formInputs);
                                    newState.phoneNumber = e.target.value;
                                    setFormInputs(newState);
                                }}
                                value={formInputs.phoneNumber}
                            />
                        </div>
                        <div className="">
                            <div className="lg-text-body-bold tw-pl-3">{contentData.getContent("ormTrackingFormT6")}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <input
                                type="text"
                                name="emailId"
                                className="lg-text-input"
                                pattern={emailIdValidationPattern}
                                onChange={(e) => {
                                    const newState: FormInputs = structuredClone(formInputs);
                                    newState.email = e.target.value;
                                    setFormInputs(newState);
                                }}
                                value={formInputs.email}
                            />
                        </div>
                    </div>

                    <div className="tw-w-full tw-grid tw-grid-flow-row lg:tw-grid-flow-col tw-gap-6">
                        <div className="tw-w-full tw-flex tw-flex-col">
                            <div className="lg-text-body-bold tw-pl-3">{contentData.getContent("ormTrackingFormT13")}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <textarea
                                name="queryDetails"
                                className="lg-text-input !tw-rounded-lg"
                                rows={3}
                                onChange={(e) => {
                                    const newState: FormInputs = structuredClone(formInputs);
                                    newState.queryDetails = e.target.value;
                                    setFormInputs(newState);
                                }}
                                value={formInputs.queryDetails}
                            />
                        </div>
                    </div>

                    <div className="tw-w-full tw-flex tw-justify-center">
                        <button
                            type="submit"
                            className="lg-cta-button tw-px-4 tw-self-center tw-w-60"
                        >
                            {contentData.getContent("ormTrackingFormSubmit")}
                        </button>
                    </div>
                </Form>
            </DefaultElementAnimation>
        </div>
    );
}
