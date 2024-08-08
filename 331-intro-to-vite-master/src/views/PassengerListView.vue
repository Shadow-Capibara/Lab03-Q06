<script setup lang="ts">
import PassengersCard from '@/components/PassengerCard.vue'
import type { Passenger } from '@/type'
import { ref, watchEffect, computed } from 'vue';
import PassengerService from '@/services/PassengerService'
import type { AxiosResponse } from 'axios';
import { RouterLink, useRouter } from 'vue-router';

const passengers = ref<Passenger[]>([])
const totalPassenger = ref<number>(0)
const router = useRouter()

const props = defineProps<{
  page: number;
  limit: number;
}>()

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalPassenger.value / props.limit)
  return props.page < totalPages && passengers.value.length > 0
})

watchEffect(() => {
  PassengerService.getPassengers(props.limit, props.page)
    .then((response: AxiosResponse<Passenger[]>) => {
      passengers.value = response.data
      totalPassenger.value = parseInt(response.headers['x-total-count'], 10)
    })
    .catch(error => {
      console.log(error)
        if (error.response && error.response.status === 404) {
            router.push({ name: '404-resource', params: { resource: 'page' } })
        } else {
            router.push({ name: 'network-error' })
        }
    })
})
</script>

<template>
  <h1>Passengers</h1>
  <div class="passengers">
    <PassengersCard v-for="passenger in passengers" :key="passenger.id" :passenger="passenger" />
    <div class="pagination">
      <RouterLink :to="{ name: 'passenger-list-view', query: { page: props.page - 1 } }" rel="prev" v-if="props.page != 1">Prev page</RouterLink>
      <RouterLink :to="{ name: 'passenger-list-view', query: { page: props.page + 1 } }" rel="next" v-if="hasNextPage">Next page</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.passengers {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
</style>
