export enum PropertyType {
    OneBhk = "1-bhk",
    TwoBhk = "2-bhk",
    ThreeBhk = "3-bhk",
    FourBhk = "4-bhk",
    Villa = "villa",
    Custom = "custom",
}

export const roomTypeLibrary: {[id: string]: {humanReadableString: string}} = {
    "dda75244-60f2-40e8-8936-d4ea2ae25f34": {
        humanReadableString: "Bedroom",
    },
    "71824c29-731e-4625-9c66-cfde9763a46a": {
        humanReadableString: "Kitchen",
    },
    "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8": {
        humanReadableString: "Washroom",
    },
    "c55cef3d-ea14-4810-926c-eac96452906d": {
        humanReadableString: "Hall",
    },
    "9a64e953-54fe-46b7-955c-4165936bb5fb": {
        humanReadableString: "Living Room",
    },
    "a88a6db2-2c94-4a88-bf1b-c991830db16f": {
        humanReadableString: "Dining Room",
    },
    "2a1fb75c-2256-4cd1-adaf-9fcb7cf31da1": {
        humanReadableString: "Balcony",
    },
};

export const deviceTypeLibrary: {[id: string]: {humanReadableString: string; category: string; wattage: number}} = {
    "a8450049-3fe8-4b8c-8796-fc3982a5e1ed": {
        humanReadableString: "LED",
        category: "Lighting",
        wattage: 5,
    },
    "2b74d3cf-6fc2-4c9e-b264-e1865138c394": {
        humanReadableString: "CFL",
        category: "Lighting",
        wattage: 15,
    },
    "43150663-bea9-4fa9-b273-1b92212f5d30": {
        humanReadableString: "Bulb",
        category: "Lighting",
        wattage: 65,
    },
    "aba012ef-4a0a-438f-afbe-8fcb92a95c6b": {
        humanReadableString: "Tubelight",
        category: "Lighting",
        wattage: 40,
    },
    "89066719-efd8-4e7e-be1c-16da3fc57330": {
        humanReadableString: "Table Lamp",
        category: "Lighting",
        wattage: 60,
    },
    "e289b9e5-78b3-44e9-86f3-ed0068f0addf": {
        humanReadableString: "Panel Lights",
        category: "Lighting",
        wattage: 14,
    },
    "97712354-86b6-4863-be85-e3d6d564b882": {
        humanReadableString: "Television",
        category: "Home Appliances",
        wattage: 180,
    },
    "003f0bae-1065-416e-8330-b82b732624ed": {
        humanReadableString: "Iron",
        category: "Home Appliances",
        wattage: 1280,
    },
    "d915052b-e216-4dbd-8fba-055d1b4af551": {
        humanReadableString: "Hair Appliances",
        category: "Home Appliances",
        wattage: 1600,
    },
    "f167dc54-7599-45ac-bd4e-e99393870267": {
        humanReadableString: "Fan",
        category: "Home Appliances",
        wattage: 60,
    },
    "f0896a88-d01f-44e3-8004-53a9bc5ad603": {
        humanReadableString: "Printer",
        category: "Home Appliances",
        wattage: 128,
    },
    "152594ae-c517-4e75-8f1e-8a58301f2ff3": {
        humanReadableString: "Computer",
        category: "Home Appliances",
        wattage: 200,
    },
    "ddef3ea3-c364-47c8-a3de-2af0a685ac95": {
        humanReadableString: "Set Top Box",
        category: "Home Appliances",
        wattage: 50,
    },
    "360aae7f-2bd0-4cb9-8083-df636906c55a": {
        humanReadableString: "Router",
        category: "Home Appliances",
        wattage: 25,
    },
    "75c95a14-5df5-4a15-bc31-03ce4f2f07b0": {
        humanReadableString: "Speaker",
        category: "Home Appliances",
        wattage: 80,
    },
    "3a401059-08d9-464b-9e56-e280a1c9919d": {
        humanReadableString: "Fridge",
        category: "Kitchen Appliances",
        wattage: 335,
    },
    "87702654-5068-44f5-befc-814fcb4da640": {
        humanReadableString: "Microwave Oven",
        category: "Kitchen Appliances",
        wattage: 800,
    },
    "2bf7a137-3aeb-456b-8a7c-8ae1aef146e2": {
        humanReadableString: "Mixer/Grinder",
        category: "Kitchen Appliances",
        wattage: 700,
    },
    "6e6ebc73-5deb-4c2f-b7f3-f6d596385d4e": {
        humanReadableString: "Water Purifier",
        category: "Kitchen Appliances",
        wattage: 90,
    },
    "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf": {
        humanReadableString: "Exhuast Fan",
        category: "Kitchen Appliances",
        wattage: 40,
    },
    "41ea7450-3f3b-41b8-b701-bfadac047e56": {
        humanReadableString: "Coffee Maker",
        category: "Kitchen Appliances",
        wattage: 1300,
    },
    "2091dc25-6837-483b-a6d1-8b2a43e13957": {
        humanReadableString: "Dishwasher",
        category: "Kitchen Appliances",
        wattage: 1800,
    },
    "d7a85e3a-3b8c-4f93-99ec-dce310df2713": {
        humanReadableString: "Induction Cooktop",
        category: "Kitchen Appliances",
        wattage: 2500,
    },
    "56b3b38d-ca34-4bda-a1c1-fe6b5032e122": {
        humanReadableString: "Air Conditioner",
        category: "Heavy Load Appliances",
        wattage: 1600,
    },
    "fbbb26c8-2550-4a31-b7c0-2720f72ede55": {
        humanReadableString: "Washing Machine",
        category: "Heavy Load Appliances",
        wattage: 600,
    },
    "a54d76f2-1ccb-4769-aa3d-5eaafd44843d": {
        humanReadableString: "Dessert Cooler",
        category: "Heavy Load Appliances",
        wattage: 380,
    },
    "56c4df60-b175-4c71-bcc9-ecfd2b5bc68a": {
        humanReadableString: "Geyser",
        category: "Heavy Load Appliances",
        wattage: 1800,
    },
    "59f3154c-0433-4086-8417-45f8e4fa0f3d": {
        humanReadableString: "Air Purifier",
        category: "Heavy Load Appliances",
        wattage: 215,
    },
    "1c9f3a15-34cf-4cde-83d8-3a06fdf26661": {
        humanReadableString: "Game Console",
        category: "Heavy Load Appliances",
        wattage: 75,
    },
    "54933747-ce3f-4f00-a003-a98eda1ce406": {
        humanReadableString: "Vacuum Cleaner",
        category: "Heavy Load Appliances",
        wattage: 900,
    },
    "966dafd8-21e7-448a-970e-38b0bebf8122": {
        humanReadableString: "Heater",
        category: "Heavy Load Appliances",
        wattage: 1400,
    },
    "276efb37-0741-419f-a743-725022423dc1": {
        humanReadableString: "Kettle",
        category: "Heavy Load Appliances",
        wattage: 1200,
    },
    "a36ecf7f-a597-4a46-a12e-44c82b5b8f56": {
        humanReadableString: "Toaster",
        category: "Heavy Load Appliances",
        wattage: 1200,
    },
    "0a85d525-7268-4aef-81bd-23e1246ddbfb": {
        humanReadableString: "Charger",
        category: "Accessories",
        wattage: 40,
    },
    "01bc2756-1b2b-4250-a927-c4c0722f5686": {
        humanReadableString: "CCTV Camera",
        category: "Accessories",
        wattage: 15,
    },
};

