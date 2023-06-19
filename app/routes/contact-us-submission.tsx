import type {ActionFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {insertContactFormLeads} from "~/backend/dealer.server";
import {getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {generateUuid} from "~/global-common-typescript/utilities/utilities";

export type GenericActionData = {
    error: string | null;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const name = safeParse(getStringFromUnknown, body.get("name"));
    const emailId = safeParse(getStringFromUnknown, body.get("email"));
    const utmParameters = safeParse(getStringFromUnknown, body.get("utmParameters"));
    const formType = safeParse(getStringFromUnknown, body.get("formType"));
    const termsAndConditionsChecked = safeParse(getStringFromUnknown, body.get("termsAndConditionsChecked"));
    const details = safeParse(getStringFromUnknown, body.get("queryDetails"));
    let phoneNumber: string | null = "";
    let product: string | null = "";
    let rating: string | null = "";
    let complaintType: string | null = "";

    if (formType == "complaintForm") {
        phoneNumber = safeParse(getStringFromUnknown, body.get("phoneNumber"));
        complaintType = safeParse(getStringFromUnknown, body.get("complaintOption"));
    }

    if (formType == "feedbackForm") {
        product = safeParse(getStringFromUnknown, body.get("product"));
        rating = safeParse(getStringFromUnknown, body.get("rating"));
    }

    if (
        utmParameters == null ||
        name == null ||
        emailId == null ||
        phoneNumber == null ||
        formType == null ||
        rating == null ||
        product == null ||
        termsAndConditionsChecked == null ||
        details == null ||
        complaintType == null
    ) {
        const actionData: GenericActionData = {
            error: "Inputs can't be null! Error code: 2dc8402e-24b3-4a7e-9024-64cc9ba14ad4",
        };
        return json(actionData);
    }

    const utmParametersDecoded = JSON.parse(utmParameters);

    if (formType == "feedbackForm") {
        const insertResult = await insertContactFormLeads(generateUuid(), {
            name: name,
            emailId: emailId,
            product: product,
            rating: rating,
            detials: details,
            formType: formType,
            utmParameters: utmParametersDecoded,
            termsAndConditionsChecked: termsAndConditionsChecked,
        });
        if (insertResult instanceof Error) {
            const actionData: GenericActionData = {
                error: "Error in submitting form! Error code: 48584397-7140-40fa-93e2-4804fc63ca40",
            };
            return json(actionData);
        }
    } else {
        const insertResult = await insertContactFormLeads(generateUuid(), {
            name: name,
            emailId: emailId,
            phoneNumber: phoneNumber,
            complaintType: complaintType,
            detials: details,
            formType: formType,
            utmParameters: utmParametersDecoded,
            termsAndConditionsChecked: termsAndConditionsChecked,
        });
        if (insertResult instanceof Error) {
            const actionData: GenericActionData = {
                error: "Error in submitting form! Error code: a6f5b2c8-c0a9-41e2-a093-268158313671",
            };
            return json(actionData);
        }
    }

    const actionData: GenericActionData = {
        error: null,
    };

    return json(actionData);
};
