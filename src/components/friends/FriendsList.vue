<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from "vue";
import { friendsStore } from "@/store/friends";
import FriendItem from "@/components/friends/FriendItem.vue";
import ReferalPopup from "@/components/friends/ReferalPopup.vue";

const friendsStoreInstance = friendsStore();

const friends = computed(() => {
  return friendsStoreInstance.friends;
});

const isReferalPopupVisible = ref(false);

const openReferalPopup = () => {
  isReferalPopupVisible.value = true;
};
</script>

<template>
  <div class="friends-list">
    <ReferalPopup
      @click.stop
      :modelValue="isReferalPopupVisible"
      @update:modelValue="isReferalPopupVisible = $event"
    />
    <div class="list-header">
      <p>6 Friends</p>
      <button @click="openReferalPopup">Invite +</button>
    </div>
    <div class="list">
      <FriendItem
        v-for="(friend, index) in friends"
        :key="index"
        :friend="friend"
      />
    </div>
  </div>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

.friends-list
  color: white
  display: flex
  flex-direction: column
  width: 100%
  margin-top: 50px

.list-header
  display: flex
  flex-direction: row
  width: 100%
  justify-content: space-between
  align-items: center

  p
    font-size: 18px

  button
    background: vars.$c-light-element
    border: 1px solid vars.$c-border-color
    padding: 10px 15px
    height: 30px
    display: flex
    align-items: center
    color: vars.$c-main-text
    border-radius: 50px
    font-size: 12px
    font-weight: 700

.list
  display: flex
  flex-direction: column
  margin-top: 13px
</style>
