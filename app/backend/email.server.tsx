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

export async function sendEmail(data: string, recepients: Array<string>, subject: string, ccList?: Array<string>): Promise<void | Error> {
    const parsedData = JSON.parse(data);
    let emailHtml = Object.keys(parsedData)
        .map((key) => {
            return `${key}: ${parsedData[key]}`;
        })
        .join("<br>");

    emailHtml += "<br><br><br>";

    const result = await transporter.sendMail({
        from: getStringFromUnknown(getRequiredEnvironmentVariableNew("SMTP_FROM_EMAIL")), // sender address
        to: recepients.join(","), // list of receivers
        cc: ccList,
        subject: subject, // Subject line
        html: emailHtml,
    });

    if (result instanceof Error) {
        return result;
    }
}
