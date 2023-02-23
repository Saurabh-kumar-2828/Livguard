import {json} from "@remix-run/node";
import {Link, Links, LiveReload, Meta, Scripts, ScrollRestoration} from "@remix-run/react";

export default function () {
    return (
        <div className="tw-grow tw-grid tw-place-items-center tw-min-h-screen lg-bg-primary-500 lg-text-secondary-900">
            <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-y-4">
                <div className="lg-text-banner">404</div>

                <div>The page you are looking for does not exist.</div>
            </div>

            <Link
                to="/"
                className="tw-text-muted tw-lx-underline-on-hover tw-underline tw-underline-offset-4"
            >
                Back to Home
            </Link>
        </div>
    );
}
