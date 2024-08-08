<script setup lang="ts">
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import type { Passenger } from '@/type';

const props = defineProps<{ 
  Passenger: Passenger
  id: number
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-redeclare, no-import-assign
const { Passenger } = toRefs(props);
const router = useRouter();

const editEvent = () => { 
  router.push({ name: 'passenger-detail'});
};
</script>
<template>
    <div>
    <p>Edit passenger here</p>
    <button @click="editEvent">Edit</button>
  </div>
</template>