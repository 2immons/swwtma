import axios, { Axios, type AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { telegramStore } from "@/store/telegram";

export async function checkResponseSuccess(url: string, type: string, data?: any) {
  let response
  try {
    switch (type) {
      case "get":
        response = await axios.get(url, getRequestConfig());
        break;
      case "post":
        response = await axios.post(url, data, getRequestConfig())
        break;
      case "patch":
        response = await axios.patch(url, data, getRequestConfig())
        break;
    }
    if (response && response.status !== 200) {
      parseErrors(response);
      return response;
    } else {
      return response;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.log("Received 401, attempting to refresh token");
      const refreshUrl = `${import.meta.env.VITE_BACKEND}/api/v1/auth/refresh/`;
      try {
        const refreshTokenResponse = await axios.post(refreshUrl, {}, getRequestConfig());
        console.log("Refresh token response status:", refreshTokenResponse.status);
        console.log("Refresh token response data:", refreshTokenResponse.data);

        if (refreshTokenResponse.status === 200) {
          let newResponse;
          switch (type) {
            case "get":
              newResponse = await axios.get(url, getRequestConfig());
              break;
            case "post":
              newResponse = await axios.post(url, data, getRequestConfig());
              break;
            case "patch":
              newResponse = await axios.patch(url, data, getRequestConfig());
              break;
          }
          if (newResponse && newResponse.status === 200) {
            return newResponse;
          } else if (newResponse) {
            parseErrors(newResponse);
            return newResponse;
          }
        } else {
          parseErrors(refreshTokenResponse);
          return refreshTokenResponse;
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        throw new Error("Failed to refresh token");
      }
    }
  }
}

function parseErrors (response: AxiosResponse) {
  const errors = Array.isArray(response.data.responseErrors)
      ? response.data.responseErrors.join("; ")
      : response.data.responseErrors || "Причина не указана.";

  throw new Error("Запрос отработал с ошибкой. " + errors);
}

export function getRequestConfig() {
  console.log(getCsrfToken())
  return {
    withCredentials: true,
    headers: {
      "X-CSRF-Token": getCsrfToken(),
    }
  }
}

export function getCsrfToken() {
  return Cookies.get('csrf_token');
}
