<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from "vue";
import CardItem from "@/components/mining/CardItem.vue";
import { friendsStore } from "@/store/friends";
import FriendItem from "@/components/friends/FriendItem.vue";

const friendsStoreInstance = friendsStore();

const friends = computed(() => {
  return friendsStoreInstance.friends;
});

// Определение интерфейсов
interface Task {
  title: string;
}

interface Category {
  id: number;
  title: string;
  tasks: Task[];
}
</script>

<template>
  <div class="friends-list">
    <div class="list-header">
      <p>6 Friends</p>
      <button>Invite +</button>
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
@import "../../styles/variables"
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

  button
    background: $c-light-element
    border: 1px solid $c-border-color
    padding: 10px 15px
    height: 30px
    display: flex
    align-items: center
    color: $c-main-text
    border-radius: 50px
    font-size: 12px
    font-weight: 700


.list
  display: flex
  flex-direction: column
  margin-top: 13px
</style>
