import { AppConsts } from "../common/app-consts";
import { hasValue } from "../common/app-utils";
import jwt_decode from "jwt-decode";

export const persistTokenFromResponse = (response) => {
  if (!response[`status`] || response[`status`] !== 200) {
    throw new Error("Response status should be 200");
  }

  if (!response[`headers`]) {
    throw new Error("No headers found in response");
  }

  const headers = response[`headers`];

  const authorizationValue = headers.get(`Authorization`);

  console.log(headers);
  if (!hasValue(authorizationValue)) {
    throw new Error("Cannot find token inside headers");
  }

  window.localStorage.setItem(AppConsts.KEY_USER_TOKEN, authorizationValue);
};

export const isAuthenticated = () => {
  const token = localStorage.getItem(AppConsts.KEY_USER_TOKEN);
  if (!token) {
    return false;
  }
  return true;
};

// Define a function to persist the user from a token
export const persistUserFromToken = () => {
  const token = localStorage.getItem(AppConsts.KEY_USER_TOKEN);

  if (!token) {
    // No token found, user is not authenticated
    return null;
  }

  try {
    // Decode the token to get user information
    const decoded = jwt_decode(token);

    if (!decoded) {
      // Token is invalid or expired
      return null;
    }

    const user = decoded;

    return user;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
