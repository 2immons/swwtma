import { defineStore } from "pinia";
import axios from "axios";
import { TonConnect, type Wallet } from "@tonconnect/sdk";
import {telegramStore} from "@/store/telegram.ts";
import {Address, beginCell, Cell, toNano} from "@ton/ton";
import {THEME, TonConnectUI} from "@tonconnect/ui";

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
    currentWallet: import.meta.env.MODE !== "production" ? mockWallet : null as Wallet | null,
    currentWalletAddress: "",
    connector: {} as TonConnect,
    tonConnectUI: {} as TonConnectUI,
    projectAddress: "UQB59MkJmqU000FRptsOuCSkGDbDFq7zjjb7Otk7MKizQTFW",
  }),

  actions: {
    async sendTransaction(price: number) {
      return await this.tonConnectUI.sendTransaction(this.createTransaction(price))
    },

    createTransaction(price: number) {
      // const body = beginCell()
      //     .storeUint(0xf8a7ea5, 32)                 // jetton transfer op code
      //     .storeUint(0, 64)                         // query_id:uint64
      //     .storeCoins(price * 10**9)              // amount:(VarUInteger 16) -  Jetton amount for transfer (decimals = 6 - USDT, 9 - default). Function toNano use decimals = 9 (remember it)
      //     .storeAddress(Address.parse(this.projectAddress))  // destination:MsgAddress
      //     .storeAddress(Address.parse(this.projectAddress))  // response_destination:MsgAddress поменять на себя
      //     .storeUint(0, 1)                          // custom_payload:(Maybe ^Cell)
      //     .storeCoins(1)                 // forward_ton_amount:(VarUInteger 16) - if >0, will send notification message -- возврат комиссии
      //     .storeUint(0,1)                           // forward_payload:(Either Cell ^Cell)
      //     .endCell();

      // const cell = beginCell()
      //     .storeUint(99, 64) // Stores uint 99 in 64 bits
      //     .storeAddress(Address.parse('this.projectAddress')) // Stores an address
      //     .storeCoins(price * 10**9) // Stores 123 as coins
      //     .endCell() // Closes the cell

      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
          {
            address: this.projectAddress,
            amount: toNano(String(price)).toString(),
          }
        ]
      }
      console.log(this.projectAddress)
      console.log(Address.parse(this.projectAddress).toString())
      return transaction
    },

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
        manifestUrl: "https://sww.tonycrypto.site/tonconnect-manifest.json",
        buttonRootId: "ton-button",
      });

      this.tonConnectUI.uiOptions = {
        language: "ru",
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

    async fetchLevels() {
      try {

      } catch (error) {
        console.error("Ошибка при получении заданий:", error);
        throw new Error("Server error when getting tasks list");
      }
    },
  },

  getters: {},
});
