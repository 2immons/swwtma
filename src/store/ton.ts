import { defineStore } from "pinia";
import axios from "axios";
import { TonConnect, type Wallet } from "@tonconnect/sdk";
import {telegramStore} from "@/store/telegram.ts";
import {Address, beginCell, Cell, toNano} from "@ton/ton";
import {Locales, THEME, TonConnectUI} from "@tonconnect/ui";

let connector: TonConnect;

const mockWallet = null
const mockWalletAddress = "123123123"

export enum DonateType {
  IMAGE = 'IMAGE',
  ENERGY_BOOST = 'ENERGY_BOOST',
  MINING_BOOST = 'MINING_BOOST',
  TEMP_BOOST = 'TEMP_BOOST',
  RESTORE_ENERGY = 'RESTORE_ENERGY',
  RESTORE_SPEED = 'RESTORE_SPEED'
}

export enum Currency {
  USDT = "USD₮",
  TON = "TON"
}

export const tonStore = defineStore("ton", {
  state: () => ({
    currentWallet: null as Wallet | null,
    currentWalletAddress: "", // "UQB59MkJmqU000FRptsOuCSkGDbDFq7zjjb7Otk7MKizQTFW",
    connector: {} as TonConnect,
    tonConnectUI: {} as TonConnectUI,
    projectAddress: "UQB59MkJmqU000FRptsOuCSkGDbDFq7zjjb7Otk7MKizQTFW",
  }),

  actions: {
    async connectWallet(wallet: Wallet) {
      try {

        //const webAppData = telegramStore().getWebAppData;
        this.currentWallet = wallet
        this.currentWalletAddress = this.currentWallet.account.address

        // const response = await axios.post(
        //     `${import.meta.env.VITE_BACKEND}/api/connect-wallet/${wallet.account.address}`,
        //     webAppData,
        // );
        //
        // return response.data.data;
      } catch (error) {
        console.error("Ошибка при получении заданий:", error);
        throw new Error("Server error when getting tasks list");
      }
    },

    async disconnectWallet() {
      if (this.connector && this.currentWallet) {
        await this.connector.disconnect()
        this.currentWallet = null
        this.currentWalletAddress = ""
        console.log("кошелек отвязан")
      }
    },

    async initTon() {
      this.connector = new TonConnect({
        manifestUrl: import.meta.env.VITE_MANIFEST_URL
      });

      this.tonConnectUI = new TonConnectUI({
        manifestUrl: import.meta.env.VITE_MANIFEST_URL,
        buttonRootId: "ton-button",
      });

      this.tonConnectUI.uiOptions = {
        language: telegramStore().userData.language as Locales || "en" as Locales,
        uiPreferences: {
          theme: THEME.DARK,
        },
      };

      await this.connector.restoreConnection()
      if (this.connector.wallet) {
        this.currentWallet = this.connector.wallet
        this.currentWalletAddress = this.currentWallet.account.address
      }
    },
  },

  getters: {},
});
