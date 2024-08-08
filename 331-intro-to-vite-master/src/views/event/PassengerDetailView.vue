<!-- components/PassengerDetail.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PassengerService from '@/services/PassengerService';
import type { Passenger } from '@/type';

const passenger = ref<Passenger | null>(null);
const route = useRoute();

onMounted(() => {
  const id = parseInt(route.params.id as string, 10);
  if (!isNaN(id)) {
    PassengerService.getPassengerById(id)
      .then(response => {
        passenger.value = response.data;
      })
      .catch(error => {
        console.error('Failed to fetch passenger details:', error)
      });
  }
});
</script>

<template>
  <div v-if="passenger">
    <h1>{{ passenger.first_name }} {{ passenger.last_name }}</h1>
    <p>Email: {{ passenger.email }}</p>
    <p>Gender: {{ passenger.gender }}</p>
    <p>IP Address: {{ passenger.ip_address }}</p>
    <p>Source: {{ passenger.Source }}</p>
    <p>Destination: {{ passenger.Destination }}</p>
    <p>Travel Date: {{ new Date(passenger.travelDate).toLocaleDateString() }}</p>
    <p>Airline ID: {{ passenger.airlineId }}</p>
  </div>
</template>
