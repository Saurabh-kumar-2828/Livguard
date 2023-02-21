import {ActionFunction, json} from "@remix-run/node";
import {insertDealerLeads} from "~/backend/dealer.server";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {Dealer} from "~/typeDefinitions";

type DealerLocatorActionData = {
    dealerList: Array<Dealer>;
    path: string;
    error: string;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const phoneNumber = safeParse(getNonEmptyStringFromUnknown, body.get("phoneNumber"));
    const name = safeParse(getNonEmptyStringFromUnknown, body.get("name"));
    const city = safeParse(getNonEmptyStringFromUnknown, body.get("city"));

    if(city == null || name == null || phoneNumber == null){
        const actionData: DealerLocatorActionData = {
            dealerList: [],
            path:"/applyForDealership",
            error:"Error in submitting Form"
        }
        return json(actionData);
    }

    await insertDealerLeads({phoneNumber:phoneNumber,name:name,city:city});

    const actionData: DealerLocatorActionData = {
        dealerList: [],
        error: "",
        path: "/applyForDealership",
    };

    return json(actionData);
};
