import {batteryFinderData} from "~/backend/battery-finder-data.server";
import productData from "~/backend/productData.server.json";
import {distinct} from "~/global-common-typescript/utilities/utilities";

export const carAndSuvBatteries = batteryFinderData
    .filter((item) => item.vtype === "carnsuv")
    .filter((item) => {
        const slug = item.bmodel;
        return slug != null && Object.keys(productData).includes(slug);
    });

export const carAndSuvBatteriesBrands = distinct(carAndSuvBatteries.map((item) => item.manufacturer));

export const twoWheelerBatteries = batteryFinderData
    .filter((item) => item.vtype === "2W")
    .filter((item) => {
        const slug = item.bmodel;
        return slug != null && Object.keys(productData).includes(slug);
    });

export const twoWheelerBatteryBrands = distinct(twoWheelerBatteries.map((item) => item.manufacturer));

export const threeWheelerBatteries = batteryFinderData
    .filter((item) => item.vtype === "3W")
    .filter((item) => {
        const slug = item.bmodel;
        return slug != null && Object.keys(productData).includes(slug);
    });

export const threeWheelerBatteryBrands = distinct(threeWheelerBatteries.map((item) => item.manufacturer));

export const tractorBatteries = batteryFinderData
    .filter((item) => item.vtype === "tractor")
    .filter((item) => {
        const slug = item.bmodel;
        return slug != null && Object.keys(productData).includes(slug);
    });

export const tractorBatteryBrands = distinct(tractorBatteries.map((item) => item.manufacturer));

export const busAndTruckBatteries = batteryFinderData
    .filter((item) => item.vtype === "CV")
    .filter((item) => {
        const slug = item.bmodel;
        return slug != null && Object.keys(productData).includes(slug);
    });
export const busAndTruckBatteryBrands = distinct(busAndTruckBatteries.map((item) => item.manufacturer));
