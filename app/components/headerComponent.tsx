import {Bars3Icon, LanguageIcon} from "@heroicons/react/20/solid";
import {LoaderFunction} from "@remix-run/node";
import {Form, useLoaderData, useSubmit} from "@remix-run/react";
import {Search} from "react-bootstrap-icons";
import {HorizontalSpacer} from "~/global-common-typescript/components/horizontalSpacer";
import {Language, UserPreferences} from "~/typeDefinitions";
import {getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export function HeaderComponent({userPreferences, redirectTo}: {userPreferences: UserPreferences; redirectTo: string}) {
    console.log("url in header ===>", redirectTo);

    const submit = useSubmit();

    return (
        <div className="tw-flex tw-flex-col tw-items-stretch">
            <div className="tw-flex tw-flex-row tw-items-center lg-bg-secondary-300 lg-px-screen-edge tw-py-3">
                <div>{getVernacularString("headerS1T1", userPreferences.language)}</div>
                <div className="tw-flex-1" />
                <div className="tw-w-px tw-h-6 lg-bg-secondary-900" />
                <div className="tw-flex-1" />
                <LanguageIcon className="tw-w-6 tw-h-6" />
                <div>
                    <Form
                        method="post"
                        action="/set-language"
                        onChange={(e) => {
                            submit(e.currentTarget, {replace: true});
                        }}
                    >
                        <select name="language" className="lg-bg-secondary-300 lg-text-secondary-900 tw-px-2 tw-appearance-none" defaultValue={userPreferences.language}>
                            <option value={Language.English} className="lg-bg-secondary-100">
                                English
                            </option>
                            <option value={Language.Hindi} className="lg-bg-secondary-100">
                                हिंदी
                            </option>
                            <option value={Language.Marathi} className="lg-bg-secondary-100">
                                मराठी
                            </option>
                        </select>

                        <input type="text" name="redirectTo" value={redirectTo} readOnly className="tw-hidden" />
                    </Form>
                </div>
            </div>

            <div className="lg-px-screen-edge tw-py-4 lg-bg-background-500 tw-flex tw-flex-row tw-items-center">
                <Bars3Icon className="tw-w-6 tw-h-6" />
                <HorizontalSpacer className="tw-w-2" />
                <div>Livguard</div>

                <div className="tw-flex-1" />

                <Search className="tw-w-6 tw-h-6" />
                <HorizontalSpacer className="tw-w-2" />
                <div>{getVernacularString("headerS2T1", userPreferences.language)}</div>
            </div>

            {/* <div className="tw-p-4 lg-bg-background-500"><span>{getVernacularString("homeS1T1", userPreferences.language)}</span></div> */}
        </div>
    );
}
