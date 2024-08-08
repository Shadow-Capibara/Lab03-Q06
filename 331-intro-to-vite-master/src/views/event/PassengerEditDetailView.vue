<script setup lang="ts">
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import type { Passenger } from '@/type';
import { useMessageStore } from '@/stores/message';

const props = defineProps<{ 
  Passenger: Passenger
  id: number
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-redeclare, no-import-assign
const { Passenger } = toRefs(props);
const router = useRouter();
const store = useMessageStore()

const editEvent = () => { 
    store.updateMessage('the update is in progress ')
    setTimeout(() => {
        store.resetMessage()
  }, 5000);
  router.push({ name: 'passenger-list-view'})
};
</script>
<template>
    <div>
    <p>Edit passenger here</p>
    <button @click="editEvent">Edit</button>
  </div>
</template>