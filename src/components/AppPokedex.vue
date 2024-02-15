<script setup lang="ts">
import type { Pokemon } from '@/models/pokemon.model';
import PokemonType from './PokemonType.vue';

defineProps<{
  pokemon: Pokemon | null;
  cardIndex: number;
}>()
</script>

<template>
    <div class="pokedex-card" v-if="pokemon">
      <div class="pokedex-basic">
        <div class="image-wrapper mb-3">
          <img :src="pokemon?.image" />
        </div>
        <h4>{{ pokemon?.name }}</h4>
        <div class="pokemon-type-container mb-3">
          <div class="pokemon-type-wrapper"
              v-for="(type, typeIndex) of pokemon?.types" :key="'type' + cardIndex + typeIndex">
              <pokemon-type
                  :pokemon-type="type"
              ></pokemon-type>
          </div>
        </div>
        <div class="profile-content mb-3">
          <div class="row">
            <div class="col-6 mb-2">
              <label>Height:</label>
              <div>{{ pokemon.height }}</div>
            </div>
            <div class="col-6 mb-2">
              <label>Weight:</label>
              <div>{{ pokemon.weight }}</div>
            </div>
            <div class="col-6 mb-2">
              <label>Egg Groups:</label>
              <div>{{ pokemon?.eggGroups?.join(', ') }}</div>
            </div>
            <div class="col-6 mb-2">
              <label>Growth Rate:</label>
              <div>{{ pokemon.growthRate }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="pokedex-detail">
        <div class="stats-wrapper">
          <h4>Pokemon Stats</h4>
          <ul>
            <li v-for="(stat, statIndex) of pokemon.stats" :key="'stat' + cardIndex + statIndex">
              <span class="badge app-text-uppercase pokemon-default-bg">
                {{ stat.baseStat }} - {{ stat.name }}
              </span>
            </li>
          </ul>
        </div>
        <div class="attack-wrapper">
          <h4>Moves of {{ pokemon.name }}</h4>
          <ul>
            <li v-for="(move, statIndex) of pokemon.moves" :key="'stat' + cardIndex + statIndex">
              <span class="badge app-text-uppercase pokemon-grass-bg">
                {{ move }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
