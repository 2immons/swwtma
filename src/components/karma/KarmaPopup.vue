<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  onMounted,
  onBeforeUnmount,
  ref,
  computed,
  watch,
} from "vue";
import { cardsStore } from "@/store/cards";
import PageHeader from "@/components/layout/TheHeader.vue";
import { karmaStore } from "@/store/karma";
const karmaStoreInstance = karmaStore();
import { useI18n } from "vue-i18n";
import type { KarmaBase } from "@/types/types";
const { t, locale } = useI18n();

const props = defineProps<{
  karmaCard: KarmaBase
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const closePopup = () => {
  emit("update:modelValue", false);
};

const progressWidth = computed(() => {
  return String((props.karmaCard.current / props.karmaCard.goal) * 100) + "%";
});

const touchStartY = ref(0);
const touchEndY = ref(0);
const swipeThreshold = 50;

const onTouchStart = (event: TouchEvent) => {
  touchStartY.value = event.touches[0].clientY;
};

const onTouchMove = (event: TouchEvent) => {
  touchEndY.value = event.touches[0].clientY;
};

const onTouchEnd = () => {
  if (touchEndY.value - touchStartY.value > swipeThreshold) {
    closePopup(); // Закрыть компонент при свайпе вниз
  }
};

onBeforeUnmount(() => {
  document.body.classList.remove("no-scroll");
});

// Слушайте изменения `modelValue` и обновляйте класс
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  },
);


const isDonationInputsVisible = ref(false);
const currentWallet = computed(() => tonStore().currentWallet as Wallet)

const donate = async () => {
  if (currentWallet.value) {
    isDonationInputsVisible.value = true
  }
}

const selectCurrency = (currency: Currency) => {
  selectedCurrency.value = currency
}

const imageUrl = computed(() => {
      if (props.karmaCard.image)
        return `${import.meta.env.VITE_BACKEND}/api/v1/files/${props.karmaCard.image.upload_storage}/${props.karmaCard.image.file_id}`
    })

import {beginCell, Address, toNano, Cell} from '@ton/ton'
import axios from "axios";
import {Currency, tonStore} from "@/store/ton.ts";
import {eventBus} from "@/event_bus/eventBus.ts";
import type {Wallet} from "@tonconnect/sdk";
// transfer#0f8a7ea5 query_id:uint64 amount:(VarUInteger 16) destination:MsgAddress
// response_destination:MsgAddress custom_payload:(Maybe ^Cell)
// forward_ton_amount:(VarUInteger 16) forward_payload:(Either Cell ^Cell)
// = InternalMsgBody;

// Контракт + Адрес кошелька = Jetton Address
//

// Достает Jetton Address кошелька пользователя, который связан с определенным жетоном и пользователем,
// используя адрес контракта Jetton и адрес кошелька пользователя из tonconnect

// Jetton Address - это подкошелек, который был сгенерирован с помощью адреса котракта определенного Jetton и адресом кошелька пользователя
const getJettonWalletAddress = async (CAJetton: string, walletAddress: string) => {
  const jetton = Address.parse(CAJetton)
  const wallet = Address.parse(walletAddress)

  const result = await axios.get(`https://tonapi.io/v2/blockchain/accounts/${jetton}/methods/get_wallet_address?args=${wallet}`)
  if (result.status === 200) {
    return result.data["decoded"]["jetton_wallet_address"]
  }
  return null
}

const tonStoreInstance = tonStore();
const projectAddress = computed(() => tonStoreInstance.projectAddress)

const selectedCurrency = ref(Currency.TON)
const price = ref(10)

const createTransaction = async (price: number, currency: string) => {
  const body = beginCell()
      .storeUint(0xf8a7ea5, 32)                 // jetton transfer op code
      .storeUint(0, 64)                         // query_id:uint64
      .storeCoins(price * 10**6)              // amount:(VarUInteger 16) -  Jetton amount for transfer (decimals = 6 - USDT, 9 - default). Function toNano use decimals = 9 (remember it)
      .storeAddress(Address.parse(projectAddress.value))  // destination:MsgAddress
      .storeAddress(Address.parse(currentWallet.value.account.address))  // response_destination:MsgAddress поменять на себя
      .storeUint(0, 1)                          // custom_payload:(Maybe ^Cell)
      .storeCoins(1)                 // forward_ton_amount:(VarUInteger 16) - if >0, will send notification message -- возврат комиссии
      .storeUint(0,1)                           // forward_payload:(Either Cell ^Cell)
      .endCell();

  let transaction;

  if (currency === Currency.USDT) {
    const CAJettonUSDT = "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs"
    transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [
        {
          //
          address: await getJettonWalletAddress(CAJettonUSDT, currentWallet.value.account.address),  // sender jetton wallet
          amount: toNano("0.05").toString(),
          payload: body.toBoc().toString("base64")
        }
      ]
    }
    return transaction
  }

  else {
    transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [
        {
          address: projectAddress.value,
          amount: toNano(String(price)).toString(),
        }
      ]
    }
    return transaction
  }
}

