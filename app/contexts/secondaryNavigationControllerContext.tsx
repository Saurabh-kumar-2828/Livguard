import {createContext} from "react";
import type {SecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";

export const SecondaryNavigationControllerContext = createContext<SecondaryNavigationController>({
    sections: {},
    setSections: () => {},
});
