export enum FormStateInputsActionType {
    SetName,
    SetEmail,
    SetPhoneNumber,
    SetOtpSubmitted,
    SetCity,
    SetFormSuccessfullySubmited,
    SetShowOtpButton,
    SetShowOtpField,
    SetInvalidOtp,
    SetIsOtpResent,
    TryToCloseDialog,
    SendOtp,
}

export type FormStateInputs = {
    inputData : {
        name: string;
        email: string;
        phoneNumber: string;
        city: string;
        otpSubmitted: string;
    }
    formSuccessfullySubmitted: boolean;
    showOtpButton: boolean;
    showOtpField: boolean;
    invalidOtp: boolean;
    isOtpresent: boolean;
}

export type FormStateInputsAction = {
    actionType: FormStateInputsActionType;
    payload: any;
};

export function FormStateInputsReducer(state: FormStateInputs, action: FormStateInputsAction): FormStateInputs {
    switch (action.actionType) {
        case FormStateInputsActionType.SetName: {
            // TODO: Validate that these exist?
            const name = action.payload;

            const newState: FormStateInputs = structuredClone(state);

            newState.inputData.name = name;

            return newState;
        }
        case FormStateInputsActionType.SetEmail: {
            // TODO: Validate that these exist?
            const email = action.payload;

            const newState: FormStateInputs = structuredClone(state);

            newState.inputData.email = email;

            return newState;
        }
        case FormStateInputsActionType.SetPhoneNumber: {
            // TODO: Validate that these exist?
            const phoneNumber = action.payload;

            const newState: FormStateInputs = structuredClone(state);

            newState.inputData.phoneNumber = phoneNumber;

            return newState;
        }
        case FormStateInputsActionType.SetCity: {
            // TODO: Validate that these exist?
            const city = action.payload;

            const newState: FormStateInputs = structuredClone(state);

            newState.inputData.city = city;

            return newState;
        }
        case FormStateInputsActionType.SetOtpSubmitted: {
            // TODO: Validate that these exist?
            const otpSubmitted = action.payload;

            const newState: FormStateInputs = structuredClone(state);

            newState.inputData.otpSubmitted = otpSubmitted;

            return newState;
        }
        case FormStateInputsActionType.SetFormSuccessfullySubmited: {
            // TODO: Validate that these exist?
            const formSuccessfullySubmitted = action.payload;

            const newState: FormStateInputs = structuredClone(state);

            newState.formSuccessfullySubmitted = formSuccessfullySubmitted;

            return newState;
        }
        case FormStateInputsActionType.SetInvalidOtp: {
            // TODO: Validate that these exist?
            const isInavalidOtp = action.payload;

            const newState: FormStateInputs = structuredClone(state);

            newState.invalidOtp = isInavalidOtp;

            return newState;
        }
        case FormStateInputsActionType.SetIsOtpResent: {
            // TODO: Validate that these exist?
            const isOtpResent = action.payload;

            const newState: FormStateInputs = structuredClone(state);

            newState.isOtpresent = isOtpResent;

            return newState;
        }
        case FormStateInputsActionType.SetShowOtpButton: {
            // TODO: Validate that these exist?
            const shoeOtpButton = action.payload;

            const newState: FormStateInputs = structuredClone(state);

            newState.showOtpButton = shoeOtpButton;

            return newState;
        }
        case FormStateInputsActionType.SetShowOtpField: {
            // TODO: Validate that these exist?
            const showOtpField = action.payload;

            const newState: FormStateInputs = structuredClone(state);

            newState.showOtpField = showOtpField;

            return newState;
        }
        case FormStateInputsActionType.TryToCloseDialog: {
            // TODO: Validate that these exist?
            const newState: FormStateInputs = structuredClone(state);

            newState.showOtpButton = false;
            newState.showOtpField = false;
            newState.invalidOtp = false;

            return newState;
        }
        case FormStateInputsActionType.SendOtp: {
            // TODO: Validate that these exist?

            const newState: FormStateInputs = structuredClone(state);

            newState.showOtpButton = false;
            newState.showOtpField = true;

            return newState;
        }
        default: {
            const exhaustiveCheck: never = action.actionType;
            throw new Error(`Encountered unexpected FormStateInputsActionType: ${action.actionType}`);
        }
    }
}

export function createInitialFormState() {
    const state: FormStateInputs = {
       inputData: {
        name: "",
        email: "",
        phoneNumber: "",
        city: "",
        otpSubmitted: ""
       },
    formSuccessfullySubmitted: false,
    showOtpButton: false,
    showOtpField: false,
    invalidOtp: false,
    isOtpresent: false,
    };

    return state;
}
