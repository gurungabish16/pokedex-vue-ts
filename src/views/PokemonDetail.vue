<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref, type Ref } from 'vue';
import { usePokemonStore } from '@/stores/pokemon-store';
import { storeToRefs } from 'pinia';
import type { Pokemon } from '@/models/pokemon.model';
import router from '@/router';
import AppPokedex from '@/components/AppPokedex.vue'

const route = useRoute();
const pokemonId = ref();
const pokemonDetail: Ref<Pokemon | null> = ref<Pokemon |null>();
const pokemonStore = usePokemonStore()
const { pokemons } = storeToRefs(pokemonStore)

onMounted(() => {
    pokemonId.value = route.params.id;
    getPokemonDetail();
    console.log(pokemons.value)
    console.log(typeof pokemonId.value)
})

function getPokemonDetail() {
    if (pokemonId.value) {
        const pokemon = pokemons.value.find(data => data.id.toString() === pokemonId.value);
        if (pokemon) pokemonDetail.value = pokemon;
        else pokemonDetail.value = null;
    }
}

function backToList() {
    router.push('/')
}
</script>

<template>
    <div class="pokemon-detail-wrapper" style="height: 100vh;">
        <div class="header-wrapper" style="display: flex; justify-content: space-between;">
            <h3>Pokemon Detail</h3>
            <button class="btn btn-secondary" @click="backToList()">Goto List</button>
        </div>
        <div class="detail-content">
            <app-pokedex :pokemon="pokemonDetail" :card-index="pokemonId"></app-pokedex>
        </div>
    </div>

</template>