const isMinPriceError = ref(false);

const donateFinal = async () => {
  if (price.value <= props.karmaCard.min_donation) {
    eventBus.emit("showErrorPopup", `${t("min-price-error")}: ${props.karmaCard.min_donation}`)
    return
  }

  const transaction = await createTransaction(price.value, selectedCurrency.value)
  if (tonConnectUI) {
    const result = await tonConnectUI.value.sendTransaction(transaction)

    const cell = Cell.fromBase64(result.boc);
    const buffer = cell.hash();
    const hashHex = buffer.toString("hex");
    await karmaStoreInstance.donate(props.karmaCard.id, hashHex, selectedCurrency.value)
  }
}

const isWalletConnected = computed(() => {
  if (tonStoreInstance.currentWallet)
    return true
  else
    return false
})


const tonConnectUI = computed(() => tonStoreInstance.tonConnectUI)

onMounted(async () => {
  if (tonConnectUI.value) {
    tonConnectUI.value.onStatusChange(async () => {
      if (tonConnectUI.value?.connected) {
        const connectedWallet = tonConnectUI.value.wallet;
        console.log("Wallet connected:", connectedWallet);
        if (connectedWallet)
          await tonStoreInstance.connectWallet(connectedWallet);
      } else {
        console.log("Wallet disconnected");
      }
    });
  }
});

const connectWallet = async () => {
  if (tonConnectUI) {
    tonConnectUI.value?.modal.open();
  } else {
    console.error("TonConnectUI не инициализирован");
  }
};

const closeDonationInputs = () => {
  isDonationInputsVisible.value = false
}

</script>