export type LoadCalculatorInputs = {
    property: Property;
    backupHours: number;
    averageConsumption: number;
};

export type Property = {
    propertyType: PropertyType;
    propertyName: string;
    rooms: Array<Room>;
};

export type Room = {
    roomType: string;
    roomName: string;
    devices: Array<Device>;
};

export type Device = {
    deviceType: string;
    // deviceName: string;
    deviceDetails: any;
};

export function getRoomTypeDetails(roomType: string) {
    if (!(roomType in roomTypeLibrary)) {
        throw new Error(`Encountered unexpected RoomType ${roomType}`);
    }

    return roomTypeLibrary[roomType];
}

export function getDeviceTypeDetails(deviceType: string) {
    if (!(deviceType in deviceTypeLibrary)) {
        throw new Error(`Encountered unexpected DeviceType ${deviceType}`);
    }

    return deviceTypeLibrary[deviceType];
}

export const propertyTemplates: {[propertyType: string]: Property} = {
    "1-bhk": {
        propertyName: "",
        propertyType: PropertyType.OneBhk,
        rooms: [
            {
                roomName: "Bedroom 1",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Kitchen",
                roomType: "71824c29-731e-4625-9c66-cfde9763a46a",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // Fridge
                        deviceType: "3a401059-08d9-464b-9e56-e280a1c9919d",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Hall",
                roomType: "c55cef3d-ea14-4810-926c-eac96452906d",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                ],
            },
        ],
    },
    "2-bhk": {
        propertyName: "",
        propertyType: PropertyType.TwoBhk,
        rooms: [
            {
                roomName: "Bedroom 1",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 2",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Kitchen",
                roomType: "71824c29-731e-4625-9c66-cfde9763a46a",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // Fridge
                        deviceType: "3a401059-08d9-464b-9e56-e280a1c9919d",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Hall",
                roomType: "c55cef3d-ea14-4810-926c-eac96452906d",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                    {
                        // Television
                        deviceType: "97712354-86b6-4863-be85-e3d6d564b882",
                        deviceDetails: {},
                    },
                    {
                        // Set top box
                        deviceType: "ddef3ea3-c364-47c8-a3de-2af0a685ac95",
                        deviceDetails: {},
                    },
                ],
            },
        ],
    },
    "3-bhk": {
        propertyName: "",
        propertyType: PropertyType.ThreeBhk,
        rooms: [
            {
                roomName: "Bedroom 1",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 2",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 3",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Kitchen",
                roomType: "71824c29-731e-4625-9c66-cfde9763a46a",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // Fridge
                        deviceType: "3a401059-08d9-464b-9e56-e280a1c9919d",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Hall",
                roomType: "c55cef3d-ea14-4810-926c-eac96452906d",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                    {
                        // Television
                        deviceType: "97712354-86b6-4863-be85-e3d6d564b882",
                        deviceDetails: {},
                    },
                    {
                        // Set top box
                        deviceType: "ddef3ea3-c364-47c8-a3de-2af0a685ac95",
                        deviceDetails: {},
                    },
                ],
            },
        ],
    },
    "4-bhk": {
        propertyName: "",
        propertyType: PropertyType.FourBhk,
        rooms: [
            {
                roomName: "Bedroom 1",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 2",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 3",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 4",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Kitchen",
                roomType: "71824c29-731e-4625-9c66-cfde9763a46a",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // Fridge
                        deviceType: "3a401059-08d9-464b-9e56-e280a1c9919d",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Hall",
                roomType: "c55cef3d-ea14-4810-926c-eac96452906d",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                    {
                        // Television
                        deviceType: "97712354-86b6-4863-be85-e3d6d564b882",
                        deviceDetails: {},
                    },
                    {
                        // Set top box
                        deviceType: "ddef3ea3-c364-47c8-a3de-2af0a685ac95",
                        deviceDetails: {},
                    },
                ],
            },
        ],
    },
    villa: {
        propertyName: "",
        propertyType: PropertyType.Villa,
        rooms: [
            {
                roomName: "Bedroom 1",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 2",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 3",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 4",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 5",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 6",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 7",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 8",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Kitchen",
                roomType: "71824c29-731e-4625-9c66-cfde9763a46a",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // Fridge
                        deviceType: "3a401059-08d9-464b-9e56-e280a1c9919d",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Hall",
                roomType: "c55cef3d-ea14-4810-926c-eac96452906d",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                    {
                        // Television
                        deviceType: "97712354-86b6-4863-be85-e3d6d564b882",
                        deviceDetails: {},
                    },
                    {
                        // Set top box
                        deviceType: "ddef3ea3-c364-47c8-a3de-2af0a685ac95",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Hall",
                roomType: "c55cef3d-ea14-4810-926c-eac96452906d",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                    {
                        // Television
                        deviceType: "97712354-86b6-4863-be85-e3d6d564b882",
                        deviceDetails: {},
                    },
                    {
                        // Set top box
                        deviceType: "ddef3ea3-c364-47c8-a3de-2af0a685ac95",
                        deviceDetails: {},
                    },
                ],
            },
        ],
    },
    custom: {
        propertyName: "",
        propertyType: PropertyType.Custom,
        rooms: [],
    },
};

