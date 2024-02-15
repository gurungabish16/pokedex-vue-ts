import API_URL from '@/constants/api-url.constant'
import {
  GenderEnum,
  type Pokemon,
  type PokemonDetailResponse,
  type PokemonStat,
  type PokemonStatResponse,
  type PokemonType,
  type PokemonTypeResponse
} from '@/models/pokemon.model'
import { HelperService } from './helper.service'

export class PokemonMapperService {
  static mapToPokemonList(pokemonDetailResponse: Array<PokemonDetailResponse>): Array<Pokemon> {
    const list: Array<Pokemon> = []
    pokemonDetailResponse.forEach((data, index) => {
      const pokemon: Pokemon = this.mapToPokemon(data, index)
      list.push(pokemon)
    })
    return list
  }
  static mapToPokemon(data: PokemonDetailResponse, id: number): Pokemon {
    const pokemon: Pokemon = {
      id: id,
      forms: data.forms,
      types: this.mapToPokemonTypes(data.types),
      image: data.sprites.front_default_base64,
      stats: this.mapToPokemonStats(data.stats),
      name: data.name,
      url: '',
      habitat: data.species.habitat.name,
      gender: data.name.split('-').length > 1 ? (data.name.split('-')[1] === 'm' ? GenderEnum.MALE : GenderEnum.FEMALE) : GenderEnum.EMPTY,
      height: data.height,
      weight: data.weight,
      eggGroups: data.egg_groups.map(egg => egg.name),
      growthRate: data.growth_rate.name,
      moves: data.moves.map(item => item.move.name)
    }
    return pokemon
  }
  static mapToPokemonTypes(data: Array<PokemonTypeResponse>): Array<PokemonType> {
    const list: Array<PokemonType> = []
    data.forEach((item) => {
      const type: PokemonType = {
        name: item.type.name,
        url: item.type.url,
        color: HelperService.mapToColorCode(item.type.name)
      }
      list.push(type)
    })
    return list
  }
  static mapToPokemonStats(data: Array<PokemonStatResponse>): Array<PokemonStat> {
    const list: Array<PokemonStat> = []
    data.forEach((item) => {
      const stat: PokemonStat = {
        name: item.stat.name,
        url: item.stat.url,
        baseStat: item.base_stat,
        effort: item.effort,
      }
      list.push(stat)
    })
    return list
  }
  static mapToPokemonDetailsUrl(ids: Array<number>): Array<string> {
    const list: Array<string> = ids.map((id) => `${API_URL.POKEMON}/${id}/`)
    return list
  }
}
