import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  GeneralLink,
  Pokemon,
  PokemonDetailResponse,
  PokemonListParam,
} from '@/models/pokemon.model'
import pokemonService from '@/services/pokemon.service'
import { useLocalStorage } from '@vueuse/core'
import { PokemonMapperService } from '@/services/pokemon-mapper.service'
import { HelperService } from '@/services/helper.service'

export const usePokemonStore = defineStore('pokemonStore', () => {
  /** pokemon detail urls  */
  // store in localstorage
  const pokemonUrls: Ref<Array<GeneralLink>> = useLocalStorage<Array<GeneralLink>>(
    'pokemonUrls',
    ref([])
  )
  /** pokemon list  */
  // store in localstorage
  const pokemons: Ref<Array<Pokemon>> = useLocalStorage<Array<Pokemon>>('pokemons', ref([]));
  const selectedPokemon: Ref<Pokemon | null> = ref();

  function getPokemonList(pokemonListParam: PokemonListParam): Promise<boolean> {
    return pokemonService.getPokemonList(pokemonListParam).then((response) => {
      console.log('getPokemonList response', response)
      pokemonUrls.value = response.results
      return true
    })
  }
  function getPokemonDetail(urls: Array<string>): Promise<Array<Pokemon>> {
    return new Promise((resolve, reject) => {
      pokemonService.getPokemonDetail(urls).then(res => {
        console.log('getPokemonDetail response store', res);
        const list: Array<PokemonDetailResponse> = res;
        let pokemonList: Array<Pokemon> = [];
        // set species url list for fetch
        const speciesUrl: Array<string> = list.map(data => data.species.url);
        // get species list for Habitat
        pokemonService.getPokemonSpecies(speciesUrl).then(data => {
          list.forEach((pokemonData, index) => {
            pokemonData.species.habitat = data[index].habitat;
            pokemonData.egg_groups = data[index].egg_groups;
            pokemonData.growth_rate = data[index].growth_rate;
          });

          // change image to blob after gettting habitat
          const imageUrls: Array<string> = list.map((data) => data.sprites.front_default)
          pokemonService.getPokemonImagesInBase64(imageUrls).then(response => {
            console.log('getPokemonImagesInBase64 response', response);
            const blobList = response.map((res) => HelperService.getAllImageUrlToBlob(res))
            Promise.all(blobList).then((images) => {
              list.forEach((pokemonData, index) => {
                pokemonData.sprites.front_default_base64 = images[index];
              })
              pokemonList = PokemonMapperService.mapToPokemonList(list);
              pokemons.value = pokemonList;
              resolve(pokemonList);
            });
          })
        })

      })
      .catch(e => {
          reject(e);
      })
      .catch(e => {
          reject(e);
      })
    })
  }
  function getPokemonDetailById(id: number) {
    if (pokemons.value.length > 0) {
      const pokemon = pokemons.value.find(data => data.id === id);
      return pokemon
    } else {
      // pokemon not found
      selectedPokemon.value = null
      return null;
    }
  }
  function $reset() {
    pokemonUrls.value = []
    pokemons.value = []
  }
  return { pokemons, pokemonUrls, getPokemonList, getPokemonDetail, getPokemonDetailById, $reset }
})
