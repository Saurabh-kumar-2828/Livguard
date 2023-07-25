import nodemailer from "nodemailer";
import {getRequiredEnvironmentVariableNew} from "~/global-common-typescript/server/utilities.server";
import {getNumberFromUnknown, getStringFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";

const transporter = nodemailer.createTransport({
    host: getStringFromUnknown(getRequiredEnvironmentVariableNew("SMTP_HOST")),
    port: getNumberFromUnknown(getRequiredEnvironmentVariableNew("SMTP_PORT")),
    secure: false,
    tls: {},
    auth: {
        user: getStringFromUnknown(getRequiredEnvironmentVariableNew("SMTP_USERNAME")),
        pass: getStringFromUnknown(getRequiredEnvironmentVariableNew("SMTP_PASSWORD")),
    },
});

export async function sendEmail(data: string, recepients: Array<string>): Promise<void | Error> {
    const result = await transporter.sendMail({
        from: getStringFromUnknown(getRequiredEnvironmentVariableNew("SMTP_FROM_EMAIL")), // sender address
        to: recepients.join(","), // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    if (result instanceof Error) {
        return result;
    }
}
