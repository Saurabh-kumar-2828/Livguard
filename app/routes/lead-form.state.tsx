export enum FormStateInputsActionType {
    SetName,
    SetEmail,
    SetPhoneNumber,
    SetOtpSubmitted,
    SetCity,
    setDealer,
    SetFormSuccessfullySubmited,
    SetShowOtpButton,
    SetShowOtpField,
    SetInvalidOtp,
    SetIsOtpResent,
    TryToCloseDialog,
    SendOtp,
    EditPhoneNumber,
    TermsAndConditionsCheckboxClicked,
    SetResendTimeOut,
}

export type FormStateInputs = {
    inputData: {
        name: string;
        email: string;
        phoneNumber: string;
        city: string;
        dealer: string;
        otpSubmitted: string;
        termsAndConditionsChecked: boolean;
    };
    formSuccessfullySubmitted: boolean;
    showOtpButton: boolean;
    showOtpField: boolean;
    invalidOtp: boolean;
    isOtpresent: boolean;
    resendTimeOut: number;
};

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
        case FormStateInputsActionType.setDealer: {
            // TODO: Validate that these exist?
            const dealer = action.payload;

            const newState: FormStateInputs = structuredClone(state);

            newState.inputData.dealer = dealer;

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
            newState.resendTimeOut = 60;

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
            newState.resendTimeOut = 0;

            return newState;
        }
        case FormStateInputsActionType.SendOtp: {
            // TODO: Validate that these exist?
            const newState: FormStateInputs = structuredClone(state);

            newState.showOtpButton = false;
            newState.showOtpField = true;
            newState.resendTimeOut = 60;

            return newState;
        }
        case FormStateInputsActionType.EditPhoneNumber: {
            // TODO: Validate that these exist?
            const newState: FormStateInputs = structuredClone(state);

            newState.showOtpField = false;
            newState.resendTimeOut = 0;

            return newState;
        }
        case FormStateInputsActionType.TermsAndConditionsCheckboxClicked: {
            // TODO: Validate that these exist?
            const termsAndConditionsChecked = action.payload;

            const newState: FormStateInputs = structuredClone(state);

            newState.inputData.termsAndConditionsChecked = termsAndConditionsChecked;

            return newState;
        }
        case FormStateInputsActionType.SetResendTimeOut: {
            // TODO: Validate that these exist?
            const resendTimeOut = action.payload;

            const newState: FormStateInputs = structuredClone(state);

            newState.resendTimeOut = resendTimeOut;

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
            otpSubmitted: "",
            termsAndConditionsChecked: true,
        },
        formSuccessfullySubmitted: false,
        showOtpButton: false,
        showOtpField: false,
        invalidOtp: false,
        isOtpresent: false,
        resendTimeOut: 0,
    };

    return state;
}
