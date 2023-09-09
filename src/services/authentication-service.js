import { AppConsts } from "../common/app-consts";
import { hasValue } from "../common/app-utils";

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