<template>
  <Transition>
    <div
      class="card-popup"
      v-if="modelValue"
      @click="closePopup"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div class="payment-modal" v-if="isDonationInputsVisible" @click.stop @click="closeDonationInputs">
        <div class="container">
          <div class="payment-modal-content" @click.stop>
            <h2 class="payment-modal-title">{{ t("karma-title") }}</h2>
            <div class="donation-inputs" v-if="isDonationInputsVisible">
              <div class="currency-amount">
                <input type="number" v-model="price" :min="props.karmaCard.min_donation">
                <div class="currencies-btn">
                  <button :class="selectedCurrency === Currency.TON ? 'active' : '' " @click="selectCurrency(Currency.TON)">
                    <img src="../../assets/svg/pay/ton.svg" alt="">TON</button>
                  <button :class="selectedCurrency === Currency.USDT ? 'active' : '' " @click="selectCurrency(Currency.USDT)">
                    <img src="../../assets/svg/pay/usdt.svg" alt="">USDT
                  </button>
                </div>
              </div>
            </div>
            <button
                class="buy-btn"
                v-if="isWalletConnected && karmaCard.status === 'active' && isDonationInputsVisible"
                @click="donateFinal"
            >
              {{ t("donate-final") }}
            </button>
          </div>
        </div>
      </div>
      <div class="content" @click.stop>
        <div class="container">
          <div class="wrapper no-scrollbar">
            <div class="photo">
              <img :src=imageUrl>
              <button @click="closePopup" class="close-btn">+</button>
            </div>
            <div class="info">
              <h3>{{ karmaCard.title }}</h3>
              <p>{{ karmaCard.info }}</p>
            </div>
            <hr />
            <div class="stats">
              <p>
                {{ t("boost") }}: + {{ karmaCard.boost }}
                <img src="../../assets/svg/stats/green-coin.svg" alt="" />
                /{{ t("h") }}
              </p>
            </div>
            <div class="donation-goal">
              <p>
                {{ t("donation-goal") }}: {{ karmaCard.goal }} USDT
                ({{ karmaCard.goal - karmaCard.current + " USDT " + t("last-donated") }})
              </p>
              <div class="donation-bar">
                <div class="progress" :style="{ width: progressWidth }"></div>
              </div>
              <p v-if="karmaCard.is_donated">
                {{ t("you-donated") }}: {{ karmaCard.donate_amount }} USDT
              </p>
              <p v-else-if="!karmaCard.is_donated">
                {{ t("not-donated") }}
              </p>
            </div>

            <button
                class="buy-btn"
                v-if="!isWalletConnected && karmaCard.status === 'active' && !isDonationInputsVisible"
                @click="connectWallet"
            >
              {{ t("connect-wallet") }}
            </button>

            <button
              class="buy-btn"
              v-else-if="isWalletConnected && karmaCard.status === 'active' && !isDonationInputsVisible"
              @click="donate"
            >
              {{ karmaCard.is_donated ? t("donate-more") : t("donate-from") + " " + karmaCard.min_donation + " USDT" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars
//БЮЛЯ
.payment-modal
  position: absolute
  width: 100%
  height: 100%
  background: rgba(0, 0, 0, 0.78)
  z-index: 100
  display: flex
  justify-content: center
  align-items: center

.payment-modal-content
  width: 100%
  background: vars.$c-dark-element-solid
  border-radius: 15px
  height: fit-content
  padding: 20px

.currency-amount
  margin: 30px 0

.payment-modal-title
  opacity: 0.6
  font-size: 12px

.error-text
  color: #ba113f


.donation-inputs
  display: flex
  flex-direction: column
  justify-content: start
  align-items: start
  width: 100%
  gap: 10px

  p
    font-size: 14px

  .amount
    display: flex
    align-items: center
    gap: 8px

    input
      border-radius: 15px
      padding: 2px 5px
      border: 1px solid vars.$c-border-color

.currency-amount
  display: flex
  flex-direction: column
  width: 100%
  justify-content: center
  align-items: center
  gap: 10px

  input
    display: flex
    background: transparent
    border: none
    color: white
    font-size: 30px
    width: 100%
    text-align: center

.currencies-btn
  display: flex
  align-items: center
  gap: 10px

  button
    color: white
    padding: 5px 8px
    border: 1px solid vars.$c-border-color
    border-radius: 18px
    display: flex
    gap: 8px
    align-items: center

  .active
    background: gray

.v-enter-active,
.v-leave-active
  transition: transform 0.3s ease

.v-enter-from,
.v-leave-to
  transform: translateY(100%)

.card-popup
  display: flex
  width: 100%
  flex-direction: column
  align-items: center
  left: 0
  z-index: 200
  height: 100vh
  position: fixed
  top: 0

.content
  position: fixed
  bottom: 0
  background: vars.$c-bg
  height: 80%
  max-height: 750px
  width: 100%
  display: flex
  justify-content: center
  margin-top: 60px
  padding-bottom: 30px
  border-top-right-radius: 30px
  border-top-left-radius: 30px

.container
  height: 100%

.photo
  position: relative
  display: flex
  width: 100%
  border-radius: 20px
  justify-content: center
  align-items: center
  min-height: 280px
  overflow: hidden

  img
    height: 100%
    object-fit: cover
    object-position: center

.popup-header
  position: relative
  margin-top: 16px
  min-height: fit-content
  display: flex
  width: 100%
  border-radius: 20px
  justify-content: center
  align-items: center
  overflow: hidden
  margin-bottom: 20px

.close-btn
  position: absolute
  right: 10px
  top: -25px
  rotate: 45deg
  font-weight: 200
  font-size: 60px
  line-height: 84px
  background: transparent
  color: vars.$c-main-text

.buttons
  display: flex
  flex-direction: column
  width: 100%
  margin-top: 30px
  gap: 15px

  button, a
    width: 100%
    font-size: 16px
    font-weight: 700
    background: white
    padding: 15px 0
    border: 1px solid vars.$c-border-color
    border-radius: 100px
    align-items: center
    justify-content: center
    gap: 4px
    color: vars.$c-main-text

.wrapper
  display: flex
  overflow: scroll
  flex-direction: column
  width: 100%
  height: 100%
  align-items: center
  margin-top: 16px
  border-top-right-radius: 30px
  border-top-left-radius: 30px

.info
  margin-top: 26px
  width: 100%

  h3
    text-align: left
    font-size: 20px

  p
    margin-top: 20px
    text-align: start
    font-size: 10px
    opacity: 50%
    line-height: 16px

hr
  margin: 20px 0
  width: 100%
  border: 1px solid vars.$c-border-color

.stats
  display: flex
  flex-direction: column
  justify-content: start
  align-items: start
  width: 100%
  gap: 12px

  p
    display: flex
    gap: 3px
    align-items: center
    font-size: 14px
    opacity: 70%
    img
      height: 12px

.donation-goal
  display: flex
  flex-direction: column
  width: 100%
  align-items: start
  gap: 8px
  margin: 12px 0
  height: 38px

  p
    text-align: start
    display: flex
    justify-content: center
    align-items: center
    gap: 3px
    opacity: 70%
    font-size: 11px

    img
      height: 7px

  .donation-bar
    display: flex
    align-items: center
    height: 4px
    width: 100%
    background: vars.$c-dark-element
    border: 1px solid #FFFFFF40
    backdrop-filter: blur(2px)
    border-radius: 40px

    .progress
      background: vars.$c-light-element
      height: 5px
      border-radius: 40px

.buy-btn
  margin-top: 20px
  width: 100%
  font-size: 16px
  font-weight: 700
  background: white
  padding: 15px 0
  border: 1px solid vars.$c-border-color
  border-radius: 100px
  display: flex
  align-items: center
  justify-content: center
  gap: 4px
  color: vars.$c-main-text

  img
    height: 14px
</style>
