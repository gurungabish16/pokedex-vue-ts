<script setup lang="ts">
import type { GeneralLink, Pokemon, PokemonListParam } from '@/models/pokemon.model'
import { onMounted, ref, type Ref, computed } from 'vue'
import { usePokemonStore } from '@/stores/pokemon-store'
import { storeToRefs } from 'pinia'
import { useBaseStore } from '@/stores/base-store'
import PokemonCard from '@/components/PokemonCard.vue'

const filterText: Ref<string> = ref('');
const pokemonListParam: PokemonListParam = {
  limit: 15,
  offset: 0
}

const pokemonStore = usePokemonStore()
const { pokemonUrls, pokemons } = storeToRefs(pokemonStore)
const baseStore = useBaseStore()

onMounted(() => {
  console.log('pokemonurls on mounted', pokemonUrls.value)
  console.log('pokemons on mounted', pokemons.value)
  checksPokemonList()
})

const filteredItems = computed(() => {
  return filterText.value ?
    pokemons.value.filter(data => (
      data.name.toLocaleLowerCase().includes(filterText.value.toLocaleLowerCase()) ||
      data.habitat.toLocaleLowerCase().includes(filterText.value.toLocaleLowerCase()) ||
      data.gender?.toLocaleLowerCase().includes(filterText.value.toLocaleLowerCase())
    )) : pokemons.value;
})

function checksPokemonList() {
  if (pokemonUrls.value.length > 0) {
    checksPokemonDetail()
  } else {
    getPokemonList()
  }
}

function checksPokemonDetail() {
  if (pokemons.value.length < 1) getPokemonDetail()
}

async function getPokemonList() {
  const response = await pokemonStore.getPokemonList(pokemonListParam)
  console.log('response at view', response)
  console.log('pokemons at view', pokemons.value)
  if (response) {
    checksPokemonDetail()
  }
}

function getPokemonDetail() {
  const urls = pokemonUrls.value.map((data: GeneralLink) => data.url)
  pokemonStore.getPokemonDetail(urls).then(res => {
    // todo reload hide
  })
}
function refreshList() {
  baseStore.resetStore()
  checksPokemonList()
}
</script>

<template>
  <div class="home-view-container">
    <div class="header-wrapper">
      <h4>
        Pokemon List
      </h4>
      <div class="filter-action-wrapper">
        <input type="text" class="form-control"
          v-model="filterText"
          placeholder="Enter name for search"
          aria-label="Search" aria-describedby="basic-addon1">
        <button class="btn btn-primary" @click="refreshList()">Refresh</button>
      </div>
    </div>
    <div class="card-container">
      <div class="card-wrapper" v-for="(pokemon, i) of filteredItems" :key="'pokemon' + i">
        <pokemon-card :pokemon="pokemon"
          :cardIndex="i"
        ></pokemon-card>
      </div>
    </div>

  </div>
</template>
