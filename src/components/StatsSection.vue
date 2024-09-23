<template>
  <section class="stats">
    <div class="container">
      <div class="stats-content">
        <div class="rank-wrapper">
          <div class="progress-circle">
            <img src="../assets/svg/stats/car.svg" alt="Rank progress" />
          </div>
          <div class="rank-title-wrapper">
            <p class="rank-title">Your Ecology<br />Rank</p>
          </div>
        </div>
        <div class="stats-wrapper">
          <div class="green-coin-wrapper">
            <div class="logo-wrapper">
              <img
                src="../assets/svg/stats/green-coin.svg"
                alt="Green Coin Logo"
              />
            </div>
            <div class="info-wrapper">
              <p class="amount">4.000.00</p>
            </div>
          </div>
          <hr />
          <div class="profit-wrapper">
            <div class="logo-wrapper">
              <img src="../assets/svg/stats/profit.svg" alt="Profit Logo" />
            </div>
            <div class="info-wrapper">
              <p class="description">{{ t("profit-per-day") }}</p>
              <p class="amount">+ 0.1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// TODO: запросы к серверу для получения статистики (ранг + прогресс, коины, профит)
</script>

<style scoped lang="sass">
@import "src/styles/variables"
.stats
  font-family: "Poppins", sans-serif
  display: flex
  justify-content: center
  align-items: center
  margin-top: 34px
  height: 152px
.stats-content
  display: grid
  align-items: center
  height: 100%
  width: 100%
  box-shadow: $c-element-shadow
  background: $c-stats-section
  border-radius: 31px
  grid-template-columns: 4fr 7fr

.rank-wrapper
  display: flex
  flex-direction: column
  justify-content: space-between
  height: 108px
  border-right: 2px solid $c-separator

  .progress-circle
    display: flex
    justify-content: center
    align-items: center
    align-self: center
    border: 2px solid $c-separator
    border-radius: 50%
    width: 68px
    aspect-ratio: 1
    overflow: hidden

    img
      width: 70%

  .rank-title
    text-align: center
    font-weight: 500
    font-size: 14px
    line-height: 16px

.stats-wrapper
  display: flex
  flex-direction: column
  align-items: start
  justify-content: space-between
  height: 108px
  margin-left: 18px
  width: fit-content

hr
  width: 100%
  border: 1px solid $c-separator

.green-coin-wrapper
  display: flex
  align-items: center
  height: 45%
  width: 80%

  .logo-wrapper
    display: flex
    justify-content: center
    align-items: center
    min-height: 42px
    min-width: 42px
    background: #A0FFD5
    box-shadow: 6px 6px 8px rgba(6, 122, 70, 0.3), inset 15px 16px 19px rgba(6, 122, 70, 0.4), inset -10px -11px 9px rgba(6, 122, 70, 0.5)
    border-radius: 43px

    img
      width: 100%
      height: 100%

  .info-wrapper
    flex: 1
    height: 70%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: start
    margin-left: 10px

  .amount
    font-size: 17px
    font-weight: 900
    line-height: 18px
    text-align: start

.profit-wrapper
  display: flex
  align-items: center
  height: 45%
  width: 80%

  .logo-wrapper
    display: flex
    justify-content: center
    align-items: center
    min-height: 42px
    min-width: 42px
    background: #A0FFD5
    box-shadow: 6px 6px 8px rgba(6, 122, 70, 0.3), inset 15px 16px 19px rgba(6, 122, 70, 0.4), inset -10px -11px 9px rgba(6, 122, 70, 0.5)
    border-radius: 43px

    img
      width: 100%
      height: 100%

  .info-wrapper
    flex: 1
    height: 70%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: start
    margin-left: 10px

    .description
      font-size: 14px
      white-space: nowrap

    .amount
      font-size: 17px
      font-weight: 900
      line-height: 18px
      text-align: start
      justify-self: start
      align-self: start

img
  height: 100%
  width: 100%
</style>
