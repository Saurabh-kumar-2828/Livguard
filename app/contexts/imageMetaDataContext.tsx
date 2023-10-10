import {createContext} from "react";
import type {ImageProvider} from "~/typeDefinitions";

export const ImageProviderContext = createContext<ImageProvider>({relativePath: {width: 0, height: 0, finalUrl: ""}});
