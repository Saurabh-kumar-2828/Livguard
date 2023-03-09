import {createContext} from "react";
import {Language, UserPreferences} from "~/typeDefinitions";

export const UserPreferencesContext = createContext<UserPreferences>({language: Language.English, theme: null});
