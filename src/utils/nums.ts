export function formatToDecimals(param: any, digits: number) {
  if (typeof param !== "number") {
    param = Number(param);
  }
  return parseFloat(param.toFixed(digits));
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Форматируем результат с ведущими нулями
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function extractTimeFromISO(isoString: string) {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function extractTimeDate(isoString: string): string {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function insertKForBigNumber(value: number | null | undefined) {
  if (!value)
    return 0
  if (value <= 999999) {
    return (value % 1 === 0 ? Math.floor(value) : Math.floor(value * 100) / 100).toLocaleString("ru-RU");
  } else {
    const rounded = Math.floor(value / 1000);
    return `${rounded}К`;
  }
}

export function insertKForBigNumberTest(value: number) {
  value = Math.floor(value);
  if (value <= 999999) {
    return value.toLocaleString("ru-RU");
  } else {
    const rounded = Math.floor(value / 1000);
    return `${rounded}К`;
  }
}

export function insertKForBigNumberEnergy(value: number) {
  value = Math.floor(value);
  if (value <= 99999) {
    return value.toLocaleString("ru-RU");
  } else {
    const rounded = Math.floor(value / 1000);
    return `${rounded}К`;
  }
}

export function insertSpacesForBigNumber(value: number) {
  value = Math.floor(value);
  return value.toLocaleString("ru-RU");
}

export function incomeFormat(value: number) {
  if (value === 0) {
    return value.toFixed(2);
  } else if (value > 0 && value < 0.01) {
    return value.toFixed(5);
  } else if (value >= 0.01) {
    return value.toFixed(2);
  }
}
