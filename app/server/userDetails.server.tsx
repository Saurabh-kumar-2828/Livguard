import {getAccessTokenFromAuthorizationHeader, getAccessTokenFromCookies} from "~/global-common-typescript/server/sessionCookieHelper.server";
import {UserDetails} from "~/typeDefinitions";

export async function getUserDetailsFromCookies(
    request: Request,
    requestedFields?: {
        // phoneNumber?: boolean;
        // name?: boolean;
    },
): Promise<UserDetails | null> {
    const accessToken = await getAccessTokenFromCookies(request);
    if (accessToken == null || accessToken instanceof Error) {
        return accessToken;
    }

    const userId = accessToken.userId;

    return getUserDetails(userId, requestedFields);
}

export async function getUserDetailsFromAuthenticationHeader(
    request: Request,
    requestedFields?: {
        // phoneNumber?: boolean;
        // name?: boolean;
    },
): Promise<UserDetails | null> {
    const accessToken = await getAccessTokenFromAuthorizationHeader(request);
    if (accessToken == null || accessToken instanceof Error) {
        return accessToken;
    }

    return getUserDetails(accessToken.userId, requestedFields);
}

export async function getUserDetails(
    userId: string,
    requestedFields?: {
        // phoneNumber?: boolean;
        // name?: boolean;
    },
): Promise<UserDetails | null> {
    const userDetails: UserDetails = {
        id: userId,
    };

    // if (
    //     requestedFields != null &&
    //     (requestedFields.phoneNumber ||
    //         requestedFields.name)
    // ) {
    //     const userDetailsFromDatabase = await getUserDetailsFromDatabase(userId);

    //     // TODO: Do this check outside the if?
    //     if (userDetailsFromDatabase == null) {
    //         return null;
    //     }

    //     if (requestedFields.phoneNumber) {
    //         // Handle undefined values, empty values
    //         userDetails.phoneNumber = userDetailsFromDatabase.phoneNumber;
    //     }

    //     if (requestedFields.name) {
    //         // Handle undefined values, empty values
    //         userDetails.name = userDetailsFromDatabase.name;
    //     }
    // }

    return userDetails;
}
