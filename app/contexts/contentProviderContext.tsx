import {createContext} from "react";
import type {ContentProvider} from "~/typeDefinitions";

export const ContentProviderContext = createContext<ContentProvider>({
    getContent: (id) => "",
});
