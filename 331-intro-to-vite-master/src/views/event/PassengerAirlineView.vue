<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import AirlineService from '@/services/AirlineService';
import PassengerService from '@/services/PassengerService';
import type { Airline } from '@/type';
import type { Passenger } from '@/type';

const airline = ref<Airline | null>(null);
const passenger = ref<Passenger | null>(null);
const route = useRoute();

onMounted(() => {
  const id = parseInt(route.params.id as string, 10);
  if (!isNaN(id)) {
    PassengerService.getPassengerById(id)
      .then(response => {
        passenger.value = response.data;
        return AirlineService.getAirlineById(response.data.airlineId);
      })
      .then(response => {
        airline.value = response.data;
      })
      .catch(error => {
        console.error('Failed to fetch details:', error);
      });
  }
});
</script>

<template>
  <div v-if="passenger && airline">
    <h1>Airline Number {{ passenger.airlineId }}</h1>
    <p>Airline name: {{ airline.AirlineName }}</p>
    <p>Airline email: {{ airline.email }}</p>
    <p>Airline address: {{ airline.address }}</p>
  </div>
  <div v-else>
    <p>Loading details...</p>
  </div>
</template>
