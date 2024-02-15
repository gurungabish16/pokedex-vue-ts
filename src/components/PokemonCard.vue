<script setup lang="ts">
import type { Pokemon } from '@/models/pokemon.model';
import PokemonType from './PokemonType.vue';
import router from '@/router';

defineProps<{
  pokemon: Pokemon;
  cardIndex: number;
}>()

function viewPokemonDetail(id: number) {
    router.push(`/pokemon/${id}`);
}
</script>

<template>
    <div class="pokemon-card"
        @click="viewPokemonDetail(pokemon.id)"
    >
        <div class="card-content"
        :class="pokemon.types[0].color"
        >
            <div class="image-wrapper">
                <div class="img-circle"></div>
                <img :src="pokemon.image" alt="" />
            </div>
            <div class="pokemon-detail-container">
                <div class="pokemon-detail-wrapper">
                    <h4>{{ pokemon.name }}</h4>
                    <div class="pokemon-type-container">
                        <div class="pokemon-type-wrapper"
                            v-for="(type, typeIndex) of pokemon.types" :key="'type' + cardIndex + typeIndex">
                            <pokemon-type
                                :pokemon-type="type"
                            ></pokemon-type>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-back-overlay"></div>
    </div>
</template>