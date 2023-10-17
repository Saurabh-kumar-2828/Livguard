import {useEffect, useRef} from "react";

function appendScript(
    document: Document,
    options: {
        removeOnUnmount: boolean;
        appendInHead?: boolean;
        appendInBody?: boolean;
        addScriptAsText?: boolean;
        timeoutDuration?: number;
    },
    script: Node,
) {
    if ((options.appendInBody == null && options.appendInHead == null) || (!options.appendInHead && !options.appendInBody) || options.appendInHead) {
        document.head.appendChild(script);
    }

    if (options.appendInBody) {
        document.body.appendChild(script);
    }
}

export function useExternalScript(
    src: string,
    options: {
        removeOnUnmount: boolean;
        appendInHead?: boolean;
        appendInBody?: boolean;
        addScriptAsText?: boolean;
        timeoutDuration?: number;
    },
    attachScript: boolean | null,
    eventTriggerCallback?: Function,
): void {
    const initialized = useRef(false);

    useEffect(() => {
        if (attachScript == null) {
            return;
        }

        if (attachScript != null) {
            if (attachScript == false) {
                if (options.addScriptAsText) {
                    document.body.querySelectorAll("script").forEach((script) => {
                        if (script.innerHTML == src) {
                            script.remove();
                        }
                    });
                } else {
                    document.head.querySelector(`script[src="${src}"]`)?.remove();
                }
                initialized.current = false;
                return;
            }
        }
        if (!initialized.current) {
            initialized.current = true;
            if (!src) {
                return;
            }

            let script = document.createElement("script");
            if (options.addScriptAsText != null && options.addScriptAsText) {
                script.innerHTML = src;
            } else {
                script.src = src;
            }

            script.async = true;
            if (options.timeoutDuration != null) {
                setTimeout(() => {
                    appendScript(document, options, script);
                    if (eventTriggerCallback != null) {
                        eventTriggerCallback();
                    }
                }, options.timeoutDuration);
            } else {
                appendScript(document, options, script);
                if (eventTriggerCallback != null) {
                    eventTriggerCallback();
                }
            }

            return () => {
                if (script && options.removeOnUnmount) {
                    script.remove();
                }
            };
        }
    }, [attachScript]);
}
