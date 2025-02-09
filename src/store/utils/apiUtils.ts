import axios, { Axios, type AxiosResponse, type AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { telegramStore } from "@/store/telegram";

export async function checkResponseSuccess(origResponse: AxiosResponse, url: string, type: string, data?: any) {
  console.log("Зашли в checkResponseSuccess")
  if (origResponse.status === 401) {
    console.log("Потому что получили 401")
    const url = `${import.meta.env.VITE_BACKEND}/api/v1/auth/refresh`
    const refreshTokenResponse = await axios.post(url, {}, requestConfig);

    let newResponse;

    if (refreshTokenResponse.status === 200) {
      switch (type) {
        case "get":
          newResponse = await axios.get(url, requestConfig)
          if (newResponse.status === 200) return newResponse
          else { parseErrors(newResponse); return newResponse }

        case "post":
          newResponse = await axios.post(url, data, requestConfig)
          if (newResponse.status === 200) return newResponse
          else { parseErrors(newResponse); return newResponse }

        case "patch":
          newResponse = await axios.patch(url, data, requestConfig)
          if (newResponse.status === 200) return newResponse
          else { parseErrors(newResponse); return newResponse }
      }
    } else {
      parseErrors(refreshTokenResponse)
      return refreshTokenResponse
    }
  } else if (origResponse.status !== 200) {
    parseErrors(origResponse)
    return origResponse
  } else if (origResponse.status === 200) {
    return origResponse
  }
}

function parseErrors (response: AxiosResponse) {
  const errors = Array.isArray(response.data.responseErrors)
      ? response.data.responseErrors.join("; ")
      : response.data.responseErrors || "Причина не указана.";

  throw new Error("Запрос отработал с ошибкой. " + errors);
}

export const requestConfig: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    "X-CSRF-Token": getCsrfToken(),
  }
}

export function getCsrfToken() {
  return Cookies.get('csrf_token');
}
