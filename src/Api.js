import { TMDB_BASE_URL, TMDB_API_KEY } from './constants'

export const getMovies = async (query, page) => {
  const url = TMDB_BASE_URL + 'search/movie'+'?query='+query+'&page='+page+'&api_key='+TMDB_API_KEY
  results = await fetch(url)
  results = await results.json()
  return ('errors' in results) ? [] : results["results"]
}
