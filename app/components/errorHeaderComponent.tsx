import {Link} from "@remix-run/react";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";

export function ErrorHeaderComponent({className}: {className?: string}) {
    return (
        <>
            <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-items-stretch tw-sticky tw-top-0 tw-z-[60]", className)}>
                <div className="lg-px-screen-edge tw-py-4 tw-bg-secondary-100-internalight tw-flex tw-flex-row tw-items-center">
                    <Link to="/">
                        <img
                            src="https://www.livguard.com/static-assets/icons/logo-light.svg"
                            width={385}
                            height={96}
                            className="tw-w-auto tw-h-6"
                        />
                    </Link>

                    <div className="tw-w-8 tw-hidden lg:tw-flex" />
                </div>
            </div>
        </>
    );
}
