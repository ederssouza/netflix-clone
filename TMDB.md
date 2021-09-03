# TMDB

## API Key (v3 auth)

[TMDB API](https://www.themoviedb.org/settings/api)

## Language

[Languages](https://developers.themoviedb.org/3/getting-started/languages)

```js
https://api.themoviedb.org/3/movie/76341?api_key=${apiKey}&language=pt-BR
```

## Images

[Images](https://developers.themoviedb.org/3/getting-started/images)

```js
/**
 * "backdrop_sizes": [ "w300", "w780", "w1280", "original"],
 * "logo_sizes": [ "w45", "w92", "w154", "w185", "w300", "w500", "original"],
 * "poster_sizes": [ "w92", "w154", "w185", "w342", "w500", "w780", "original"],
 * "profile_sizes": [ "w45", "w185", "h632", "original"],
 * "still_sizes": [ "w92", "w185", "w300", "original"]
*/

https://api.themoviedb.org/3/movie/76341?api_key=${apiKey}&language=pt-BR
```

## Genres

```js
// Movies (https://developers.themoviedb.org/3/genres/get-movie-list)
https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR

// TV Show (https://developers.themoviedb.org/3/genres/get-tv-list)
https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=pt-BR
```

## TV Show

```js
// Popular (https://developers.themoviedb.org/3/tv/get-popular-tv-shows)
https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1

// Top Rated (https://developers.themoviedb.org/3/tv/get-top-rated-tv)
https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1
```

## Busca

```js
// Search (https://developers.themoviedb.org/3/search/multi-search)
https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=dead&page=1&include_adult=false
```