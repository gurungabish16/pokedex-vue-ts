import type {
  PokemonDetailResponse,
  PokemonListParam,
  PokemonListResponse,
  PokemonSpeciesResponse
} from '@/models/pokemon.model'
import API_URL from '@/constants/api-url.constant';
import { api } from './api'

class PokemonService {
  async getPokemonList(
    pokemonListParam: PokemonListParam
  ): Promise<PokemonListResponse> {
    const url = `${API_URL.BASE_URL}${API_URL.POKEMON}?` + new URLSearchParams({
      limit: pokemonListParam.limit.toString(),
      offset: pokemonListParam.offset.toString()
    })
    try {
      const response = await api.get<PokemonListResponse>(url)
      return response
    } catch (error) {
      throw {
        errorMsg: 'Failed to load data.'
      }
    }
  }
  async getPokemonDetail(urls: Array<string>) {
    const fetchRequests = urls.map((url) => api.get<PokemonDetailResponse>(url).then(response => response));
    return Promise.all([...fetchRequests])
  }
  async getPokemonSpecies(urls: Array<string>) {
    const fetchRequests = urls.map((url) => api.get<PokemonSpeciesResponse>(url).then(response => response));
    return Promise.all([...fetchRequests])
  }
  async getPokemonImagesInBase64(urls: Array<string>) {
    const fetchRequests = urls.map((url) => api.getBlob(url));
    return Promise.all([...fetchRequests]);
  }
}

export default new PokemonService()
