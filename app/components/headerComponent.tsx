import {Form, useSubmit} from "@remix-run/react";
import {Language, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function HeaderComponent({userPreferences}: {userPreferences: UserPreferences}) {
    const submit = useSubmit();

    return (
        <div className="tw-flex tw-flex-col tw-items-stretch">
            <div className="tw-flex tw-flex-row tw-justify-between lg-bg-secondary-300 tw-p-4">
                <div>Customer Care</div>
                <div>
                    <Form
                        method="post"
                        action="/set-language"
                        onChange={(e) => {
                            submit(e.currentTarget, {replace: true});
                        }}
                    >
                        <select name="language" className="lg-bg-secondary-100 lg-text-secondary-900 tw-p-2 tw-appearance-none" defaultValue={userPreferences.language}>
                            <option value={Language.English} className="lg-bg-secondary-100">English</option>
                            <option value={Language.Hindi} className="lg-bg-secondary-100">Hindi</option>
                            <option value={Language.Marathi} className="lg-bg-secondary-100">Marathi</option>
                        </select>
                    </Form>
                </div>
            </div>

            <div className="tw-p-4 lg-bg-background-500">{getVernacularString("homeS1T1", userPreferences.language)}</div>
        </div>
    );
}
