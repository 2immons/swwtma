<template>
  <section class="stats-section">
    <div class="container">
      <div class="stats-content">
        <div class="stats-wrapper">
          <div class="stats__item stats__item--balance">
            <p>Your Balance</p>
            <div class="amount">
              <img src="../assets/svg/stats/green-coin.svg" alt="" />
              400 000
            </div>
          </div>
          <div class="stats__item stats__item--mining-speed">
            <p>Mining Speed</p>
            <div class="amount">+ 0.34/h</div>
          </div>
        </div>
        <div class="mining-progress-wrapper">
          <div class="mining-progress-bar">
            <div class="progress">
              <div class="interface">
                <button>Claim</button>
                <div class="time">
                  <img src="../assets/svg/stats/time.svg" alt="" />
                  <p>2h 30m</p>
                </div>
              </div>
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
.stats-section
  display: flex
  justify-content: center
  align-items: center
  margin-top: 41px
  height: 181px
.stats-content
  display: flex
  flex-direction: column
  height: 100%
  width: 100%
  gap: 10px

.stats-wrapper
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 10px

  .stats__item
    border-radius: 20px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: start
    gap: 20px
    padding: 22px 20px
    height: 100px

    p
      line-height: 16.4px
      font-size: 12px
      font-weight: 600

    .amount
      display: flex
      align-items: center
      justify-content: start
      gap: 7px
      font-size: 27px
      font-weight: 600
      line-height: 36px

  .stats__item--balance
    background: $c-light-element

  .stats__item--mining-speed
    color: $c-light-element
    background: $c-dark-element
    border: 0.4px solid $c-dark-element
    border-image-source: linear-gradient(0deg, rgba(34, 240, 125, 0.2), rgba(34, 240, 125, 0.2)), linear-gradient(74.98deg, rgba(255, 255, 255, 0) 49.14%, rgba(255, 255, 255, 0.1) 114.42%), linear-gradient(264.49deg, rgba(255, 255, 255, 0) 59.15%, rgba(255, 255, 255, 0.4) 116.29%)
    backdrop-filter: blur(2.5px)

.mining-progress-wrapper
  background: $c-dark-element
  border-radius: 20px
  border: 0.4px solid $c-dark-element
  border-image-source: linear-gradient(0deg, rgba(34, 240, 125, 0.2), rgba(34, 240, 125, 0.2)), linear-gradient(74.98deg, rgba(255, 255, 255, 0) 49.14%, rgba(255, 255, 255, 0.1) 114.42%), linear-gradient(264.49deg, rgba(255, 255, 255, 0) 59.15%, rgba(255, 255, 255, 0.4) 116.29%)
  height: 71px
  display: flex
  align-items: center
  justify-content: center

.mining-progress-bar
  width: 91%
  height: 33px
  background: #0000002B
  border-radius: 50px
  position: relative
  overflow: hidden
  border: 0.4px solid #0000002B
  border-image-source: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(131.53deg, rgba(0, 0, 0, 0) 41.75%, rgba(0, 0, 0, 0.3) 124.06%)

.progress
  position: absolute
  left: 0
  border-radius: 50px
  width: 80%
  background: linear-gradient(0deg, #22F07D, #22F07D), linear-gradient(85.46deg, rgba(34, 240, 125, 0) 58.93%, rgba(255, 255, 255, 0.5) 110.51%), linear-gradient(269.7deg, rgba(26, 48, 36, 0) 49.71%, rgba(26, 47, 36, 0.7) 115.77%)
  height: 100%
  display: flex
  justify-content: start
  align-items: center

.interface
  background: #1517154D
  border-radius: 50px
  height: 25px
  border: 0.4px solid #1517154D
  gap: 8px
  display: flex
  margin-left: 3px
  padding-right: 14px
  line-height: 13.66px
  text-align: center
  font-size: 10px

  button
    width: 75px
    background: $c-bg
    border-radius: 31.64px
    color: white
    font-weight: 700
    font-size: 10px

  .time
    display: flex
    align-items: center
    gap: 5px
    font-weight: 600

    p
      opacity: 80%
</style>
