<script setup lang="ts">
import type { PokemonType } from '@/models/pokemon.model';

defineProps<{
    pokemonType: PokemonType;
}>()

</script>

<template>
    <span class="badge app-text-uppercase"
        :class="pokemonType.color"
    >
        {{ pokemonType.name }}
    </span>
</template>