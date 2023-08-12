import {ActionFunction, json} from "@remix-run/node";
import {getDealersForPinCode, updateWarrantyRecordWithDob} from "~/backend/dealer.server";
import {getStringFromUnknown, getUuidFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {Dealer} from "~/typeDefinitions";

export type DealerActionData = {
    error: string | null;
    submitedSuccessfully: boolean;
    dealers: Array<Dealer> | null;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const pinCode = safeParse(getStringFromUnknown, body.get("pincode"));

    if (pinCode == null) {
        const actionData: DealerActionData = {
            error: "Pincode cannot be null! Error Code: 7e61a0ad-2c59-473e-8eda-20e26647a0d7",
            submitedSuccessfully: false,
            dealers: null,
        };
        return actionData;
    }

    if (pinCode.length !== 6) {
        const actionData: DealerActionData = {
            error: "Pincode must be 6 characters long! Error Code: 7e61a0ad-2c59-473e-8eda-20e26647a0d7",
            submitedSuccessfully: false,
            dealers: null,
        };
        return actionData;
    }

    const dealers = await getDealersForPinCode(pinCode);

    if (dealers instanceof Error) {
        const actionData: DealerActionData = {
            error: "Error in finding dealers! Error code: fd5f97fe-4911-4c3d-a9b5-3b3617ad8d30",
            submitedSuccessfully: false,
            dealers: null,
        };
        return actionData;
    }

    const actionData: DealerActionData = {
        error: null,
        submitedSuccessfully: true,
        dealers: dealers,
    };

    return json(actionData);
};