export const propertyTemplatesNewUi: {[propertyType: string]: Property} = {
    "1-bhk": {
        propertyName: "",
        propertyType: PropertyType.OneBhk,
        rooms: [
            {
                roomName: "",
                roomType: "",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // Fridge
                        deviceType: "3a401059-08d9-464b-9e56-e280a1c9919d",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                ],
            },
        ],
    },
    "2-bhk": {
        propertyName: "",
        propertyType: PropertyType.TwoBhk,
        rooms: [
            {
                roomName: "",
                roomType: "",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // Fridge
                        deviceType: "3a401059-08d9-464b-9e56-e280a1c9919d",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                    {
                        // Television
                        deviceType: "97712354-86b6-4863-be85-e3d6d564b882",
                        deviceDetails: {},
                    },
                    {
                        // Set top box
                        deviceType: "ddef3ea3-c364-47c8-a3de-2af0a685ac95",
                        deviceDetails: {},
                    },
                ],
            },
        ],
    },
    "3-bhk": {
        propertyName: "",
        propertyType: PropertyType.ThreeBhk,
        rooms: [
            {
                roomName: "",
                roomType: "",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // Fridge
                        deviceType: "3a401059-08d9-464b-9e56-e280a1c9919d",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                    {
                        // Television
                        deviceType: "97712354-86b6-4863-be85-e3d6d564b882",
                        deviceDetails: {},
                    },
                    {
                        // Set top box
                        deviceType: "ddef3ea3-c364-47c8-a3de-2af0a685ac95",
                        deviceDetails: {},
                    },
                ],
            },
        ],
    },
    "4-bhk": {
        propertyName: "",
        propertyType: PropertyType.FourBhk,
        rooms: [
            {
                roomName: "",
                roomType: "",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // Fridge
                        deviceType: "3a401059-08d9-464b-9e56-e280a1c9919d",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                    {
                        // Television
                        deviceType: "97712354-86b6-4863-be85-e3d6d564b882",
                        deviceDetails: {},
                    },
                    {
                        // Set top box
                        deviceType: "ddef3ea3-c364-47c8-a3de-2af0a685ac95",
                        deviceDetails: {},
                    },
                ],
            },
        ],
    },
    villa: {
        propertyName: "",
        propertyType: PropertyType.Villa,
        rooms: [
            {
                roomName: "",
                roomType: "",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // Fridge
                        deviceType: "3a401059-08d9-464b-9e56-e280a1c9919d",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                    {
                        // Television
                        deviceType: "97712354-86b6-4863-be85-e3d6d564b882",
                        deviceDetails: {},
                    },
                    {
                        // Set top box
                        deviceType: "ddef3ea3-c364-47c8-a3de-2af0a685ac95",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                    {
                        // Television
                        deviceType: "97712354-86b6-4863-be85-e3d6d564b882",
                        deviceDetails: {},
                    },
                    {
                        // Set top box
                        deviceType: "ddef3ea3-c364-47c8-a3de-2af0a685ac95",
                        deviceDetails: {},
                    },
                ],
            },
        ],
    },
    custom: {
        propertyName: "",
        propertyType: PropertyType.Custom,
        rooms: [
            {
                roomName: "",
                roomType: "",
                devices: [],
            },
        ],
    },
};
