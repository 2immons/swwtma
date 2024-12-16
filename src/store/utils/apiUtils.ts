import { AxiosResponse } from "axios";

// checkResponseSuccess проверяет поле response.data.success и выкидывает ошибку
export function checkResponseSuccess(response: AxiosResponse) {
  if (!response.data.success) {
    const errors = Array.isArray(response.data.responseErrors)
      ? response.data.responseErrors.join("; ")
      : response.data.responseErrors || "Причина не указана.";

    throw new Error("Запрос отработал с ошибкой. " + errors);
  }
}
