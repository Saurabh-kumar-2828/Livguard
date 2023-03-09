import {createContext} from "react";

export type VernacularContent = {[id: string]: {[language: string]: string}};

export const VernacularContentContext = createContext({});
