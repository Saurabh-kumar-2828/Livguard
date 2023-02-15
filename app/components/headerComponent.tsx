import {Form, useSubmit} from "@remix-run/react";
import {Language, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {List, Search} from "react-bootstrap-icons";
import {LanguageIcon} from "@heroicons/react/20/solid";

export function HeaderComponent({userPreferences}: {userPreferences: UserPreferences}) {
    const submit = useSubmit();

    return (
        <div className="tw-flex tw-flex-col tw-items-stretch">
            <div className="tw-flex tw-flex-row tw-items-center lg-bg-secondary-300 tw-p-4">
                <div>{getVernacularString("homeS1T1", userPreferences.language)}</div>
                <div className="tw-flex-1"/>
                <div className="tw-w-px tw-h-6 lg-bg-secondary-900" />
                <div className="tw-flex-1"/>
                <LanguageIcon className="tw-w-8 tw-h-8" />
                <div>
                    <Form
                        method="post"
                        action="/set-language"
                        onChange={(e) => {
                            submit(e.currentTarget, {replace: true});
                        }}
                    >
                        <select name="language" className="lg-bg-secondary-300 lg-text-secondary-900 tw-p-2 tw-appearance-none" defaultValue={userPreferences.language}>
                            <option value={Language.English} className="lg-bg-secondary-100">
                                English
                            </option>
                            <option value={Language.Hindi} className="lg-bg-secondary-100">
                                Hindi
                            </option>
                            <option value={Language.Marathi} className="lg-bg-secondary-100">
                                Marathi
                            </option>
                        </select>
                    </Form>
                </div>
            </div>

            <div className="tw-p-4 lg-bg-background-500 tw-flex tw-flex-row tw-items-center">
                <List className="tw-w-6 tw-h-6" />
                <div>Livguard</div>
                <div className="tw-flex-1" />
                <Search className="tw-w-6 tw-h-6" />
                <div>Search</div>
            </div>

            {/* <div className="tw-p-4 lg-bg-background-500"><span>{getVernacularString("homeS1T1", userPreferences.language)}</span></div> */}
        </div>
    );
}
