import {ActionFunction, json} from "@remix-run/node";
import {updateWarrantyRecordWithDob} from "~/backend/dealer.server";
import {getStringFromUnknown, getUuidFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";

export type ActionData = {
    error: string | null;
    submitedSuccessfully: boolean;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const uuid = safeParse(getUuidFromUnknown, body.get("uuid"));
    const dateOfBirth = safeParse(getStringFromUnknown, body.get("dateOfBirth"));

    if (uuid == null || dateOfBirth == null) {
        const actionData: ActionData = {
            error: "Inputs cannot be null! Error code: bc4a86c3-068c-4a81-a521-b108552e1960",
            submitedSuccessfully: false,
        };
        return actionData;
    }

    const updateWarrantyRecordResult = await updateWarrantyRecordWithDob(uuid, dateOfBirth);

    if (updateWarrantyRecordResult instanceof Error) {
        const actionData: ActionData = {
            error: "Error in submitting date of birth! Error code: d304e2fc-5f72-40c3-b3fc-3a42d1a6e7f5",
            submitedSuccessfully: false,
        };
        return actionData;
    }

    const actionData: ActionData = {
        error: null,
        submitedSuccessfully: true,
    };

    return json(actionData);
};
