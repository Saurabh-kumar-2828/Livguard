import {LoadCalculatorInputs, propertyTemplates, propertyTemplatesNewUi, PropertyType} from "~/routes/load-calculator/index.types";
import {pollyfilledStructuredClone} from "~/utilities";

export enum LoadCalculatorInputsActionType {
    SetPropertyType,
    SetPropertyTypeNewUi,
    AddRoom,
    // TODO: Remove this?
    EditRoom,
    AddDevices,
    RemoveDevice,
    RemoveSingleDevice,
    ChangeBackupHours,
    ChangeAverageConsumption,
}

export type LoadCalculatorInputsAction = {
    actionType: LoadCalculatorInputsActionType;
    payload: any;
};

export function loadCalculatorInputsReducer(state: LoadCalculatorInputs, action: LoadCalculatorInputsAction): LoadCalculatorInputs {
    switch (action.actionType) {
        case LoadCalculatorInputsActionType.SetPropertyType: {
            // TODO: Validate that these exist?
            const propertyType = action.payload;

            const newState: LoadCalculatorInputs = pollyfilledStructuredClone(state);

            newState.property = propertyTemplates[propertyType];

            return newState;
        }
        case LoadCalculatorInputsActionType.SetPropertyTypeNewUi: {
            // TODO: Validate that these exist?
            const propertyType = action.payload;

            const newState: LoadCalculatorInputs = pollyfilledStructuredClone(state);

            newState.property = propertyTemplatesNewUi[propertyType];

            return newState;
        }
        case LoadCalculatorInputsActionType.AddRoom: {
            // TODO: Validate that these exist?
            const propertyName = action.payload;

            const newState: LoadCalculatorInputs = pollyfilledStructuredClone(state);

            newState.property.rooms.push(action.payload);

            return newState;
        }
        case LoadCalculatorInputsActionType.EditRoom: {
            // TODO: Validate that these exist?
            const roomIndex = action.payload.roomIndex;
            const roomName = action.payload.roomName;
            const devices = action.payload.devices;

            const newState: LoadCalculatorInputs = pollyfilledStructuredClone(state);

            newState.property.rooms[roomIndex].roomName = roomName;
            newState.property.rooms[roomIndex].devices = devices;

            return newState;
        }
        case LoadCalculatorInputsActionType.AddDevices: {
            // TODO: Validate that these exist?
            const roomIndex = action.payload.roomIndex;
            const devices = action.payload.devices;

            const newState: LoadCalculatorInputs = pollyfilledStructuredClone(state);

            newState.property.rooms[roomIndex].devices.push(...devices);

            return newState;
        }
        case LoadCalculatorInputsActionType.RemoveDevice: {
            // TODO: Validate that these exist?
            const roomIndex = action.payload.roomIndex;
            const deviceType = action.payload.deviceType;

            const newState: LoadCalculatorInputs = pollyfilledStructuredClone(state);

            newState.property.rooms[roomIndex].devices = newState.property.rooms[roomIndex].devices.filter((device) => device.deviceType != deviceType);

            return newState;
        }
        case LoadCalculatorInputsActionType.RemoveSingleDevice: {
            // TODO: Validate that these exist?
            const roomIndex = action.payload.roomIndex;
            const deviceType = action.payload.deviceType;

            const newState: LoadCalculatorInputs = pollyfilledStructuredClone(state);

            const indexToRemove = newState.property.rooms[roomIndex].devices.findIndex((device) => device.deviceType == deviceType);
            newState.property.rooms[roomIndex].devices.splice(indexToRemove, 1);

            return newState;
        }
        case LoadCalculatorInputsActionType.ChangeBackupHours: {
            // TODO: Validate that these exist?
            const backupHours = action.payload;

            const newState: LoadCalculatorInputs = pollyfilledStructuredClone(state);

            newState.backupHours = backupHours;

            return newState;
        }
        case LoadCalculatorInputsActionType.ChangeAverageConsumption: {
            // TODO: Validate that these exist?
            const averageConsumption = action.payload;

            const newState: LoadCalculatorInputs = pollyfilledStructuredClone(state);

            newState.averageConsumption = averageConsumption;

            return newState;
        }
        default: {
            const exhaustiveCheck: never = action.actionType;
            throw new Error(`Encountered unexpected LoadCalculatorInputsActionType: ${action.actionType}`);
        }
    }
}

export function createInitialState({propertyType}: {propertyType: PropertyType}) {
    const state: LoadCalculatorInputs = {
        property: propertyTemplates[propertyType],
        backupHours: 4,
        averageConsumption: 50,
    };

    return state;
}

export function createInitialStateNewUi({propertyType}: {propertyType: PropertyType}) {
    const state: LoadCalculatorInputs = {
        property: propertyTemplatesNewUi[propertyType],
        backupHours: 4,
        averageConsumption: 50,
    };

    return state;
}
