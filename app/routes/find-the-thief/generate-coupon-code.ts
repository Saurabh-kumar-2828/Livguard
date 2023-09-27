import {ActionFunction} from "@remix-run/node";
import {insertCouponCodeEntry} from "~/backend/find-the-thief.server";
import {generateUuid} from "~/global-common-typescript/utilities/utilities";

function generateRandomCode(length: number): string {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomCode = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomCode += charset.charAt(randomIndex);
    }

    return randomCode;
}

type ActionData = {
    couponCode: string | null;
    error: string | null;
};

export const action: ActionFunction = async ({request, params}) => {
    const couponCode = generateRandomCode(6);

    const result = insertCouponCodeEntry(generateUuid(), couponCode);

    if (result instanceof Error) {
        const actionData: ActionData = {
            couponCode: null,
            error: "Error in generating coupon code. Error code: 11c650ff-4f52-4ab7-bb63-b88eb57cf5bd",
        };
        return actionData;
    }

    const actionData: ActionData = {
        couponCode: couponCode,
        error: null,
    };
    return actionData;
};
