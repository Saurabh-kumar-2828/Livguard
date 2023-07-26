import {emailIdValidationPattern, indianPhoneNumberValidationPattern, pinCodeValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";

export enum WarrantyFormActionTypes {
    SetContactNumber,
    SetEmail,
    SetName,
    SetPincode,
    SetCity,
    SetState,
    SetProducts,
    RemoveProductFromIndex,
}

export enum WarrantyFormFieldKeys {
    contactNumber = "contactNumber",
    email = "email",
    name = "name",
    pincode = "pincode",
    city = "city",
    state = "state",
    products = "products",
}

export type WarrantyProduct = {
    productType: string;
    serialNumber: string;
    purchaseProof: string;
};

export interface WarrantyFormStateInputsAction {
    type: WarrantyFormActionTypes;
    payload: any;
}

export interface WarrantyFormStateInputs {
    [WarrantyFormFieldKeys.contactNumber]: string;
    [WarrantyFormFieldKeys.email]: string;
    [WarrantyFormFieldKeys.name]: string;
    [WarrantyFormFieldKeys.pincode]: string;
    [WarrantyFormFieldKeys.city]: string;
    [WarrantyFormFieldKeys.state]: string;
    [WarrantyFormFieldKeys.products]: Array<WarrantyProduct>;
}

export const warrantyFormInitialState: WarrantyFormStateInputs = {
    [WarrantyFormFieldKeys.contactNumber]: "",
    [WarrantyFormFieldKeys.email]: "",
    [WarrantyFormFieldKeys.name]: "",
    [WarrantyFormFieldKeys.pincode]: "",
    [WarrantyFormFieldKeys.city]: "",
    [WarrantyFormFieldKeys.state]: "",
    [WarrantyFormFieldKeys.products]: [
        {
            productType: "",
            serialNumber: "",
            purchaseProof: "",
        },
    ],
};

export function WarrantyFormReducer(state: WarrantyFormStateInputs, action: WarrantyFormStateInputsAction): WarrantyFormStateInputs {
    switch (action.type) {
        case WarrantyFormActionTypes.SetContactNumber: {
            const contactNumber = action.payload;
            const newState: WarrantyFormStateInputs = structuredClone(state);

            newState[WarrantyFormFieldKeys.contactNumber] = contactNumber;

            return newState;
        }
        case WarrantyFormActionTypes.SetEmail: {
            const email = action.payload;
            const newState: WarrantyFormStateInputs = structuredClone(state);

            newState[WarrantyFormFieldKeys.email] = email;

            return newState;
        }
        case WarrantyFormActionTypes.SetName: {
            const name = action.payload;
            const newState: WarrantyFormStateInputs = structuredClone(state);

            newState[WarrantyFormFieldKeys.name] = name;

            return newState;
        }
        case WarrantyFormActionTypes.SetPincode: {
            const pincode = action.payload;
            const newState: WarrantyFormStateInputs = structuredClone(state);

            newState[WarrantyFormFieldKeys.pincode] = pincode;

            return newState;
        }
        case WarrantyFormActionTypes.SetCity: {
            const city = action.payload;
            const newState: WarrantyFormStateInputs = structuredClone(state);

            newState[WarrantyFormFieldKeys.city] = city;

            return newState;
        }
        case WarrantyFormActionTypes.SetState: {
            const userState = action.payload;
            const newState: WarrantyFormStateInputs = structuredClone(state);

            newState[WarrantyFormFieldKeys.state] = userState;

            return newState;
        }
        case WarrantyFormActionTypes.SetProducts: {
            const {productIndex, type, value} = action.payload;
            const newState: WarrantyFormStateInputs = structuredClone(state);

            if (type === "addProduct") {
                newState.products.push({
                    productType: "",
                    serialNumber: "",
                    purchaseProof: "",
                });
                return newState;
            }

            if (type in newState[WarrantyFormFieldKeys.products][productIndex]) {
                newState[WarrantyFormFieldKeys.products][productIndex][type] = value;
            }

            return newState;
        }
        case WarrantyFormActionTypes.RemoveProductFromIndex: {
            const index = action.payload;
            const newState: WarrantyFormStateInputs = structuredClone(state);

            newState.products.splice(index, 1);
            return newState;
        }
        default: {
            throw new Error(`Encountered unexpected WarrantyFormActionTypes: ${action.type}! Error code: 82afc8a6-5c02-441d-ab6c-5cc25739a093`);
        }
    }
}

export const warrantyFormErrorMessages = {
    [WarrantyFormFieldKeys.contactNumber]: {
        emptyMessage: "Contact Number cannot be empty",
        pattern: indianPhoneNumberValidationPattern,
        invalidMessage: "Contact Number is not valid",
    },
    [WarrantyFormFieldKeys.email]: {
        emptyMessage: "Email cannot be empty",
        pattern: emailIdValidationPattern,
        invalidMessage: "Email is not valid",
    },
    [WarrantyFormFieldKeys.name]: {
        emptyMessage: "Name cannot be empty",
        pattern: "",
        invalidMessage: "",
    },
    [WarrantyFormFieldKeys.pincode]: {
        emptyMessage: "Pin Code cannot be empty",
        pattern: pinCodeValidationPattern,
        invalidMessage: "Pin Code is not valid",
    },
    [WarrantyFormFieldKeys.city]: {
        emptyMessage: "City cannot be empty",
        pattern: "",
        invalidMessage: "",
    },
    [WarrantyFormFieldKeys.state]: {
        emptyMessage: "State cannot be empty",
        pattern: "",
        invalidMessage: "",
    },
    [WarrantyFormFieldKeys.products]: {
        productType: {
            emptyMessage: "Please select a product type",
            pattern: "",
            invalidMessage: "",
        },
        serialNumber: {
            emptyMessage: "Serial Number cannot be empty",
            pattern: "",
            invalidMessage: "",
        },
        purchaseProof: {
            emptyMessage: "Please add Purchase Proof",
            pattern: "",
            invalidMessage: "",
        },
    },
};
