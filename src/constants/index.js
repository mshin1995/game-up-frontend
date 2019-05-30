export const GAMES_API = "https://api-v3.igdb.com/games"
export const SEARCH_URL = "https://api-v3.igdb.com/games/?search="
export const NEWS_API = "https://api-v3.igdb.com/pulses"
export const NEWS_URL = "https://api-v3.igdb.com/pulse_urls"
export const COVER_URL = "https://api-v3.igdb.com/covers"
export const GENRE_URL = "https://api-v3.igdb.com/genres"
export const GAME_COVER_URL = "//images.igdb.com/igdb/image/upload/t_cover_big_2x/"
export const POPULAR_URL = "//images.igdb.com/igdb/image/upload/t_cover_big/"
export const SEARCH_COVER_URL = "//images.igdb.com/igdb/image/upload/t_cover_small_2x/"
export const RECENT_URL = "https://api-v3.igdb.com/games/?fields=name,cover&order=first_release_date:desc&filter[first_release_date][exists]&filter[first_release_date][lt]="
export const SOON_URL = "https://api-v3.igdb.com/games/?fields=name,cover&order=first_release_date:asc&filter[first_release_date][exists]&filter[first_release_date][gt]="
export const CORS = "https://my-cors-server.herokuapp.com"
export const USER = "http://localhost:3000/users"
export const LIST = "http://localhost:3000/lists"
export const HEADERS = {
  Accept: "application/json",
  "user-key": "5354f6fe11a2e783d1d78337ef40cbfb"
}
