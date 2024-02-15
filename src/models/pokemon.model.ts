import type { BaseQueryParam, BaseApiResponse } from './base.model'

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  EMPTY = '',
}

export interface Pokemon extends GeneralLink {
  id: number;
  forms: Array<PokemonForm>;
  types: Array<PokemonType>;
  image: any;
  stats: Array<PokemonStat>;
  habitat: string;
  gender: GenderEnum;
  height: number;
  weight: number;
  eggGroups: Array<string>;
  growthRate: string;
  moves: Array<string>;
}

export interface PokemonStat extends GeneralLink {
  baseStat: number;
  effort: number;
}

export interface PokemonForm extends GeneralLink {}

export interface PokemonType extends GeneralLink {
  color: string;
}

export interface GeneralLink {
  name: string;
  url: string;
}

export interface PokemonDetailResponse {
  name: string;
  forms: Array<GeneralLink>;
  types: Array<PokemonTypeResponse>;
  sprites: PokemonSpritesResponse;
  stats: Array<PokemonStatResponse>;
  species: PokemonSpeciesResponse;
  abilities: Array<GeneralLink>;
  height: number;
  weight: number;
  moves: Array<PokemonMoveReponse>;
  egg_groups: Array<GeneralLink>;
  growth_rate: GeneralLink;
}

export interface PokemonMoveReponse {
  move: GeneralLink;
}

export interface PokemonTypeResponse {
  slot: number;
  type: GeneralLink;
}

export interface PokemonSpritesResponse {
  front_default: string;
  front_default_base64: any;
}

export interface PokemonStatResponse extends GeneralLink {
  base_stat: number;
  effort: number;
  stat: GeneralLink;
}
export interface PokemonSpeciesResponse extends GeneralLink {
  habitat: GeneralLink;
  egg_groups: Array<GeneralLink>;
  growth_rate: GeneralLink;
}

export interface PokemonListParam extends BaseQueryParam {}

export interface PokemonListResponse extends BaseApiResponse<GeneralLink> {}
