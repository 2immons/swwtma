import { defineStore } from "pinia";
import axios from "axios";
import { config } from "./config";

interface ValidationQuery {
    web_app_data: {
        data_check_string: string | null,
        auth_date: string | null,
        hash: string | null,
    }
}

export const validationStore = defineStore("cards", {
    state: () => ({
        validationQuery: null as null | ValidationQuery,
    }),

    actions: {
        async ensureValidationQuery(): Promise<ValidationQuery> {
            if (!this.validationQuery) {
                this.validationQuery = this.generateValidationQuery();
            }
            return this.validationQuery;
        },

        generateValidationQuery() : ValidationQuery {
            const telegram = (window as any).Telegram;
            if (typeof window !== "undefined" && telegram && telegram.WebApp) {
                telegram.WebApp.ready();

                const user = telegram.WebApp.initData.user;

                if (user) {
                    const queryString = telegram.WebApp.initData;
                    const params = new URLSearchParams(queryString);

                    const authDate = params.get("auth_date");
                    const hash = params.get("hash");

                    params.delete("hash");

                    const dataCheckString = Array.from(params.entries())
                        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                        .map(([key, value]) => `${key}=${value}`)
                        .join("\n");

                    return {
                        web_app_data: {
                            data_check_string: dataCheckString,
                            auth_date: authDate,
                            hash: hash,
                        },
                    };
                } else {
                    console.error("User в Telegram WebAppData не доступен.");
                    return {
                        web_app_data: {
                            data_check_string: null,
                            auth_date: null,
                            hash: null,
                        },
                    };
                }
            } else {
                console.error("Telegram WebApp API не доступен.");
                return {
                    web_app_data: {
                        data_check_string: null,
                        auth_date: null,
                        hash: null,
                    },
                };
            }
        },
    },

    getters: {},
});