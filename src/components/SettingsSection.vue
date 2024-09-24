<script setup lang="ts">
import SliderButton from "@/components/SliderButton.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";

const isStockExchangeMenuVisible = ref(false);
const isConfirmModalVisible = ref(false);

const toggleConfirmModal = () => {
  isConfirmModalVisible.value = !isConfirmModalVisible.value;
  if (isConfirmModalVisible.value) accountArrow.value = "arrow-icon--open";
  else accountArrow.value = "arrow-icon";
};

const toggleStockExchangeMenu = () => {
  isStockExchangeMenuVisible.value = !isStockExchangeMenuVisible.value;
  if (isStockExchangeMenuVisible.value)
    stockExchangeArrow.value = "arrow-icon--open";
  else stockExchangeArrow.value = "arrow-icon";
};

const handleClickOutside = (event: any) => {
  const languageSettingsElement = document.querySelector(
    ".stock-exchange-menu"
  );
  const languageWrapperElement = document.querySelector(
    ".stock-exchange-wrapper"
  );

  const accountDelete = document.querySelector(".confirm-modal");
  const accountDeleteWrapper = document.querySelector(".account-wrapper");

  if (
    isConfirmModalVisible.value &&
    accountDelete &&
    accountDeleteWrapper &&
    !accountDelete.contains(event.target) &&
    !accountDeleteWrapper.contains(event.target)
  ) {
    isConfirmModalVisible.value = false;
    accountArrow.value = "arrow-icon";
  }

  if (
    isStockExchangeMenuVisible.value &&
    languageSettingsElement &&
    languageWrapperElement &&
    !languageSettingsElement.contains(event.target) &&
    !languageWrapperElement.contains(event.target)
  ) {
    isStockExchangeMenuVisible.value = false;
    stockExchangeArrow.value = "arrow-icon";
  }
};

onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const stockExchange = ref("Bybit");

const setStock = (stock: string) => {
  stockExchange.value = stock;
};

const accountArrow = ref("arrow-icon");
const stockExchangeArrow = ref("arrow-icon");
</script>

<template>
  <section class="settings">
    <div class="container">
      <div class="settings-content">
        <h2>Settings</h2>
        <div class="settings-list">
          <div
            class="settings-wrapper stock-exchange-wrapper"
            @click="toggleStockExchangeMenu"
          >
            <h3>Сменить биржу</h3>
            <p>{{ stockExchange }}</p>
            <img
              :class="stockExchangeArrow"
              src="../assets/svg/nav/arrow-right.svg"
              alt=""
            />
            <div class="stock-exchange-menu" v-if="isStockExchangeMenuVisible">
              <button @click="setStock('Bybit')" class="language-btn">
                <img src="../assets/svg/flags/eng.svg" alt="English language" />
                Bybit
              </button>
              <button @click="setStock('Test')" class="language-btn">
                <img src="../assets/svg/flags/rus.svg" alt="Russian language" />
                Test
              </button>
            </div>
          </div>
          <div class="settings-wrapper referal-wrapper">
            <h3>Стать рефералом</h3>
            <p></p>
          </div>
          <div
            class="settings-wrapper account-wrapper"
            @click="toggleConfirmModal"
          >
            <h3>Удалить аккаунт</h3>
            <img
              :class="accountArrow"
              src="../assets/svg/nav/arrow-right.svg"
              alt=""
            />
            <div class="confirm-modal" v-if="isConfirmModalVisible">
              <h3>Вы уверены?</h3>
              <div class="confirm-modal__buttons">
                <button class="confirm-btn" @click="deleteAccount">
                  Да, удалить
                </button>
                <button class="deny-btn" @click="toggleConfirmModal">
                  Нет, отменить
                </button>
              </div>
            </div>
          </div>
          <div class="sliders">
            <div class="slider-setting">
              <h3>Вибрация</h3>
              <SliderButton />
            </div>
            <div class="slider-setting">
              <h3>Анимация монет</h3>
              <SliderButton />
            </div>
          </div>
        </div>
        <p class="politic">Политика конфедициальности</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="sass">
@import "src/styles/variables"
.settings
  display: flex
  justify-content: center
  margin: 20px 0
.settings-content
  width: 100%
  align-items: center
  flex-direction: column
  display: flex
h2
  color: $c-light-text

.settings-list
  margin-top: 10px
  width: 100%
  display: flex
  flex-direction: column
  gap: 8px

.settings-wrapper
  background: $c-element-bg
  box-shadow: $c-element-shadow
  border-radius: 12px
  display: flex
  flex-direction: column
  height: 60px
  align-items: start
  justify-content: center
  padding: 0 15px
  position: relative

  img
    position: absolute
    right: 15px

.stock-exchange-wrapper, .account-wrapper
  position: relative

.confirm-modal
  width: 100%
  background: $c-active-element
  position: absolute
  z-index: 2
  top: 63px
  left: 0
  display: flex
  flex-direction: column
  align-items: start
  padding: 10px
  gap: 10px
  border-radius: 10px

  h3
    width: 100%
    text-align: center
  .confirm-modal__buttons
    display: flex
    width: 100%
    justify-content: space-around

    button
      background: $c-active-element
      color: $c-main-text
      font-size: 18px
      border-radius: 12px
      border: 1px solid $c-main-text
      padding: 5px 10px
      box-shadow: $c-element-shadow

.stock-exchange-menu
  height: 100px
  width: 100%
  background: $c-active-element
  position: absolute
  z-index: 2
  top: 63px
  left: 0
  display: flex
  flex-direction: column
  align-items: start
  padding: 10px
  gap: 10px
  border-radius: 10px

  button
    display: flex
    align-items: center
    gap: 10px
    font-size: 20px
    color: $c-main-text

.sliders
  margin-top: 10px
  width: 100%
  display: flex
  flex-direction: column
  gap: 10px
  color: $c-light-text

.slider-setting
  display: flex
  justify-content: space-between
  padding: 0 0 0 15px
  align-items: center


.politic
  margin-top: 30px
  color: $c-light-text

.arrow-icon
  transform: rotateZ(0deg)
  transition: 0.3s ease

.arrow-icon--open
  transform: rotateZ(90deg)
  transition: 0.3s ease
</style>
