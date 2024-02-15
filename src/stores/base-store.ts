import { defineStore } from 'pinia'
import { usePokemonStore } from './pokemon-store'
import { useCounterStore } from './counter'

export const useBaseStore = defineStore('baseStore', () => {
  const pokemonStore = usePokemonStore()
  const counterStore = useCounterStore()
  function resetStore() {
    pokemonStore.$reset()
    counterStore.$reset()
  }
  return { resetStore }
})
