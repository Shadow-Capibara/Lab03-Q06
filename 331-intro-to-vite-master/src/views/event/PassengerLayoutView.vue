<script setup lang="ts">
import { ref } from 'vue';
import PassengerService from '@/services/PassengerService';
import AirlineService from '@/services/AirlineService';
import { RouterView } from 'vue-router';
import { useRouter } from 'vue-router';
import type { Passenger } from '@/type'
import type { Airline } from '@/type'

const passenger = ref<Passenger | null> (null)
const airline = ref<Airline | null> (null)
const router = useRouter()

const props = defineProps({
    id: String,
})

    PassengerService.getPassengerById(Number(props.id))
    .then((response)=> {
        passenger.value = response.data
    }).catch(error => {
        console.log(error)
        if (error.response && error.response.status === 404) {
            router.push({ name: '404-resource', params: { resource: 'passenger' } })
        } else {
            router.push({ name: 'network-error' })
        }
    })

    AirlineService.getAirlineById(Number(props.id))
    .then((response)=> {
        airline.value = response.data
    }).catch(error => {
        console.log(error)
        if (error.response && error.response.status === 404) {
            router.push({ name: '404-resource', params: { resource: 'airline' } })
        } else {
            router.push({ name: 'network-error' })
        }
    })

</script>

<template>
    <div v-if="passenger">

        <div id="nav">
        <RouterLink :to="{name: 'passenger-detail', params: { id } }">Details</RouterLink> |
        <RouterLink :to="{name: 'passenger-airline', params: { id } }">Airline</RouterLink>
       </div>
        
        <RouterView :passenger="passenger" ></RouterView>
    </div>
</template>